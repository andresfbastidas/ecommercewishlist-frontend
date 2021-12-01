import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login-request';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogComponent } from '../notification/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  loginRequest!: LoginRequest;
  constructor(private authService: AuthService, private readonly router: Router,
    private readonly dialog: DialogComponent) { }

  ngOnInit(): void {
  }

  login() {
    this.loginRequest = new LoginRequest(this.username, this.password);
    this.authService.login(this.loginRequest).subscribe((response: any) => {
      this.router.navigate(['/product-list']);
    }, error => {
      this.dialog.show({
        title: "Error",
        content: this.dialog.formatError(error),
        type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(error)}`
      });
    }
    );
  }

}
