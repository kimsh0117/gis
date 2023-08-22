import { CHART as chart } from './chart_command_receiver'

export namespace CHART.pie.command {
    import ChartCommandReceiver = chart.pie.command.ChartCommandReceiver;

    export abstract class AbstractChartCommand {
        protected receiver: ChartCommandReceiver;

        constructor(receiver: ChartCommandReceiver) {
            this.receiver = receiver;
        }
        abstract execute(): void;
    }
}