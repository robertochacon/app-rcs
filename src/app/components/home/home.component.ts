import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginError = false;
  identification = "";
  password = "";
  loading = false;
  
  constructor(private _authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
    this.loading = false;
    this._authentication.login(this.identification,this.password).subscribe((response)=>{
      console.log(response);

      if(response !== undefined){

        this.loginError = false;
        localStorage.setItem("user", response.user);
        localStorage.setItem("token", response.token);
      
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 1000);

      }else{
        this.loginError = true;
      }

      this.loading = false;
    })
  }

}
