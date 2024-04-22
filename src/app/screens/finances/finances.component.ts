import { Component, OnInit } from '@angular/core';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ApiFinancesService } from '../../services/api-finances.service';
import { Subscription } from 'rxjs';

interface DataItem {
  year: number;
  month: number;
  category: string;
  revenue_amount: string;
  expense_amount: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent implements OnInit{
  subscription: Subscription = new Subscription();
  revenuesExpenses: any = [];
  constructor(
    private apiFinances: ApiFinancesService
  ){}
  listOfColumns: ColumnItem[] = [
    {
      name: 'Год',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.year - b.year,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: DataItem) => {
        return list.some((year) =>true);
      },
    },
    {
      name: 'Месяц',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.month - b.month,
      sortDirections: ['descend', null],
      listOfFilter: [
        {text: 'Январь', value: 1},
        {text: 'Февраль', value: 2},
      ],
      filterFn: (list: number[], item: DataItem ) => {
        return list.includes(item.month);
      },
      filterMultiple: true,
    },
    {
      name: 'Категория',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.category.length - b.category.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' },
      ],
      filterFn: (category: string, item: DataItem) => {
        return item.category.indexOf(category) !== -1;
      },
    },
    {
      name: 'Сумма доходов',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.category.length - b.category.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' },
      ],
      filterFn: (category: string, item: DataItem) => {
        console.log('filter address fn');
        return item.category.indexOf(category) !== -1;
      },
    },
    {
      name: 'Сумма расходов',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.category.length - b.category.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' },
      ],
      filterFn: (category: string, item: DataItem) => {
        console.log('filter address fn');
        return item.category.indexOf(category) !== -1;
      },
    },
  ];

  getRevenuesExpenses(){
    return this.subscription.add(this.apiFinances.getRevenuesExpenses()
    .subscribe(
      (res)=>{
        this.revenuesExpenses = res;
        console.log(this.revenuesExpenses);
      },
      (error)=>{
        console.log('Ошибка получения данных доходы и расходы!', error.message);
      },
    ))
  }

  ngOnInit(): void {
    this.getRevenuesExpenses();
  }
}
