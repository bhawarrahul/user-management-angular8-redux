import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";

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
  MAT_DIALOG_DATA
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddUserComponent } from "./add-user.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";
import { Store } from "@ngrx/store";
import { DebugElement } from '@angular/core';

describe("AddUserComponent", () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let translate: TranslateService;
  const testStore = jasmine.createSpyObj("Store", ["select"]);
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [AddUserComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: Store, useValue: testStore }
      ]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should create add user Form element", () => {
    const node = debugElement.childNodes[0];
    expect(node['name']).toEqual('form');
  });
});
