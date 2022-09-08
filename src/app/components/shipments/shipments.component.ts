import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  @Input() page: string = 'shipments';
  constructor() { 
  }
  ngOnInit(): void {
  }

}
