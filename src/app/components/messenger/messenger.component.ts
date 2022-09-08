import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  @Input() page: string = 'messengers';
  constructor() { 
  }

  ngOnInit(): void {
  }

}
