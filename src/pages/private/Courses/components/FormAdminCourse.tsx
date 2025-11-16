import React from 'react'; // Importar React para useEffect
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { FormLabel, FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";


import { useAppDispatch } from "@/stores/hooks";
import { removeCourse, getCourses } from "@/stores/Courses/slice";


// Schema de validación con Yup - CORREGIDO
const courseValidationSchema = yup.object({
  title: yup
    .string()
    .required('El nombre del curso es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  description: yup
    .string() // ✅ Remover .required()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  startingAge: yup
    .number()
    .required('La edad mínima es obligatoria')
    .min(0, 'La edad mínima no puede ser negativa')
    .max(100, 'La edad mínima no puede exceder 100'),
  
  endingAge: yup
    .number()
    .required('La edad máxima es obligatoria')
    .min(0, 'La edad máxima no puede ser negativa')
    .max(100, 'La edad máxima no puede exceder 100')
    .test('end-greater-than-start', 'La edad máxima debe ser mayor a la edad mínima', function(value) {
      const { startingAge } = this.parent;
      return !startingAge || !value || value >= startingAge;
    }),
  
  ageType: yup
    .string()
    .required('El tipo de edad es obligatorio')
    .oneOf(['YEARS', 'MONTHS'], 'Selecciona un tipo de edad válido'),
  
  AgeGroupType: yup
    .string()
    .required('El grupo etario es obligatorio')
    .oneOf(['BABIES', 'CHILDREN', 'ADULTS', 'PREGNANT', 'OLDER_ADULTS'], 'Selecciona un grupo etario válido'),
  
  duration: yup
    .number()
    .required('La duración es obligatoria')
    .min(1, 'La duración debe ser al menos 1 minuto')
    .max(300, 'La duración no puede exceder 300 minutos')
    .integer('La duración debe ser un número entero'),
  
  isActive: yup
    .boolean()
    .required('El estado activo es obligatorio'),
  
  locationCoursesId: yup
    .string()
    .required('Debe seleccionar una sede')
});

// Tipo TypeScript para el formulario - CORREGIDO
interface CourseFormData {
  id?: string; // ✅ Add optional id property
  title: string;
  description?: string;
  startingAge: number;
  endingAge: number;
  ageType: string; // ✅ Cambiar a string genérico
  AgeGroupType: string; // ✅ Cambiar a string genérico
  duration: number;
  isActive: boolean;
  locationCoursesId: string;
}

// Tipo para las props del componente
interface FormAdminCourseProps {
  type: String;
  data: CourseFormData;
  locations: Array<{
    id: string;
    name: string;
    region?: string;
  }>;
  onSubmit?: (data: CourseFormData) => void;
  setDataCourse?: (data: CourseFormData) => void;
  setNewSlideover?: (value:boolean) => void;
}

// Constantes por defecto para las interfaces
export const DEFAULT_COURSE_FORM_DATA: CourseFormData = {
  title: '',
  description: '',
  startingAge: 0,
  endingAge: 0,
  ageType: 'YEARS', // ✅ Cambiar de '' a 'YEARS'
  AgeGroupType: 'CHILDREN', // ✅ Cambiar de '' a 'CHILDREN'
  duration: 60, // ✅ Cambiar de 30 a 60
  isActive: false,
  locationCoursesId: ''
};

export const DEFAULT_FORM_ADMIN_COURSE_PROPS: FormAdminCourseProps = {
  type:"",
  data: DEFAULT_COURSE_FORM_DATA,
  locations: [],
  onSubmit: undefined
};

// También puedes crear constantes para valores específicos
const AGE_TYPE_OPTIONS = ['YEARS', 'MONTHS'] as const;

const AGE_GROUP_OPTIONS = ['BABIES', 'CHILDREN', 'ADULTS', 'PREGNANT', 'OLDER_ADULTS'] as const;

// Constantes para validación
const VALIDATION_LIMITS = {
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  AGE_MIN: 0,
  AGE_MAX: 100,
  DURATION_MIN: 1,
  DURATION_MAX: 300
} as const;

export function FormAdminCourse(props: FormAdminCourseProps) {
  const { data, locations, onSubmit, setDataCourse, type, setNewSlideover } = props;
  
  const dispatch = useAppDispatch();
  // Configuración de React Hook Form con Yup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    reset,
    trigger
  } = useForm<CourseFormData>({
    resolver: yupResolver(courseValidationSchema) as any,
    mode: 'onChange',
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      startingAge: data?.startingAge || 0,
      endingAge: data?.endingAge || 0,
      ageType: data?.ageType || 'YEARS',
      AgeGroupType: data?.AgeGroupType || 'CHILDREN',
      duration: data?.duration || 60,
      isActive: data?.isActive || false, // ✅ Cambiar data.isActive por data?.isActive
      locationCoursesId: data?.locationCoursesId || ''
    }
  });

  // Observar valores para sincronización
  const watchedTitle = watch('title');
  const watchedStartingAge = watch('startingAge');
  const watchedEndingAge = watch('endingAge');
  const watchedAgeType = watch('ageType');
  const watchedAgeGroupType = watch('AgeGroupType');
  const watchedDuration = watch('duration');
  const watchedIsActive = watch('isActive');
  const watchedLocationId = watch('locationCoursesId');
  
  
  const deleteCourse = async (courseId:string) => {
    try {
      console.log('courseId:', courseId);
      
      if (courseId) {
        await dispatch(removeCourse(courseId)).unwrap();
        await dispatch(getCourses({ isActive: true, locationId:data?.locationCoursesId })); // Recargar lista
        console.log("Curso eliminado");
        setNewSlideover?.(false);
      }
      
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };
  
  // Función para manejar el envío del formulario
  const handleFormSubmit = async (formData: CourseFormData): Promise<void> => {
    try {
      console.log('Datos del formulario:', formData);
      
      if (setDataCourse) {
        setDataCourse({
          ...formData, // ✅ Spread the form data
          id: `${formData?.title}-${formData?.locationCoursesId}` // ✅ Add id separately
        } as CourseFormData & { id: string }); // ✅ Type assertion
      }
      
    } catch (error) {
      console.error('Error al guardar curso:', error);
    }
  };

  // Función para manejar cambios en botones de selección
  const handleAgeTypeChange = (ageType: 'YEARS' | 'MONTHS'): void => {
    setValue('ageType', ageType);
    trigger('ageType');
  };

  const handleAgeGroupChange = (ageGroup: 'BABIES' | 'CHILDREN' | 'ADULTS' | 'PREGNANT' | 'OLDER_ADULTS'): void => {
    setValue('AgeGroupType', ageGroup);
    trigger('AgeGroupType');
  };

  const handleActiveChange = (isActive: boolean): void => {
    setValue('isActive', isActive);
    trigger('isActive');
  };

  const handleLocationChange = (locationId: string): void => {
    setValue('locationCoursesId', locationId);
    trigger('locationCoursesId');
  };

  // Efecto para sincronizar data con el formulario - CORREGIDO
  React.useEffect(() => {
    if (data) {
      console.log('🔄 Sincronizando data con formulario:', data);
      
      // Resetear formulario con los nuevos valores
      reset({
        title: data.title || '',
        description: data.description || '',
        startingAge: data.startingAge || 0,
        endingAge: data.endingAge || 0,
        ageType: data.ageType || 'YEARS',
        AgeGroupType: data.AgeGroupType || 'CHILDREN',
        duration: data.duration || 60,
        isActive: data.isActive || false,
        locationCoursesId: data.locationCoursesId || ''
      });
      
      // ✅ Forzar actualización de todos los campos después del reset
      setTimeout(() => {
        if (data.title) {
          setValue('title', data.title);
        }
        if (data.description) {
          setValue('description', data.description);
        }
        if (data.startingAge !== undefined) {
          setValue('startingAge', data.startingAge);
        }
        if (data.endingAge !== undefined) {
          setValue('endingAge', data.endingAge);
        }
        if (data.ageType) {
          setValue('ageType', data.ageType);
        }
        if (data.AgeGroupType) {
          setValue('AgeGroupType', data.AgeGroupType);
        }
        if (data.duration !== undefined) {
          setValue('duration', data.duration);
        }
        if (data.isActive !== undefined) {
          setValue('isActive', data.isActive);
        }
        if (data.locationCoursesId) {
          setValue('locationCoursesId', data.locationCoursesId);
        }
        
        // Disparar validación completa
        trigger();
      }, 50);
    }
  }, [data, reset, setValue, trigger]);

  return (
    <>
        {/* <pre>{JSON.stringify(data?.locationCoursesId, null, 2 )}</pre> */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="box p-4 mt-8 flex flex-col">
        {/* Nombre del Curso */}
        <div className="">
          <FormLabel htmlFor="title">Nombre del Curso *</FormLabel>
          <FormInput 
            id="title"
            {...register('title')}
            className={errors.title ? 'border-red-500' : ''}
            type="text" 
            placeholder="Ingrese el nombre del curso" 
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="mt-4">
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <FormInput 
            id="description"
            {...register('description')}
            className={errors.description ? 'border-red-500' : ''}
            type="text" 
            placeholder="Descripción del curso" 
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60"></div>
        
        {/* Edades */}
        <div className="mt-4 flex flex-row justify-start">
          <div className="mt-4 mr-5 w-32">
            <FormLabel htmlFor="startingAge">Edad mínima *</FormLabel>
            <FormInput 
              id="startingAge"
              {...register('startingAge', { valueAsNumber: true })}
              className={errors.startingAge ? 'border-red-500' : ''}
              type="number" 
              placeholder="0" 
              min="0"
              max="100"
            />
            {errors.startingAge && (
              <p className="text-red-500 text-xs mt-1">{errors.startingAge.message}</p>
            )}
          </div>
          
          <div className="mt-4 mr-5 w-32">
            <FormLabel htmlFor="endingAge">Edad máxima *</FormLabel>
            <FormInput 
              id="endingAge"
              {...register('endingAge', { valueAsNumber: true })}
              className={errors.endingAge ? 'border-red-500' : ''}
              type="number" 
              placeholder="0" 
              min="0"
              max="100"
            />
            {errors.endingAge && (
              <p className="text-red-500 text-xs mt-1">{errors.endingAge.message}</p>
            )}
          </div>  
          
          <div className="mt-4 mr-5 w-32">
            <FormLabel htmlFor="ageType">Tipo de edad *</FormLabel>
            <div className="flex flex-row">
              <Button 
                type="button"
                variant="outline-secondary" 
                className={`mr-4 ${watchedAgeType === "YEARS" && "bg-green-200"}`}
                onClick={() => handleAgeTypeChange('YEARS')}
              >
                Años
              </Button>
              <Button 
                type="button"
                variant="outline-secondary" 
                className={`mr-4 ${watchedAgeType === "MONTHS" && "bg-green-200"}`}
                onClick={() => handleAgeTypeChange('MONTHS')}
              >
                Meses
              </Button>    
            </div>
            {errors.ageType && (
              <p className="text-red-500 text-xs mt-1">{errors.ageType.message}</p>
            )}
          </div>        
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60"></div>
        
        {/* Grupo etario */}
        <div className="mt-6">
          <FormLabel htmlFor="AgeGroupType" className="mr-4 w-44">Grupo etario *</FormLabel>
          <Button 
            type="button"
            variant="outline-secondary" 
            className={`m-4 ${watchedAgeGroupType === "BABIES" && "bg-green-200"}`}
            onClick={() => handleAgeGroupChange('BABIES')}
          >
            Bebés
          </Button>
          <Button 
            type="button"
            variant="outline-secondary" 
            className={`m-4 ${watchedAgeGroupType === "CHILDREN" && "bg-green-200"}`}
            onClick={() => handleAgeGroupChange('CHILDREN')}
          >
            Niños
          </Button>
          <Button 
            type="button"
            variant="outline-secondary" 
            className={`m-4 ${watchedAgeGroupType === "ADULTS" && "bg-green-200"}`}
            onClick={() => handleAgeGroupChange('ADULTS')}
          >
            Adultos
          </Button>
          <Button 
            type="button"
            variant="outline-secondary" 
            className={`m-4 ${watchedAgeGroupType === "PREGNANT" && "bg-green-200"}`}
            onClick={() => handleAgeGroupChange('PREGNANT')}
          >
            Embarazadas
          </Button>
          <Button 
            type="button"
            variant="outline-secondary" 
            className={`m-4 ${watchedAgeGroupType === "OLDER_ADULTS" && "bg-green-200"}`}
            onClick={() => handleAgeGroupChange('OLDER_ADULTS')}
          >
            Adultos Mayores
          </Button>
          {errors.AgeGroupType && (
            <p className="text-red-500 text-xs mt-1">{errors.AgeGroupType.message}</p>
          )}
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60"></div>
        
        {/* Duración */}
        <div className="mt-6">
          <div className="mt-4 mr-5">
            <FormLabel className="mr-4 w-44" htmlFor="duration">Duración de la clase *</FormLabel>
            <FormInput 
              id="duration"
              {...register('duration', { valueAsNumber: true })}
              className={`mr-2 w-36 ${errors.duration ? 'border-red-500' : ''}`}
              type="number" 
              placeholder="60" 
              min="1"
              max="300"
            /> minutos
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
            )}
          </div>
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60"></div>
        
        {/* Estado activo */}
        <div className="mt-4 flex flex-row justify-start">
          <div className="mt-4 w-56">
            <FormLabel htmlFor="isActive" className="mr-4">Activo *</FormLabel>
            <Button 
              type="button"
              variant="outline-secondary" 
              className={`m-4 ${watchedIsActive === true && "bg-green-200"}`}
              onClick={() => handleActiveChange(true)}
            >
              SI
            </Button>
            <Button 
              type="button"
              variant="outline-secondary" 
              className={`m-4 ${watchedIsActive === false && "bg-green-200"}`}
              onClick={() => handleActiveChange(false)}
            >
              NO
            </Button>
            {errors.isActive && (
              <p className="text-red-500 text-xs mt-1">{errors.isActive.message}</p>
            )}
          </div>          
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60"></div>
        
        {/* Sede */}
        <div className="mt-6">
          <FormLabel htmlFor="locationCoursesId" className="mr-4 w-full">Sede *</FormLabel>
          {Array.isArray(locations) && 
            [...locations].sort((a:any, b:any) => a.region.localeCompare(b.region))
            .map((location, i) => (
              <Button 
                key={`BUTTON-LOCATION-${i}`} 
                type="button"
                variant="outline-secondary" 
                className={`m-2 ${watchedLocationId === location?.id && "bg-green-200"}`}
                onClick={() => handleLocationChange(location.id)}
              >
                <div>
                  <p>{location?.name}</p>
                  <p className="text-sm font-thin">{location?.region}</p>
                </div>
              </Button>
            ))}
          {errors.locationCoursesId && (
            <p className="text-red-500 text-xs mt-1">{errors.locationCoursesId.message}</p>
          )}
        </div>
        
        <div className="w-full mt-5 border-t border-slate-200/60 flex flex-row flex-wrap">
        
          {/* Botón de envío */}
          <Button 
            type="submit"
            variant="primary" 
            className="py-3 px-4 mt-4 mr-4"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Guardando...' : 'Grabar información del curso'}
          </Button>
         { data?.id && <Button
            // key={`${i}-CARD-Schedules`}
            variant="danger"
            className="py-3 px-4 mt-4"
            onClick={() => data?.id && deleteCourse(data?.id)}
          >
            DESHABILITAR
          </Button>}
        </div>
        
      </form>
        {/* <pre>data = {JSON.stringify(data, null, 2 )}</pre> */}
    </>
  );
}