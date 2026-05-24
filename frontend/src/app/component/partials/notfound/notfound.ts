import { Component, Input } from '@angular/core';
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-notfound',
  imports: [NgIf, RouterLink],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {




  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Nothing Found"
@Input()
resetLinkText= "Reset"
@Input()
resetLinkRoute = "/"

}
