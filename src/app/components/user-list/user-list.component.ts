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
import { TRANSLATE_DEFAULT_LANG } from "src/app/utils/Constants";
import { Observable } from "rxjs";
import { UserAppState } from "src/app/state/action/user.app.state";
import { Store } from "@ngrx/store";
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  displayedColumns = ["id", "name", "address", "contact", "deleted", "edit"];
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
        data.forEach(childObj => {
          if (USER_LIST.indexOf(childObj) < 0) {
            USER_LIST.push(childObj);
          }
        });
        this.dataSource.data = USER_LIST;
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
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addButton() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "80vh"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
  editButton(element) {
    window.alert("editbutton");
  }
}
