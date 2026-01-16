import { generateClient } from 'aws-amplify/api';
import { listQuickResponses, getQuickResponse } from './queries';
import { createQuickResponse, updateQuickResponse, deleteQuickResponse } from './mutation';
import { FilterOptions } from './types';

const client = generateClient();

/**
 * Búsqueda optimizada de QuickResponse por nombre
 * Busca coincidencias parciales en cualquier parte del string del campo name
 * Optimizada para tablas con pocos registros
 */
export const fetchDataSearchName = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: listQuickResponses,
        variables: {
          filter: {
            isActive: { eq: true },
            name: { contains: objFilter?.searchTerm || objFilter?.name }
          },
          limit: 100
        },
      });

      const data = getData.data;
      resolve({ ...data.listQuickResponses } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

/**
 * Obtener todas las respuestas rápidas activas
 */
export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: listQuickResponses,
        variables: {
          filter: {
            isActive: { eq: true },
          },
          limit: 1000
        },
      });

      const data = getData.data;
      resolve({ ...data.listQuickResponses } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

/**
 * Obtener una respuesta rápida por ID
 */
export const fetchOneData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: getQuickResponse,
        variables: { id: objFilter?.id },
      });

      const data = getData.data;
      resolve({ ...data.getQuickResponse } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

/**
 * Crear una nueva respuesta rápida
 */
export const createQuickResponseService = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: createQuickResponse,
        variables: {
          input: {
            name: objFilter.name,
            message: objFilter.message,
            isActive: objFilter.isActive !== undefined ? objFilter.isActive : true,
          }
        }
      });

      const data = getData.data;
      resolve({ ...data.createQuickResponse } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

/**
 * Actualizar una respuesta rápida existente
 */
export const updateQuickResponseService = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: updateQuickResponse,
        variables: {
          input: {
            id: objFilter.id,
            name: objFilter.name,
            message: objFilter.message,
            isActive: objFilter.isActive,
          }
        }
      });

      const data = getData.data;
      resolve({ ...data.updateQuickResponse } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

/**
 * Eliminar una respuesta rápida
 */
export const deleteQuickResponseService = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData: any = await client.graphql({
        query: deleteQuickResponse,
        variables: {
          input: {
            id: objFilter.id,
          }
        }
      });

      const data = getData.data;
      resolve({ ...data.deleteQuickResponse } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};
