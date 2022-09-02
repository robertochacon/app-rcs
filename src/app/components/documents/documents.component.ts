import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  action = 'register';
  loading = false;
  identification = '';
  name = '';
  description = '';
  file: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  save(): void {
    this.loading = true;
  }

}
