import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [MatTableModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule, MatIconModule,
    MatDialogModule],
    exports: [MatTableModule, MatButtonModule, MatToolbarModule, MatProgressSpinnerModule, MatIconModule,
    MatDialogModule],
})
export class MaterialModule { }
