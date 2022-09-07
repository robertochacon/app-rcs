import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  @Input() page: string;

  constructor(private router: Router) {
    this.page='';
  }

  ngOnInit(): void {
    const session = localStorage.getItem('token');
    if(!session || session === undefined){
      this.router.navigate(['/login']);
    }
  }

  salir(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}