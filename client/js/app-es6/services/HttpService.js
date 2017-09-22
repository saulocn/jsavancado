export class HttpService{


    _handleErrors(res){
        if(!res.ok) throw new Error(res.statuText);
        return res;
    }


    get(url){
        return fetch(url)
        .then(res => this._handleErrors(res))
        .then(res => res.json());
    }
    
    post(url, dado) {
        return fetch(url, {
            headers : {'Content-Type':'application/json'},
            method : 'post',
            body : JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));
    }
}