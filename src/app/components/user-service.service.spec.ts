import { TestBed } from "@angular/core/testing";

import { UserServiceService } from "./user-service.service";
import { HttpClientModule, HttpRequest } from "@angular/common/http";
import { Users, User } from "./models/User";
import { BASE_URL } from "../utils/Config";
import {
  HttpTestingController,
  HttpClientTestingModule,
  RequestMatch
} from "@angular/common/http/testing";

describe("UserServiceService", () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created UserService", () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    expect(service).toBeTruthy();
  });
  it("Able to retrive Users from API GET Method", () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    const dummyUsers: User[] = [
      {
        id: "1",
        name: "Hello World",
        address: "testing Angular",
        contact: "94324"
      },
      {
        id: "2",
        name: "Rahul Bhawar",
        address: "Pune",
        contact: "9561030556"
      }
    ];
    service.getAPIUser().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[0].name).toEqual(dummyUsers[0].name);
      expect(users).toEqual(dummyUsers);
    });
    const request = httpMock.expectOne(`${BASE_URL}/users`);
    expect(request.request.method).toBe("GET");
    request.flush(dummyUsers);
  });
  it("Able to Delete User from API Delete Method", () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    service.deleteUser("u001").subscribe(posts => {
      expect(posts).toEqual("User deleted successfully!");
    });
    const request = httpMock.expectOne(`${BASE_URL}/users/u001`);
    expect(request.request.method).toBe("DELETE");
  });

  it("Able to Create User from API POST Method", () => {
    const service: UserServiceService = TestBed.get(UserServiceService);
    const dummyUser: Users = {
      userId: "2",
      name: "Rahul Bhawar",
      address: "Pune",
      contact: "9561030556",
      deleted: false
    };
    service.createUser(dummyUser).subscribe(user => {
      expect(user).toEqual("User Added successfully");
    });
    // const req = httpMock.expectOne(`${BASE_URL}/users`);
    const req = httpMock.match((request: HttpRequest<any>) => {
      return (
        request.method === "POST" &&
        request.url === `${BASE_URL}/users` &&
        request.body === JSON.stringify(dummyUser) &&
        request.headers.get("Content-Type") === "application/json"
      );
    });
  });
});
