import { Component, Input, VERSION } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { User } from './shared/user';
import { UserStoreService } from './shared/user-store.service';
import { Vaccination } from './shared/vaccination';

@Component({
  selector: 'is-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() user: User;
  public userId;
  constructor(
    public authService: AuthenticationService,
    private is_user: UserStoreService
  ) {}
  ngOnInit() {
    this.userId = Number.parseInt(localStorage.getItem('id'));
    this.is_user.getSingle(this.userId).subscribe(u => (this.user = u));
  }
}
