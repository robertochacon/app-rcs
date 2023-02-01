import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelperService } from '../../services/helper.service';

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
  helper_: any;
  InfoGeneral: any;
  documentFileIframe!: SafeResourceUrl;


  constructor(private _documents: DocumentsService, private sanitizer: DomSanitizer, private helper: HelperService) { 
    this.helper_ = helper;
  }

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

  details(json: any){
    this.InfoGeneral = json;
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
    const downloadLink = document.createElement("a");
    const fileName = "resultados.pdf";

    downloadLink.href = this.helper_.getUrlForDocument(pdf);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  showPDF(pdf: string) {
    this.documentFileIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getUrlForDocument(pdf));
  }

}
