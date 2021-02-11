const Joi = require('joi'); 
export default validate = (schema, properties) => { 
  return (req, res, next) => { 
  const { error } = Joi.validate(properties, schema); 
  const valid = error == null; 

  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');

    console.log("error", message); 
   res.status(422).json({ error: message }) } 
  } 
} 
