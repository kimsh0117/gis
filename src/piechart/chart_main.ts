import { CHART as chart } from './chart_model'
import { CHART as chart2 } from './chart_view'
import { CHART as chart3 } from './chart_view_model'
import { CHART as chart4 } from './data_binder'
import { CHART as chart5 } from './command/chart_command_receiver'

export namespace CHART.pie {
    export class ChartMain {
        constructor(id: string) {
            let chartElement = document.getElementById(id);
            if(!chartElement) {
                throw new Error()
            }

            let canvas = document.createElement('canvas');

            chartElement.appendChild(canvas);

            let chartView = new chart2.pie.CHART_VIEW(canvas);

            let chartModel = new chart.pie.ChartModel();
            let chartViewModel = new chart3.pie.ChartViewModel();
            let dataBinder = new chart4.pie.DataBinder();

            dataBinder.setChartViewModel(chartViewModel);
            dataBinder.setChartView(chartView);

            chartViewModel.setChartModel(chartModel);
            chartViewModel.setDataBinder(dataBinder);

            let chartCommandReceiver = new chart5.pie.command.ChartCommandReceiver();
            chartCommandReceiver.setChartViewModel(chartViewModel);

            chartView.setChartCommandReceiver(chartCommandReceiver);

            dataBinder.dataBinding()
            chartView.redraw();
        }
    }
}