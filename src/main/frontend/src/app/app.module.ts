import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
