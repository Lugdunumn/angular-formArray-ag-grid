import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ReusableTemplateComponent } from './reusable-template/reusable-template.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [AppComponent, HelloComponent, ReusableTemplateComponent],
  bootstrap: [AppComponent],
  entryComponents: [ReusableTemplateComponent],
})
export class AppModule {}
