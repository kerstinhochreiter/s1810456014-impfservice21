import { Component, VERSION } from "@angular/core";

@Component({
  selector: "is-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
}
