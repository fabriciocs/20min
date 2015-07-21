var express = require('express');
var router = express.Router();
var Usuario = require('../repository/usuarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
	Usuario.find(function(err, data) {
		if (err) {
			console.error(err);
		}
		res.json(data);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	Usuario.find({
		_id : id
	}, function(err, data) {
		if (err) {
			console.error(err);
		}
		res.json(data);
	});
});


router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	Usuario.findOneAndRemove({
		_id : id
	}, function(err, data) {
		if (err) {
			console.error(err);
		}
		res.json(data);
	});
});
router.post('/:id', function(req, res, next) {
	var registro = new Registro(req.body);

	Usuario.update({
		_id : req.params.id
	}, {
		$push: {registros: registro}
	}, {
		upsert : true
	}, function(err, data) {
		if (err) {
			console.error(err);
		}
		res.sendStatus(200);
	});
});
router.post('/', function(req, res, next) {
	var usuario = new Usuario(req.body);
	var usuarioJson = usuario.toObject();

	delete usuarioJson._id;

	Usuario.update({
		_id : usuario._id
	}, usuarioJson, {
		upsert : true
	}, function(err, data) {
		if (err) {
			console.error(err);
		}
		res.json(data);
	});
});

module.exports = router;
