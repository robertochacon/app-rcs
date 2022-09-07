import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: any = '';
  @Input() page: string = 'dashboard';
  constructor() { 
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {
  }

}
