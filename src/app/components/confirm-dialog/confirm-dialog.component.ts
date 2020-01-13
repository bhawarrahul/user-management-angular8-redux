import { Component, OnInit, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TRANSLATE_DEFAULT_LANG } from "src/app/utils/Constants";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"]
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    translate.setDefaultLang(TRANSLATE_DEFAULT_LANG);
  }

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close({ action: "NO" });
  }
  onYesClick(): void {
    this.dialogRef.close({ action: "YES" });
  }
}
