class NegociacaoController{
  
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;
        this._ordemAtual = '';

        //this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia','ordena', 'inverteOrdem'
        );

        //this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        
        /*this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
            this._negociacoesView.update(model)
        });
        this._listaNegociacoes = new ListaNegociacoes( model => this._negociacoesView.update(model));
        this._listaNegociacoes = new ListaNegociacoes();
        */

        /*this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'], 
            model => this._negociacoesView.update(model)
        );

        //this._negociacoesView.update(this._listaNegociacoes);
        //this._mensagem = new Mensagem();*/
        /*this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model)
        );
        //this._mensagemView.update(this._mensagem);*/
    }

    importaNegociacoes(){
        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(), 
            service.obterNegociacoesDaSemanaAnterior(), 
            service.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações da semana obtidas com sucesso!";
        })
        .catch(erro => this._mensagem.texto = erro);

        /*
        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações da semana obtidas com sucesso!";
            })
            .catch(erro => this._mensagem.texto = erro);
        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociações da semana obtidas com sucesso!";
            })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaRetrasada()
        .then(negociacoes => {
            negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações da semana obtidas com sucesso!";
        })
        .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemana((erro, negociacoes)=>{
            if(erro){
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes)=>{
                if(erro){
                    this._mensagem.texto = erro;
                    return;
                }
                negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
                
            
                    
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes)=>{
                    if(erro){
                        this._mensagem.texto = erro;
                        return;
                    }
                    negociacoes.forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = "Negociações importadas com sucesso!";
                });
            });
        });*/
        


                
       

    }

    adiciona(event) {
        event.preventDefault();
        //let data = new Date(this._inputData.value.split('-'));
        //let data = new Date(this._inputData.value.replace(/-/g, ","));
       /* let arrDate = this._inputData.value.split('-');
        let ano = arrDate[0];
        let mes = arrDate[1];
        let dia = arrDate[2];
        let data = new Date(ano, mes-1, dia);*/
        //console.log(this._listaNegociacoes.negociacoes);
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();
        this._mensagem.texto = "Negociação adicionada com sucesso!";
        //this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao(){
      return  new Negociacao(DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }
  _limpaFormulario(){
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0.0;
      this._inputData.focus();
  }

  apaga(){
      this._listaNegociacoes.esvazia();
      this._mensagem.texto = "Lista de negociações apagada!";
      //this._mensagemView.update(this._mensagem);
  }


  ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }
}