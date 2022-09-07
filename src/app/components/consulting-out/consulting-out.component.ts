import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';

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

  constructor(private _documents: DocumentsService) { }

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

}
