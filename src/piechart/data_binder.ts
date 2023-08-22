import { CHART as chart } from './chart_view_model'
import { CHART as chart2 } from './chart_view'

export namespace CHART.pie {
    import ChartViewModel = chart.pie.ChartViewModel;
    import ChartView = chart2.pie.CHART_VIEW;

    export class DataBinder {
        private chartViewModel: ChartViewModel | undefined;
        private chartView: ChartView | undefined;

        constructor() {
        }

        setChartViewModel(viewModel: ChartViewModel): void {
            this.chartViewModel = viewModel
        }

        setChartView(view: ChartView): void {
            this.chartView = view;
        }

        dataBinding(): void {
            if(typeof this.chartViewModel === 'undefined' || typeof this.chartView === 'undefined') {
                throw new Error()
            }
            let chartData = this.chartViewModel.getChartData();
            let numberOfValue = this.chartViewModel.getNumberOfValue();
            let colors = this.chartViewModel.getColors();
            let totalValue = this.chartViewModel.getTotalValue();
            let doughnutHoleSize = this.chartViewModel.getDoughnutHoleSize();

            this.chartView.setChartData(chartData);
            this.chartView.setColors(colors);
            this.chartView.setNumberOfValue(numberOfValue);
            this.chartView.setTotalValue(totalValue);
            this.chartView.setDoughnutHoleSize(doughnutHoleSize);

        }
        // Здесь можно конверсировать метод используя AOP after hook and cache как react.
        dataChange(): void {
            if(typeof this.chartView === 'undefined') {
                throw new Error()
            }
            this.dataBinding()
            this.chartView.redraw()
        }
    }
}