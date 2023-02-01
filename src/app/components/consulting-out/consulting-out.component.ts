import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';

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
  documentFile!: SafeResourceUrl;
  entity_id_modal: any;
  helper_: any;

  constructor(private _documents: DocumentsService, private _shipments: ShipmentsService, private sanitizer: DomSanitizer, private helper: HelperService) { 
    this.helper_ = helper;
  }

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

  setIdentification(entity_id: any): void{
    this.entity_id_modal = entity_id;
  }

  getLocation(): void{
    this.status = 'location'
    
    if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);

        if(position){

            this.latitudInput = position.coords.latitude;
            this.longitudInput = position.coords.longitude;
            this.save(this.entity_id_modal);
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

  save(entity_id: any): void {

    this.status = 'enviando';

    this.loading = true;
    let datos = new FormData();
    datos.append("entity_id",entity_id);
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

  downloadPDF(pdf: any) {
    const downloadLink = document.createElement("a");
    const fileName = "resultados.pdf";

    downloadLink.href = this.helper_.getUrlForDocument(pdf);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  showPDF(pdf: string) {
    this.documentFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getUrlForDocument(pdf));
  }

}
