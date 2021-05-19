import { Component, Input, VERSION } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { User } from './shared/user';
import { UserStoreService } from './shared/user-store.service';
import { Vaccination } from './shared/vaccination';
import { VaccinationStoreService } from './shared/vaccination-store.service';

@Component({
  selector: 'is-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isadmin: boolean = false;
  @Input() user: User;
  vaccinations: Vaccination[];

  public userId;
  constructor(
    public authService: AuthenticationService,
    private is_user: UserStoreService,
    private is: VaccinationStoreService
  ) {}

  ngOnInit() {
    this.is.getAll().subscribe(res => (this.vaccinations = res));
    this.userId = Number.parseInt(localStorage.getItem('id'));
    this.is_user.getSingle(this.userId).subscribe(user => (this.user = user));
  }
}
