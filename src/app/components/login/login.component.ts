import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login-request';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
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
    private readonly dialog: DialogComponent, private shareDataService:ShareDataService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    const update = [this.username];
    this.shareDataService.updateDataAuthService(update);
  }

  login() {
    this.loginRequest = new LoginRequest(this.username, this.password);
    this.authService.login(this.loginRequest).subscribe({
      next: (response: any) =>  {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        this.username=response.username;
        this.updateData();
        this.router.navigate(['/product-list']);
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
      }
    });
  }

}
