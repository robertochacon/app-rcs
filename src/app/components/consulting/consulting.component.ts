import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.css']
})
export class ConsultingComponent implements OnInit {
  identification = "40237252669";
  listDocuments: any[] = [];
  loading = false;
  step = 1;
  session = false;

  constructor(private _documents: DocumentsService) { }

  ngOnInit(): void {
    const session = localStorage.getItem('token');
    if(session && session !== undefined){
      this.session = true
    }else{
      this.session = false
    }
  }

  search(){
    this.loading = true;
    this._documents.getDocuments(this.identification).subscribe((response)=>{
      console.log(response.data);
      this.listDocuments = response.data;
      this.loading = false;
      this.step = 2;
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
