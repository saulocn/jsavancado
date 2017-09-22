export class DateHelper {

    constructor(){
        throw new Error("A classe DateHelper não pode ser inicializada!");
    }
    
    static dataParaTexto(data){    
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto){
        if(/\d{2}\/\d{2}\/\d{4}/.test(texto)){
            return new Date(...texto.split('/').reverse().map((item, indice) => item - indice % 2));
        } else if(/\d{4}-\d{2}-\d{2}/.test(texto)){
            return new Date(...texto.split('-').map((item, indice)=> item - indice % 2));
        } else {
            throw new Error('Deve estar no formato aaaa-mm-dd ou dd/mm/aaaa');
        }        
    }

}