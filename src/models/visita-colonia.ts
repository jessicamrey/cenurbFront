
export class VisitaColonia{
	
	private nombreUsuario:string;
	private usuario:string;
	private numNidos:number;
	private numNidosExito:number;
  private numNidosOcupados:number;
  private numNidosVacios: number;
  private fecha: any;
  private numVisita:number;






	//getters and setters

  public getUsuario() {
      return this.usuario
    }

  public setUsuario(value: string) {
      this.usuario = value;
    }

  public getNombreUsuario() {
      return this.nombreUsuario
    }

  public setNombreUsuario(value: string) {
      this.nombreUsuario = value;
    }

  public getNumNidos() {
      return this.numNidos
    }

  public setNumNidos(value: number) {
      this.numNidos = value;
    }

  public getNumNidosExito() {
      return this.numNidosExito
    }

  public setNumNidosExito(value: number) {
      this.numNidosExito = value;
    }

  public getNumNidosOcupados() {
      return this.numNidosOcupados
    }

  public setNumNidosOcupados(value: number) {
      this.numNidosOcupados = value;
    }
  	
  public getNumNidosVacios() {
      return this.numNidosVacios
    }

  public setNumNidosVacios(value: number) {
      this.numNidosVacios = value;
    }

  public getfecha() {
      return this.fecha
    }

  public setFecha(value: any) {
      this.fecha = value;
    }

  public getNumVisita() {
      return this.numVisita
    }

  public setNumVisita(value: number) {
      this.numVisita = value;
    }
}