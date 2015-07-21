var express = require('express');
var router = express.Router();
var Usuario = require('../repository/usuarios');

router.get('/last/:user_id', function(req, res, next) {
	Usuario.findOne({_id:req.params.user_id}, {registros:1}, function(err, data) {
		if (err) {
			console.error(err);
		}
		if(data.registros.length > 0){			
			console.log(data.registros);
			res.json(data.registros[0]);
		}else{
			res.json({});
		}
	}).sort({'registro.dataEHora':-1});
});
router.get('/lasttipo/:user_id', function(req, res, next) {
	Usuario.findOne({_id:req.params.user_id}, {registros:1}, function(err, data) {
		if (err) {
			console.error(err);
		}
		if(data.registros.length > 0){			
			console.log(data.registros);
			res.json({tipo:data.registros[0].tipo});
		}else{
			res.json({});
		}
	}).sort({'registro.dataEHora':-1});
});
router.get('/:user_id', function(req, res, next) {
	Usuario.findOne({_id:req.params.user_id}, {registros:1}).populate('registros').exec(function(err, data) {
		if (err) {
			console.error(err);
		}
		res.json(data.registros);
	});
});


router.get('/:user_id/:id', function(req, res, next) {
	var id = req.params.id;
	Usuario.findOne({_id:req.params.user_id, 'registros.id':id}, {registros:1}, function(err, data) {
		if (err) {
			console.log(err);
		}
		res.json(data.registros[0]);
	});
});

router.delete('/:user_id/:dataEHora', function(req, res, next) {
	var id = req.params.id;
	console.log(new Date(req.params.dataEHora));
	Usuario.update({_id:req.params.user_id},{$pull:{'registros':{dataEHora:new Date(req.params.dataEHora)}}}).exec(function(err, data) {
		if (err) {
			console.log(err);
			res.json(err);
		}else{			
			res.json(data);
		}
	});
});
router.post('/:user_id', function(req, res, next) {
	Usuario.find({_id:req.params.user_id, 'registros.dataEHora':req.body.dataEHora}).exec(function(err, data){
		console.log(data);
		if(data.length > 0){
			Usuario.update({_id:req.params.user_id, 'registros.dataEHora':req.body.dataEHora}, {$set: {'registros.$.tipo':req.body.tipo}})
			.exec(function(err, data){
				if (err) {
					console.error(err);
				}
				res.json(data.registros);
			});
		}else{
			Usuario.update({_id:req.params.user_id}, {$push: {registros:req.body}})
			.exec(function(err, data){
				if (err) {
					console.error(err);
				}
				res.json(data.registros);
			});
		}
	});

});

module.exports = router;
