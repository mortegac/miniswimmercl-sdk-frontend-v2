import { generateClient } from 'aws-amplify/api';

import emailjs, { init } from "emailjs-com";
const SERVICE = "service_ucb8wga";
const TEMPLATE = "template_rbmzu0w";
init("Csc41asZklkk5HTWk");

import { InputOptions, FilterOptions } from "./types";

import { listEmailSends } from './queries';
import { createEmailSend } from './mutation';

const client = generateClient();



export const createEmailSent = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: createEmailSend,
        variables: {
          input: {            
            date:  new Date(Date.now()).toISOString(),
            type:  objFilter.type,
            contentEmail:  objFilter.contentEmail,
            email:  objFilter.email,
            usersEmailSendId: objFilter.usersEmailSendId,
            studentEmailSendId: objFilter.studentEmailSendId,
          }
        }
      });
      
      console.log("<<< EMAIL CREADO <<<<< ", setData)
      const data = setData.data;
      
      if(data?.createEmailSend?.id !== undefined){
        resolve({ ...data.createEmailSend } as any);
      }else{
          reject({
            errorMessage: "Fallo al crear el email",
          });
        
      }
        
      // ...userData.data.getUsers
      // } else {
      // }
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};


export const sentWelcomeEmail = async (data: InputOptions): Promise<any> => {
  const statusSentEMail:any = {
    sentEmail: false,
    isFailure: false,
    title: "Registro ingresado 🎉",
    text: "Te enviamos un email, responde y adjunta tu comprobante de pago para finalizar el proceso",
    response: ""
  }
  return new Promise(async (resolve, reject) => {
    try {
     
      const templateParams = {
        to_sede: data.to_sede,
        to_nombre_sede: data.to_nombre_sede,
        to_categoria_sede: data.to_categoria_sede,
        to_dias_sesiones: data.to_dias_sesiones,
        to_direccion_sede: data.to_direccion_sede,  
        to_estacionamientos_sede: data.to_estacionamientos_sede,
        to_mudadores_sede: data.to_mudadores_sede,
        
        reply_to: data.reply_to,
        from_name: data.from_name,
        to_email: data.to_email,
        to_name: data.to_name,
      };
  
  
      emailjs.send(SERVICE, TEMPLATE, templateParams).then(
        function (response) {
          statusSentEMail({
            sentEmail: true,
            isFailure: false,
            title: "Registro ingresado 🎉",
            text: "Te enviamos un email, responde y adjunta tu comprobante de pago para finalizar el proceso",
            response: response || "",
          });
        },
        function (error) {
          statusSentEMail({
            sentEmail: true,
            isFailure: true,
            title: "Página no encontrada 😭",
            text: "No encontramos la página solicitada ",
            response:  '',
          });
          console.log("FAILED...", error);
        }
      ).catch(err => statusSentEMail({
        sentEmail: true,
        isFailure: true,
        title: "Página no encontrada 😭",
        text: "No encontramos la página solicitada ",
        response: '',
      })
      );
      
      
      
      // const getData:any = await client.graphql({
      //   query: listCourses,
      //   // variables: { id: userId },
      // });
      
      // // console.log("<<< STUDENTS DATA <<<<< ", getData)
      // const data = getData.data;
      
        resolve({ ...statusSentEMail } as any);
        
    
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listEmailSends,
        // variables: { studentEmailSendId: objFilter.studentEmailSendId },
        variables: { 
          filter:{
            studentEmailSendId: {eq: String(objFilter.studentEmailSendId)},
          }
        }
           
      });
      
      const data = getData.data;
      console.log("<<< EMAILS DATA <<<<< ", data.listEmailSends.items)
      
        resolve([ ...data.listEmailSends.items] as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      reject({
        errorMessage:err
      });
    }
  });
};
