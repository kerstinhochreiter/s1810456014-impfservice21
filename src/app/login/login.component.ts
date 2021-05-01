import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  constructor() {}
  
  ngOnInit() {}
  //sollte nacher so aussehen --> zwecks validierung
  /**ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["",[Validators.required, Validators.email]],
      password:["",Validators.required]
    });
  }*/
}
