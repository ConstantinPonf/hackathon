import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [MatTableModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule],
    exports: [MatTableModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule],
})
export class MaterialModule { }