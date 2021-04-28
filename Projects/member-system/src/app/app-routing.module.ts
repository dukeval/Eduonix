import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  } from '@angular/forms';

import { MemberAddComponent} from './member-add/member-add.component';
import { MemberEditorComponent} from './member-editor/member-editor.component';
import { MemberGetComponent} from './member-get/member-get.component';
import { NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
  path:'members',
  component:MemberGetComponent},
  
  {
    path:'member/create',
    component:MemberAddComponent},{
    path:'member/edit/:id',
      component:MemberEditorComponent},
      {path:'404', component:NotFoundComponent},
    {path:'**', redirectTo:'/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
