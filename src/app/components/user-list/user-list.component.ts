import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import { User } from "../models/User";
import { USER_LIST } from "src/app/common/user-static-data";
import { element } from "protractor";
import { TranslateService } from "@ngx-translate/core";
import {
  TRANSLATE_DEFAULT_LANG,
  EDIT_UER,
  ADD_USER
} from "src/app/utils/Constants";
import { Observable } from "rxjs";
import { UserAppState } from "src/app/state/action/user.app.state";
import { Store } from "@ngrx/store";
import { AddUserComponent } from "../add-user/add-user.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  displayedColumns = [
    "id",
    "name",
    "address",
    "contact",
    "deleted",
    "edit",
    "delete"
  ];
  dataSource: MatTableDataSource<User[]>;
  user: Observable<User[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private translate: TranslateService,
    private store: Store<UserAppState>,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang(TRANSLATE_DEFAULT_LANG);
    this.store.select("user").subscribe(data => {
      if (this.dataSource && this.dataSource.data && data && data.length > 0) {
        var action = this.store.select("user")["actionsObserver"]._value;
        var userData = action.payload;
        var actionType = action.type;
        if (actionType == ADD_USER) {
          if (USER_LIST.indexOf(userData) < 0) {
            USER_LIST.push(userData);
          }
        } else if (actionType == EDIT_UER) {
          USER_LIST.forEach(childObj => {
            if (userData.id == childObj.id) {
              var indexNumber = USER_LIST.indexOf(childObj);
              if (indexNumber != -1) {
                USER_LIST.splice(indexNumber, 1, userData);
                // USER_LIST.push(userData);
              }
            }
          });
        }
        this.dataSource.data = USER_LIST;
        this.paginator.length = USER_LIST.length;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = USER_LIST;
    this.paginator.length = USER_LIST.length;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addButton() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "70vh",
      data: {
        isEdit: false
      }
    });
  }
  editButton(element) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "70vh",
      data: {
        isEdit: true,
        user: {
          id: element.id,
          name: element.name,
          address: element.address,
          contact: element.contact,
          deleted: false
        }
      }
    });
  }
  deleteButton(element) {
    this.openDialog(element);
  }
  openDialog(element): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "60vh",
      height: "30vh",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action == "YES") {
        var indexNumber = USER_LIST.indexOf(element);
        if (indexNumber != -1) {
          USER_LIST.splice(indexNumber, 1);
          this.dataSource.data = USER_LIST;
          this.paginator.length = USER_LIST.length;
        }
      }
    });
  }
}
