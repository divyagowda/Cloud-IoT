import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule
  } from '@angular/material';
  import { NgModule } from '@angular/core';
  
  
  @NgModule({
    imports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatToolbarModule,
      MatTabsModule,
      MatTableModule,
      MatDividerModule,
      MatCardModule,
      MatSelectModule,
      MatDialogModule,
      MatSnackBarModule,
      MatSortModule
    ],
    exports: [
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatToolbarModule,
      MatTabsModule,
      MatTableModule,
      MatDividerModule,
      MatCardModule,
      MatSelectModule,
      MatDialogModule,
      MatSnackBarModule,
      MatSortModule
    ],
  })
  
  export class MaterialModule { }