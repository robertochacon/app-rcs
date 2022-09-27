import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { ShipmentsService } from 'src/app/services/shipments.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() longitud: any;
  @Input() latitud: any;
  @Input() listMessengers: any;
  @Output() shipmentSelect = new EventEmitter();

  private map: any;
  private template  = '';
  private select_t  = '';
  private identification  = '';
  private id = 0;
  private delivery = 0;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 18.476595094005752, -69.96001989489487 ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    
    // this.listMessengers.map((item, index)=>{
    //   console.log(index, item);
      
    // });

  }

  constructor(protected _shipments: ShipmentsService) { }

  ngAfterViewInit(): void {
    this.initMap();

    setTimeout(()=>{

      this.select_t += `<select class="form-control mt-1 mb-1" [(ngModule)]="identification">`;
      this.listMessengers.map((item: any)=>{
        this.select_t += `<option value='${item.identification}' (click)="this.id = ${item.id}">${item.identification}</option>`;
        // this.select_t += `<option value='${item.identification}' (click)="assign_messenger(${item.id},${item.identification})">${item.identification}</option>`;
      })
      this.select_t += ` </select>`;

    },3000);

  }

  assign_messenger(): void {
    console.log(this.id);
    
    // assign_messenger(id: number, delivery: any): void {
    // this._shipments.assignToShipments(id,delivery).subscribe((response)=>{
    //   if(confirm('Deseas eliminar este envio?')){
    //       console.log(response);
    //   }
    // },error => {
    //   console.log('error');
      
    // })
  }

  selectedShipment(): void {
    L.marker([this.latitud, this.longitud],
      {alt: 'Kyiv'}).addTo(this.map) // "Kyiv" is the accessible name of this marker
      .bindPopup(`<center>
      <img src="../../../assets/img/messenger.svg" width="80%">
      ${this.select_t }
      <button class="btn btn-primary" (click)="${this.assign_messenger()}"><i class="fa-regular fa-moped"></i> Enviar mensajero</button>
      </center>`);

    this.map.flyTo([this.latitud, this.longitud], 15);
  }

}
