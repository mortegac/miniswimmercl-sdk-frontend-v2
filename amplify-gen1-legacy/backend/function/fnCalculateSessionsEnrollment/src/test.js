

const { calculateSessions } = require("./functions/calculations/calculateSession")


let hoy = new Date();

const req= async()=>{
    const reqData = await calculateSessions(
        cantidadSesiones=4, 
        fechaInicio=hoy, 
        diaCurso="Martes", 
        valorCurso="98000", 
    )
    
    console.log(reqData);
    return reqData
}

req()

// console.log(`response: ${JSON.stringify(response)}`);
// hoy.setDate(hoy.getDate() + 1);

// console.log(`response: ${hoy}`);
// console.log(`response: ${hoy.getDay()}`);
// // console.log(`response: ${JSON.stringify(response)}`);

