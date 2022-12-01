import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  constructor(private _documents: DocumentsService, private sanitizer: DomSanitizer) { }

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
      this.result = 'ok';
      this.reset();
      console.log(response);
      this.getAllDocuments();
    },error => {
      this.result = 'fail';
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
    }, 5000);

  }
  
  delete(id: any): void {
    if(confirm('Deseas eliminar este documento?')){
      this._documents.deleteDocuments(id).subscribe((response)=>{
        console.log(response);
        this.getAllDocuments();
      },error => {
        this.result = 'fail-delete';
      })
    }
  }

  downloadPDF(pdf: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "resultados.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  showPDF(pdf: string) {
    this.documentFile = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${pdf}`);
  }

}
