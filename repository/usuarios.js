/**
 * Define a repository of 'Usuários'
 */
var conn = require('./conn'), mongoose = require('mongoose'), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var usuarioModel = new Schema({
	nome : String,
	login : String,
	senha : String,
	dataNascimento : Date,
	cpf : String,
	registros :[{
		dataEHora : {
			type: 'Date',
			default: Date.now,
			unique: true
		},
		tipo : {
			type:String,
		default: 'Entrada',
		enum:['Entrada', 'Saida']
		},
		usuario : {
			type: ObjectId,
			ref: 'usuario',
			childPath:'registros'
		}
	}]
});

var Usuario = mongoose.model("usuario", usuarioModel, "usuarios");

module.exports = Usuario;
