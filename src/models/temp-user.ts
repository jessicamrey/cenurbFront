import {BaseModel} from './base-model';

export class TempUser extends BaseModel{
	
	private name:string;
	private lastName:string;
	private email:string;
	private phone:string;


	//getters and setters

	public getName() {
    	return this.name
  	}

  	public setName(value: string) {
    	this.name = value;
  	}

  	public getLastName() {
    	return this.lastName
  	}

  	public setLastName(value: string) {
    	this.lastName = value;
  	}

  	public getEmail() {
    	return this.email
  	}

  	public setEmail(value: string) {
    	this.email = value;
  	}

  	public getPhone() {
    	return this.phone
  	}

  	public setPhone(value: string) {
    	this.phone = value;
  	}
}