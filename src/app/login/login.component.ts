import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  data: any = {};
  constructor( private _router: Router,
    //private _userService: UserService,
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigate([this.returnUrl]);
  }



  signin() {
    this.loading = true;
    this._authService.login(this.model).subscribe(
        data => {
            this.data = data['data'];
            console.log(this.data);
            localStorage.setItem('current_user', JSON.stringify(this.data));
            this._router.navigate([this.returnUrl]);
        },
        error => {
            //this.showAlert('alertSignin');
            //this._alertService.error(error["error"]["errors"]);
            this.loading = false;
        });
}

}
