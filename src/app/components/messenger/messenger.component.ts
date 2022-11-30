import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessengersService } from 'src/app/services/messengers.service';
declare const $: any;

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})

export class MessengerComponent implements OnInit {
  action = 'list';
  step = 1;
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  phone = '';
  email = '';
  address = '';
  file: any = [];
  type_vehicle = 'motor';
  brand = '';
  license_plate = '';
  color = 'green';
  listMessengers: any[] = [];

  constructor(private _messengers: MessengersService) { }

  ngOnInit(): void {
    this.getAllMessengers();
  }

  getAllMessengers(){
    this.loading = true;

    let role = localStorage.getItem('role');
    let method;
    let entity = localStorage.getItem('entity_id');

    if(role==="super_admin"){
      method = this._messengers.getAllMessengers();
    }else{
      method = this._messengers.getAllMessengersByEntity(entity);
    }

    method.subscribe((response)=>{

      this.listMessengers = response.data;

      setTimeout(function(){
        $('#listMessengers').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  reloadDataTable(){
    setTimeout(function(){
      $('#listMessengers').DataTable();
    },100);
  }

  getFile(event: any){
    this.file = event.target.files[0];
  }

  reset(){
    this.name = '';
    this.identification = '';
    this.phone = '';
    this.address = '';
    this.email = '';
    this.file = [];
    this.type_vehicle = '';
    this.brand = '';
    this.license_plate = '';

  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("user_id", `${localStorage.getItem('user_id')}`);
    datos.append("entity_id", `${localStorage.getItem('entity_id')}`);
    datos.append("name",this.name);
    datos.append("identification",this.identification);
    datos.append("phone",this.phone);
    datos.append("email",this.email);
    datos.append("address",this.address);
    datos.append("file",this.file);
    datos.append("type_vehicle",this.type_vehicle);
    datos.append("brand",this.brand);
    datos.append("license_plate",this.license_plate);


    this._messengers.setMessengers(datos).subscribe((response)=>{
      this.loading = false;
      this.result = 'ok';
      this.reset();
      console.log(response);
      this.getAllMessengers();
    },error => {
      this.result = 'fail';
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
    }, 5000);

  }

  delete(id: any): void {
    if(confirm('Deseas eliminar este envio?')){
      this._messengers.deleteMessengers(id).subscribe((response)=>{
        console.log(response);
        this.getAllMessengers();
      },error => {
        this.result = 'fail-delete';
      })
    }
  }

}
