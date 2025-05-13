import { Client } from '@googlemaps/google-maps-services-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_MAPS_API_KEY = "AIzaSyABUWbSg61pwSFzqGyY7chJvSkIL73wVpo";

const client = new Client({});

interface CustomResponseData {
  formattedAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      formattedAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      error: 'Método no permitido'
    });
  }

  const { address } = req.body;

  if (!address) {
    return res.status(400).json({
      formattedAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      error: 'La dirección es requerida'
    });
  }

  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({
        formattedAddress: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        error: 'Dirección no encontrada'
      });
    }

    const result = response.data.results[0];
    const addressComponents = result.address_components || [];
    
    const components = addressComponents.reduce((acc: Record<string, string>, component: any) => {
      const types = component.types;
      if (types.includes('street_number')) {
        acc.street_number = component.long_name;
      } else if (types.includes('route')) {
        acc.route = component.long_name;
      } else if (types.includes('locality')) {
        acc.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        acc.state = component.short_name;
      } else if (types.includes('postal_code')) {
        acc.zip_code = component.long_name;
      }
      return acc;
    }, {});

    return res.status(200).json({
      formattedAddress: result.formatted_address,
      streetAddress: `${components.street_number || ''} ${components.route || ''}`.trim(),
      city: components.city || '',
      state: components.state || '',
      zipCode: components.zip_code || '',
      coordinates: {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      }
    });
  } catch (error: any) {
    console.error('Error al validar la dirección:', error);
    return res.status(500).json({
      formattedAddress: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      error: 'Error al validar la dirección'
    });
  }
} 