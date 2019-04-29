export class Automovilista {
    public id : string;
    public nombre : string;
    public apellidos : string;
    public puntos : number;

    //public List<AutoAutomivilista> AutosAutomivilistas { get; set; }
    public constructor( data: any = {}) {
        this.id = data.id || '' ;
        this.nombre = data.nombre || '' ;
        this.apellidos = data.apellidos || '' ;
        this.puntos = data.puntos || 0 ;
    } 
}
