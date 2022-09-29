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
  step = 0;
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
    this.document = document;
  }

  sendToMessenger(): void {

    // this.loading = true;
    // let datos = new FormData();
    // datos.append("identification",this.identification);
    // datos.append("role",this.role);
    // // datos.append("file",this.file);

    // this._users.setUsers(datos).subscribe((response)=>{
    //   this.loading = false;
    //   this.result = 'ok';
    //   this.reset();
    //   console.log(response);
    //   this.getAllUsers();
    // },error => {
    //   this.result = 'fail';
    //   this.loading = false;
    // })


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
