/********************************************************************
PreAuthentication:
Este trigger se activa justo antes de que un usuario inicie sesión.

- Permite realizar verificaciones adicionales antes de permitir el inicio de sesión.
- Puedes implementar lógica personalizada, como verificar si la cuenta del usuario está en buen estado.
- Es útil para añadir capas adicionales de seguridad o validación antes del inicio de sesión.
 ******************************************************************/ 

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { responses, api } = require('/opt/nodejs/index')
const ENVIROMENT = process.env.ENV

exports.handler = async (event, callback) => {
    try {
        
        console.log(`EVENT: ${JSON.stringify(event)}`);
        const { email } = event.request.userAttributes
        console.log(`------USER-------: ${JSON.stringify(event.request.userAttributes)}`)
        
       // TODO: Validar que el usuario no exista


        
    } catch (error) {
        console.error(JSON.stringify(error))
        callback(error)
    }
    
  // Devolver el evento modificado para que Cognito pueda procesarlo
  callback(null, event)
};
