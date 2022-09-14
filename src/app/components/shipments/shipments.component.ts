import { Component, Input, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';

declare const $: any;

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {

  @Input() page: string = 'shipments';
  loading = false;
  loadData = false;
  result = '';
  listShipments: any[] = [];
  latitud:any;
  longitud:any;

  constructor(private _shipments: ShipmentsService) { 
  }
  
  ngOnInit(): void {
    this.getAllShipments();
  }

  getAllShipments(){
    this.loading = true;

    this._shipments.getAllShipments().subscribe((response)=>{

      this.listShipments = response.data;

      setTimeout(function(){
        $('#listShipments').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  selectShipments(latitud: any, longitud: any): void {
    this.latitud = latitud;
    this.longitud = longitud;
    console.log('logitud: ', this.longitud, ' latitud: ', this.latitud);
    
  }

}
