import { v4 as uuid } from 'uuid'
import { generateClient } from "aws-amplify/api";
const API = generateClient();
import { getAWSDateStgoChile } from "../../utils/helper";
import { createSupportTicket, updateSupportTicket } from "./queries";

import { getDaysInMonth } from "date-fns";
import { customListSupportTicket } from "./queries";

import {
  InputOptions,
  FilterOptions
} from "./type";

const client = generateClient();


export const fetchSupportTickets = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {


      const filterEmailRequested = (typeof objFilter?.email === 'undefined') ?
        {} : { email: { eq: String(objFilter.email) } };
      const filterStatusTicket = (typeof objFilter?.statusTicket === 'undefined') ?
        {} : { statusTicket: { eq: String(objFilter.statusTicket) } };

      const filter: any = {
        ...filterStatusTicket,
        ...filterEmailRequested
      };


      let allTickets: any;
      if (typeof objFilter?.onlyValidTickets === 'undefined') {
        allTickets = await API.graphql(
          {
            query: customListSupportTicket,
            variables: {
              filter: { ...filter }
              , limit: 100000000
            }
          }
        );
      } else {
        allTickets = await API.graphql(
          {
            query: customListSupportTicket,
            variables: {
              filter: {
                ...filter,
                or: [
                  { statusTicket: { eq: "open" } },
                  { statusTicket: { eq: "in_progress" } },
                ]
              }
            }
          }
        );


      }


      // const allSupportTickets: SupportTicket[] = allTickets?.data?.listSupportTickets?.items.sort(
      //   ({ date: dateA }, { date: dateB }) => {
      //     if (dateA !== undefined && dateA !== null) {
      //       if (dateB !== undefined && dateB !== null) {
      //         const dateADate = new Date(dateA);
      //         const dateBDate = new Date(dateB);
      //         return dateADate > dateBDate ? 1 : dateADate < dateBDate ? -1 : 0;
      //       }
      //     }
      //     return 0;
      //   },
      // );
      interface SupportTicket {
        date: string; // or Date, depending on your data structure
        // other properties...
      }

      const allSupportTickets: SupportTicket[] = (allTickets)?.data?.listSupportTickets?.items.sort(
        // ({ date: dateA }, { date: dateB }) => {
        (ticketA: SupportTicket, ticketB: SupportTicket) => {
          const { date: dateA } = ticketA;
          const { date: dateB } = ticketB;
          if (dateA !== undefined && dateA !== null) {
            if (dateB !== undefined && dateB !== null) {
              const dateADate = new Date(dateA);
              const dateBDate = new Date(dateB);
              return dateADate > dateBDate ? 1 : dateADate < dateBDate ? -1 : 0;
            }
          }
          return 0;
        },
      );
      console.log("--- allSupportTickets ---", allSupportTickets)
      resolve([...allSupportTickets] as any);

      // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
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
// MUTATIONS
export const createSupportTickets = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUuid = uuid()

      const idEmployeeId = (typeof objFilter?.employeeId === 'undefined') ?
        {} : { employeeId: objFilter?.employeeId };
      const idSolicitantId = (typeof objFilter?.solicitantId === 'undefined') ?
        {} : { solicitantId: objFilter?.solicitantId };

      const userArray: any = {
        ...idEmployeeId,
        ...idSolicitantId
      };

      console.log("---objFilter--", objFilter)
      const dateAwsNow = getAWSDateStgoChile();
      const setData: any = await client.graphql({
        query: createSupportTicket,
        variables: {
          input: {
            supportTicketId: newUuid,
            name: objFilter.name,
            email: objFilter.email,
            phoneNumber: objFilter?.phoneNumber || "",
            eveId: objFilter?.eveId || "",
            level: objFilter?.level || 0,
            statusTicket: objFilter?.statusTicket || "",
            date: dateAwsNow,
            lastModificationUser: dateAwsNow,
            description: objFilter?.description || "",
            ...userArray
            // employeeId: objFilter?.employeeId || null,
            // solicitantId: objFilter?.solicitantId || null,
          }
        }
      });

      console.log("<<< TICKET CREADO <<<<< ", setData)
      const data = setData?.data?.createSupportTicket || {};
      resolve({ data } as any);

      // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
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
export const updateStatusTickets = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("---objFilter--", objFilter)
      const setData: any = await client.graphql({
        query: updateSupportTicket,
        variables: {
          input: {
            ...objFilter
          }
        }
      });

      console.log("<<< TICKET CREADO <<<<< ", setData)
      const data = setData?.data?.createSupportTicket || {};
      resolve({ data } as any);

      // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
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
export const createTicketComment = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUuid = uuid()
      console.log("---objFilter--", objFilter)
      const dateAwsNow = getAWSDateStgoChile();
      const setData: any = await client.graphql({
        query: createSupportTicket,
        variables: {
          input: {
            ticketCommentId: newUuid,
            isEnergica: true,
            message: objFilter?.message || "",
            typeOfUser: objFilter?.typeOfUser || "",
            canClientSeeComment: objFilter?.canClientSeeComment || "",
            supportTicketId: objFilter?.supportTicketId || "",
            userId: objFilter?.userId || "",
          }
        }
      });

      console.log("<<< TICKET CREADO <<<<< ", setData)
      const data = setData?.data?.createSupportTicket || {};
      resolve({ data } as any);

      // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
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


// interface CreateCommentMutation {
//   createUserAccess: {
//     description: string;
//     typeOfUser: string;
//     idUserAnswer: string;
//     nameUserAnswer: string;
//     clienCanSee: string;
//     supportTicketCommentsId: string;
//   }
// }

// interface CreateCommentInput {
//   description: string;
//   typeOfUser: string;
//   idUserAnswer: string;
//   nameUserAnswer: string;
//   clienCanSee: boolean;
//   supportTicketCommentsId: string;
// }

// export const createSupportTicket = async (
//   params: {
//     description: string,
//     typeOfUser: string,
//     idUserAnswer: string,
//     nameUserAnswer: string,
//     clienCanSee: boolean,
//     idTicket: string
//   }) => {
//   try {
//     console.log('>>>>>>>>>>createSupportTicket: ', params)

//     const input: CreateCommentInput = {
//       description: params.description,
//       typeOfUser: params.typeOfUser,
//       idUserAnswer: params.idUserAnswer,
//       nameUserAnswer: params.nameUserAnswer,
//       clienCanSee: params.clienCanSee,
//       supportTicketCommentsId: params.idTicket,
//     }
//     // String(params.module),
//     console.log('>>>>>>>>>>input: ', input)

//     const response = await API.graphql(graphqlOperation(
//       createSupportTicket,
//       { input }
//       // { input: { ...input } }
//     )) as CreateCommentMutation;

//     console.log('>>>>>>>>>>createComments: ', response)
//     return response;
//     // return []

//   } catch (error) {
//     console.log('error: ', error)

//     return []
//   }
// }

// export const fetchOneResidence = async (idResidential: string) => {
//   try {

//     console.log("--fetch One Post-", idResidential)

//     const residential: any = await API.graphql(graphqlOperation(
//       getResidential,
//       { id: idResidential }
//     ));

//     const data = residential.data.getResidential;
//     const dataObj = {
//       name: data.name,
//       company: data.Company?.name,
//       address: data.address,
//       totalParkingLots: data.totalParkingLots,
//       declaredPower: data.declaredPower,
//       typeOfCommunity: data.typeOfCommunity,
//       contactName: data.contactName,
//       contactEmail: data.contactEmail
//     }

//     console.log('>>>>>>>>>>fetchOneResidence: ', data)

//     return { ...dataObj }
//   } catch (error) {
//     console.log('>>>>>>>>>>error fetchOneResidence: ', error)
//     return { wasCreated: false }
//   }
// }
