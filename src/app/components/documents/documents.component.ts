import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';
import Swal from 'sweetalert2'
declare const $: any;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  identification = '';
  name = '';
  description = '';
  file: any = [];
  listDocuments: any[] = [];
  documentFile!: SafeResourceUrl;
  helper_: any;

  constructor(private _documents: DocumentsService, private sanitizer: DomSanitizer, private helper: HelperService) {
    this.helper_ = helper;
   }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(){
    this.loading = true;

    let role = localStorage.getItem('role');
    let method;
    let entity = localStorage.getItem('entity_id');

    if(role==="super_admin"){
      method = this._documents.getAllDocuments();
    }else{
      method = this._documents.getAllDocumentsByEntity(entity);
    }

    method.subscribe((response)=>{

      this.listDocuments = response.data;

      setTimeout(function(){
        $('#listDocuments').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listDocuments').DataTable();
    },100);
  }

  getFile(event: any){
    this.file = event.target.files[0];
  }

  reset(){
    this.identification = '';
    this.name = '';
    this.description = '';
    this.file = [];
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("user_id", `${localStorage.getItem('user_id')}`);
    datos.append("entity_id", `${localStorage.getItem('entity_id')}`);
    datos.append("identification",this.identification);
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("file",this.file);

    this._documents.setDocuments(datos).subscribe((response)=>{
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Guardado correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.reset();
      this.getAllDocuments();
    },error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Problemas tecnicos!',
        text: 'No se pudo completar el registro, favor intente nuevamente.',
        showConfirmButton: false,
        timer: 2000
      });
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
    }, 5000);

  }
  
  delete(id: any): void {
    Swal.fire({
      title: 'Deseas eliminar este documento?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

      this._documents.deleteDocuments(id).subscribe((response)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eliminado correctamente!',
          showConfirmButton: false,
          timer: 2000
        });
        this.getAllDocuments();
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Problemas tecnicos!',
          text: 'No se pudo completar el registro, favor intente nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      })
    
      }
    })

  }

  downloadPDF(pdf: string) {
    const downloadLink = document.createElement("a");
    const fileName = "resultados.pdf";

    downloadLink.href = this.helper.getUrlForDocument(pdf);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  showPDF(pdf: string) {
    this.documentFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getUrlForDocument(pdf));
  }

}
