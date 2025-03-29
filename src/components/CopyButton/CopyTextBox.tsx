import { useState, FC } from 'react';

interface CopyTextBoxProps {
  text: string;
  label?: string;
  copyButtonText?: string;
  copiedButtonText?: string;
}

const CopyTextBox: FC<CopyTextBoxProps> = ({ 
  text, 
  label = "Texto:", 
  copyButtonText = "Copiar",
  copiedButtonText = "✓ Copiado"
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  return (
    <div className="copy-text-container">
      {label && <label>{label}</label>}
      <div className="copy-text-box">
        <div className="text-content">{text}</div>
        <button 
          onClick={handleCopy}
          className={`copy-button ${copied ? 'copied' : ''}`}
        >
          {copied ? copiedButtonText : copyButtonText}
        </button>
      </div>
    </div>
  );
};

export default CopyTextBox;