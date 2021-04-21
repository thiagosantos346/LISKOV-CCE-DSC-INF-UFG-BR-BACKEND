const express = require('express');
const { celebrate, Segments, Joi }  = require('celebrate');

const OngController = require('./controlles/BancoSanguineoController');
const IncidentController = require('./controlles/DoacaoController');
const ProfileController = require('./controlles/ProfileController');
const SessionController = require('./controlles/SessionController');
const routes = express.Router();

routes.post('/session', SessionController.create );
routes.post('/bancoSanguineo', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().required().email(),
        whatsapp : Joi.number().required().min(9999999999).max(99999999999),
        city : Joi.string().required(),
        uf : Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/bancoSanguineo',  OngController.index);

routes.post('/doacao', celebrate({
    [Segments.BODY] : Joi.object().keys({
        title : Joi.string().required(),
        description : Joi.string().required(),
        value : Joi.number().required().min(1),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization : Joi.string().required(),
    }).unknown()

}), IncidentController.create);

routes.get('/doacao', celebrate({
    [Segments.QUERY] : Joi.object({
        page : Joi.number(),
    })
}), IncidentController.index);

routes.delete('/doacao/:id', celebrate({
    [Segments.PARAMS ] : Joi.object().keys({
        id : Joi.number().required(),
    })
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization : Joi.string().required(),
    }).unknown()
}), ProfileController.index);

module.exports = routes;