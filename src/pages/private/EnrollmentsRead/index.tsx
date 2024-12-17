import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";



function StartAdmin() {
  const [data, setData] = useState('No result');

  const handleScan = (result:any, error:any) => {
    if (result) {
      setData(result?.text);
      // Aquí puedes agregar lógica adicional con el resultado
      console.log('QR escaneado:', result.text);
    }

    if (error) {
      console.info(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Lector de Código QR</h2>
      
      <div className="mb-4">
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'environment' }} // Usa la cámara trasera por defecto
          // style={{ width: '100%' }}
        />
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold">Resultado:</h3>
        <p className="p-2 bg-gray-100 rounded">{data}</p>
      </div>

      {data !== 'No result' && (
        <div className="mt-4">
          <button 
            onClick={() => {
              // Ejemplo de acción con el resultado
              window.open(data, '_blank');
            }}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Abrir URL
          </button>
        </div>
      )}
    </div>
  );
};
export default StartAdmin;
