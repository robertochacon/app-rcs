import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultingComponent } from './components/consulting/consulting.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { NavbarintoComponent } from './components/navbarinto/navbarinto.component';
import { LoginComponent } from './components/login/login.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ConsultingOutComponent } from './components/consulting-out/consulting-out.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { MapComponent } from './components/map/map.component';
import { EntitiesComponent } from './components/entities/entities.component';
import { UsersComponent } from './components/users/users.component';
import { MessengersShipmentsComponent } from './components/messengers-shipments/messengers-shipments.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultingComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    DocumentsComponent,
    NavbarintoComponent,
    LoginComponent,
    SubmenuComponent,
    ConsultingOutComponent,
    MessengerComponent,
    ShipmentsComponent,
    MapComponent,
    EntitiesComponent,
    UsersComponent,
    MessengersShipmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
