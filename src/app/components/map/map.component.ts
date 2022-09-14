import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() longitud: any;
  @Input() latitud: any;
  @Output() shipmentSelect = new EventEmitter();

  private map: any;

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

  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  selectedShipment(): void {
    L.marker([this.longitud, this.latitud],
      {alt: 'Kyiv'}).addTo(this.map) // "Kyiv" is the accessible name of this marker
      .bindPopup('<button class="btn btn-primary"><i class="fa-regular fa-moped"></i> Enviar mensajero</button>');

    this.map.flyTo([this.longitud, this.latitud], 6);
  }

}
