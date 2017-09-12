class NegociacaoService {
    
        /*obterNegociacoesDaSemana(cb){
            console.log("Importando negociações!");
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/negociacoes/semana');
    
            xhr.onreadystatechange = () => {*/
                /*
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição está concluída e a resposta está pronta
                */
                /*if(xhr.readyState==4){
                    if(xhr.status==200){
                        console.log("Obtendo negociações do servidor!");
                        //console.log(JSON.parse(xhr.responseText));
                        cb(null, JSON.parse(xhr.responseText)
                            .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                            //.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
                        //this._mensagem.texto = "Negociações importadas com sucesso!";
                    } else {
                        console.log(xhr.responseText);
                        //this._mensagem.texto = "Não foi possível obter as negociações da semana!";
                        cb("Não foi possível obter as negociações da semana!");
                    }
                }
            };
    
            xhr.send();
        }

    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject)=> {
            console.log("Importando negociações!");
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/negociacoes/semana');
    
            xhr.onreadystatechange = () => {
                /*
                0: requisição ainda não iniciada
                1: conexão com o servidor estabelecida
                2: requisição recebida
                3: processando requisição
                4: requisição está concluída e a resposta está pronta
                */
               /* if(xhr.readyState==4){
                    if(xhr.status==200){
                        console.log("Obtendo negociações do servidor!");
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    } else {
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana!");
                    }
                }
            };
    
            xhr.send();
        });
        
    }*/

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject)=> {
            this._http.get('/negociacoes/semana')
            .then( negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana!");
            });
        });
    }


    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject)=> {
            this._http.get('/negociacoes/anterior')
            .then( negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana anterior!");
            });
        });
    }
    
    
    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject)=> {
            this._http.get('/negociacoes/retrasada')
            .then( negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana retrasada!");
            });
        });
    }    

}