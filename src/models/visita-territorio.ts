
export class VisitaTerritorio{
	
	private usuario:string;
  private fecha: any;
  private hora: any;
  private huso: string;
  private observacionId:number;
  private lat:any;
  private lon:any;

	//getters and setters

 public getObservacionId() {
      return this.observacionId
    }

  public setObservacionId(value: number) {
      this.observacionId = value;
    }


   public getHuso() {
      return this.huso
    }

  public setHuso(value: string) {
      this.huso = value;
    }


   public getHora() {
      return this.hora
    }

  public setHora(value: any) {
      this.hora = value;
    }


  public getUsuario() {
      return this.usuario
    }

  public setUsuario(value: string) {
      this.usuario = value;
    }



  public getfecha() {
      return this.fecha
    }

  public setFecha(value: any) {
      this.fecha = value;
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