import {BaseModel} from './base-model';
import {LocNidos} from './loc-nidos';


export class Colonia extends BaseModel{
	
	private nombre:string;
	private nombreCentro:string;
	private ccaa:string;
	private provincia:string;
  private municipio:string;
  private barrio:string;
  private calleNumPiso:string;
  private tipoProp:string;
  private tipoEd:string;
  private temporada:string;
  private locNidos: LocNidos;





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