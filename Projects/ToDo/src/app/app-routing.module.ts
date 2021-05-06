import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ToDoComponent } from './to-do/to-do.component'
import { UserAccessComponent } from './user-access/user-access.component';

const routes: Routes = [
  {path:'', component:UserAccessComponent},
  {path:'register', component:RegisterComponent},
  {path:'todo', component:ToDoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
