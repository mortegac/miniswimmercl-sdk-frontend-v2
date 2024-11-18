
const pug = require('pug');
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const templateInvitacion = `
doctype html
html(lang="es")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    title Invitación a Licitación de Vehículos Eléctricos
    style.
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        width: 80%;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #4CAF50;
        color: white;
        padding: 10px 0;
        border-radius: 10px 10px 0 0;
      }
      .content {
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        margin-top: 20px;
      }
  body
    .container
      .header
        h1 #{title}
      .content
        p Estimado/a Señor/a #{CompanyName},
        p Nos complace invitarle a participar en la licitación para la adquisición de vehículos eléctricos a nombre de #{razonSocial} que se llevará a cabo el #{licitationDate}. Esta licitación tiene como objetivo promover el uso de tecnologías sostenibles y reducir las emisiones de carbono en su flota de vehículos.
        p A continuación, encontrará los detalles importantes sobre la licitación:
        ul
          li Fecha de Inicio: #{startDate}
          li Fecha de Cierre: #{endDate}
          li Lugar: #{location}
          li Contacto: #{contactEmail}
        p Para obtener más información y acceder a los documentos de la licitación, por favor visite nuestro sitio web o póngase en contacto con nosotros a través del correo electrónico proporcionado.
        p Agradecemos su interés en participar en esta iniciativa y esperamos recibir su propuesta.
        p Atentamente,
        p El Equipo de Licitaciones
      .footer
        p © 2024 Empresa XYZ. Todos los derechos reservados.
`

const fetchOperadores = async () => {
    try {
        // return data
        return (await api.ListRoles({
            env: ENVIROMENT,
            variables: {
                "filter": { "name": { "eq": "operator" } }
            },
            access: {
                apikey: process.env.API_GRETABACKENDTS_GRAPHQLAPIKEYOUTPUT,
                endpoint: process.env.API_GRETABACKENDTS_GRAPHQLAPIENDPOINTOUTPUT,
            },
        })).data?.listRoles?.items[0].Users.items;
    } catch (error) {
        console.error(">>>>> ERROR", error)
        throw new Error("failed fetching the users: " + error);
    }
};

const fetchBaseInfo = async (id) => {
    try {
        // return data
        return (await api.fetchBaseForInvitation({
            env: ENVIROMENT,
            variables: {
                id
            },
            access: {
                apikey: process.env.API_GRETABACKENDTS_GRAPHQLAPIKEYOUTPUT,
                endpoint: process.env.API_GRETABACKENDTS_GRAPHQLAPIENDPOINTOUTPUT,
            },
        })).data?.getBase
    } catch (error) {
        console.error(">>>>> ERROR", error)
        throw new Error("failed fetching the info of the base: " + error);
    }
};

const createInvitationEmails = async ({ id, emailList, isWhiteList }) => {
    // let operadores = await fetchOperadores()
    // const operadores={ }
    let cleanedOps=["1"]
    // if (isWhiteList) {
    //     cleanedOps = operadores.filter(e => (emailList.includes(e.id) ? true : false))
    // } else {
    //     cleanedOps = operadores.filter(e => (emailList.includes(e.id) ? false : true))
    // }
    // const { title, Consultancy: { Users: { Company: { razonsocial } } } } = await fetchBaseInfo(id)
    const templatePugString = pug.compile(templateInvitacion);
    const emails = cleanedOps.map((op) => {
        const email = "mortegac@gmail.com" // op.id
        const CompanyName = "" // op.Company.razonsocial
        // const res = { CompanyName, title, razonSocial: razonsocial, }
        return ({ template: templatePugString({
          CompanyName:"ACme SPA", 
          title:"envio", 
          razonSocial:"miniswimmer.cl"
        }), email })
    })
    console.log(">>>>Emails!!", emails)
    return emails
}


module.exports = { createInvitationEmails }