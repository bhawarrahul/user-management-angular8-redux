import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../models/User";
import { TranslateService } from "@ngx-translate/core";
import { TRANSLATE_DEFAULT_LANG, ADD_USER, EDIT_UER } from "src/app/utils/Constants";
import { UserAppState } from "src/app/state/action/user.app.state";
import { Store } from "@ngrx/store";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  public userForm: FormGroup;

  isEdituser: boolean = false;
  constructor(
    private translate: TranslateService,
    private store: Store<UserAppState>,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    translate.setDefaultLang(TRANSLATE_DEFAULT_LANG);
    if (data && data.isEdit) {
      this.isEdituser = data.isEdit;
    }
    this.userForm = new FormGroup({
      id: new FormControl("", [Validators.required]),
      name: new FormControl(""),
      address: new FormControl(""),
      contact: new FormControl("")
    });
    if (data && this.isEdituser) {
      this.userForm.controls.id.setValue(data.user.id);
      this.userForm.controls.id.disable();
      this.userForm.controls.name.setValue(data.user.name);
      this.userForm.controls.address.setValue(data.user.address);
      this.userForm.controls.contact.setValue(data.user.contact);
    }
  }

  ngOnInit() {}
  public createUser = userFormValue => {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  };
  private executeUserCreation = userFormValue => {
    this.store.dispatch({
      type: this.isEdituser ? EDIT_UER : ADD_USER,
      payload: <User>{
        id: this.isEdituser ? this.userForm.controls.id.value: userFormValue.id,
        name: userFormValue.name,
        address: userFormValue.address,
        contact: userFormValue.contact,
        deleted: false
      }
    });
    this.dialogRef.close();
  };
  onCancel() {
    this.dialogRef.close();
  }
}
