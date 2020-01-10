import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TRANSLATE_DEFAULT_LANG } from "./utils/Constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "user-management";
  constructor(private translate: TranslateService) {
    translate.setDefaultLang(TRANSLATE_DEFAULT_LANG);
  }
}
