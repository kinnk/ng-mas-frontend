import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy, OnInit{
  subscription: Subscription = new Subscription();

  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.subscription.add(
        this.auth.signin(this.validateForm.value).subscribe(
          (res) => {
            console.log('Login', res);
            this.router.navigate(['/main/dashboard'])
          },
          (error) => {
            console.log('Ошибка авторизации: ' + error.message);
            this.showMessage(error)
          }
        )
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showMessage(error: Error){
    alert(error.message)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registred']){
        alert("Пользователь зарегестрирован!")
      }else if(params['accessDenied']){
        alert("Для доступа необходимо авторизоваться!")
      }
    })
  }

}
