import { CHART as chart } from './piechart/chart_main'
import './assets/styles/styled.css'

window.onload = function() {
    new chart.pie.ChartMain('app')
}