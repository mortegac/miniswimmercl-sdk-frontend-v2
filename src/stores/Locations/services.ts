import { generateClient } from 'aws-amplify/api';

import { listLocations, listLocationsOnly, listLocationsAdmin } from './queries';
import { createLocation, updateLocation } from './mutation';
import { FilterOptions, InputLocation } from './types';

const client = generateClient();

export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: listLocations,
        variables: { filter: {}, limit: 100000000 },
      });
      const data = getData.data;
      resolve({ ...data.listV2Locations } as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const fetchDataOnly = async (country?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      let filterCountry = (typeof country === 'undefined' || country === '')
        ? {}
        : { country: { eq: country } };

      const getData: any = await client.graphql({
        query: listLocationsOnly,
        variables: {
          filter: {
            isActive: { eq: true },
            isVisible: { eq: true },
            ...filterCountry,
          },
        },
      });
      const data = getData.data;
      resolve({ ...data.listV2Locations } as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const fetchDataAdmin = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter: any = {};
      if (!objFilter?.skipFilter) {
        if (typeof objFilter?.isActive !== 'undefined') {
          filter.isActive = { eq: Boolean(objFilter.isActive) };
        }
        if (typeof objFilter?.isVisible !== 'undefined') {
          filter.isVisible = { eq: Boolean(objFilter.isVisible) };
        }
      }

      const getData: any = await client.graphql({
        query: listLocationsAdmin,
        variables: { filter, limit: 100000000 },
      });
      const data = getData.data;
      resolve({ ...data.listV2Locations } as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const createLocationService = async (input: InputLocation): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const setData: any = await client.graphql({
        query: createLocation,
        variables: {
          input: {
            name: input.name,
            city: input.city,
            region: input.region,
            group: input.group,
            country: input.country || 'CHILE',
            address: input.address,
            phone: input.phone,
            minimumTemperature: Number(input.minimumTemperature),
            maximumTemperature: Number(input.maximumTemperature),
            imageMap: input.imageMap || '',
            urlMap: input.urlMap || '',
            directions: input.directions || '',
            isActive: input.isActive ?? true,
            isVisible: input.isVisible ?? true,
          },
        },
      });
      const data = setData.data;
      resolve({ ...data.createV2Location } as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};

export const updateLocationService = async (input: InputLocation): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateData: any = await client.graphql({
        query: updateLocation,
        variables: {
          input: {
            id: input.id,
            name: input.name,
            city: input.city,
            region: input.region,
            group: input.group,
            country: input.country || 'CHILE',
            address: input.address,
            phone: input.phone,
            minimumTemperature: Number(input.minimumTemperature),
            maximumTemperature: Number(input.maximumTemperature),
            imageMap: input.imageMap || '',
            urlMap: input.urlMap || '',
            directions: input.directions || '',
            isActive: input.isActive ?? true,
            isVisible: input.isVisible ?? true,
          },
        },
      });
      const data = updateData.data;
      resolve({ ...data.updateV2Location } as any);
    } catch (err) {
      reject(JSON.stringify({ errorMessage: err }));
    }
  });
};
