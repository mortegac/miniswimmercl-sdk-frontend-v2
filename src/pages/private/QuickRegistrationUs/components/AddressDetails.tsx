import React from 'react';

interface Props {
  selectedAddress: {
    StreetAddress: string | null;
    City: string | null;
    State: string | null;
    ZipCode: string | null;
    Country: string | null;
    Latitude: number | null;
    Longitude: number | null;
  } | null;
}

const AddressDetails: React.FC<Props> = ({ selectedAddress }) => {
  if (!selectedAddress) {
    return <p>No se ha seleccionado ninguna dirección.</p>;
  }

  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Detalles de la Dirección</h2>
      {selectedAddress.StreetAddress && <p><strong>Dirección:</strong> {selectedAddress.StreetAddress}</p>}
      {selectedAddress.City && <p><strong>Ciudad:</strong> {selectedAddress.City}</p>}
      {selectedAddress.State && <p><strong>Estado:</strong> {selectedAddress.State}</p>}
      {selectedAddress.ZipCode && <p><strong>Código Postal:</strong> {selectedAddress.ZipCode}</p>}
      {selectedAddress.Country && <p><strong>País:</strong> {selectedAddress.Country}</p>}
      {selectedAddress.Latitude !== null && <p><strong>Latitud:</strong> {selectedAddress.Latitude}</p>}
      {selectedAddress.Longitude !== null && <p><strong>Longitud:</strong> {selectedAddress.Longitude}</p>}
    </div>
  );
};

export default AddressDetails;