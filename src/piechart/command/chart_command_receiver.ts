import { CHART as chart } from '../chart_view_model'

export namespace CHART.pie.command {
    import ChartViewModel = chart.pie.ChartViewModel;

    export class ChartCommandReceiver {
        private chartViewModel: ChartViewModel | undefined;
        constructor() {
        }
        setChartViewModel(viewModel: ChartViewModel): void {
            this.chartViewModel = viewModel;
        }

        generateChartData(): void {
            this.chartViewModel?.generateChartData()
        }
    }
}