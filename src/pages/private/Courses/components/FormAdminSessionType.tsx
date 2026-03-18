import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { formatCurrency } from '@/utils/helper';
import { FormLabel, FormInput, FormSelect, FormCheck } from '@/components/Base/Form';
import Button from '@/components/Base/Button';
import Lucide from '@/components/Base/Lucide';
import { Tab } from '@/components/Base/Headless';
import { useAppSelector, useAppDispatch } from '@/stores/hooks';
import {
  getSessionTypes,
  setSessionType as createSessionTypeThunk,
  setCourseSessionType,
  selectSessionType,
} from '@/stores/SessionType/slice';
import { getCourses } from '@/stores/Courses/slice';

// ─── Validation schema for new SessionType ───────────────────────────────────
const newSessionTypeSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  totalSessions: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .min(1, 'Mínimo 1 sesión')
    .integer('Debe ser entero'),
  amount: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .min(0, 'No puede ser negativo'),
  durationSession: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .min(1, 'Mínimo 1 minuto'),
  timeAWeek: yup
    .number()
    .typeError('Debe ser un número')
    .required('Obligatorio')
    .min(1, 'Mínimo 1 vez por semana'),
  isTestClass: yup.boolean().default(false),
});

interface NewSessionTypeForm {
  name: string;
  totalSessions: number;
  amount: number;
  durationSession: number;
  timeAWeek: number;
  isTestClass: boolean;
}

interface Props {
  courseId: string;
  locationIdSelected: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function FormAdminSessionType({ courseId, locationIdSelected, onSuccess, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { sessionTypes, status } = useAppSelector(selectSessionType);

  const [selectedSessionTypeId, setSelectedSessionTypeId] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<NewSessionTypeForm>({
    resolver: yupResolver(newSessionTypeSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      totalSessions: 1,
      amount: 0,
      durationSession: 30,
      timeAWeek: 1,
      isTestClass: false,
    },
  });

  useEffect(() => {
    dispatch(getSessionTypes({ isActive: true }));
  }, [dispatch]);

  // ─── Handle select existing ────────────────────────────────────────────────
  const handleSelectChange = (id: string) => {
    setSelectedSessionTypeId(id);
    const found = Array.isArray(sessionTypes)
      ? sessionTypes.find((st: any) => st.id === id) || null
      : null;
    setSelectedSessionType(found);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleAssignExisting = async () => {
    if (!selectedSessionTypeId) return;
    if (!courseId) {
      setErrorMessage('No hay curso seleccionado.');
      return;
    }
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await dispatch(setCourseSessionType({ courseId, sessionTypeId: selectedSessionTypeId })).unwrap();
      await dispatch(getCourses({ isActive: true, locationId: locationIdSelected }));
      setSuccessMessage(`Pack "${selectedSessionType?.name}" asignado correctamente.`);
      setSelectedSessionTypeId('');
      setSelectedSessionType(null);
    } catch (err: any) {
      setErrorMessage('Error al asignar el pack. Intente nuevamente.');
      console.error(err);
    }
  };

  // ─── Handle create new + assign ───────────────────────────────────────────
  const handleCreateAndAssign = async (formData: NewSessionTypeForm) => {
    if (!courseId) {
      setErrorMessage('No hay curso seleccionado.');
      return;
    }
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const newSessionType: any = await dispatch(
        createSessionTypeThunk({
          name: formData.name,
          totalSessions: formData.totalSessions,
          amount: formData.amount,
          durationSession: formData.durationSession,
          timeAWeek: formData.timeAWeek,
          isTestClass: formData.isTestClass,
          isActive: true,
        })
      ).unwrap();

      if (!newSessionType?.id) throw new Error('No se pudo crear el pack');

      await dispatch(setCourseSessionType({ courseId, sessionTypeId: newSessionType.id })).unwrap();
      await dispatch(getCourses({ isActive: true, locationId: locationIdSelected }));
      await dispatch(getSessionTypes({ isActive: true }));

      setSuccessMessage(`Pack "${formData.name}" creado y asignado correctamente.`);
      reset();
    } catch (err: any) {
      setErrorMessage('Error al crear o asignar el pack. Intente nuevamente.');
      console.error(err);
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Nuevo Pack de Sesiones</h2>
          <p className="text-sm text-slate-500 mt-1">
            Curso: <span className="font-medium text-slate-700">{courseId || '—'}</span>
          </p>
        </div>
        <Button variant="outline-secondary" className="px-2 py-1" onClick={onClose}>
          <Lucide icon="X" className="w-4 h-4" />
        </Button>
      </div>

      {/* Feedback */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
          <Lucide icon="CheckCircle" className="w-4 h-4 shrink-0" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
          <Lucide icon="AlertCircle" className="w-4 h-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <Tab.Group>
        <Tab.List
          variant="boxed-tabs"
          className="w-full bg-white box rounded-[0.6rem] border-slate-200 mb-6"
        >
          <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
            <Tab.Button
              className="w-full py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center gap-2 text-sm"
              as="button"
            >
              <Lucide icon="Search" className="w-4 h-4" />
              Seleccionar existente
            </Tab.Button>
          </Tab>
          <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
            <Tab.Button
              className="w-full py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center gap-2 text-sm"
              as="button"
            >
              <Lucide icon="Plus" className="w-4 h-4" />
              Crear nuevo
            </Tab.Button>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* ── TAB 1: Select existing ────────────────────────────── */}
          <Tab.Panel>
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-400"
                />
                <FormInput
                  type="text"
                  placeholder="Buscar por nombre o N° sesiones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>

              {/* Filtered list */}
              {(() => {
                const term = searchTerm.toLowerCase().trim();
                const filtered = Array.isArray(sessionTypes)
                  ? [...sessionTypes]
                      .filter((st: any) => st.isActive === true)
                      .filter((st: any) => {
                        if (!term) return true;
                        return (
                          st.name?.toLowerCase().includes(term) ||
                          String(st.totalSessions).includes(term)
                        );
                      })
                      .sort((a: any, b: any) => a.totalSessions - b.totalSessions)
                  : [];

                if (filtered.length === 0) {
                  return (
                    <p className="text-sm text-slate-400 text-center py-4">
                      {term ? 'Sin resultados para tu búsqueda.' : 'No hay packs activos disponibles.'}
                    </p>
                  );
                }

                return (
                  <div className="border border-slate-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                    {filtered.map((st: any) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleSelectChange(st.id)}
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 last:border-0 transition-colors
                          ${selectedSessionTypeId === st.id
                            ? 'bg-primary/10 border-l-4 border-l-primary'
                            : 'hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{st.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {st.totalSessions} sesiones · {st.durationSession} min · {st.timeAWeek}x semana
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-primary">
                              ${formatCurrency(st.amount)}
                            </p>
                            {st.isTestClass && (
                              <span className="text-xs text-green-600">prueba</span>
                            )}
                          </div>
                          {selectedSessionTypeId === st.id && (
                            <Lucide icon="CheckCircle" className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })()}

              {/* Preview card */}
              {selectedSessionType && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-sm">
                  <p className="font-semibold text-base">{selectedSessionType.name}</p>
                  <p className="text-slate-600">
                    <span className="font-medium">{selectedSessionType.totalSessions}</span> sesiones ·{' '}
                    <span className="font-medium">{selectedSessionType.durationSession} min</span> ·{' '}
                    <span className="font-medium">{selectedSessionType.timeAWeek}x semana</span>
                  </p>
                  <p className="text-primary text-lg font-semibold">
                    $ {formatCurrency(selectedSessionType.amount)}
                  </p>
                  {selectedSessionType.isTestClass && (
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                      Clase de prueba
                    </span>
                  )}
                </div>
              )}

              <Button
                variant="primary"
                className="w-full"
                onClick={handleAssignExisting}
                disabled={!selectedSessionTypeId || !courseId || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Lucide icon="Loader" className="w-4 h-4 animate-spin" /> Asignando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lucide icon="Link" className="w-4 h-4" /> Asignar Pack
                  </span>
                )}
              </Button>
            </div>
          </Tab.Panel>

          {/* ── TAB 2: Create new ─────────────────────────────────── */}
          <Tab.Panel>
            <form onSubmit={handleSubmit(handleCreateAndAssign)} className="space-y-4">
              {/* Name */}
              <div>
                <FormLabel htmlFor="name">Nombre del pack *</FormLabel>
                <FormInput
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="Ej: 8 clases grupales"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Total sessions */}
                <div>
                  <FormLabel htmlFor="totalSessions">Total sesiones *</FormLabel>
                  <FormInput
                    id="totalSessions"
                    type="number"
                    {...register('totalSessions', { valueAsNumber: true })}
                    min={1}
                    className={errors.totalSessions ? 'border-red-500' : ''}
                  />
                  {errors.totalSessions && (
                    <p className="text-red-500 text-xs mt-1">{errors.totalSessions.message}</p>
                  )}
                </div>

                {/* Amount */}
                <div>
                  <FormLabel htmlFor="amount">Monto (CLP) *</FormLabel>
                  <FormInput
                    id="amount"
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                    min={0}
                    placeholder="0"
                    className={errors.amount ? 'border-red-500' : ''}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <FormLabel htmlFor="durationSession">Duración sesión (min) *</FormLabel>
                  <FormInput
                    id="durationSession"
                    type="number"
                    {...register('durationSession', { valueAsNumber: true })}
                    min={1}
                    className={errors.durationSession ? 'border-red-500' : ''}
                  />
                  {errors.durationSession && (
                    <p className="text-red-500 text-xs mt-1">{errors.durationSession.message}</p>
                  )}
                </div>

                {/* Times a week */}
                <div>
                  <FormLabel htmlFor="timeAWeek">Veces por semana *</FormLabel>
                  <FormInput
                    id="timeAWeek"
                    type="number"
                    {...register('timeAWeek', { valueAsNumber: true })}
                    min={1}
                    max={7}
                    className={errors.timeAWeek ? 'border-red-500' : ''}
                  />
                  {errors.timeAWeek && (
                    <p className="text-red-500 text-xs mt-1">{errors.timeAWeek.message}</p>
                  )}
                </div>
              </div>

              {/* isTestClass */}
              <div className="flex items-center gap-3 pt-1">
                <FormCheck.Input
                  id="isTestClass"
                  type="checkbox"
                  {...register('isTestClass')}
                />
                <FormLabel htmlFor="isTestClass" className="mb-0 cursor-pointer">
                  Es clase de prueba
                </FormLabel>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!isValid || isSubmitting || isLoading || !courseId}
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center gap-2">
                    <Lucide icon="Loader" className="w-4 h-4 animate-spin" /> Creando y asignando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lucide icon="Plus" className="w-4 h-4" /> Crear y Asignar Pack
                  </span>
                )}
              </Button>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Footer: button to close after success */}
      {successMessage && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <Button variant="outline-secondary" className="w-full" onClick={onSuccess}>
            Cerrar y ver cambios
          </Button>
        </div>
      )}
    </div>
  );
}
