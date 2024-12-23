

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const emailjs = require("emailjs-com");
const SERVICE = "service_ucb8wga";  // welcome@mini..
const TEMPLATE = "template_5kxuc3t"; // Welcome_v2
emailjs.init("Csc41asZklkk5HTWk");

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let response;
    const dataEMail= ({
        reply_to: "mortegac@gmail.com",
        enrollmentId: "123333444",
        to_client_email: "mortegac@gmail.com",
        to_student_name: "Alma Ortega",
        to_student_id: "asasasas",
        to_course_name: "Bebe 2 años",
        to_schedule: "domingo 14:00",
        to_session_1:"DIC 01",
        to_session_2:"DIC 01",
        to_session_3:"DIC 01",
        to_session_4:"DIC 01",
        to_session_5:"",
        to_session_6:"",
        to_session_7:"",
        to_session_8:"",
        to_location:"Sede Pato Cornejo",
        to_location_id:"Pato-Cornejo",
        to_pack_vigencia:"30 dias",
        to_mapurl:"https://www.google.com/maps/place/Cam.+San+Francisco+de+Asis+199,+Lo+Barnechea,+Regi%C3%B3n+Metropolitana/@-33.3702066,-70.5205741,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cbe4d392c21f:0xabe6e1e4506c1bb!8m2!3d-33.3702111!4d-70.5179938!16s%2Fg%2F11q_mycr9w?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D",
        to_mapimage:"https://images.prismic.io/miniswimmer-academy/Zwa57YF3NbkBXGPM_mapa-pato-cornejo.png?auto=format,compress",
        to_location_address:"Cam. San Francisco de Asis 199, 7710171 Santiago, Lo Barnechea, Región Metropolitana",
        to_location_temperature:"entre 28 C a 33 C",
        to_recomendation:"Hay estacionamientos liberados dentro del recinto. En la entrada podrán indicarte el camino para llegar a la piscina. Cuando llegues a la piscina estará nuestro anfitrión Leonardo (con camiseta morada), quien te recibirá y te anotará en el listado de asistentes."
      });
    
    emailjs.send(SERVICE, TEMPLATE, dataEMail).then(
        function (res) {
            response = res
        //   dispatch(setEmailSend({
        //     type:  "WELCOME",
        //     contentEmail:  templateEmail,
        //     email:  dataEMail.to_client_email,
        //     usersEmailSendId: email,
        //     studentEmailSendId: dataEMail.to_student_id,
        //     contentMessage :"",
        //     phone :"",
        //     phoneState :"SEND",
        //     emailState :"SEND",
        //     enrollmentEmailSendsId :dataEMail?.enrollmentId,          
        //   }))
          
        },
        function (error) {
        //   dispatch(setEmailSend({
        //     type:  "WELCOME",
        //       contentEmail:  templateEmail,
        //       email:  dataEMail.to_client_email,
        //       usersEmailSendId: email,
        //       studentEmailSendId: dataEMail.to_student_id,
        //       contentMessage :"",
        //       phone :"",
        //       phoneState :"RENDERING_FAILURE",
        //       emailState :"RENDERING_FAILURE",
        //       enrollmentEmailSendsId :dataEMail?.enrollmentId,   
           
        //   }))
          
          console.log("FAILED...", error);
        }
      ).catch(err => {
        // dispatch(setEmailSend({
        //   type:  "WELCOME",
        //     contentEmail:  templateEmail,
        //     email:  dataEMail.to_client_email,
        //     usersEmailSendId: email,
        //     studentEmailSendId: dataEMail.to_student_id,
        //     contentMessage :"",
        //     phone :"",
        //     phoneState :"RENDERING_FAILURE",
        //     emailState :"RENDERING_FAILURE",
        //     enrollmentEmailSendsId :dataEMail?.enrollmentId,   
         
        // }))
        
        console.log("err ", err)
      }
    
      );
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(response),
    };
};
