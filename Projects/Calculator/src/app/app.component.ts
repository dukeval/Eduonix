import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';
  expression:string="";

  buttonClick(evt:any):void{
    this.expression = this.expression + evt.target.textContent;
  }

  performOperation():void{
    this.expression = `${this.expression} = ${eval(this.expression)}`;
  }

  clear():void{
    this.expression = "";
  }
}
