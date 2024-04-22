import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrl: './vertical-chart.component.scss'
})
export class VerticalChartComponent {
  @Input() view!: [number, number];
  @Input() data!: object[];
  @Input() showLegend!: boolean;
  @Input() xAxisLabel!: string;
  @Input() yAxisLabel!: string;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() {}

  onSelect(event: Event) {
    console.log(event);
  }
}
