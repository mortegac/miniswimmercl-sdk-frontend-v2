/********************************************************************
PreSignup:
Este trigger se activa justo antes de que se cree una nueva cuenta de usuario.

- Puedes usarlo para realizar validaciones personalizadas.
- Permite automatizar el proceso de confirmación de usuario.
- Puedes añadir atributos personalizados al usuario.
- Es útil para prevenir registros no deseados o implementar lógica de negocio específica antes de que se cree la cuenta.

 ******************************************************************/ 
 

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { responses, api } = require('/opt/nodejs/index')
const ENVIROMENT = process.env.ENV

exports.handler = async (event, context) => {
    try {
        
        console.log(`EVENT: ${JSON.stringify(event)}`);
        const { email } = event.request.userAttributes
        console.log(`------USER-------: ${JSON.stringify(event.request.userAttributes)}`)
        
       // TODO: Validar que el usuario no exista

       // Ejemplo: Verificar si el email pertenece a un dominio específico
      // if (!email.endsWith('@tuempresa.com')) {
      //   throw new Error('Solo se permiten registros con email corporativo @tuempresa.com');
      // }

      // // Ejemplo: Agregar un atributo personalizado
      // event.response.autoConfirmUser = true;
      // event.response.autoVerifyEmail = true;

      // // Ejemplo: Añadir el usuario a un grupo específico
      // event.response.clientMetadata = {
      //   ...event.response.clientMetadata,
      //   addToGroup: 'NuevosUsuarios'
      // };

      console.log('PreSignup trigger response', JSON.stringify(event.response, null, 2));

     
      
    const createDBTransaction = await api.createUser({
        env: ENVIROMENT,
        variables: {
          id: email,
          validated: false,              
          email: email,
          name: "",
          contactPhone: "",
          ig: "",
          firstContact: true,
          usersRolesId: "25a1367a-576c-41d2-a8d7-cf873e2b0127"   // PARENTS ROL
        }
      })
      console.log(`------createDBTransaction-------: ${JSON.stringify(createDBTransaction)}`)
        
      
    } catch (error) {
      console.error(JSON.stringify(error))
      // callback(error)
      // Devolver el evento modificado
      return event;
    }
    
    // Devolver el evento modificado
    return event;
    
  // Devolver el evento modificado para que Cognito pueda procesarlo
  // callback(null, event)
};
