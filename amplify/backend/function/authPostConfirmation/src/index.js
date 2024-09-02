/********************************************************************
PostConfirmation:
Este trigger se activa después de que un usuario confirma su cuenta (por ejemplo, verificando su email).

Puedes usarlo para realizar acciones adicionales una vez que la cuenta está confirmada.
Es útil para crear registros en otras bases de datos o servicios una vez que el usuario está completamente registrado.
Puedes enviar mensajes de bienvenida o configurar recursos adicionales para el nuevo usuario.
 ******************************************************************/ 

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

/*____________________________________________________________________________________
 * Al confirmar el email se activa este trigger para actualizar el estado del email
 ____________________________________________________________________________________*/

const { responses, api } = require('/opt/nodejs/index')
const ENVIROMENT = process.env.ENV

exports.handler = async (event, callback) => {
    try {
        
        console.log(`EVENT: ${JSON.stringify(event)}`);
        const { email } = event.request.userAttributes
        console.log(`------USER-------: ${JSON.stringify(event.request.userAttributes)}`)
        
        // const updateDBTransaction = await api.updateUser({
        //   env: ENVIROMENT,
        //   variables: {
        //     id: email,
        //     validated: true,
        //   },
        //   access: {
        //     apikey: process.env.API_GRETABACKENDTS_GRAPHQLAPIKEYOUTPUT,
        //     endpoint: process.env.API_GRETABACKENDTS_GRAPHQLAPIENDPOINTOUTPUT,
        //   },
        // });
        // console.log(
        //   `------updateDBTransaction-------: ${JSON.stringify(updateDBTransaction)}`
        // );
        
        
    } catch (error) {
        console.error(JSON.stringify(error))
        callback(error)
    }
    
  // Devolver el evento modificado para que Cognito pueda procesarlo
  callback(null, event)
};
