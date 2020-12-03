import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudComponent } from './pages/crud/crud.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OlvideComponent } from './pages/olvide/olvide.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { ImagepipePipe } from './pipes/imagepipe.pipe';
 
// CommonJS
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CrudComponent,
    NegociosComponent,
    OlvideComponent,
    NegocioComponent,
    ImagepipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
