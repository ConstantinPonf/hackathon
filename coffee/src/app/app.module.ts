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
import {MatDialogModule, MatIconModule} from '@angular/material';
import {ChipScannedService} from './shared/chipScanned-service';

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
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    HttpService,
    ChipScannedService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule { }
