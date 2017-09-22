export class ListaNegociacoes {

    constructor(){
        this._negociacoes = [];
        //this._armadilha = armadilha;
        //this._contexto = contexto;
    }

    adiciona(negociacao){
        
        //this._negociacoes = [].concat(this._negociacoes, negociacao);
        this._negociacoes.push(negociacao);
        //this._armadilha(this);
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
       // this._armadilha(this);
       //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    
    inverteOrdem() {
        this._negociacoes.reverse();
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }
}