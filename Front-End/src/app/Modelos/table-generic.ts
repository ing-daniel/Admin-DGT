export class TableGeneric {
    public columnas: Array<string>;
    public titulos: Array<string>;
    public rutasHTML: any;
    public controlador: string;
    public tituloLista: string;
    public acciones: Array<any>;
    public listado: Array<any>;
    public mostrarOpciones:boolean;
    public mostrarBtnAtras:boolean;

    public constructor( data: any = {}) {
        this.columnas = data.columnas || new Array<string>();
        this.titulos = data.titulos || new Array<string>();
        this.rutasHTML = data.rutasHTML || {};
        this.controlador = data.controlador || '';
        this.tituloLista = data.tituloLista || '';
        this.acciones = data.acciones || [];
        this.listado = data.listado || [];
        this.mostrarOpciones = data.mostrarOpciones || true;
        this.mostrarBtnAtras = data.mostrarBtnAtras || false;
    }   

}

