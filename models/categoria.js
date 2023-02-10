const{ Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombreCategoria:{
        type: String,
        required:[true,'el nombre de la categoria es obligatorio']
    },
    tipoCategoria:{
        type: String,
        required:[true,'el tipo de categoria es obligatorio']

    },
    password:{
        type: String,
        required:[true,'El password es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }


});

module.exports = model('Categoria', CategoriaSchema);
