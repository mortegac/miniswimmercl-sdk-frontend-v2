/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';

import { FormInput } from "@/components/Base/Form";

interface Props {
  onSelectAddress: (addressDetails: {
    StreetAddress: string | null;
    City: string | null;
    State: string | null;
    ZipCode: string | null;
    Country: string | null;
    Latitude: number | null;
    Longitude: number | null;
  } | null) => void;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const AddressInput: React.FC<Props> = ({ onSelectAddress }) => {
  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoCompleteRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(autoCompleteRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        fields: ['address_components', 'geometry', 'formatted_address']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place?.geometry) {
          console.log('Lugar seleccionado:', place);
          setAddress(place.formatted_address || '');

          const stateComponent = place.address_components?.find(comp => comp.types.includes('administrative_area_level_1'));
          if (stateComponent?.short_name === 'FL') {
            const streetNumber = place.address_components?.find(comp => comp.types.includes('street_number'))?.long_name || null;
            const route = place.address_components?.find(comp => comp.types.includes('route'))?.long_name || null;
            const city = place.address_components?.find(comp => comp.types.includes('locality'))?.long_name ||
                         place.address_components?.find(comp => comp.types.includes('administrative_area_level_2'))?.long_name || null;
            const state = stateComponent.short_name || null;
            const zipCode = place.address_components?.find(comp => comp.types.includes('postal_code'))?.long_name || null;
            const country = place.address_components?.find(comp => comp.types.includes('country'))?.long_name || null;
            const latitude = place.geometry?.location?.lat() || null;
            const longitude = place.geometry?.location?.lng() || null;
            const streetAddress = streetNumber && route ? `${streetNumber} ${route}` : (streetNumber || route || null);

            onSelectAddress({
              StreetAddress: streetAddress,
              City: city,
              State: state,
              ZipCode: zipCode,
              Country: country,
              Latitude: latitude,
              Longitude: longitude,
            });
          } else {
            setAddress('');
            onSelectAddress(null);
            alert('Por favor, selecciona una dirección en Florida, EE.UU.');
          }
        } else {
          setAddress('');
          onSelectAddress(null);
        }
      });
    }
  }, [onSelectAddress]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div className='w-full'>
      <FormInput
        ref={autoCompleteRef}
        type="text"
        id="address"
        tabIndex={4} 
        placeholder="Ingresa una dirección en Florida, EE.UU."
        value={address}
        onChange={handleChange}
        className="px-6 py-3 rounded-full mr-8 focus:z-12 w-full"
      />
    </div>
  );
};

export default AddressInput;