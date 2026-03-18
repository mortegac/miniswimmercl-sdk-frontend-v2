

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { getEnrollment, removeEnrollment } = require("./api/enrollment")
const { getShoppingCartDetail, removeCartDetail } = require("./api/shoppingCart")
const { removeSession} = require("./api/sessionDetail")

exports.handler = async (event) => {
    
    const params = event.arguments;
    // const { arguments:{enrollId, employeeId}} = event.arguments;

    console.log(`EVENT: ${JSON.stringify(params)}`);
 
    
// 1.- Get enrollment recibido
    // console.log(`1.---------- Enrollment ----------`);
    
    // if(params?.enrollId != ""}{

    // }
    const enrollmentData = params?.enrollId && await getEnrollment(
        { id:params?.enrollId }
    )
    console.log(`1.---------- Enrollment ----------`, enrollmentData);

// 2.- Get shopping cart
const cartDetailData = params?.enrollId && await getShoppingCartDetail(
    { filter: {
        shoppingCartDetailEnrollmentId: {eq: params?.enrollId},
        type: {eq: "ENROLLMENTS"},
    }, limit: 100000000 }
)
console.log(`2.---------- cartDetailData ----------`, JSON.stringify(cartDetailData, null, 2));






if (enrollmentData.wasPaid === false) {
    console.log("SI SE PUEDE ELIMAR")
    
// 3.- Remove session
    console.log(`3.---------- enrollmentData?.sessionDetails?.items ----------`, JSON.stringify(enrollmentData?.sessionDetails?.items, null, 2));

    if (Array.isArray(enrollmentData?.sessionDetails?.items)) {

        const sessionPromises = enrollmentData?.sessionDetails?.items.map((session, index)=> {
            return removeSession(
                {
                    input:{
                        id:session?.id,
                        status:"DELETED"
                    }
                }) 
        });



        
          const results = await Promise.all(sessionPromises);
          console.log(`3.---------- results remove session ----------`, JSON.stringify(results, null, 2 ));
        }
        
        
        // 4.- Remove Shopping Cart Detail
        
        console.log(`4. removeCartDetail ---------- cartDetailData?.id ----------`, JSON.stringify(cartDetailData[0]?.id, null, 2 ));
        const deleteCartDetail = cartDetailData[0]?.id && await removeCartDetail(
            {
                input:{
                    id:cartDetailData[0]?.id
                }
            })

        console.log(`3.---------- deleteCartDetail ----------`, JSON.stringify(deleteCartDetail, null, 2 ));
  
        const deleteEnrollment = params?.enrollId && await removeEnrollment(
            {
                input:{
                    id:params?.enrollId,
                    wasDeleted:true
                }
            })


}

//ELIMINAR 
// 2.- Sessiones x enrollmentId
// 3.- Enrollment 
// 4.- Carro de compra detalle x enrollmentId 
// 5.-  
    
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
