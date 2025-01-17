import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTable
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list.component";
import {
  TranslateService,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HttpLoaderFactory } from "src/app/app.module";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { UserAppState } from "src/app/state/action/user.app.state";
import { User } from "../models/User";
import { DebugElement } from '@angular/core';

describe("UserListComponent", () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let translate: TranslateService;
  let debugElement: DebugElement;
  let element: HTMLElement;

  let store: MockStore<{ user: User[] }>;
  const initialState = { user: User };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [UserListComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    store = TestBed.get<Store<UserAppState>>(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should create mat-table component ", () => {
    const node = debugElement.childNodes[1]['childNodes'][0];
    expect(node.name).toEqual('mat-table');
  });
});
