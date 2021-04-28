import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import service
import { MemberService } from './member.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberGetComponent } from './member-get/member-get.component';
import { MemberEditorComponent } from './member-editor/member-editor.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberAddComponent,
    MemberGetComponent,
    MemberEditorComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
