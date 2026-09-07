import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputContainerComponent } from "../input-container/input-container";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule ,FormControl} from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.html',
  styleUrls: ['./text-input.css'],
  imports: [InputContainerComponent,ReactiveFormsModule]
})
export class TextInputComponent implements OnInit {
@Input()
control!:AbstractControl;
@Input()
showErrorsWhen:boolean = true;
@Input()
label!: string;
@Input()
type: 'text' | 'password' | 'email' = 'text';

get formControl(){
  return this.control as FormControl;
}
  constructor() { }

  ngOnInit(): void {
  }

}