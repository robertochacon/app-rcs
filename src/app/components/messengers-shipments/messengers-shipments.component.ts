import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ShipmentsService } from 'src/app/services/shipments.service';
declare const $: any;

@Component({
  selector: 'app-messengers-shipments',
  templateUrl: './messengers-shipments.component.html',
  styleUrls: ['./messengers-shipments.component.css']
})
export class MessengersShipmentsComponent implements OnInit {

  step = 1;
  latitud:any;
  longitud:any;
  status: any;
  envios = 0;
  listShipments: any[] = [];
  loading = false;
  active = false;

  constructor(private router: Router, private _shipments: ShipmentsService) { }

  ngOnInit(): void {
    this.getLocation();
    this.getAllShipments();
    // $('#modalEnvios').modal('show'); 
  }
  
  getLocation(): void{
    
    if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);

        if(position){
          this.status = 'ok'
            this.latitud = position.coords.latitude;
            this.longitud = position.coords.longitude;
            // this.save();
            console.log(this.latitud)
            console.log(this.longitud)
            console.log('Ok')
        }else{
          this.status = 'fail'
          console.log('Fallo')
        }

      });   
    }else{
      console.log('Error')
      this.status = 'fail'
    }

  }

  getAllShipments(){
    this.loading = true;

    let role = localStorage.getItem('role');
    let method;
    let entity = localStorage.getItem('entity_id');

    method = this._shipments.getAllShipmentsByEntity(entity);

    method.subscribe((response)=>{

      this.listShipments = response.data;
      this.envios = this.listShipments.length;

      setTimeout(function(){
        $('#listShipments').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loading = false;
    })

  }

  selectShipments(latitud: any, longitud: any): void {
    this.latitud = latitud;
    this.longitud = longitud;
    this.active = true;
  }

  setStatusShipments(id: any, status: any): void {

    localStorage.setItem("shipments", id);
    this._shipments.setStatusShipments(id, status).subscribe((response)=>{
      console.log(response);
    },error => {
      console.log('error');
    })

  }

  doneShipment(status: any): void {

    let shipment_id:any = localStorage.getItem("shipments");
    this._shipments.setStatusShipments(shipment_id, status).subscribe((response)=>{
      console.log(response);
      this.active = false;
      this.getAllShipments()
    },error => {
      console.log('error');
    })

  }

  salir(){
    if(confirm('Seguro que deseas salir?')){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

}
