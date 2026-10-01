import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Grid, IGridProps } from "./Grid";
import { GridModel, parseGrid } from "./model";
import * as React from "react";

/**
 * The sprint planning grid as a code component: people down, working days across, one typed cell
 * per person per day. A pure renderer. Everything it draws arrives on gridJson; the only thing it
 * sends back is the cell the reader picked.
 */
export class SprintGrid implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private model: GridModel = { days: [], groups: [] };
    private raw = "";
    private selected = "";

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const raw = context.parameters.gridJson.raw ?? "";
        // The JSON is parsed once per change, not once per render.
        if (raw !== this.raw) {
            this.raw = raw;
            this.model = parseGrid(raw);
        }
        const theme = (context.parameters.theme.raw ?? "").toLowerCase() === "dark"
            ? "dark"
            : "light";
        const props: IGridProps = {
            model: this.model,
            theme: theme,
            width: context.mode.allocatedWidth,
            height: context.mode.allocatedHeight,
            onSelect: this.onSelect,
        };
        return React.createElement(Grid, props);
    }

    private onSelect = (person: string, date: string): void => {
        this.selected = JSON.stringify({ person: person, date: date });
        this.notifyOutputChanged();
    };

    public getOutputs(): IOutputs {
        return { selectedCellJson: this.selected };
    }

    public destroy(): void {
        // Nothing to clean up: the framework unmounts the React tree itself.
    }
}
