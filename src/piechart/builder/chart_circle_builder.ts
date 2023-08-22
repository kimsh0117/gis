import { CHART as chart } from '../../struct/circle'

export namespace CHART.pie {
    import Circle = chart.struct.Circle;

    export class CircleBuilder {
        private share: number | undefined;
        private radius: number | undefined;
        private color: string | undefined;
        constructor() {
        }
        setShare(share: number): CircleBuilder {
            this.share = share;
            return this;
        }

        setRadius(radius: number): CircleBuilder {
            this.radius = radius;
            return this;
        }

        setColor(color: string): CircleBuilder {
            this.color = color;
            return this;
        }
        getShare(): number | undefined {
            return this.share;
        }
        getRadius(): number | undefined  {
            return this.radius;
        }
        getColor(): string | undefined  {
            return this.color;
        }
        build(): Circle {
            return new Circle(this.getShare(), this.getRadius())
        }
    }
}