import { useState, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import Lucide, { icons } from "@/components/Base/Lucide";
import Dialog from "@/components/Base/Headless/Dialog";
import { FormInput } from "@/components/Base/Form";

interface IconPickerInputProps {
  value: string;
  onChange: (icon: string) => void;
  className?: string;
}

const iconNames = Object.keys(icons) as (keyof typeof icons)[];

export function IconPickerInput({ value, onChange, className }: IconPickerInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const list = q ? iconNames.filter(n => n.toLowerCase().includes(q)) : iconNames;
    return list.slice(0, 240);
  }, [search]);

  const close = () => { setOpen(false); setSearch(""); };

  const handleSelect = (name: string) => {
    onChange(name);
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={twMerge([
          "w-full flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md bg-white text-sm text-slate-600 hover:border-theme-1 transition-colors",
          className,
        ])}
      >
        {value ? (
          <>
            <Lucide icon={value as any} className="w-4 h-4 text-theme-1 shrink-0" />
            <span className="font-mono">{value}</span>
          </>
        ) : (
          <span className="text-slate-400">Seleccionar ícono...</span>
        )}
        <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto text-slate-400 shrink-0" />
      </button>

      <Dialog open={open} onClose={close} size="xl">
        <Dialog.Panel>
          <Dialog.Title>
            <Lucide icon="Shapes" className="w-5 h-5 text-theme-1 mr-2" />
            <span className="font-semibold text-slate-700">Seleccionar Ícono</span>
            <button type="button" onClick={close} className="ml-auto text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </Dialog.Title>
          <Dialog.Description className="p-4">
            <div className="relative mb-3">
              <Lucide icon="Search" className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
              <FormInput
                autoFocus
                placeholder="Buscar ícono... (ej: Home, User, Settings)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {search.trim()
                ? `${filtered.length} resultados para "${search}"`
                : `${iconNames.length} íconos disponibles · mostrando primeros 240`}
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 max-h-[420px] overflow-y-auto pr-1">
              {filtered.map(name => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleSelect(name)}
                  title={name}
                  className={twMerge([
                    "flex flex-col items-center gap-1 p-2 rounded-lg border border-transparent hover:border-theme-1/30 hover:bg-theme-1/5 transition-colors",
                    value === name && "border-theme-1 bg-theme-1/10",
                  ])}
                >
                  <Lucide icon={name as any} className="w-5 h-5 text-slate-600" />
                  <span className="text-[9px] text-slate-400 truncate w-full text-center leading-tight">{name}</span>
                </button>
              ))}
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default IconPickerInput;
