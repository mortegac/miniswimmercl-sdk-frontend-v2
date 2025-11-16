

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const CONECTION_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJjcmVhdGU6bWVzc2FnZXMiLCJyZWFkOndoYXRzYXBwcyJdLCJjb21wYW55SWQiOiJlMjk3OTNhZS1mYjNiLTQyNDEtYWY4NC03Zjg0ZmNlYjk0OGUiLCJpYXQiOjE3NjAxMDIyOTZ9.YlG3bq8XlEpFoZtTVGBLU0X9asPe70uK2VDXtc2duOU"
const CONECTION_API_ID = "9f494072-7e32-4476-9f91-da46f05375b0"
let response, responseData ={};

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
    const {
      message,
      phoneNumber,
      name 
    } = event?.arguments;
    
    try {
        
        
        // const clientPhoneNumber = "+56999398171"
        // const clientName = "Manu"
        const validPhone = cleanPhoneNumber(phoneNumber);
        const payload = {
        whatsappId: `${CONECTION_API_ID}`,
        messages: [
          {
            number: validPhone?.cleanPhone,
            name: name,
            body: `${message}`
          }
        ]
      };
      
          if(validPhone.status){
          response = await fetch(
            'https://api.whaticket.com/api/v1/messages', 
            // '/api/api/v1/messages', 
            {
              method: 'POST',
              credentials: 'include',
              referrerPolicy: 'no-referrer',
              headers: {
                'Authorization': `Bearer ${CONECTION_JWT}`,
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
            throw new Error(`HTTP error! status: ${response?.status}`);
          }
    
          responseData = await response.json();
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

