import { generateClient } from 'aws-amplify/api';

import { 
  getSessionType, 
  listSessionTypes, 
  listSessionTypesWithRelations 
} from './queries';
import { 
  createSessionType, 
  updateSessionType, 
  deleteSessionType 
} from './mutation';
import { FilterOptions, InputOptions } from './types';

const client = generateClient();

export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
        { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };

      // const filterIsTestClass = (typeof objFilter?.isTestClass === 'undefined') ?
      //   {} : { isTestClass: { eq: Boolean(objFilter.isTestClass) } };

      const filterName = (typeof objFilter?.name === 'undefined' || objFilter?.name === '') ?
        {} : { name: { contains: objFilter.name } };

      const filter: any = {
        ...filterIsActive,
        // ...filterIsTestClass,
        ...filterName,
      };

      const getData: any = await client.graphql({
        query: listSessionTypes,
        variables: {
          filter: { ...filter },
          limit: objFilter?.limit || 100000000,
          // nextToken: objFilter?.nextToken,
          // sortDirection: objFilter?.sortDirection || 'ASC'
        }
      });

      const data = getData.data;
      resolve({ ...data.listSessionTypes } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const fetchDataWithRelations = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
        { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };

      const filterIsTestClass = (typeof objFilter?.isTestClass === 'undefined') ?
        {} : { isTestClass: { eq: Boolean(objFilter.isTestClass) } };

      const filterName = (typeof objFilter?.name === 'undefined' || objFilter?.name === '') ?
        {} : { name: { contains: objFilter.name } };

      const filter: any = {
        ...filterIsActive,
        ...filterIsTestClass,
        ...filterName,
      };

      const getData: any = await client.graphql({
        query: listSessionTypesWithRelations,
        variables: {
          filter: { ...filter },
          limit: objFilter?.limit || 100000000,
          nextToken: objFilter?.nextToken,
          sortDirection: objFilter?.sortDirection || 'ASC'
        }
      });

      const data = getData.data;
      resolve({ ...data.listSessionTypes } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const fetchOne = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: getSessionType,
        variables: { id: objFilter.id }
      });

      const data = getData.data;
      resolve({ ...data.getSessionType } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const createSessionTypeService = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const setData: any = await client.graphql({
        query: createSessionType,
        variables: {
          input: {
            name: objFilter.name,
            description: objFilter.description || "",
            durationSession: objFilter.durationSession,
            timeAWeek: objFilter.timeAWeek,
            totalSessions: objFilter.totalSessions,
            amount: objFilter.amount,
            isActive: objFilter.isActive || false,
            isTestClass: objFilter.isTestClass || false,
            packValidity: objFilter.packValidity || 0,
          }
        }
      });

      const data = setData.data;
      resolve({ ...data.createSessionType } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const updateSessionTypeService = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateData: any = await client.graphql({
        query: updateSessionType,
        variables: {
          input: {
            id: objFilter.id,
            name: objFilter.name,
            description: objFilter.description || "",
            durationSession: objFilter.durationSession,
            timeAWeek: objFilter.timeAWeek,
            totalSessions: objFilter.totalSessions,
            amount: objFilter.amount,
            isActive: objFilter.isActive || false,
            isTestClass: objFilter.isTestClass || false,
            packValidity: objFilter.packValidity || 0,
          }
        }
      });

      const data = updateData.data;
      resolve({ ...data.updateSessionType } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const deleteSessionTypeService = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteData: any = await client.graphql({
        query: deleteSessionType,
        variables: {
          input: {
            id: objFilter.id
          }
        }
      });

      const data = deleteData.data;
      resolve({ ...data.deleteSessionType } as any);

    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};


