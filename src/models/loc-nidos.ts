
export class LocNidos{
	
	private fachada:boolean;
	private trasera:boolean;
	private latIzq:boolean;
	private latDer:boolean;
  private patio:boolean;
  private usuario: string;
  private lat:any;
  private lon:any;





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

  public getUsuario() {
      return this.usuario
    }

  public setUsuario(value: string) {
      this.usuario = value;
    }

  public getLat() {
      return this.lat
    }

  public setLat(value: any) {
      this.lat = value;
    }

  public getLon() {
      return this.lon
    }

  public setLon(value: any) {
      this.lon = value;
    }  	


     toString() {
    var toRet = '';
    let key: any;
    for (key in this) {
      if (typeof this[key] !== 'function') {
        toRet += key + " => " + this[key] + "\n";
      }
    }
    return toRet;
  }
}