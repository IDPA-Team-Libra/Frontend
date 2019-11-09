import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import * as d3 from "d3";
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  symbol: string;
  company: string;
  amount: string;
  totalValue?: number;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() {
  }

  defaultColumns = ['symbol', 'company', 'amount', 'totalValue'];
  allColumns = [...this.defaultColumns];

  data: TreeNode<FSEntry>[] = [
    {
      data: { symbol: 'AMZN', company: 'Amazone', amount: '10', totalValue: 50020 },
    },
    {
      data: { symbol: 'APPL', amount: '10', company: 'Apple Inc.', totalValue: 3000 },
    },
    {
      data: { symbol: 'TSLA', amount: '100', company: 'Tesla', totalValue: 312331 },
    },
  ];


  ngOnInit() {
  }
  

}

