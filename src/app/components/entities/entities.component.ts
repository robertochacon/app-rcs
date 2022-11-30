import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
declare const $: any;

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  description = '';
  address = '';
  phone = '';
  file: any = [];
  listEntities: any[] = [];

  constructor(private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.getAllEntities();
  }

  getAllEntities(){
    this.loading = true;

    this._entities.getAllEntities().subscribe((response)=>{

      this.listEntities = response.data;

      setTimeout(function(){
        $('#listEntities').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listEntities').DataTable();
    },100);
  }

  getFile(event: any){
    this.file = event.target.files[0];
  }

  reset(){
    this.name = '';
    this.description = '';
    this.address = '';
    this.phone = '';
    this.file = [];
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("name",this.name);
    datos.append("description",this.description);
    datos.append("address",this.address);
    datos.append("phone",this.phone);
    datos.append("file",this.file);

    this._entities.setEntities(datos).subscribe((response)=>{
      this.loading = false;
      this.result = 'ok';
      this.reset();
      console.log(response);
      this.getAllEntities();
    },error => {
      this.result = 'fail';
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
    }, 5000);

  }
  
  delete(id: any): void {
    if(confirm('Deseas eliminar esta entidad?')){
      this._entities.deleteEntities(id).subscribe((response)=>{
        console.log(response);
        this.getAllEntities();
      },error => {
        this.result = 'fail-delete';
      })
    }
  }


}
