export namespace CHART.struct {
    export class Circle {
        public share: number | undefined;
        public radius: number | undefined;

        constructor(share: number | undefined, radius: number | undefined) {
            this.share = share;
            this.radius = radius;
        }
    }
}