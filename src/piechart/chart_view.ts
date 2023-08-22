import {CHART as chart} from '../struct/circle'
import {CHART as chart2} from './command/chart_command_receiver'
import {CHART as chart3} from './command/generate_chart_data_command'
import {CHART as chart4} from './builder/chart_circle_builder'

export namespace CHART.pie {
    const WIDTH = 500;
    const HEIGHT = 500;

    import Circle = chart.struct.Circle;
    import ChartCommandReceiver = chart2.pie.command.ChartCommandReceiver;
    import CircleBuilder = chart4.pie.CircleBuilder;

    export class CHART_VIEW {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D | null;

        private chartCommandReceiver: ChartCommandReceiver | undefined;

        private numberOfValue = 1;
        private chartData: number[] = [];
        private colors: string[] = [];
        private totalValue: number = 0;
        private doughnutHoleSize = 0;

        private slices: Circle[] = [];

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;

            this.canvas.style.cursor = 'pointer';

            this.ctx = this.canvas.getContext('2d');

            this.canvas.addEventListener('mousedown', this.press.bind(this), false)
        }

        press(event: MouseEvent): void {

            if(typeof this.chartCommandReceiver === 'undefined') {
                throw new Error()
            } else {
                this.clearCanvas();
                let generateChartDataCommand = chart3.pie.command.GenerateChartDataCommand;

                let command = new generateChartDataCommand(this.chartCommandReceiver)
                command.execute();
            }
        }
        clearCanvas(): void {
            if (this.ctx === null) {
                throw new Error()
            }
            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }
        redraw(): void {
            this.setSlices()
            this.drawSlices()
            this.drawDoughnut()
        }
        drawDoughnut() {
            if (this.ctx === null) {
                throw new Error()
            }
            this.drawPieSlice({
                ctx: this.ctx,
                centerX: WIDTH / 2,
                centerY: HEIGHT / 2,
                radius: this.doughnutHoleSize * (WIDTH / 2),
                startAngle: 0,
                endAngle: 2 * Math.PI,
                fillColor: '#1E1E1E',
            });
        }
        drawPieSlice(params: {
            ctx: CanvasRenderingContext2D,
            centerX: number,
            centerY: number,
            radius: number,
            startAngle: number,
            endAngle: number,
            fillColor: string,
            strokeColor?: string
        }): void {
            if(params.strokeColor) {
                params.ctx.strokeStyle = params.strokeColor;
            }
            params.ctx.save();
            params.ctx.fillStyle = params.fillColor;
            params.ctx.beginPath();
            params.ctx.moveTo(params.centerX, params.centerY);
            params.ctx.arc(params.centerX, params.centerY, params.radius, params.startAngle, params.endAngle);
            params.ctx.closePath();
            params.ctx.fill();
            params.ctx.restore();
        }
        drawSlices(): void {
            let startAngle = -Math.PI / 2;
            this.slices.forEach((slice, index) => {
                if(slice.share) {
                    if (this.ctx === null) {
                        throw new Error()
                    }
                    const sliceAngle = (2 * Math.PI * slice.share) / this.totalValue;
                    this.drawPieSlice({
                        ctx: this.ctx,
                        centerX: WIDTH / 2,
                        centerY: HEIGHT / 2,
                        radius: slice.radius as number,
                        startAngle: startAngle,
                        endAngle: startAngle + sliceAngle,
                        fillColor: this.colors[index],
                    });
                    startAngle += sliceAngle;
                }
            })
        }
        getRadius(): number {
            const max = Math.floor(WIDTH / 2);
            const min = Math.floor(max - 150);
            return Math.floor((Math.random() * (max - min)) + min);
        }
        setNumberOfValue(value: number): void {
            this.numberOfValue = value;
        }
        setColors(values: string[]): void {
            this.colors = values;
        }
        setChartData(values: number[]): void {
            this.chartData = values;
        }

        setChartCommandReceiver(receiver: ChartCommandReceiver): void {
            this.chartCommandReceiver = receiver;
        }
        setTotalValue(value: number): void {
            this.totalValue = value;
        }
        setSlices(): void {
            this.slices = this.chartData
                .map((el, index) =>
                    new CircleBuilder()
                        .setShare(el)
                        .setRadius(this.getRadius())
                        .build());
        }
        setDoughnutHoleSize(value: number): void {
            this.doughnutHoleSize = value;
        }
    }
}