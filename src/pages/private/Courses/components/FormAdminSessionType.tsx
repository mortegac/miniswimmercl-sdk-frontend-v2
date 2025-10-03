// import L from 'leaflet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';

import { FormLabel, FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";

// Schema de validación con Yup - NUEVO
const sessionTypeValidationSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  totalSessions: yup
    .number()
    .required('El número total de sesiones es obligatorio')
    .min(1, 'Debe tener al menos 1 sesión')
    .max(1000, 'No puede exceder 1000 sesiones')
    .integer('Debe ser un número entero'),
  
  amount: yup
    .number()
    .required('El monto es obligatorio')
    .min(0, 'El monto no puede ser negativo')
    .max(999999, 'El monto no puede exceder $999,999')
});

// Tipo TypeScript para el formulario - NUEVO
interface SessionTypeFormData {
  name: string;
  totalSessions: number;
  amount: number;
}

export function FormAdminSessionType(props: any) {
  const { data, setData, setCleanData, couseId, locationIdSelected } = props;
  
  // Configuración de React Hook Form con Yup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    reset,
    trigger
  } = useForm<SessionTypeFormData>({
    resolver: yupResolver(sessionTypeValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: data?.name || '',
      totalSessions: data?.totalSessions || 1,
      amount: data?.amount || 0
    }
  });

  // Observar valores para sincronización
  const watchedName = watch('name');
  const watchedTotalSessions = watch('totalSessions');
  const watchedAmount = watch('amount');

  // Función para manejar el envío del formulario
  const onSubmit = async (formData: SessionTypeFormData) => {
    try {
      console.log('Datos del formulario:', formData);
      
      setData({
        ...data,
        ...formData
      });
      
      // Resetear el formulario
      reset();
      
    } catch (error) {
      console.error('Error al crear pack de sesiones:', error);
    }
  };

  // Función para manejar la limpieza
  const handleClean = () => {
    // Limpiar el estado local
    setCleanData({
      name: "",
      totalSessions: 1,
      amount: 0,
    });
    
    // Limpiar el formulario de React Hook Form
    reset();
    
    // Disparar validación para limpiar errores
    trigger();
  };

  const handleDelete = () => {
    if (data?.id) {
      console.log('Eliminar pack de sesiones:', data.id);
    }
  };

  // ✅ Efecto para sincronizar data con el formulario
  React.useEffect(() => {
    if (data) {
      console.log('🔄 Sincronizando data con formulario:', data);
      
      // Resetear formulario con los nuevos valores
      reset({
        name: data?.sessionType?.name || '',
        totalSessions: data?.sessionType?.totalSessions || 1,
        amount: data?.sessionType?.amount || 0
      });
    }
  }, [data, reset]);

  return (
    <>
      <div className={`box p-4 mt-8 flex flex-col ${data?.id && "bg-yellow-50"}`}>
        <div className='flex justify-between'>
          <h3 className="text-lg">Pack de sesiones</h3>
          {data?.id && <span className="p-2 bg-slate-100">EDICION</span>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-0">
          <div className="mt-4 flex flex-row justify-start">
            {/* Campo Nombre */}
            <div className="mt-4 mr-5 w-64">
              <FormLabel htmlFor="name">Nombre del pack *</FormLabel>
              <FormInput 
                id="name"
                type="text"
                {...register('name')}
                className={`mr-2 ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Ej: Pack Básico"
                aria-label="Nombre del pack de sesiones"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Campo Total de Sesiones */}
            <div className="mt-4 mr-5 w-32">
              <FormLabel htmlFor="totalSessions">Total sesiones *</FormLabel>
              <FormInput 
                type="number"
                {...register('totalSessions', { valueAsNumber: true })}
                className={`mr-2 ${errors.totalSessions ? 'border-red-500' : ''}`}
                placeholder="1"
                min="1"
                max="1000"
              />
              {errors.totalSessions && (
                <p className="text-red-500 text-xs mt-1">{errors.totalSessions.message}</p>
              )}
            </div>

            {/* Campo Monto */}
            <div className="mt-4 w-32">
              <FormLabel htmlFor="amount">Monto *</FormLabel>
              <FormInput 
                type="number"
                {...register('amount', { valueAsNumber: true })}
                className={`mr-2 ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>
          </div>
          
          {/* Información del Curso y Sede */}
          <div className="mt-4 flex flex-row justify-start">
            <div className="mt-4 mr-5 w-64">
              <FormLabel htmlFor="course">Curso</FormLabel>
              <p className="text-slate-300">{couseId || 'N/A'}</p>
            </div>
            <div className="mt-4">
              <FormLabel htmlFor="location">Sede</FormLabel>
              <p className="text-slate-300">{locationIdSelected || 'N/A'}</p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-row justify-start items-center py-2">
            <Button 
              type="submit"
              variant="soft-success" 
              className="w-40 mr-4"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Creando...' : 'Crear Pack'}
            </Button>
            
            <Button 
              type="button"
              variant="soft-danger" 
              className="mr-2"
              onClick={handleDelete}
              disabled={!data?.id}
            >
              Eliminar
            </Button>
          </div>
        </form>
        
        {/* Botón de limpiar fuera del formulario */}
        <div className="flex flex-row justify-start items-center py-2">
          <Button 
            id="cleanData"
            type="button"
            variant="soft-dark" 
            className="mr-2"
            onClick={(e:any) => {
              e.preventDefault();
              handleClean();
            }}
          >
            Limpiar
          </Button>
        </div>
        
        {/* Debug info */}
        {/* <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <p><strong>Nombre:</strong> {watchedName}</p>
          <p><strong>Total sesiones:</strong> {watchedTotalSessions}</p>
          <p><strong>Monto:</strong> ${watchedAmount}</p>
          <p><strong>Formulario válido:</strong> {isValid ? 'Sí' : 'No'}</p>
        </div> */}
        
        <pre>locationIdSelected = {JSON.stringify(locationIdSelected, null, 2)}</pre>
        <pre>Data = {JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}