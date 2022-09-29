import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-messengers-shipments',
  templateUrl: './messengers-shipments.component.html',
  styleUrls: ['./messengers-shipments.component.css']
})
export class MessengersShipmentsComponent implements OnInit {


  latitud:any;
  longitud:any;
  status: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLocation();
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

  salir(){
    if(confirm('Seguro que deseas salir?')){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

}
