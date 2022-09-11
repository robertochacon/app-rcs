import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { ShipmentsService } from 'src/app/services/shipments.service';

@Component({
  selector: 'app-consulting-out',
  templateUrl: './consulting-out.component.html',
  styleUrls: ['./consulting-out.component.css']
})
export class ConsultingOutComponent implements OnInit {
  identification = "";
  listDocuments: any[] = [];
  loading = false;
  step = 1;
  session = false;
  result = '';
  status = '';
  latitudInput: any;
  longitudInput: any;
  time = '';
  note = '';

  constructor(private _documents: DocumentsService, private _shipments: ShipmentsService) { }

  ngOnInit(): void {
  }

  search(){
    this.loading = true;
    this._documents.getDocuments(this.identification).subscribe((response)=>{
      console.log(response);

      if(response.data.length >= 1){
        this.listDocuments = response.data;
        this.loading = false;
        this.step = 2;
      }else{
        this.result = 'noFound';
        this.loading = false;
      }

    },error=>{
      this.result = 'fail';
    })
  }

  getFile(file: string): string{
    let f = file.split("/");
    return `storage/${f[1]}/${f[2]}`;
  }

  getDate(date: string): string{
    let d = date.split(" ");
    return d[0];
  }

  back(){
    this.step = 1;
  }

  getLocation(): void{
    this.status = 'location'
    
    if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);

        if(position){

            this.latitudInput = position.coords.latitude;
            this.longitudInput = position.coords.longitude;
            this.save();
        }else{
          this.status = 'fail'
          this.status = ''
        }

      });   
    }else{
      console.log('No disponible')
      this.status = 'fail'
    }

  }

  save(): void {

    this.status = 'enviando';

    this.loading = true;
    let datos = new FormData();
    datos.append("identification",this.identification);
    datos.append("latitudInput",this.latitudInput);
    datos.append("longitudInput",this.longitudInput);
    datos.append("time",this.time);
    datos.append("note",this.note);

    this._shipments.setShipments(datos).subscribe((response)=>{
      this.loading = false;
      this.result = 'ok';
      this.status = 'enviado';
      // this.reset();
      console.log(response);
    },error => {
      this.result = 'fail';
      this.loading = false;
      this.status = 'fail';
    })

    setTimeout(() => {
      this.result = '';
      this.status = ''
    }, 5000);

  }

}
