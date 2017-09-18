//function tmp() {
var ConnectionFactory = (function () {
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor(){
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }


        static getConnection(){
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open('aluraframe' , 4);
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if(!connection){
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        //close = connection.close;
                        connection.close = function() {
                            throw new Error('Não se pode fechar diretamente essa conexão!');
                        } 
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };

            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                connection.createObjectStore(stores, {autoIncrement:true});
            });
        }

        static closeConnection(){
            if(connection){
                close();
                // Reflect.apply(close, connection, []);
                connection = null;
            }
        }
    }

})();
//var ConnectionFactory = tmp();