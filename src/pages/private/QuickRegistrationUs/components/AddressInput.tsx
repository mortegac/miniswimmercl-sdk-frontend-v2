/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';

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

const AddressInput: React.FC<Props> = ({ onSelectAddress }) => {
  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);
  const autoComplete = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (autoCompleteRef.current) {
      autoComplete.current = new google.maps.places.Autocomplete(
        autoCompleteRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: 'us' }, // Restringimos a Estados Unidos
          fields: ['address_components', 'geometry', 'formatted_address', 'place_id'],
        }
      );

      autoComplete.current.addListener('place_changed', () => {
        const place = autoComplete.current?.getPlace();
        if (place?.geometry) {
          console.log('Lugar seleccionado:', place);
          setAddress(place.formatted_address || '');

          // Verificamos si la dirección seleccionada pertenece a Florida
          const stateComponent = place.address_components?.find(comp => comp.types.includes('administrative_area_level_1'));
          if (stateComponent?.short_name === 'FL') {
            // Procesar los address_components para obtener los campos deseados
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
            // Si no es Florida, puedes limpiar los detalles o mostrar un mensaje de error
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

    return () => {
      if (autoComplete.current) {
        google.maps.event.clearListeners(autoComplete.current, 'place_changed');
      }
    };
  }, [onSelectAddress]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    // No llamamos a onSelectAddress aquí para esperar la selección del autocompletado
  };

  return (
    <div>
      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
        Dirección:
      </label>
      <input
        ref={autoCompleteRef}
        type="text"
        id="address"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Ingresa una dirección en Florida, EE.UU."
        value={address}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddressInput;