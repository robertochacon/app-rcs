import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { UsersService } from 'src/app/services/users.service';
declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  step = 1;
  action = 'list';
  loading = false;
  loadData = false;
  result = '';
  name = '';
  identification = '';
  role = 'admin';
  entity:any = 'seleccionar';
  listUsers: any[] = [];
  listEntities: any[] = [];

  constructor(private _users: UsersService, private _entities: EntitiesService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllEntities();
  }

  getAllUsers(){
    this.loading = true;

    this._users.getAllUsers().subscribe((response)=>{

      this.listUsers = response.data;

      setTimeout(function(){
        $('#listUsers').DataTable();
      },100);
      this.loading = false;
      
    }, error=>{
        this.loadData = false;
        this.loading = false;
    })

  }

  getAllEntities(){
    this._entities.getAllEntities().subscribe((response)=>{
      this.listEntities = response.data;
      console.log(this.listEntities);
    }, error=>{
      // this.listMessengers = [];
    })
  }

  reset(){
    this.name = '';
    this.identification = '';
    this.role = '';
  }
  
  save(): void {

    this.loading = true;
    let datos = new FormData();
    datos.append("entity",this.entity);
    datos.append("name",this.name);
    datos.append("identification",this.identification);
    datos.append("role",this.role);
    // datos.append("file",this.file);

    this._users.setUsers(datos).subscribe((response)=>{
      this.loading = false;
      this.result = 'ok';
      this.reset();
      console.log(response);
      this.getAllUsers();
    },error => {
      this.result = 'fail';
      this.loading = false;
    })

    setTimeout(() => {
      this.result = '';
      this.step = 2;
    }, 5000);

  }
  
  delete(id: any): void {
    if(confirm('Deseas eliminar este usuario?')){
      this._users.deleteUsers(id).subscribe((response)=>{
        console.log(response);
        this.getAllUsers();
      },error => {
        this.result = 'fail-delete';
      })
    }
  }


}
