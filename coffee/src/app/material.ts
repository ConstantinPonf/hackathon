import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    imports: [MatTableModule, MatButtonModule, MatToolbarModule],
    exports: [MatTableModule, MatButtonModule, MatToolbarModule],
})
export class MaterialModule { }