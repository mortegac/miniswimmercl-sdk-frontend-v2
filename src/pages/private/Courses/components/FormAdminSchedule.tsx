// import L from 'leaflet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react'; // Importar React para useEffect

import { FormLabel, FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";

// Schema de validación con Yup
const scheduleValidationSchema = yup.object({
    day: yup
      .string()
      .required('El día es obligatorio')
      .oneOf(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'], 'Selecciona un día válido'),
    
    startHour: yup
      .string()
      .required('La hora de inicio es obligatoria')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
      .test('valid-hour', 'Hora de inicio debe ser válida', function(value) {
        if (!value) return false;
        const [hours, minutes] = value.split(':').map(Number);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      }),
    
    endHour: yup
      .string()
      .required('La hora de término es obligatoria')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
      .test('valid-hour', 'Hora de término debe ser válida', function(value) {
        if (!value) return false;
        const [hours, minutes] = value.split(':').map(Number);
        return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
      })
      .test('end-after-start', 'La hora de término debe ser posterior a la hora de inicio', function(value) {
        const { startHour } = this.parent;
        if (!startHour || !value) return true;
        
        const startTime = new Date(`2000-01-01T${startHour}:00`);
        const endTime = new Date(`2000-01-01T${value}:00`);
        
        return endTime > startTime;
      }),
    
    minimumQuotas: yup
      .number()
      .required('El cupo mínimo es obligatorio')
      .min(0, 'El cupo mínimo no puede ser negativo')
      .integer('El cupo mínimo debe ser un número entero')
      .test('min-less-than-max', 'El cupo mínimo debe ser menor al cupo máximo', function(value) {
        const { maximumQuotas } = this.parent;
        return !maximumQuotas || !value || value <= maximumQuotas;
      }),
    
    maximumQuotas: yup
      .number()
      .required('El cupo máximo es obligatorio')
      .min(1, 'El cupo máximo debe ser al menos 1')
      .integer('El cupo máximo debe ser un número entero')
      .test('max-greater-than-min', 'El cupo máximo debe ser mayor al cupo mínimo', function(value) {
        const { minimumQuotas } = this.parent;
        return !minimumQuotas || !value || value >= minimumQuotas;
      })
  });
  
  // Tipo TypeScript para el formulario
  interface ScheduleFormData {
    day: string;
    startHour: string;
    endHour: string;
    minimumQuotas: number;
    maximumQuotas: number;
  }
  
  export function FormAdminSchedule(props: any) {
    const { data, setData, duration, couseId, locationIdSelected } = props;
    
    // Configuración de React Hook Form con Yup
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isValid },
      setValue,
      watch,
      reset,
      trigger
    } = useForm<ScheduleFormData>({
      resolver: yupResolver(scheduleValidationSchema),
      mode: 'onChange',
      defaultValues: {
        day: data?.day || '',
        startHour: data?.startHour || '',
        endHour: data?.endHour || '',
        minimumQuotas: data?.minimumQuotas || 0,
        maximumQuotas: data?.maximumQuotas || 1
      }
    });

    // Observar cambios en startHour para calcular endHour automáticamente
    const watchedStartHour = watch('startHour');
    const watchedEndHour = watch('endHour');

    // Función para sumar minutos a una hora usando Date - VERSIÓN CORREGIDA
    const addMinutesToTime = (timeString: string, minutesToAdd: number): string => {
      console.log(`🔍 Calculando: "${timeString}" + ${minutesToAdd} minutos`);
      
      if (!timeString || !minutesToAdd) {
        console.log('❌ Datos inválidos:', { timeString, minutesToAdd });
        return '';
      }
      
      // Validar formato HH:MM
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(timeString)) {
        console.log('❌ Formato de hora inválido:', timeString);
        return '';
      }
      
      try {
        // Crear una fecha base (cualquier fecha sirve, solo necesitamos la hora)
        const baseDate = new Date('2000-01-01T00:00:00');
        
        // Crear la fecha con la hora de inicio
        const startDate = new Date(`2000-01-01T${timeString}:00`);
        
        // console.log(`📊 Fecha de inicio:`, startDate);
        // console.log(`📊 Hora de inicio:`, startDate.getHours(), ':', startDate.getMinutes());
        
        // Sumar los minutos
        const endDate = new Date(startDate.getTime() + (minutesToAdd * 60 * 1000));
        
        // console.log(`📊 Fecha de término:`, endDate);
        // console.log(`📊 Hora de término:`, endDate.getHours(), ':', endDate.getMinutes());
        
        // Extraer horas y minutos
        const hours = endDate.getHours();
        const minutes = endDate.getMinutes();
        
        // Formatear con 2 dígitos
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        
        const result = `${formattedHours}:${formattedMinutes}`;
        // console.log(`✅ Resultado final: ${result}`);
        
        return result;
        
      } catch (error) {
        console.error('❌ Error en el cálculo:', error);
        return '';
      }
    };



    // Función para manejar el cambio manual de startHour - VERSIÓN MEJORADA
    const handleStartHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStartHour = e.target.value;
      console.log('🎯 Cambio manual en startHour:', newStartHour);
      
      setValue('startHour', newStartHour);
      
      // Calcular y asignar endHour si hay duración
      if (newStartHour && duration) {
        const calculatedEndHour = addMinutesToTime(newStartHour, duration);
        console.log('🎯 Calculando endHour:', calculatedEndHour);
        
        if (calculatedEndHour) {
          setValue('endHour', calculatedEndHour);
          trigger(['startHour', 'endHour']);
        }
      } else {
        trigger('startHour');
      }
    };

    // Función para manejar el envío del formulario
    const onSubmit = async (formData: ScheduleFormData) => {
      try {
        console.log('Datos del formulario:', formData);
        
        setData({
            ...data,
            ...formData
          })
        
        // Resetear el formulario
        reset();
        
      } catch (error) {
        console.error('Error al crear horario:', error);
      }
    };

    // Función para manejar la eliminación
    const handleClean = () => {
        // Limpiar el estado local
        setData({
          day: "",
          startHour: "",
          endHour: "",
          minimumQuotas: "",
          maximumQuotas: "",
        });
        
        // Limpiar el formulario de React Hook Form
        reset();
        
        // Opcional: disparar validación para limpiar errores
        trigger();
      };
    const handleDelete = () => {
      if (data?.id) {
        console.log('Eliminar horario:', data.id);
      }
    };
  
        // Efecto para calcular endHour cuando cambia startHour - VERSIÓN MEJORADA
    React.useEffect(() => {
            //   console.log('🔄 useEffect ejecutado:', { watchedStartHour, duration });
              
              if (watchedStartHour && duration) {
                const calculatedEndHour = addMinutesToTime(watchedStartHour, duration);
                // console.log('📝 Comparando:', { calculatedEndHour, watchedEndHour });
                
                if (calculatedEndHour && calculatedEndHour !== watchedEndHour) {
                //   console.log('✅ Actualizando endHour:', calculatedEndHour);
                  setValue('endHour', calculatedEndHour);
                  trigger('endHour');
                }
              }
    }, [watchedStartHour, duration, setValue, trigger, watchedEndHour]);

    // Observar el valor actual del día
    const watchedDay = watch('day');

    // ✅ Efecto mejorado para FormSelect
    React.useEffect(() => {
      if (data) {
        console.log('🔄 Sincronizando data con formulario:', data);
        
        // Resetear formulario con los nuevos valores
        reset({
          day: data.day || '',
          startHour: data.startHour || '',
          endHour: data.endHour || '',
          minimumQuotas: data.minimumQuotas || 0,
          maximumQuotas: data.maximumQuotas || 1
        });
      }
    }, [data, reset]);

    // ✅ Efecto específico para el FormSelect
    React.useEffect(() => {
      if (data?.day && watchedDay !== data.day) {
        console.log('🔄 Actualizando FormSelect:', data.day);
        setValue('day', data.day);
        trigger('day');
      }
    }, [data?.day, watchedDay, setValue, trigger]);

    // ✅ Agregar key al FormSelect para forzar re-render
    return (
        <>
        
            <div className={`box p-4  mt-8 flex flex-col ${data?.id && "bg-yellow-50"}`}>
                <div className='flex justify-between'>
                    <h3 className="text-lg">Horarios</h3>
                    {data?.id && <span className="p-2 bg-slate-100">EDICION</span>}
                </div>
    
                <form onSubmit={handleSubmit(onSubmit)} className="pt-0">
                    <div className="mt-4 flex flex-row justify-start">
                    {/* Campo Día */}
                    <div className="mt-4 mr-5 w-32">
                        <FormLabel htmlFor="day">Día *</FormLabel>
                        <FormSelect 
                          value={watchedDay} // ✅ Valor controlado
                          className={`mr-2 ${errors.day ? 'border-red-500' : ''}`}
                          onChange={(e) => {
                            setValue('day', e.target.value);
                            trigger('day');
                          }}
                        >
                          <option value="">Seleccionar día</option>
                          <option value="lunes">Lunes</option>
                          <option value="martes">Martes</option>
                          <option value="miercoles">Miércoles</option>
                          <option value="jueves">Jueves</option>
                          <option value="viernes">Viernes</option>
                          <option value="sabado">Sábado</option>
                          <option value="domingo">Domingo</option>
                        </FormSelect>
                        {errors.day && (
                        <p className="text-red-500 text-xs mt-1">{errors.day.message}</p>
                        )}
                    </div>
            
                    {/* Campo Hora de Inicio */}
                    <div className="mt-4 mr-5 w-32">
                        <FormLabel htmlFor="startHour">Hora inicio *</FormLabel>
                        <FormInput 
                        id="startHour"
                        type="text"
                        {...register('startHour')}
                        className={`mr-2 ${errors.startHour ? 'border-red-500' : ''}`}
                        placeholder="HH:MM"
                        aria-label="Hora de inicio horario"
                        onChange={handleStartHourChange}
                        />
                        {errors.startHour && (
                        <p className="text-red-500 text-xs mt-1">{errors.startHour.message}</p>
                        )}
                    </div>
            
                    {/* Campo Hora de Término */}
                    <div className="mt-4 w-32">
                        <FormLabel htmlFor="endHour">Hora término *</FormLabel>
                        <FormInput 
                        id="endHour"
                        type="text"
                        {...register('endHour')}
                        className={`mr-2 ${errors.endHour ? 'border-red-500' : ''}`}
                        placeholder="HH:MM"
                        aria-label="Hora de término horario"
                        readOnly={!!duration} // Hacer solo lectura si hay duración automática
                        />
                        {errors.endHour && (
                        <p className="text-red-500 text-xs mt-1">{errors.endHour.message}</p>
                        )}
                        {duration && (
                        <p className="text-xs text-gray-500 mt-1">
                          Calculado automáticamente (+{duration} min)
                        </p>
                        )}
                    </div>
                    </div>
            
                    <div className="mt-4 flex flex-row justify-start">
                    {/* Campo Cupo Mínimo */}
                    <div className="mt-4 mr-5 w-32">
                        <FormLabel htmlFor="minimumQuotas">Cupo mínimo *</FormLabel>
                        <FormInput 
                        type="number"
                        {...register('minimumQuotas', { valueAsNumber: true })}
                        className={`mr-2 ${errors.minimumQuotas ? 'border-red-500' : ''}`}
                        placeholder="0"
                        min="0"
                        />
                        {errors.minimumQuotas && (
                        <p className="text-red-500 text-xs mt-1">{errors.minimumQuotas.message}</p>
                        )}
                    </div>
            
                    {/* Campo Cupo Máximo */}
                    <div className="mt-4 w-32">
                        <FormLabel htmlFor="maximumQuotas">Cupo máximo *</FormLabel>
                        <FormInput 
                        type="number"
                        {...register('maximumQuotas', { valueAsNumber: true })}
                        className={`mr-2 ${errors.maximumQuotas ? 'border-red-500' : ''}`}
                        placeholder="1"
                        min="1"
                        />
                        {errors.maximumQuotas && (
                        <p className="text-red-500 text-xs mt-1">{errors.maximumQuotas.message}</p>
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
                        {isSubmitting ? 'Creando...' : 'Crear Horario'}
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
                    onClick={(e)=>{
                        e.preventDefault();
                        handleClean()
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
                
                {/* Debug info mejorado */}
                {/* <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                    <p><strong>Duración del curso:</strong> {duration} minutos</p>
                    <p><strong>Hora inicio:</strong> {watchedStartHour}</p>
                    <p><strong>Hora término:</strong> {watchedEndHour}</p>
                    <p><strong>Formulario válido:</strong> {isValid ? 'Sí' : 'No'}</p>
                    <p><strong>Errores:</strong> {Object.keys(errors).length > 0 ? Object.keys(errors).join(', ') : 'Ninguno'}</p>
                </div> */}
                
                <pre>locationIdSelected = {JSON.stringify(locationIdSelected, null, 2)}</pre>
                <pre>Data = {JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    );
  }