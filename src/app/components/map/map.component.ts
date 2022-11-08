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
  latlngs: any;

  private map: any;
  private template = '';
  private select_t = '';
  private identification = '';
  private id = 0;
  private delivery = 0;

  private initMap(): void {
    this.map = L.map('map', {
      center: [18.476595094005752, -69.96001989489487],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }

  constructor(protected _shipments: ShipmentsService) { }

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      // setInterval(()=>{
      this.myUbication();

      // },3000)
    }, 4000);
  }

  selectedShipment(): void {
    L.marker([this.latitud, this.longitud],
      { alt: 'Kyiv' }).addTo(this.map); // "Kyiv" is the accessible name of this marker
    // .bindPopup(`<center>
    // <img src="../../../assets/img/messenger.svg" width="80%">
    // ${this.select_t }
    // <button class="btn btn-primary"><i class="fa-regular fa-moped"></i> Enviar mensajero</button>
    // </center>`);

    this.map.flyTo([this.latitud, this.longitud], 15);
  }

  myUbication(): void {
    L.marker([this.latitud, this.longitud], { alt: 'Kyiv' }).addTo(this.map);
    this.map.flyTo([this.latitud, this.longitud]);
  }

}
