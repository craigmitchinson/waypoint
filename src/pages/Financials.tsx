// Financials: the workbook's sheet of the same name. What the team costs, what it returns, what
// each item costs to deliver, and what the closed work says the size bands are really worth.
// People are costed at the blended rate for their team grade, never an individual salary.
// Cost is shown by funding line; value is never split by funding.
import { Fragment, useMemo } from "react";
import { Download } from "lucide-react";
import Section from "./Section";
import { useDataset } from "../store/useDataset";
import { buildContext } from "../engine/context";
import type { EngineContext } from "../engine/context";
import { squadNetMW } from "../engine/capacity";
import { calibrationBand, estimateAccuracy } from "../engine/calibration";
import { benefitValue } from "../engine/value";
import { counts, squadCommittedMW, workMW } from "../engine/work";
import { Band, Stat } from "../ui";
import "./financials.css";

export const gbp = (n: number): string => new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: Math.abs(n) < 1000 ? 2 : 0,
}).format(n);

const mw = (n: number) => n.toFixed(1);
const times = (n: number) => n.toFixed(2) + "x";

/** One block of the sheet: what is drawn, and what the export writes. */
export interface MoneyTable {
  name: string;
  caption: string;
  headers: string[];
  rows: string[][];
  total?: string[];
  note?: string;
}

/** The blocks as CSV: a name line, a header line and the rows, one block after another. */
export function moneyCsv(tables: MoneyTable[]): string {
  const cell = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const line = (cells: string[]) => cells.map(cell).join(",");
  const out: string[] = [];
  for (const table of tables) {
    out.push(line([table.name]));
    out.push(line(table.headers));
    for (const row of table.rows) out.push(line(row));
    if (table.total) out.push(line(table.total));
    out.push("");
  }
  return out.join("\n");
}

/** A block of two columns is a list of figures, so it reads as a card rather than a table. */
function FiguresCard({ table }: { table: MoneyTable }) {
  return (
    <section className="wp-card wp-financials-figures">
      <h2 className="wp-card-title">{table.name}</h2>
      <dl>
        {table.rows.map((row) => (
          <Fragment key={row[0]}>
            <dt>{row[0]}</dt>
            <dd>{row[1]}</dd>
          </Fragment>
        ))}
      </dl>
      {table.note ? <p className="wp-financials-note">{table.note}</p> : null}
    </section>
  );
}

function Block({ table }: { table: MoneyTable }) {
  const summary = table.total
    ? table.headers
      .slice(1)
      .map((h, i) => `${h} ${table.total?.[i + 1] ?? ""}`)
      .join(", ")
    : "";
  return (
    <section className="wp-financials-block">
      <h2 className="wp-h2">{table.name}</h2>
      {table.note ? <p className="wp-financials-note">{table.note}</p> : null}
      <div className="wp-table-wrap">
        <table className="wp-table wp-financials-table">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={h} scope="col" className={i === 0 ? undefined : "wp-num"}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.length === 0 ? (
              <tr><td colSpan={table.headers.length}>Nothing to show.</td></tr>
            ) : table.rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((v, i) => (
                  <td key={table.headers[i + 1]} className="wp-num">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {table.total ? (
            <tfoot>
              <tr>
                <th scope="row">{table.total[0]}</th>
                {table.total.slice(1).map((v, i) => (
                  <td key={table.headers[i + 1]} className="wp-num">{v}</td>
                ))}
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
      {table.total ? <p className="sr-only">{`${table.total[0]}: ${summary}.`}</p> : null}
    </section>
  );
}

export default function Financials() {
  const { data } = useDataset();
  const ctx: EngineContext = useMemo(() => buildContext(data), [data]);
  // the Financials tables, held on Settings: a grade with no figure costs nothing, and an open
  // vacancy costs nothing until it is filled
  const { teamGradeCosts, costLines } = data.settings.financials;

  const gradeCost = (grade: string) =>
    teamGradeCosts.find((g) => g.grade === grade)?.annualCost ?? 0;
  const annualCost = (grade: string, employment: string) =>
    (employment === "Open vacancy" ? 0 : gradeCost(grade));

  const peopleAnnual = data.people.reduce((t, p) => t + annualCost(p.grade, p.employment), 0);
  const runningAnnual = costLines.reduce((t, c) => t + c.annual, 0);
  const tco = peopleAnnual + runningAnnual;

  const squadRows = data.squads.map((s) => {
    const people = data.people.filter((p) => p.squad === s.name);
    const annual = people.reduce((t, p) => t + annualCost(p.grade, p.employment), 0);
    const quarter = annual / 4;
    const net = squadNetMW(ctx, s.name);
    const perMW = net === 0 ? 0 : quarter / net;
    const committed = squadCommittedMW(ctx, s.name);
    return { name: s.name, people: people.length, annual, quarter, net, perMW, committed };
  });
  const squadQuarter = squadRows.reduce((t, r) => t + r.quarter, 0);
  const squadNet = squadRows.reduce((t, r) => t + r.net, 0);
  const blendedPerMW = squadNet === 0 ? 0 : squadQuarter / squadNet;
  const perMWFor = (squad: string) =>
    squadRows.find((r) => r.name === squad)?.perMW ?? blendedPerMW;

  const grades = [...new Set(data.people.map((p) => p.grade).filter(Boolean))].sort();

  const workRows = data.work
    .filter((w) => counts(ctx, w) && workMW(ctx, w) > 0)
    .map((w) => {
      const itemMW = workMW(ctx, w);
      const cost = itemMW * perMWFor(w.squad);
      return { title: w.title, squad: w.squad, mw: itemMW, cost, inYear: benefitValue(ctx, w).inYear };
    });
  const workCost = workRows.reduce((t, r) => t + r.cost, 0);
  const workValue = workRows.reduce((t, r) => t + r.inYear, 0);

  const inYear = data.work
    .filter((w) => counts(ctx, w) || ctx.impact[w.state] === "Historical")
    .reduce((t, w) => t + benefitValue(ctx, w).inYear, 0);
  const recorded = data.work
    .filter((w) => counts(ctx, w) || ctx.impact[w.state] === "Historical")
    .reduce((t, w) => t + benefitValue(ctx, w).recorded, 0);

  const fundingRows = [...new Set(costLines.map((c) => c.costLine))].map((line) => {
    const lines = costLines.filter((c) => c.costLine === line);
    const investment = lines.filter((c) => c.fundingLine === "Investment")
      .reduce((t, c) => t + c.annual, 0);
    const other = lines.filter((c) => c.fundingLine !== "Investment")
      .reduce((t, c) => t + c.annual, 0);
    return [line, gbp(investment), gbp(other), "—", gbp(investment + other)];
  });
  const runInvestment = costLines.filter((c) => c.fundingLine === "Investment")
    .reduce((t, c) => t + c.annual, 0);

  const tables: MoneyTable[] = [
    {
      name: "Cost of capacity by squad",
      caption: "Cost of capacity by squad: the people in it, what they cost, and what a member week costs.",
      headers: ["Squad", "People", "Annual cost", "Cost this quarter", "Net MW", "£ per net MW",
        "Committed MW", "Delivery cost"],
      rows: squadRows.map((r) => [
        r.name, String(r.people), gbp(r.annual), gbp(r.quarter), mw(r.net), gbp(r.perMW),
        mw(r.committed), gbp(r.committed * r.perMW),
      ]),
      total: [
        "All squads",
        String(squadRows.reduce((t, r) => t + r.people, 0)),
        gbp(squadRows.reduce((t, r) => t + r.annual, 0)),
        gbp(squadQuarter),
        mw(squadNet),
        gbp(blendedPerMW),
        mw(squadRows.reduce((t, r) => t + r.committed, 0)),
        gbp(squadRows.reduce((t, r) => t + r.committed * r.perMW, 0)),
      ],
      note: "People are costed at the blended rate for their team grade, never an individual salary.",
    },
    {
      name: "Cost of capacity by grade",
      caption: "Cost of capacity by team grade: the people on each grade and what they cost.",
      headers: ["Team grade", "People", "Blended annual rate", "Annual cost", "Cost this quarter"],
      rows: grades.map((g) => {
        const people = data.people.filter((p) => p.grade === g);
        const annual = people.reduce((t, p) => t + annualCost(p.grade, p.employment), 0);
        return [g, String(people.length), gbp(gradeCost(g)), gbp(annual), gbp(annual / 4)];
      }),
      total: [
        "All grades", String(data.people.length), "—", gbp(peopleAnnual), gbp(peopleAnnual / 4),
      ],
    },
    {
      name: "Cost by funding line",
      caption: "Cost of ownership by funding line: licences, infrastructure and the people in post.",
      headers: ["Cost line", "Investment", "Non-investment", "Not split", "Total"],
      rows: [
        ...fundingRows,
        ["People in post", "—", "—", gbp(peopleAnnual), gbp(peopleAnnual)],
      ],
      total: [
        "Total cost of ownership per year",
        gbp(runInvestment),
        gbp(runningAnnual - runInvestment),
        gbp(peopleAnnual),
        gbp(tco),
      ],
      note: "The workbook sets funding per person on People; the app model does not carry it, so the "
        + "people line is shown whole rather than split.",
    },
    {
      name: "Value against cost this year",
      caption: "Value against cost this year: the in-year value of the plan against a year of cost.",
      headers: ["Measure", "Amount"],
      rows: [
        ["Pipeline value in-year", gbp(inYear)],
        ["Recorded against the claims", gbp(recorded)],
        ["Total cost of ownership per year", gbp(tco)],
        ["Cost of capacity this quarter", gbp(squadQuarter)],
        ["Return on total cost of ownership", times(tco === 0 ? 0 : inYear / tco)],
        ["Payback on a year of cost (months)", inYear === 0 ? "—" : (tco / (inYear / 12)).toFixed(1)],
      ],
      note: "Value is never split by funding: it belongs to the work, whoever pays for it.",
    },
    {
      name: "Cost per work item",
      caption: "Cost per work item: member weeks this quarter at the squad's cost per member week, "
        + "against the in-year value of what it claims.",
      headers: ["Work item", "Squad", "MW", "Delivery cost", "£ in-year", "Return"],
      rows: workRows.map((r) => [
        r.title, r.squad || "—", mw(r.mw), gbp(r.cost), gbp(r.inYear),
        r.cost === 0 ? "—" : times(r.inYear / r.cost),
      ]),
      total: [
        "Counted work", "", mw(workRows.reduce((t, r) => t + r.mw, 0)), gbp(workCost),
        gbp(workValue), workCost === 0 ? "—" : times(workValue / workCost),
      ],
      note: "A squad with no cost of its own is costed at the blended rate across every squad.",
    },
    {
      name: "Calibration: estimate accuracy by size",
      caption: "Calibration: what each size band was estimated at, what it really took, and the size "
        + "the closed work suggests.",
      headers: ["Size", "Items", "Average original MW", "Average actual MW", "Actual over original",
        "Current MW", "Suggested MW"],
      rows: Object.keys(data.settings.sizes).map((size) => {
        const band = calibrationBand(ctx, size);
        return [
          size, String(band.items), band.avgOriginal.toFixed(2), band.avgActual.toFixed(2),
          band.ratio ? times(band.ratio) : "—", mw(band.current), mw(band.suggested),
        ];
      }),
      note: `Estimate accuracy across the delivered work: ${times(estimateAccuracy(ctx))} of what it `
        + "was committed at.",
    },
  ];

  // a two-column block reads as a card; the widest table sits beside it, the rest pair off below
  const figures = tables.filter((t) => t.headers.length === 2);
  const blocks = tables.filter((t) => t.headers.length > 2);
  const [lead, ...rest] = blocks;

  const download = () => {
    const blob = new Blob([moneyCsv(tables)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `waypoint-money-${data.settings.quarter.replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Section
      eyebrow={data.settings.quarter}
      title="Financials"
      lede="Total cost of ownership against the value we return, and what each member week of it costs."
      actions={(
        <button type="button" className="wp-btn-primary" onClick={download}>
          <Download size={14} aria-hidden="true" />
          Export these tables as CSV
        </button>
      )}
    >
      <Band kicker="Cost against value this year">
        <Stat onBrand label="Cost of ownership" value={gbp(tco)} sub="People in post plus the running cost lines" />
        <Stat onBrand label="Value returned" value={gbp(inYear)} sub="In-year value of the claims in plan" />
        <Stat
          onBrand
          tone="accent"
          label="Return"
          value={times(tco === 0 ? 0 : inYear / tco)}
          sub="In-year value over a year of cost"
        />
      </Band>

      <div className="wp-financials-body wp-fill">
        <div className="wp-financials-top">
          {figures.map((table) => <FiguresCard key={table.name} table={table} />)}
          {lead ? <Block key={lead.name} table={lead} /> : null}
        </div>
        <div className="wp-financials-grid">
          {rest.map((table) => <Block key={table.name} table={table} />)}
        </div>
      </div>
    </Section>
  );
}
