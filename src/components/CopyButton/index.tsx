import { useState, FC } from 'react';

import Lucide from "@/components/Base/Lucide";

interface CopyButtonProps {
  text: string;
  successMessage?: string;
  buttonText?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ 
  text, 
  successMessage = 'Copiado!', 
  buttonText = 'Copiar al portapapeles' 
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`copy-button ${copied ? 'copied' : ''}`}
    >
      {/* {copied ? successMessage : buttonText} */}
      { copied ? <Lucide icon="Check" className={`w-8 h-8 text-primary`} />
      :<Lucide icon="Copy" className={`w-7 h-7 "text-slate-200`} />
        
    }
    </button>
  );
};

export default CopyButton;