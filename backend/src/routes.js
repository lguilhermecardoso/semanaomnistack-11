const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.get("/ongs", OngController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2),
      email: Joi.string()
        .required()
        .email(),
      city: Joi.string().required(),
      whatsapp: Joi.string().required(),
      uf: Joi.string()
        .required()
        .min(2)
        .max(2)
        .length(2)
    })
  }),
  OngController.create
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IncidentController.index
);
routes.post(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.create
);
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

routes.get("/profile", ProfileController.index);

routes.post("/sessions", SessionController.create);

module.exports = routes;
