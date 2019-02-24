import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router,
    private _authService: AuthenticationService) {
}

ngOnInit(): void {
    //Helpers.setLoading(true);
    // reset login status
    this._authService.logout();
    this._router.navigate(['/login']);
}

}
