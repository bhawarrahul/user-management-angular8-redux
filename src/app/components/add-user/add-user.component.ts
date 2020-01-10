import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../models/User";
import { TranslateService } from "@ngx-translate/core";
import { TRANSLATE_DEFAULT_LANG, ADD_USER } from "src/app/utils/Constants";
import { UserAppState } from "src/app/state/action/user.app.state";
import { Store } from "@ngrx/store";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  public userForm: FormGroup;
  constructor(
    private translate: TranslateService,
    private store: Store<UserAppState>,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    translate.setDefaultLang(TRANSLATE_DEFAULT_LANG);
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl("", [Validators.required]),
      name: new FormControl(""),
      address: new FormControl(""),
      contact: new FormControl("")
    });
  }
  public createUser = userFormValue => {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  };
  private executeUserCreation = userFormValue => {
    this.store.dispatch({
      type: ADD_USER,
      payload: <User>{
        id: userFormValue.id,
        name: userFormValue.name,
        address: userFormValue.address,
        contact: userFormValue.contact,
        deleted: userFormValue.deleted
      }
    });
  };
  onCancel() {
    this.dialogRef.close();
  }
}
