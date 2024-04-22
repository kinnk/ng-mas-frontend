import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() data!: any;
  @Input() view: [number, number] = [300, 300];
  @Input() showLegend: boolean = true;

  // options
  gradient: boolean = true;
  
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
