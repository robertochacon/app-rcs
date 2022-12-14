import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.css']
})
export class ConsultingComponent implements OnInit {
  identification = "";
  listDocuments: any[] = [];
  loading = false;
  step = 1;
  session = false;
  result = '';
  location = false;
  documentFile!: SafeResourceUrl;

  constructor(private _documents: DocumentsService, private sanitizer: DomSanitizer) { }

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
