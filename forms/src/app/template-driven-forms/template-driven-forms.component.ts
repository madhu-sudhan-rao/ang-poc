import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss']
})
export class TemplateDrivenFormsComponent {
  @ViewChild('form') signupForm!: NgForm;

  suggestUserName(){
    const suggestedName = 'Superuser';
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: 'madhu@gmail.com'
      },
      secret: 'pet'
    })
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  // onSubmit(form: NgForm){
  //   console.log("Submitted!")
  //   console.log(form)
  // }

}
