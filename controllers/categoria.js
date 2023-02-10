const { response, request } = require('express');
const Categoria = require('../models/categoria');
const bcrypt = require('bcryptjs');

const getCategoria = async (req = request, res = response) => {
    
    const query = { estado: true };

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        msg: 'get Api = mostrar Categoria',
        listaCategoria
    });
}

const postCategoria = async (req = request, res = response) => {

    const { nombreCategoria, tipoCategoria,  password} = req.body;
    const categoriaGuardadoDB = new Categoria({ nombreCategoria, tipoCategoria, password });


    

    await categoriaGuardadoDB.save();


    // const{nombre, apellido, carnet}= req.body;
    // // const usuario = req.body;
    res.json({
        msg: 'post Api = post Categoria:',
        categoriaGuardadoDB
    });
}


const putCategoria = async (req = request, res = response) => {
    
    //req.params para ir a traer parametros de las rutas
    const { id } = req.params;
    const { _id, ...resto } = req.body;


    if (resto.password) {

        //encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);

    }

    //Editar al usuario por el id
    const categoriaEditado = await Categoria.findByIdAndUpdate(id, resto);



    res.json({
        msg: 'put Api = Editar User',
        id,
        categoriaEditado
    });
   
}

const deleteCategoria = async  (req = request, res = response) => {
    const {id} = req.params;

    //Eliminando fisicamente de la base de datos
    const categoriaEliminado = await Categoria.findByIdAndDelete(id)
    
    
    res.json({
        msg: 'delete Api = eliminando Categoria',
        categoriaEliminado
    })
}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}


