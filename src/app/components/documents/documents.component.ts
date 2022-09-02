import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  action = 'list';
  loading = false;
  result = '';
  identification = '';
  name = '';
  description = '';
  file: any = [];

  constructor(private _documents: DocumentsService) { }

  ngOnInit(): void {
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
    },error => {
      this.result = 'fail';
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
    }, 5000);

  }

}
