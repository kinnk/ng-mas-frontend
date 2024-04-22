import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiAnalyticsTsService } from '../../services/api-analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription = new Subscription();

  public analyticsData: any = [];
  public revenuesBySource: any = [];
  public expensesByCategory: any = [];

  constructor(
    private apiAnalytics: ApiAnalyticsTsService
  ){}




  getExpensesByCategory(){
    this.subscriptions.add(
      this.apiAnalytics.getExpensesByCategory()
        .subscribe(
          (result) => {
            this.expensesByCategory = result;
            console.log(this.expensesByCategory);
          },
          (error) => {
            console.error(error);
          }
        )
    )
  }

  getRevenuesBySource(){
    this.subscriptions.add(
      this.apiAnalytics.getRevenuesBySource()
        .subscribe(
          (result) => {
            this.revenuesBySource = result;
          },
          (error) => {
            console.error(error);
          }
        )
    )
  }

  getResult(){
    this.subscriptions.add(
      this.apiAnalytics.getFinancesResults()
        .subscribe(
          (result) => {
            this.analyticsData = [
              {
                name: "Доход",
                value: result.total_revenues
              },
              {
                name: "Расход",
                value: result.total_expenses
              },
              {
                name: "Чистая прибыль",
                value: result.net_profit
              }
            ]
          },
          (error) => {
            console.error(error);
          }
        )
    )
  }

  ngOnInit(): void{
    this.getResult();
    this.getRevenuesBySource();
    this.getExpensesByCategory();

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

