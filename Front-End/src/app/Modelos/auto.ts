export class Auto {
    public id : string;
    public matricula : string;
    public marca : string;
    public modelo : string;
    public autosAutomivilistas: Array<any>;

    public constructor( data: any = {}) {
        this.id = data.id || '' ;
        this.matricula = data.matricula || '' ;
        this.marca = data.marca || '' ;
        this.modelo = data.modelo || '' ;
        this.autosAutomivilistas = data.autosAutomivilistas || null;
    }   
}
