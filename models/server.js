const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categoria';
        this.coneccionDB();
        this.middlewares();

        this.routes();


    }

    async coneccionDB() {
        await dbConection();

    }

    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use(  express.static('public') );

    }


    routes(){
       this.app.use( this.categoriaPath, require('../routes/categoria') );
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        } )
    }


}


module.exports = Server;