import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';
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

  constructor(private _documents: DocumentsService) { }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(){
    this.loading = true;

    this._documents.getAllDocuments().subscribe((response)=>{

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
    this._documents.deleteDocuments(id).subscribe((response)=>{
      if(confirm('Deseas eliminar este documento?')){
              console.log(response);
      this.getAllDocuments();
      }
    },error => {
      this.result = 'fail-delete';
    })
  }

}
