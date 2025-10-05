// import L from 'leaflet';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  formatCurrency,
} from "@/utils/helper";

import { FormLabel, FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionTypes, selectSessionType } from "@/stores/SessionType/slice";


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
  const {sessionTypes, status } = useAppSelector(selectSessionType);
  const dispatch = useAppDispatch();
  
  // Estado para el SessionType seleccionado
  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState<string>("");
  
  const [dataSessionType, setDataSessionType] = useState({
    id: "",
    name: "",
    description: "",
    durationSession: 0,
    timeAWeek: 0,
    totalSessions: 0,
    amount: 0,
    isActive: true,
    isTestClass: false,
    // packValidity: null,
  })
  
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
  // const watchedName = watch('name');
  // const watchedTotalSessions = watch('totalSessions');
  // const watchedAmount = watch('amount');

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
  const handleClean = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (data?.id) {
      console.log('Eliminar pack de sesiones:', data.id);
    }
  };
 
  const setIdDataSessionType = (idSessionType: string): void => {
    if (idSessionType && Array.isArray(sessionTypes)) {
      // Filtrar el SessionType que coincide con el ID
      const selectedSessionType = sessionTypes.find((sessionType: any) => 
        sessionType.id === idSessionType
      );
      
      if (selectedSessionType) {
        // Actualizar el estado con los datos del SessionType seleccionado
        setDataSessionType({
          id: selectedSessionType.id || "",
          name: selectedSessionType.name || "",
          description: selectedSessionType.description || "",
          durationSession: selectedSessionType.durationSession || 0,
          timeAWeek: selectedSessionType.timeAWeek || 0,
          totalSessions: selectedSessionType.totalSessions || 0,
          amount: selectedSessionType.amount || 0,
          isActive: selectedSessionType.isActive || false,
          isTestClass: selectedSessionType.isTestClass || false,
          // packValidity: selectedSessionType.packValidity || 0,
        });
        
        // También actualizar el formulario con los valores
        setValue('name', selectedSessionType.name);
        setValue('totalSessions', selectedSessionType.totalSessions);
        setValue('amount', selectedSessionType.amount);
        
        // Disparar validación
        trigger();
        
        console.log('SessionType seleccionado:', selectedSessionType);
      } else {
        console.log('No se encontró SessionType con ID:', idSessionType);
      }
    }
  };

  // Observar el valor actual del día
  const watchedName = watch('name');
  
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

  // ✅ Efecto corregido para cargar SessionTypes
  useEffect(() => {
    const loadSessionTypes = async () => {
      try {
        await dispatch(getSessionTypes({
          isActive: true
        }));
      } catch (error) {
        console.error('Error al cargar tipos de sesión:', error);
      }
    };

    loadSessionTypes();
  }, [dispatch]);

    // ✅ Efecto específico para el FormSelect
    React.useEffect(() => {
      if (data?.day && watchedName !== data.day) {
        console.log('🔄 Actualizando FormSelect:', data.day);
        setValue('name', data.day);
        trigger('name');
      }
    }, [data?.day, watchedName, setValue, trigger]);

    
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
              <FormSelect 
                value={selectedSessionTypeId} // ✅ Usar el estado del ID seleccionado
                className={`mr-2 ${errors.name ? 'border-red-500' : ''}`}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedSessionTypeId(selectedId); // ✅ Actualizar el estado del ID
                  setIdDataSessionType(selectedId);
                }}
              >
                <option value="">Seleccionar pack de sesiones</option>
                {Array.isArray(sessionTypes) && sessionTypes.map((sessionType: any, index: number) => (
                  <option key={sessionType?.id || index} value={sessionType?.id}>
                    {sessionType?.name}
                  </option>
                ))}
              </FormSelect>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Campo Total de Sesiones */}
            <div className="mt-4 mr-5 w-32">
              <FormLabel htmlFor="totalSessions">Total sesiones *</FormLabel>
              <h3 className='text-xl p-2 text-left w-24'>{dataSessionType?.totalSessions}</h3>
              {/* <FormInput 
                type="number"
                {...register('totalSessions', { valueAsNumber: true })}
                className={`mr-2 ${errors.totalSessions ? 'border-red-500' : ''}`}
                placeholder="1"
                min="1"
                max="1000"
              />
              {errors.totalSessions && (
                <p className="text-red-500 text-xs mt-1">{errors.totalSessions.message}</p>
              )} */}
            </div>

            {/* Campo Monto */}
            <div className="mt-4 w-32">
              <FormLabel htmlFor="amount">Monto *</FormLabel>
              <h3 className='text-xl p-2 text-left w-48'>$ {formatCurrency(dataSessionType?.amount)}</h3>

              {/* <FormInput 
                type="number"
                {...register('amount', { valueAsNumber: true })}
                className={`mr-2 ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )} */}
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
              {isSubmitting ? 'Creando...' : 'Asignar Pack'}
            </Button>
            
            <Button 
              type="button"
              variant="soft-danger" 
              className="mr-2"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleDelete(e);
              }}
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleClean(e);
            }}
          >
            Limpiar
          </Button>
        </div>
        
        {/* <pre>SessionTypes = {JSON.stringify(sessionTypes, null, 2)}</pre> */}
        <pre>DataSessionType seleccionado = {JSON.stringify(dataSessionType, null, 2)}</pre>
        {/* Debug info mejorado */}
        {/* <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>SessionTypes cargados:</strong> {sessionTypes?.length || 0}</p>
          <p><strong>Formulario válido:</strong> {isValid ? 'Sí' : 'No'}</p>
        </div>
        
        <pre>locationIdSelected = {JSON.stringify(locationIdSelected, null, 2)}</pre>
        <pre>Data = {JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </>
  );
}