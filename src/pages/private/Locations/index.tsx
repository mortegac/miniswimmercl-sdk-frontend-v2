import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";
import { FormInput, FormLabel, FormSwitch } from "@/components/Base/Form";
import LoadingIcon from "@/components/Base/LoadingIcon";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from "@/stores/breadcrumb";
import {
  getLocationsAdmin,
  createLocationThunk,
  updateLocationThunk,
  selectLocation,
} from "@/stores/Locations/slice";

// ── Validation schema ──────────────────────────────────────────
const schema = yup.object({
  name: yup.string().required("Nombre requerido"),
  city: yup.string().required("Ciudad requerida"),
  region: yup.string().required("Región requerida"),
  group: yup.string().required("Grupo requerido"),
  country: yup.string().required("País requerido"),
  address: yup.string().required("Dirección requerida"),
  phone: yup.string().required("Teléfono requerido"),
  minimumTemperature: yup.number().typeError("Debe ser número").required(),
  maximumTemperature: yup.number().typeError("Debe ser número").required(),
  imageMap: yup.string().optional(),
  urlMap: yup.string().optional(),
  directions: yup.string().optional(),
  isActive: yup.boolean().required(),
  isVisible: yup.boolean().required(),
});

type FormValues = yup.InferType<typeof schema>;

// ── Filter types ───────────────────────────────────────────────
type ActiveFilter = "all" | "active" | "inactive";
type VisibleFilter = "all" | "visible" | "hidden";

// ── LocationForm (Slideover) ───────────────────────────────────
function LocationForm({
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
  const { status } = useAppSelector(selectLocation);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      city: data?.city || "",
      region: data?.region || "",
      group: data?.group || "",
      country: data?.country || "CHILE",
      address: data?.address || "",
      phone: data?.phone || "",
      minimumTemperature: data?.minimumTemperature ?? 28,
      maximumTemperature: data?.maximumTemperature ?? 28,
      imageMap: data?.imageMap || "",
      urlMap: data?.urlMap || "",
      directions: data?.directions || "",
      isActive: data?.isActive ?? true,
      isVisible: data?.isVisible ?? true,
    },
  });

  useEffect(() => {
    reset({
      name: data?.name || "",
      city: data?.city || "",
      region: data?.region || "",
      group: data?.group || "",
      country: data?.country || "CHILE",
      address: data?.address || "",
      phone: data?.phone || "",
      minimumTemperature: data?.minimumTemperature ?? 28,
      maximumTemperature: data?.maximumTemperature ?? 28,
      imageMap: data?.imageMap || "",
      urlMap: data?.urlMap || "",
      directions: data?.directions || "",
      isActive: data?.isActive ?? true,
      isVisible: data?.isVisible ?? true,
    });
  }, [data]);

  const isActiveVal = watch("isActive");
  const isVisibleVal = watch("isVisible");
  const isLoading = status === "loading";

  const onSubmit = async (values: FormValues) => {
    if (isNew) {
      await dispatch(createLocationThunk(values as any));
    } else {
      await dispatch(updateLocationThunk({ ...values, id: data?.id } as any));
    }
    onSaved();
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-medium mb-6">
        {isNew ? "Nueva Sede" : `Editar: ${data?.name}`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <FormLabel htmlFor="name">Nombre *</FormLabel>
          <FormInput id="name" type="text" {...register("name")} className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="city">Ciudad *</FormLabel>
            <FormInput id="city" type="text" {...register("city")} className={errors.city ? "border-red-500" : ""} />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <FormLabel htmlFor="region">Región *</FormLabel>
            <FormInput id="region" type="text" {...register("region")} className={errors.region ? "border-red-500" : ""} />
            {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="group">Grupo *</FormLabel>
            <FormInput id="group" type="text" {...register("group")} className={errors.group ? "border-red-500" : ""} />
            {errors.group && <p className="text-red-500 text-xs mt-1">{errors.group.message}</p>}
          </div>
          <div>
            <FormLabel htmlFor="country">País *</FormLabel>
            <FormInput id="country" type="text" {...register("country")} className={errors.country ? "border-red-500" : ""} />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div>
          <FormLabel htmlFor="address">Dirección *</FormLabel>
          <FormInput id="address" type="text" {...register("address")} className={errors.address ? "border-red-500" : ""} />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <FormLabel htmlFor="phone">Teléfono *</FormLabel>
          <FormInput id="phone" type="text" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="minimumTemperature">Temp. Mínima (°C) *</FormLabel>
            <FormInput id="minimumTemperature" type="number" {...register("minimumTemperature")} className={errors.minimumTemperature ? "border-red-500" : ""} />
          </div>
          <div>
            <FormLabel htmlFor="maximumTemperature">Temp. Máxima (°C) *</FormLabel>
            <FormInput id="maximumTemperature" type="number" {...register("maximumTemperature")} className={errors.maximumTemperature ? "border-red-500" : ""} />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="urlMap">URL Mapa</FormLabel>
          <FormInput id="urlMap" type="text" {...register("urlMap")} placeholder="https://..." />
        </div>

        <div>
          <FormLabel htmlFor="directions">Indicaciones para llegar</FormLabel>
          <textarea
            id="directions"
            {...register("directions")}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
            placeholder="Ej: Tomar la calle X, doblar en Y..."
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-8 pt-2">
          <div className="flex items-center gap-3">
            <FormSwitch>
              <FormSwitch.Input
                id="isActive"
                type="checkbox"
                checked={isActiveVal}
                onChange={(e) => setValue("isActive", e.target.checked)}
              />
            </FormSwitch>
            <FormLabel htmlFor="isActive" className="mb-0">Activa</FormLabel>
          </div>
          <div className="flex items-center gap-3">
            <FormSwitch>
              <FormSwitch.Input
                id="isVisible"
                type="checkbox"
                checked={isVisibleVal}
                onChange={(e) => setValue("isVisible", e.target.checked)}
              />
            </FormSwitch>
            <FormLabel htmlFor="isVisible" className="mb-0">Visible</FormLabel>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="outline-secondary" className="flex-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Lucide icon="Loader" className="w-4 h-4 animate-spin" />
                Guardando...
              </span>
            ) : isNew ? "Crear Sede" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
function Main() {
  const dispatch = useAppDispatch();
  const { locations, status } = useAppSelector(selectLocation);

  const [slideover, setSlideover] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("active");
  const [visibleFilter, setVisibleFilter] = useState<VisibleFilter>("all");

  dispatch(setBreadcrumb({ first: "Administrador de Sedes", firstURL: "locations" }));

  const loadLocations = async (af: ActiveFilter = activeFilter, vf: VisibleFilter = visibleFilter) => {
    const opts: any = {};
    if (af === "all" && vf === "all") {
      opts.skipFilter = true;
    } else {
      if (af !== "all") opts.isActive = af === "active";
      if (vf !== "all") opts.isVisible = vf === "visible";
    }
    await dispatch(getLocationsAdmin(opts));
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleFilterChange = (af: ActiveFilter, vf: VisibleFilter) => {
    setActiveFilter(af);
    setVisibleFilter(vf);
    loadLocations(af, vf);
  };

  const openNew = () => {
    setSelectedLocation(null);
    setIsNew(true);
    setSlideover(true);
  };

  const openEdit = (loc: any) => {
    setSelectedLocation(loc);
    setIsNew(false);
    setSlideover(true);
  };

  const handleDeactivate = async (loc: any) => {
    if (!window.confirm(`¿Desactivar y ocultar la sede "${loc.name}"?`)) return;
    await dispatch(
      updateLocationThunk({
        ...loc,
        isActive: false,
        isVisible: false,
      })
    );
  };

  const handleSaved = () => {
    setSlideover(false);
    loadLocations();
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
            <LocationForm
              data={selectedLocation}
              isNew={isNew}
              onClose={() => setSlideover(false)}
              onSaved={handleSaved}
            />
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>

      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          {/* Header */}
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-6">
            <div className="text-base font-medium group-[.mode--light]:text-white">
              Administrador de Sedes
            </div>
            <div className="md:ml-auto">
              <Button variant="primary" onClick={openNew}>
                <Lucide icon="Plus" className="w-4 h-4 mr-2 stroke-[1.3]" />
                Nueva Sede
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="box p-4 mb-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">Estado:</span>
              {(["all", "active", "inactive"] as ActiveFilter[]).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={activeFilter === f ? "primary" : "outline-secondary"}
                  onClick={() => handleFilterChange(f, visibleFilter)}
                >
                  {f === "all" ? "Todos" : f === "active" ? "Activos" : "Inactivos"}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">Visibilidad:</span>
              {(["all", "visible", "hidden"] as VisibleFilter[]).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={visibleFilter === f ? "primary" : "outline-secondary"}
                  onClick={() => handleFilterChange(activeFilter, f)}
                >
                  {f === "all" ? "Todos" : f === "visible" ? "Visibles" : "Ocultos"}
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          {status === "loading" && (
            <div className="flex justify-center py-10">
              <LoadingIcon color="#AE5EAB" icon="three-dots" className="w-10 h-10" />
            </div>
          )}

          {status === "idle" && (
            <div className="box overflow-hidden">
              <Table className="border-b border-slate-200/60">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Sede</Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Ciudad / Región</Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Temperatura</Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Estado</Table.Td>
                    <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">Acciones</Table.Td>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {Array.isArray(locations) && locations.map((item: any, index: number) => (
                    <Table.Tr
                      key={index}
                      className={`[&_td]:last:border-b-0 ${!item?.isActive ? "bg-slate-100 opacity-60" : ""}`}
                    >
                      <Table.Td className="py-4 border-dashed">
                        <p className="font-medium uppercase">{item?.name}</p>
                        <p className="text-xs text-slate-400">{item?.phone}</p>
                        <p className="text-xs text-slate-400">{item?.address}</p>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        <p className="font-medium">{item?.city}</p>
                        <p className="text-sm text-slate-500">{item?.region}</p>
                        <p className="text-xs text-slate-400">Grupo: {item?.group}</p>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        <p className="text-sm">
                          <span className="text-blue-500 font-medium">{item?.minimumTemperature}°C</span>
                          {" — "}
                          <span className="text-red-400 font-medium">{item?.maximumTemperature}°C</span>
                        </p>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${item?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {item?.isActive ? "Activa" : "Inactiva"}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${item?.isVisible ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                            {item?.isVisible ? "Visible" : "Oculta"}
                          </span>
                        </div>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="soft-success"
                            onClick={() => openEdit(item)}
                          >
                            <Lucide icon="Pencil" className="w-3.5 h-3.5 mr-1" />
                            Editar
                          </Button>
                          {item?.isActive && (
                            <Button
                              size="sm"
                              variant="soft-danger"
                              onClick={() => handleDeactivate(item)}
                            >
                              <Lucide icon="EyeOff" className="w-3.5 h-3.5 mr-1" />
                              Desactivar
                            </Button>
                          )}
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
