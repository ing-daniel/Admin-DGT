export class Multa {
    public id : number;
    public descripcion : string;
    public puntosMenos : number;

    public constructor( data: any = {}) {
        this.id = data.id || null ;
        this.descripcion = data.descripcion || '' ;
        this.puntosMenos = data.puntosMenos || 0 ;
    } 
}
