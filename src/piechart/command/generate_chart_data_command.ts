import { CHART as chart } from './chart_command_receiver'
import { CHART as chart2 } from './abstract_chart_command'

export namespace CHART.pie.command {
    import AbstractChartCommand = chart2.pie.command.AbstractChartCommand;
    import ChartCommandReceiver = chart.pie.command.ChartCommandReceiver;

    export class GenerateChartDataCommand extends AbstractChartCommand {
        constructor(receiver: ChartCommandReceiver) {
            super(receiver);
        }
        execute() {
            this.receiver.generateChartData()
        }
    }
}