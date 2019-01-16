import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoffeeInformationComponent } from './coffee-information/coffee-information.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CoffeeInformationComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule { }
