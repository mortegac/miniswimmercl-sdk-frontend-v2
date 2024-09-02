/********************************************************************
PostAuthentication:
Este trigger se activa inmediatamente después de que un usuario ha iniciado sesión con éxito.

- Puedes usarlo para registrar información sobre el inicio de sesión.
- Es útil para actualizar metadatos del usuario, como la última fecha de inicio de sesión.
- Permite realizar acciones específicas basadas en el inicio de sesión exitoso del usuario.
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
