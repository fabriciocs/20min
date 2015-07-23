/**
 * Define a repository of 'Usuários'
 */
var conn = require('./mysqlConn');
var Sequelize = require('sequelize');

var Usuario = conn.define('sis_usuario', {
	usrCodigo:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		field: 'usr_codigo'
	},
	usrNome : {
		type: Sequelize.STRING(50),
		field: 'usr_nome'
	},
	usrLogin:{
		type: Sequelize.STRING(12),
		field: 'usr_login'
	},
	usrEmail:{
		type: Sequelize.STRING(50),
		field: 'usr_email'
	}, 
	usrSenha:{
		type: Sequelize.STRING(255),
		field: 'usr_senha'
	},
	usrStatus:{
		type: Sequelize.ENUM('1','2','3'),
		field: 'usr_status'
	},
	usrSetor:{
		type:Sequelize.STRING(50),
		field: 'usr_setor'
	},
	usrRestringirRegistroProprio:{
		type:Sequelize.STRING(50),
		field: 'usr_restringirRegistroPropio'
	}
},{
	freezeTableName: true
});
module.exports = Usuario;
