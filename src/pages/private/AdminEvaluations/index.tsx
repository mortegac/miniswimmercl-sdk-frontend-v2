import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormInput, FormLabel, FormSwitch } from "@/components/Base/Form";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  getEvaluationLevel,
  createEvaluationLevelThunk,
  updateEvaluationLevelThunk,
  deleteEvaluationLevelThunk,
  createEvaluationObjectiveThunk,
  updateEvaluationObjectiveThunk,
  selectEvaluations,
} from "@/stores/Evaluations/slice";

// ── Level form schema ──────────────────────────────────────────
const levelSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
  description: yup.string().required("Descripción requerida"),
  ico: yup.string().required("URL de imagen requerida"),
  startingAge: yup.number().typeError("Debe ser número").required(),
  endingAge: yup.number().typeError("Debe ser número").required(),
  order: yup.number().typeError("Debe ser número").required(),
});

// ── Objective form schema ──────────────────────────────────────
const objectiveSchema = yup.object({
  texto: yup.string().required("Texto requerido"),
  isMandatory: yup.boolean().required(),
  isActive: yup.boolean().required(),
});

type LevelFormValues = yup.InferType<typeof levelSchema>;
type ObjectiveFormValues = yup.InferType<typeof objectiveSchema>;

// ── LevelForm ──────────────────────────────────────────────────
function LevelForm({
  data,
  isNew,
  onClose,
  onSaved,
}: {
  data: any;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectEvaluations);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LevelFormValues>({
    resolver: yupResolver(levelSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      ico: data?.ico || "",
      startingAge: data?.startingAge ?? 0,
      endingAge: data?.endingAge ?? 0,
      order: data?.order ?? 0,
    },
  });

  useEffect(() => {
    reset({
      name: data?.name || "",
      description: data?.description || "",
      ico: data?.ico || "",
      startingAge: data?.startingAge ?? 0,
      endingAge: data?.endingAge ?? 0,
      order: data?.order ?? 0,
    });
  }, [data]);

  const isLoading = status === "loading";

  const onSubmit = async (values: LevelFormValues) => {
    if (isNew) {
      await dispatch(createEvaluationLevelThunk(values as any));
    } else {
      await dispatch(updateEvaluationLevelThunk({ ...values, id: data?.id } as any));
    }
    onSaved();
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-medium mb-6">
        {isNew ? "Nuevo Level de Evaluación" : `Editar: ${data?.name}`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormLabel htmlFor="lv-name">Nombre *</FormLabel>
          <FormInput id="lv-name" type="text" {...register("name")} className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <FormLabel htmlFor="lv-desc">Descripción *</FormLabel>
          <textarea
            id="lv-desc"
            {...register("description")}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <FormLabel htmlFor="lv-ico">URL Imagen / Ícono *</FormLabel>
          <FormInput id="lv-ico" type="text" {...register("ico")} placeholder="https://..." className={errors.ico ? "border-red-500" : ""} />
          {errors.ico && <p className="text-red-500 text-xs mt-1">{errors.ico.message}</p>}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <FormLabel htmlFor="lv-start">Edad inicio *</FormLabel>
            <FormInput id="lv-start" type="number" {...register("startingAge")} />
          </div>
          <div>
            <FormLabel htmlFor="lv-end">Edad fin *</FormLabel>
            <FormInput id="lv-end" type="number" {...register("endingAge")} />
          </div>
          <div>
            <FormLabel htmlFor="lv-order">Orden *</FormLabel>
            <FormInput id="lv-order" type="number" {...register("order")} />
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline-secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
            {isLoading
              ? <span className="flex items-center gap-2"><Lucide icon="Loader" className="w-4 h-4 animate-spin" />Guardando...</span>
              : isNew ? "Crear Level" : "Guardar cambios"
            }
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── ObjectiveForm ──────────────────────────────────────────────
function ObjectiveForm({
  data,
  isNew,
  levelId,
  onClose,
  onSaved,
}: {
  data: any;
  isNew: boolean;
  levelId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectEvaluations);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ObjectiveFormValues>({
    resolver: yupResolver(objectiveSchema),
    defaultValues: {
      texto: data?.texto || "",
      isMandatory: data?.isMandatory ?? false,
      isActive: data?.isActive ?? true,
    },
  });

  useEffect(() => {
    reset({
      texto: data?.texto || "",
      isMandatory: data?.isMandatory ?? false,
      isActive: data?.isActive ?? true,
    });
  }, [data]);

  const isMandatoryVal = watch("isMandatory");
  const isActiveVal = watch("isActive");
  const isLoading = status === "loading";

  const onSubmit = async (values: ObjectiveFormValues) => {
    if (isNew) {
      await dispatch(createEvaluationObjectiveThunk({
        ...values,
        evaluationLevelId: levelId,
      } as any));
    } else {
      await dispatch(updateEvaluationObjectiveThunk({
        ...values,
        id: data?.id,
        evaluationLevelId: data?.evaluationLevelId,
      } as any));
    }
    onSaved();
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-medium mb-6">
        {isNew ? "Nuevo Objetivo de Evaluación" : "Editar Objetivo"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormLabel htmlFor="obj-texto">Texto del objetivo *</FormLabel>
          <textarea
            id="obj-texto"
            {...register("texto")}
            rows={3}
            className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none ${errors.texto ? "border-red-500" : "border-slate-300"}`}
            placeholder="Ej: El alumno puede flotar boca arriba sin asistencia..."
          />
          {errors.texto && <p className="text-red-500 text-xs mt-1">{errors.texto.message}</p>}
        </div>
        <div className="flex gap-8 pt-2">
          <div className="flex items-center gap-3">
            <FormSwitch>
              <FormSwitch.Input
                id="obj-mandatory"
                type="checkbox"
                checked={isMandatoryVal}
                onChange={(e) => setValue("isMandatory", e.target.checked)}
              />
            </FormSwitch>
            <FormLabel htmlFor="obj-mandatory" className="mb-0">Obligatorio</FormLabel>
          </div>
          {!isNew && (
            <div className="flex items-center gap-3">
              <FormSwitch>
                <FormSwitch.Input
                  id="obj-active"
                  type="checkbox"
                  checked={isActiveVal}
                  onChange={(e) => setValue("isActive", e.target.checked)}
                />
              </FormSwitch>
              <FormLabel htmlFor="obj-active" className="mb-0">Activo</FormLabel>
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline-secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
            {isLoading
              ? <span className="flex items-center gap-2"><Lucide icon="Loader" className="w-4 h-4 animate-spin" />Guardando...</span>
              : isNew ? "Crear Objetivo" : "Guardar cambios"
            }
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────
function Main() {
  const dispatch = useAppDispatch();
  const { evaluationLevels, status } = useAppSelector(selectEvaluations);

  // Slideover state
  const [slideover, setSlideover] = useState(false);
  const [slideoverType, setSlideoverType] = useState<"level" | "objective">("level");
  const [isNew, setIsNew] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [selectedObjective, setSelectedObjective] = useState<any>(null);
  const [currentLevelId, setCurrentLevelId] = useState<string>("");

  useEffect(() => {
    dispatch(getEvaluationLevel({}));
  }, []);

  const openNewLevel = () => {
    setSelectedLevel(null);
    setIsNew(true);
    setSlideoverType("level");
    setSlideover(true);
  };

  const openEditLevel = (level: any) => {
    setSelectedLevel(level);
    setIsNew(false);
    setSlideoverType("level");
    setSlideover(true);
  };

  const openNewObjective = (levelId: string) => {
    setSelectedObjective(null);
    setIsNew(true);
    setCurrentLevelId(levelId);
    setSlideoverType("objective");
    setSlideover(true);
  };

  const openEditObjective = (objective: any) => {
    setSelectedObjective(objective);
    setIsNew(false);
    setCurrentLevelId(objective.evaluationLevelId);
    setSlideoverType("objective");
    setSlideover(true);
  };

  const handleDeleteLevel = async (level: any) => {
    if (!window.confirm(`¿Eliminar el level "${level.name}"? Esta acción no se puede deshacer.`)) return;
    await dispatch(deleteEvaluationLevelThunk(level.id));
  };

  const handleDeactivateObjective = async (objective: any) => {
    if (!window.confirm(`¿Desactivar el objetivo "${objective.texto}"?`)) return;
    await dispatch(updateEvaluationObjectiveThunk({
      ...objective,
      isActive: false,
    }));
  };

  const handleSaved = () => {
    setSlideover(false);
  };

  return (
    <>
      {/* Slideover */}
      <Slideover size="md" open={slideover} onClose={() => setSlideover(false)}>
        <Slideover.Panel className="rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => { e.preventDefault(); setSlideover(false); }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            {slideoverType === "level" ? (
              <LevelForm
                data={selectedLevel}
                isNew={isNew}
                onClose={() => setSlideover(false)}
                onSaved={handleSaved}
              />
            ) : (
              <ObjectiveForm
                data={selectedObjective}
                isNew={isNew}
                levelId={currentLevelId}
                onClose={() => setSlideover(false)}
                onSaved={handleSaved}
              />
            )}
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>

      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          {/* Header */}
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-6">
            <h2 className="text-base font-medium group-[.mode--light]:text-white">
              Administrador de Evaluaciones
            </h2>
            <div className="md:ml-auto">
              <Button variant="primary" onClick={openNewLevel}>
                <Lucide icon="Plus" className="w-4 h-4 mr-2 stroke-[1.3]" />
                Nuevo Level
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-3.5">
            <div className="flex flex-col box min-h-screen">
              {status === "loading" && (
                <div className="flex justify-center py-10">
                  <LoadingIcon color="#AE5EAB" icon="oval" className="w-10 h-10" />
                </div>
              )}

              {status === "idle" && (
                <div className="overflow-auto xl:overflow-visible">
                  <Table className="border-b border-slate-200/60">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 w-40"></Table.Td>
                        <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Descripción y Objetivos</Table.Td>
                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center w-32">Edad</Table.Td>
                        <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 w-48">Acciones</Table.Td>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {Array.isArray(evaluationLevels) &&
                        [...evaluationLevels]
                          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
                          .map((item: any, index: number) => (
                            <Table.Tr key={index} className="[&_td]:last:border-b-0">
                              {/* Image */}
                              <Table.Td className="py-4 border-dashed p-6 w-40">
                                {item?.ico
                                  ? <img className="w-28 object-contain mx-auto" src={item?.ico} alt={item?.name} />
                                  : <div className="w-28 h-28 bg-slate-100 rounded-lg flex items-center justify-center mx-auto"><Lucide icon="Image" className="w-8 h-8 text-slate-300" /></div>
                                }
                                <p className="text-xs text-slate-400 text-center mt-1">orden: {item?.order}</p>
                              </Table.Td>

                              {/* Description + Objectives */}
                              <Table.Td className="py-4 border-dashed">
                                <p className="uppercase font-medium text-lg text-left pt-2 pb-1">{item?.name}</p>
                                <p className="font-base text-sm text-left pb-4 text-slate-500">{item?.description}</p>

                                {/* Objectives list */}
                                <div className="space-y-1 mb-3">
                                  {Array.isArray(item?.evaluationObjectives?.items) &&
                                    item.evaluationObjectives.items
                                      .filter((o: any) => o.isActive !== false)
                                      .map((objective: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                                          <div className="flex items-center gap-3 flex-1">
                                            {objective?.isMandatory
                                              ? <div className="flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary"><Lucide icon="Check" className="stroke-[2] w-3 h-3" /></div>
                                              : <div className="flex items-center justify-center w-5 h-5 rounded bg-slate-200 text-slate-400"><Lucide icon="Minus" className="stroke-[2] w-3 h-3" /></div>
                                            }
                                            <span className="text-sm">{objective?.texto}</span>
                                            {objective?.isMandatory && (
                                              <span className="text-xs font-medium rounded-full border px-2 py-0.5 bg-red-50 text-red-600">Obligatorio</span>
                                            )}
                                          </div>
                                          <div className="flex gap-1 ml-3 shrink-0">
                                            <button
                                              type="button"
                                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 text-slate-500 transition-colors"
                                              onClick={() => openEditObjective(objective)}
                                              title="Editar objetivo"
                                            >
                                              <Lucide icon="Pencil" className="w-3 h-3" />
                                            </button>
                                            <button
                                              type="button"
                                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 text-red-400 transition-colors"
                                              onClick={() => handleDeactivateObjective(objective)}
                                              title="Desactivar objetivo"
                                            >
                                              <Lucide icon="X" className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      ))
                                  }
                                </div>

                                {/* Add objective button */}
                                <button
                                  type="button"
                                  onClick={() => openNewObjective(item.id)}
                                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                                >
                                  <Lucide icon="Plus" className="w-3.5 h-3.5" />
                                  Nuevo Objetivo
                                </button>
                              </Table.Td>

                              {/* Age */}
                              <Table.Td className="py-4 border-dashed w-32 text-center">
                                <p className="uppercase font-thin text-sm rounded-lg border px-2 py-2 bg-slate-50">
                                  {item?.startingAge} a {item?.endingAge} años
                                </p>
                              </Table.Td>

                              {/* Actions */}
                              <Table.Td className="py-4 border-dashed w-48">
                                <div className="flex flex-col gap-2">
                                  <Button size="sm" variant="soft-success" onClick={() => openEditLevel(item)}>
                                    <Lucide icon="Pencil" className="w-3.5 h-3.5 mr-1" />
                                    Editar Level
                                  </Button>
                                  <Button size="sm" variant="soft-danger" onClick={() => handleDeleteLevel(item)}>
                                    <Lucide icon="Trash" className="w-3.5 h-3.5 mr-1" />
                                    Eliminar Level
                                  </Button>
                                </div>
                              </Table.Td>
                            </Table.Tr>
                          ))
                      }
                    </Table.Tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
