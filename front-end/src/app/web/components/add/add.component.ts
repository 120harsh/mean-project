import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddService } from './add.service';

@Component({
  selector: 'app-add',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  form!:FormGroup;

  constructor(private fb:FormBuilder,private addService:AddService) { }
  ngOnInit(): void {
    this.createForm();
  }


  createForm(){
    this.form = this.fb.group({
      full_name: ['',Validators.required],
      mobile_no: ['',Validators.required],
      age: ['',Validators.required],
      dob: ['',Validators.required],
      address: ['',Validators.required],
      email: ['',Validators.required],
      profile:['',Validators.required],
    });
  }

}
