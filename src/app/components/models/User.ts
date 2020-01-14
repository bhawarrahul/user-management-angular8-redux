
export class User {
  id: string;
  name?: string;
  address?: string;
  contact?: string;
  deleted?: boolean = false;
  constructor(id:string, name:string, address: string, contact:string, deleted:boolean) {
    this.id = id;
    this.name = name;
    this.address= address;
    this.contact = contact;
    this.deleted = deleted;
  }
}
export class Users {
  userId: string;
  name?: string;
  address?: string;
  contact?: string;
  deleted?: boolean = false;
}
