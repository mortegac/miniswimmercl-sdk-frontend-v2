import React, { useState, useRef, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";



function StartAdmin() {
  const [url, setUrl] = useState('https://www.ejemplo.com');
  const qrRef = useRef<HTMLDivElement>(null);
  const [canvasUrl, setCanvasUrl] = useState<string>('');

  useEffect(() => {
    // Depuración inicial para verificar la estructura
    if (qrRef.current) {
      console.log('Referencia actual:', qrRef.current);
      console.log('Número de hijos:', qrRef.current.children.length);
      console.log('Hijos:', Array.from(qrRef.current.children).map(child => child.tagName));
    }
  }, []);

  // const downloadQRCode = () => {
  //   if (!qrRef.current) {
  //     console.error('Referencia del QR es null');
  //     return;
  //   }

  //   // Intentar múltiples métodos de obtención del canvas
  //   const canvasElements = [
  //     // Método 1: querySelector
  //     qrRef.current.querySelector('canvas'),
      
  //     // Método 2: firstElementChild
  //     qrRef.current.firstElementChild,
      
  //     // Método 3: children iteration
  //     ...(qrRef.current.children ? Array.from(qrRef.current.children) : [])
  //   ];

  //   // Filtrar elementos que son canvas
  //   const validCanvases = canvasElements.filter(el => 
  //     el instanceof HTMLCanvasElement
  //   ) as HTMLCanvasElement[];

  //   if (validCanvases.length > 0) {
  //     const canvas = validCanvases[0];
      
  //     try {
  //       const imageUrl = canvas.toDataURL('image/png');
        
  //       const link = document.createElement('a');
  //       link.href = imageUrl;
  //       link.download = 'qr-code.png';
        
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       console.log('Descarga iniciada');
  //     } catch (error) {
  //       console.error('Error al convertir canvas:', error);
  //     }
  //   } else {
  //     console.error('No se encontraron elementos canvas', {
  //       childrenCount: qrRef.current.children.length,
  //       childrenTypes: Array.from(qrRef.current.children).map(child => child.tagName)
  //     });
  //   }
  // };
  
  const downloadQRCode = () => {
    if (!qrRef.current) return;

    // Buscar el SVG
    const svg = qrRef.current.querySelector('svg');
    
    if (svg) {
      // Convertir SVG a cadena
      const svgData = new XMLSerializer().serializeToString(svg);
      
      // Crear un canvas para convertir SVG a imagen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        // Convertir a imagen PNG
        const pngFile = canvas.toDataURL('image/png');
        
        // Crear enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qr-code.png';
        downloadLink.href = pngFile;
        console.log("pngFile", pngFile)
        downloadLink.click();
      };
      
      // Crear imagen desde SVG
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };
  
  return (
    <>
    {/* <pre>{JSON.stringify(locations, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-12">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Dashboard Administrador
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Actualizar
              </a>
            </div>
      
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Generador de Código QR</h2>
      
      <div className="mb-4">
        <label className="block mb-2">URL:</label>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ingresa la URL para generar el código QR"
        />
      </div>
            
      <div className="flex justify-center">
        <div>
        <div ref={qrRef}>
            <QRCodeSVG 
              value={url} 
              size={500}
              level={'H'}
              // includeMargin={true}
              marginSize={4}
              // level={"L"}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              // title={"Title for my QR Code"}
              // imageSettings={{
              //   src: "./qr-logo.png",
              //   x: undefined,
              //   y: undefined,
              //   height: 58,
              //   width: 59,
              //   opacity: 1,
              //   excavate: true,
              // }}
            />
          </div>
          <Button variant="primary" onClick={()=>downloadQRCode()}>DESCARGAR</Button>
          <button onClick={downloadQRCode}>Descargar como PNG</button>
          {/* 
          <button onClick={downloadQRAsSVG}>Descargar como SVG</button> */}
        </div>
      </div>
          
          
          
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default StartAdmin;
