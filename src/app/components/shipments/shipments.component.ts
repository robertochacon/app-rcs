import { Component, Input, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { MessengersService } from 'src/app/services/messengers.service';

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
  listMessengers: any[] = [];

  constructor(private _shipments: ShipmentsService, private _messengers: MessengersService) { 
  }
  
  ngOnInit(): void {
    this.getAllShipments();
    this.getAllMessengers();    
  }

  getAllShipments(){
    this.loading = true;

    let role = localStorage.getItem('role');
    let method;
    let entity = localStorage.getItem('entity_id');

    if(role==="super_admin"){
      method = this._shipments.getAllShipments();
    }else{
      method = this._shipments.getAllShipmentsByEntity(entity);
    }

    method.subscribe((response)=>{

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

  getAllMessengers(){
    this._messengers.getAllMessengers().subscribe((response)=>{
      this.listMessengers = response.data;
      console.log(this.listMessengers);
    }, error=>{
      // this.listMessengers = [];
    })
  }

  selectShipments(latitud: any, longitud: any): void {
    this.latitud = latitud;
    this.longitud = longitud;
    console.log('logitud: ', this.longitud, ' latitud: ', this.latitud);
    
  }

  delete(id: any): void {
    if(confirm('Deseas eliminar este envio?')){
      this._shipments.deleteShipments(id).subscribe((response)=>{
        console.log(response);
        this.getAllShipments();
      },error => {
        this.result = 'fail-delete';
      })
    }
  }

}
