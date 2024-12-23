

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

function cleanPhoneNumber(phone) {
    // Eliminar el signo más
    let cleanPhone = phone.replace(/^\+/, '');
    
    // Eliminar espacios y caracteres no numéricos
    cleanPhone = cleanPhone.replace(/\D/g, '');
    
    // Verificar que tenga 11 dígitos
    if (cleanPhone.length === 11) {
      return {
        cleanPhone,
        message: "",
        status: true
    };
    } else {
      return {
        message: 'Número de teléfono inválido',
        status: true
    };
    }
  }
  
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        
        const JWT = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MTFjNWExMS02ZGU0LTQyNzYtOTk1My0xZWRiODgxMjNjNDgiLCJpYXQiOjE3MzQ3MTgyMDQsImV4cCI6MTczNDcyNTQwNH0.m_rmTson0fuGWFe-wUZBpuxWEGKaokrcobRR09Gp2Gc"
        const clientPhoneNumber = "+56999398171"
        const clientName = "Manu"
        const validPhone = cleanPhoneNumber(clientPhoneNumber);
        const payload = {
        whatsappId: "3f327a33-4b6c-47c0-b7bd-7649674907cd",
        messages: [
          {
            number: validPhone?.cleanPhone,
            name: clientName,
            body: `${clientName}, Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${JWT}   El link de pago tiene una vigencia de 48 horas.`
          }
        ]
      };
      
          if(validPhone.status){
          const response = await fetch(
            'https://api.whaticket.com/api/v1/messages', 
            // '/api/api/v1/messages', 
            {
              method: 'POST',
              credentials: 'include',
              referrerPolicy: 'no-referrer',
              headers: {
                'Authorization': `Bearer ${token}`,
                // 'Accept': '*/*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // O tu dominio específico
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
              },
              body: JSON.stringify(payload)
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const responseData = await response.json();
          /** TODO:  Almacenar envio del whatsapp */
          console.log('Message sent successfully:', responseData);
        }
        
        return {
            statusCode: response.status,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: JSON.stringify(responseData),
        };
        
      } catch (err) {
        console.error('Error sending message:', err);
        
        return {
            statusCode: 500,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: JSON.stringify(err),
        };
        
      } 
    //   finally {
    //     setLoading(false);
    //   }
      

};
