
export class LocNidos{
	
	private fachada:boolean;
	private trasera:boolean;
	private latIzq:boolean;
	private latDer:boolean;
  private patio:boolean;






	//getters and setters

	public getFachada() {
    	return this.fachada
  	}

  public setFachada(value: boolean) {
    	this.fachada = value;
  	}

  public getTrasera() {
      return this.trasera
    }

  public setTrasera(value: boolean) {
      this.trasera = value;
    }

  public getLatIzq() {
      return this.latIzq
    }

  public setLatIzq(value: boolean) {
      this.latIzq = value;
    }

  public getLatDer() {
      return this.latDer
    }

  public setLatDer(value: boolean) {
      this.latDer = value;
    }

  public getPatio() {
      return this.patio
    }

  public setPatio(value: boolean) {
      this.patio = value;
    }

  	
}