import { CHART as chart } from './chart_model'
import { CHART as chart2 } from './data_binder'

export namespace CHART.pie {
    import ChartModel = chart.pie.ChartModel;
    import DataBinder = chart2.pie.DataBinder;

    export class ChartViewModel {
        private chartModel: ChartModel | undefined;
        private dataBinder: DataBinder | undefined;
        constructor() {
        }

        setChartModel(chartModel: ChartModel): void {
            this.chartModel = chartModel;
        }

        setDataBinder(binder: DataBinder): void {
            this.dataBinder = binder;
        }
        getChartData(): number[] {
            if(typeof this.chartModel === 'undefined') {
                throw new Error()
            }
            return this.chartModel.getChartData()
        }
        getNumberOfValue(): number {
            if(typeof this.chartModel === 'undefined') {
                throw new Error()
            }
            return this.chartModel.getNumberOfValue()
        }
        getColors(): string[] {
            if(typeof this.chartModel === 'undefined') {
                throw new Error()
            }
            return this.chartModel.getColors()
        }
        getTotalValue(): number {
            if(typeof this.chartModel === 'undefined') {
                throw new Error()
            }
            return this.chartModel.getTotalValue()
        }
        getDoughnutHoleSize(): number {
            if(typeof this.chartModel === 'undefined') {
                throw new Error()
            }
            return this.chartModel.getDoughnutHoleSize()
        }
        generateChartData(): void {
            if(typeof this.chartModel === 'undefined' || typeof this.dataBinder === 'undefined') {
                throw new Error()
            }
            this.chartModel.generateChartData();
            this.chartModel.setNumberOfValue(this.getChartData().length);
            this.chartModel.setTotalValue();
            this.dataBinder.dataChange();
        }
    }
}