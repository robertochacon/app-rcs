import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  @Input() page: string;
  role: any;

  constructor(private router: Router) {
    this.page='';
  }

  ngOnInit(): void {
    const session = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    if(!session || session === undefined){
      this.router.navigate(['/login']);
    }
  }

  salir(){
    if(confirm('Seguro que deseas salir?')){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

}
