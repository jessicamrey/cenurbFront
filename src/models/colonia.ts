import {LocNidos} from './loc-nidos';


export class Colonia{
	
	private nombre:string;
	private nombreCentro:string;
	private ccaa:string;
	private provincia:string;
  private municipio:string;
  private barrio:string;
  private calleNumPiso:string;
  private tipoPropiedadId:string;
  private tipoEdificioId:string;
  private anno:number;
  private locNidos: LocNidos;
  private usuario: string;
  private especie: number;




	//getters and setters

	public getNombre() {
    	return this.nombre
  	}

  public setNombre(value: string) {
    	this.nombre = value;
  	}

  public getNombreCentro() {
      return this.nombreCentro
    }

  public setNombreCentro(value: string) {
      this.nombreCentro = value;
    }

  public getCcaa() {
      return this.ccaa
    }

  public setCcaa(value: string) {
      this.ccaa = value;
    }

  public getProvincia() {
      return this.provincia
    }

  public setProvincia(value: string) {
      this.provincia = value;
    }

  public getMunicipio() {
      return this.municipio
    }

  public setMunicipio(value: string) {
      this.municipio = value;
    }

  public getBarrio() {
      return this.barrio
    }

  public setBarrio(value: string) {
      this.barrio = value;
    }

  public getCalleNumPiso() {
      return this.calleNumPiso
    }

  public setCalleNumPiso(value: string) {
      this.calleNumPiso = value;
    }

  public getTipoPropiedad() {
      return this.tipoPropiedadId
    }

  public setTipoPropiedad(value: string) {
      this.tipoPropiedadId = value;
    }

  public getTipoEdificio() {
      return this.tipoEdificioId
    }

  public setTipoEdificio(value: string) {
      this.tipoEdificioId = value;
    }

  public getAnno  () {
      return this.anno
    }

  public setAnno(value: number) {
      this.anno = value;
    }

  public getLocNidos() {
      return this.locNidos
    }

  public setLocNidos(value: LocNidos) {
      this.locNidos = value;
    }

  public getUsuario() {
      return this.usuario
    }

  public setUsuario(value: string) {
      this.usuario = value;
    }

  public getEspecie() {
      return this.especie
    }

  public setEspecie(value: number) {
      this.especie = value;
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