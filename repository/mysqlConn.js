var Sequelize = require('sequelize');
var sequelize = new Sequelize('phdfortalezarvd', 'comercial', 'pgcadmin', {
	host: '192.7.1.106',
	dialect: 'mysql',
	define: {
		timestamps: false,
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports=sequelize;