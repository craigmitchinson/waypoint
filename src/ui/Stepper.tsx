// The stages a work item moves through, with the one it is in named for a screen reader as well.
import { Check, Circle, CircleDot } from "lucide-react";

interface Props {
  label: string;
  steps: string[];
  current: string;
}

export default function Stepper({ label, steps, current }: Props) {
  const at = Math.max(0, steps.indexOf(current));
  return (
    <ol className="wp-stepper" aria-label={label}>
      {steps.map((step, i) => {
        const done = i < at;
        const here = i === at;
        const state = done ? "Done" : here ? "Current step" : "To come";
        return (
          <li
            key={step}
            className={"wp-stepper__step" + (done ? " is-done" : "") + (here ? " is-current" : "")}
            aria-current={here ? "step" : undefined}
          >
            {done
              ? <Check size={14} aria-hidden="true" />
              : here
                ? <CircleDot size={14} aria-hidden="true" />
                : <Circle size={14} aria-hidden="true" />}
            <span className="wp-stepper__name">{step}</span>
            <span className="sr-only">{", " + state}</span>
          </li>
        );
      })}
    </ol>
  );
}
