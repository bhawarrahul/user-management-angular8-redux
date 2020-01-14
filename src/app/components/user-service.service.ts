import { Injectable } from "@angular/core";
import { BASE_URL } from "../utils/Config";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User, Users } from "./models/User";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getAPIUser() {
    return this.http.get<User[]>(`${BASE_URL}/users`);
  }
  public createUser(user: Users) {
    return this.http.post(`${BASE_URL}/users/`, user);
  }
  public deleteUser(userId: string) {
    return this.http.delete(`${BASE_URL}/users/${userId}`);
  }
}
