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
  accion = '';
  listShipments: any[] = [];
  latitud:any;
  longitud:any;
  listMessengers: any[] = [];
  step = 0;
  id:any;
  messenger = 'seleccionar';
  document = '';

  constructor(private _shipments: ShipmentsService, private _messengers: MessengersService) { 
  }
  
  ngOnInit(): void {
    this.getAllShipments();
    this.getAllMessengers();    
  }

  assignMessenger(id: any, document: any): void{
    this.getAllMessengers();
    this.step = 1;
    this.id = id;
    this.document = document;
  }

  sendToMessenger(): void {

    this.accion = 'proccess';

    this._shipments.assignToShipments(this.id,this.messenger).subscribe((response)=>{
      setTimeout(()=>{
        this.accion = 'ok';
        setTimeout(()=>{
          this.accion = '';
        },3000)
      },2000)
    },error => {
      this.accion = 'fail';
    })


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
      this.listMessengers = [];
    })
  }

  selectShipments(latitud: any, longitud: any): void {
    this.latitud = latitud;
    this.longitud = longitud;    
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
