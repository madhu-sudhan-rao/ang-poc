import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  
  genders =['male', 'female']
  signupForm!: FormGroup;
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null)
      }),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.signupForm.setValue({
      'userData': {
        firstName: 'Madhu Sudhan',
        lastName: 'Pediredla'
      },
      'username': 'madhu',
      'email':'madhu@gmail.com',
      'gender': 'male',
      'hobbies':[]
    })
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
}
