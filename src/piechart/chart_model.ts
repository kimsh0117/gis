export namespace CHART.pie {
    export class ChartModel {
        private chartData: number[] = [];
        private numberOfValue = 1;
        private colors = ['#EB5757', '#F2994A', '#6FCF97', '#9B51E0', '#2F80ED', '#56CCF2', '#219653', '#F2C94C'];
        private totalValue = 0;
        private doughnutHoleSize = 0.12;

        constructor(options?: {
            styles?: {
                colors: string[]
                doughnutHoleSize?: number
            },
            data?: number[]
        }) {
            if(!options) {
                this.generateChartData()
                this.setNumberOfValue(this.getChartData().length)
                this.setTotalValue()
            }
            if(options?.styles && options?.styles.colors) {
                this.colors = options?.styles.colors;
            }

            if(options?.styles && options?.styles.doughnutHoleSize) {
                this.doughnutHoleSize = options?.styles.doughnutHoleSize;
            }
        }
        getDoughnutHoleSize(): number {
            return this.doughnutHoleSize;
        }
        getChartData(): number[] {
            return this.chartData;
        }
        getNumberOfValue(): number {
            return this.numberOfValue;
        }
        getColors(): string[] {
            return this.colors;
        }
        getTotalValue(): number {
            return this.totalValue;
        }
        setTotalValue(): void {
            this.totalValue = this.chartData.reduce((a, b) => a + b, 0)
        }
        setColors(value: string[]): void {
            this.colors = value;
        }
        setChartData(value: number[]): void {
            this.chartData = value
        }
        setNumberOfValue(value: number): void {
            this.numberOfValue = value;
        }
        setDoughnutHoleSize(value: number): void {
            this.doughnutHoleSize = value;
        }
        getRandomNumber(options: {max: number, start?: number}): number {
            if(options.start) {
                return Math.floor(Math.random() * options.max + options.start);
            }
            return Math.floor(Math.random() * (options.max + 1));
        }
        generateChartData(): void {
            const random =  this.getRandomNumber({start: 1, max: 8})
            const chartData = [...new Array(random)].map((_) => this.getRandomNumber({start: 1, max: 250}))
            this.setChartData(chartData);
        }
    }
}