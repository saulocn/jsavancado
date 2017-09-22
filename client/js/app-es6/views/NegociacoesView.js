import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';


export class NegociacoesView extends View {
    
    constructor(elemento){
        super(elemento);
        elemento.addEventListener('click', event => {
            if(event.target.nodeName == 'TH') 
                currentInstance().ordena(event.target.textContent.toLowerCase);
            console.log(event.target.textContent.toLowerCase);
        });
    }

    _template (model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map(n => `

                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>
                    
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan='3'></td>
                <td>${model.negociacoes.reduce((total, n) => total+n.volume, 0.0)
                    /*(function(){
                        let total = 0;
                        model.negociacoes.forEach(n => total += n.volume);
                        return total;
                    })()*/
                }</td>
            </tfoot>
        </table>
        `;
    }
}