import { useEffect, useCallback, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Lucide from "@/components/Base/Lucide";
import { FormInput, FormLabel, FormSelect, FormCheck } from "@/components/Base/Form";
import IconPickerInput from "@/components/Base/IconPickerInput";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Slideover from "@/components/Base/Headless/Slideover";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setBreadcrumb } from "@/stores/breadcrumb";
import {
  loadRoles, saveRole, removeRole,
  loadPermissions, savePermission, removePermission,
  loadPermissionsPerRole, togglePermission,
  setSelectedRole, selectRolePermissions,
} from "@/stores/RolePermissions/slice";
import type { Role, Permission } from "@/stores/RolePermissions/types";

// ─── Yup schemas ──────────────────────────────────────────────────────────────

const roleSchema = yup.object({
  name: yup.string().required("El nombre es requerido").min(2, "Mínimo 2 caracteres"),
  displayName: yup.string().required("El nombre visible es requerido"),
  icon: yup.string().required("El ícono es requerido"),
});

const permissionSchema = yup.object({
  name: yup.string().required("La ruta es requerida").matches(/^\//, "Debe comenzar con /"),
  displayName: yup.string().required("El nombre visible es requerido"),
  icon: yup.string().required("El ícono es requerido"),
  isVisible: yup.boolean().default(true),
  order: yup.number().typeError("Debe ser número").min(0).max(999).default(99),
  isLeaf: yup.boolean().default(true),
  padreId: yup.string().nullable().optional(),
});

type RoleFormData = yup.InferType<typeof roleSchema>;
type PermissionFormData = yup.InferType<typeof permissionSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value?: string | number | boolean | null }) {
  const display = value === true ? "Sí" : value === false ? "No" : (value ?? "—");
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-[11px] text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-slate-700 break-all">{String(display)}</span>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-danger text-xs mt-1">{msg}</p>;
}

// ─── TAB: ROLES ───────────────────────────────────────────────────────────────

function RolesTab() {
  const dispatch = useAppDispatch();
  const { roles, status, errorMessage } = useAppSelector(selectRolePermissions);
  const isLoading = status === "loading";
  const isSaving = status === "saving";

  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRole, setSelectedRoleLocal] = useState<Role | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } =
    useForm<RoleFormData>({ resolver: yupResolver(roleSchema) });

  const filtered = useMemo(() => {
    if (!search.trim()) return roles;
    const q = search.toLowerCase();
    return roles.filter(r =>
      r.name.toLowerCase().includes(q) || r.displayName.toLowerCase().includes(q)
    );
  }, [roles, search]);

  const refresh = useCallback(() => { dispatch(loadRoles()); }, [dispatch]);

  const openCreate = () => {
    setEditingRole(null);
    reset({ name: "", displayName: "", icon: "Layout" });
    setFormOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    reset({ name: role.name, displayName: role.displayName, icon: role.icon });
    setDetailOpen(false);
    setFormOpen(true);
  };

  const onSubmit = async (data: RoleFormData) => {
    await dispatch(saveRole(editingRole ? { ...editingRole, ...data } : data));
    setFormOpen(false);
    dispatch(loadRoles());
  };

  const handleDelete = async (role: Role) => {
    if (window.confirm(`¿Eliminar el rol "${role.displayName}"? Esta acción no se puede deshacer.`)) {
      await dispatch(removeRole(role.roleId));
      setDetailOpen(false);
      dispatch(loadRoles());
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 box box--stacked p-4">
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 sm:col-span-6">
            <FormLabel className="text-xs text-slate-500 mb-1">Buscar rol</FormLabel>
            <div className="relative">
              <Lucide icon="Search" className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
              <FormInput placeholder="Buscar por nombre..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex justify-end gap-2">
            <Button variant="primary" onClick={openCreate} disabled={isLoading}>
              <Lucide icon="Plus" className="w-4 h-4 mr-1.5" /> Nuevo Rol
            </Button>
            <Button variant="outline-secondary" onClick={refresh} disabled={isLoading}>
              <Lucide icon="RefreshCw" className="w-4 h-4" />
            </Button>
            <Button variant="outline-secondary" onClick={() => setSearch("")} disabled={isLoading}>
              <Lucide icon="X" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="col-span-12 box">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <span className="text-sm text-slate-500">
            {isLoading
              ? <span className="flex items-center gap-2"><LoadingIcon icon="three-dots" color="#03b2cb" className="w-5 h-5" /> Cargando...</span>
              : status === "failed"
              ? <span className="text-danger text-xs">{errorMessage}</span>
              : <span>{filtered.length} roles</span>
            }
          </span>
          <span className="text-xs text-slate-400 hidden sm:block">Click para ver detalle</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Nombre</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Nombre visible</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Ícono</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Creado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(role => (
                <tr
                  key={role.roleId}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => { setSelectedRoleLocal(role); setDetailOpen(true); }}
                >
                  <td className="px-5 py-3 font-mono text-xs text-slate-600">{role.name}</td>
                  <td className="px-5 py-3 text-slate-700">{role.displayName}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Lucide icon={(role.icon || "Layout") as any} className="w-4 h-4 text-theme-1" />
                      {role.icon}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-400">
                    {role.createdAt ? new Date(role.createdAt).toLocaleDateString("es-CL") : "—"}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                    <Lucide icon="Shield" className="w-10 h-10 mx-auto mb-2 stroke-[0.8]" />
                    <div className="text-sm">Sin roles definidos</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slideover detalle */}
      <Slideover open={detailOpen} onClose={() => setDetailOpen(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title>
            <div className="flex items-center gap-2 flex-1">
              <Lucide icon="Shield" className="w-5 h-5 text-theme-1" />
              <span className="font-semibold text-slate-700">Detalle del Rol</span>
            </div>
            <button onClick={() => setDetailOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </Slideover.Title>
          <Slideover.Description>
            {selectedRole && (
              <>
                <DetailRow label="ID" value={selectedRole.roleId} />
                <DetailRow label="Nombre (clave)" value={selectedRole.name} />
                <DetailRow label="Nombre visible" value={selectedRole.displayName} />
                <DetailRow label="Ícono" value={selectedRole.icon} />
                <DetailRow label="Creado" value={selectedRole.createdAt} />
              </>
            )}
          </Slideover.Description>
          <Slideover.Footer className="flex gap-2">
            <Button variant="primary" onClick={() => selectedRole && openEdit(selectedRole)}>
              <Lucide icon="Pencil" className="w-4 h-4 mr-1.5" /> Editar
            </Button>
            <Button variant="danger" onClick={() => selectedRole && handleDelete(selectedRole)}>
              <Lucide icon="Trash2" className="w-4 h-4 mr-1.5" /> Eliminar
            </Button>
            <Button variant="outline-secondary" onClick={() => setDetailOpen(false)}>Cerrar</Button>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>

      {/* Slideover form */}
      <Slideover open={formOpen} onClose={() => setFormOpen(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title>
            <div className="flex items-center gap-2 flex-1">
              <Lucide icon={editingRole ? "Pencil" : "Plus"} className="w-5 h-5 text-theme-1" />
              <span className="font-semibold text-slate-700">{editingRole ? "Editar Rol" : "Nuevo Rol"}</span>
            </div>
            <button onClick={() => setFormOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </Slideover.Title>
          <Slideover.Description>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <FormLabel>Nombre <span className="text-danger">*</span></FormLabel>
                <FormInput {...register("name")} placeholder="adminRole" />
                <FieldError msg={errors.name?.message} />
              </div>
              <div>
                <FormLabel>Nombre visible <span className="text-danger">*</span></FormLabel>
                <FormInput {...register("displayName")} placeholder="Administrador" />
                <FieldError msg={errors.displayName?.message} />
              </div>
              <div>
                <FormLabel>Ícono Lucide <span className="text-danger">*</span></FormLabel>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <IconPickerInput value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
                <FieldError msg={errors.icon?.message} />
              </div>
            </form>
          </Slideover.Description>
          <Slideover.Footer className="flex gap-2">
            <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving
                ? <LoadingIcon icon="three-dots" color="#fff" className="w-4 h-4 mr-1" />
                : <Lucide icon="Save" className="w-4 h-4 mr-1.5" />
              }
              Guardar
            </Button>
            <Button variant="outline-secondary" onClick={() => setFormOpen(false)}>Cancelar</Button>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
}

// ─── TAB: PERMISOS ────────────────────────────────────────────────────────────

function PermissionsTab() {
  const dispatch = useAppDispatch();
  const { permissions, status, errorMessage } = useAppSelector(selectRolePermissions);
  const isLoading = status === "loading";
  const isSaving = status === "saving";

  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPerm, setSelectedPerm] = useState<Permission | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPerm, setEditingPerm] = useState<Permission | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } =
    useForm<PermissionFormData>({ resolver: yupResolver(permissionSchema) });

  const parents = useMemo(() => permissions.filter(p => !p.padreId), [permissions]);

  const filtered = useMemo(() => {
    if (!search.trim()) return permissions;
    const q = search.toLowerCase();
    return permissions.filter(p =>
      p.name.toLowerCase().includes(q) || p.displayName.toLowerCase().includes(q)
    );
  }, [permissions, search]);

  const refresh = useCallback(() => { dispatch(loadPermissions()); }, [dispatch]);

  const openCreate = () => {
    setEditingPerm(null);
    reset({ name: "", displayName: "", icon: "Layout", isVisible: true, order: 99, isLeaf: true, padreId: "" });
    setFormOpen(true);
  };

  const openEdit = (perm: Permission) => {
    setEditingPerm(perm);
    reset({
      name: perm.name, displayName: perm.displayName, icon: perm.icon,
      isVisible: perm.isVisible, order: perm.order, isLeaf: perm.isLeaf ?? true,
      padreId: perm.padreId ?? "",
    });
    setDetailOpen(false);
    setFormOpen(true);
  };

  const onSubmit = async (data: PermissionFormData) => {
    const payload = {
      ...data,
      padreId: data.padreId || undefined,
      ...(editingPerm ? { permissionId: editingPerm.permissionId } : {}),
    };
    await dispatch(savePermission(payload as any));
    setFormOpen(false);
    dispatch(loadPermissions());
  };

  const handleDelete = async (perm: Permission) => {
    if (window.confirm(`¿Eliminar el permiso "${perm.displayName}"?`)) {
      await dispatch(removePermission(perm.permissionId));
      setDetailOpen(false);
      dispatch(loadPermissions());
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 box box--stacked p-4">
        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 sm:col-span-6">
            <FormLabel className="text-xs text-slate-500 mb-1">Buscar permiso</FormLabel>
            <div className="relative">
              <Lucide icon="Search" className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
              <FormInput placeholder="Buscar por ruta o nombre..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 flex justify-end gap-2">
            <Button variant="primary" onClick={openCreate} disabled={isLoading}>
              <Lucide icon="Plus" className="w-4 h-4 mr-1.5" /> Nuevo Permiso
            </Button>
            <Button variant="outline-secondary" onClick={refresh} disabled={isLoading}>
              <Lucide icon="RefreshCw" className="w-4 h-4" />
            </Button>
            <Button variant="outline-secondary" onClick={() => setSearch("")} disabled={isLoading}>
              <Lucide icon="X" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="col-span-12 box">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <span className="text-sm text-slate-500">
            {isLoading
              ? <span className="flex items-center gap-2"><LoadingIcon icon="three-dots" color="#03b2cb" className="w-5 h-5" /> Cargando...</span>
              : status === "failed"
              ? <span className="text-danger text-xs">{errorMessage}</span>
              : <span>{filtered.length} permisos</span>
            }
          </span>
          <span className="text-xs text-slate-400 hidden sm:block">Click para ver detalle</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Ruta</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Nombre visible</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Ícono</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Orden</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Visible</th>
                <th className="text-left px-5 py-3 font-medium text-slate-500 text-xs uppercase">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(perm => (
                <tr
                  key={perm.permissionId}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => { setSelectedPerm(perm); setDetailOpen(true); }}
                >
                  <td className="px-5 py-3 font-mono text-xs text-slate-600">{perm.name}</td>
                  <td className="px-5 py-3 text-slate-700">{perm.displayName}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Lucide icon={(perm.icon || "Layout") as any} className="w-4 h-4 text-theme-1" />
                      {perm.icon}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{perm.order}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${perm.isVisible ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {perm.isVisible ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${perm.isLeaf ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                      {perm.isLeaf ? "Hoja" : "Padre"}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    <Lucide icon="Key" className="w-10 h-10 mx-auto mb-2 stroke-[0.8]" />
                    <div className="text-sm">Sin permisos definidos</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slideover detalle */}
      <Slideover open={detailOpen} onClose={() => setDetailOpen(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title>
            <div className="flex items-center gap-2 flex-1">
              <Lucide icon="Key" className="w-5 h-5 text-theme-1" />
              <span className="font-semibold text-slate-700">Detalle del Permiso</span>
            </div>
            <button onClick={() => setDetailOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </Slideover.Title>
          <Slideover.Description>
            {selectedPerm && (
              <>
                <DetailRow label="ID" value={selectedPerm.permissionId} />
                <DetailRow label="Ruta / Clave" value={selectedPerm.name} />
                <DetailRow label="Nombre visible" value={selectedPerm.displayName} />
                <DetailRow label="Ícono" value={selectedPerm.icon} />
                <DetailRow label="Orden" value={selectedPerm.order} />
                <DetailRow label="Visible en menú" value={selectedPerm.isVisible} />
                <DetailRow label="Es hoja (ruta final)" value={selectedPerm.isLeaf} />
                <DetailRow label="Padre ID" value={selectedPerm.padreId} />
                <DetailRow label="Creado" value={selectedPerm.createdAt} />
              </>
            )}
          </Slideover.Description>
          <Slideover.Footer className="flex gap-2">
            <Button variant="primary" onClick={() => selectedPerm && openEdit(selectedPerm)}>
              <Lucide icon="Pencil" className="w-4 h-4 mr-1.5" /> Editar
            </Button>
            <Button variant="danger" onClick={() => selectedPerm && handleDelete(selectedPerm)}>
              <Lucide icon="Trash2" className="w-4 h-4 mr-1.5" /> Eliminar
            </Button>
            <Button variant="outline-secondary" onClick={() => setDetailOpen(false)}>Cerrar</Button>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>

      {/* Slideover form */}
      <Slideover open={formOpen} onClose={() => setFormOpen(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title>
            <div className="flex items-center gap-2 flex-1">
              <Lucide icon={editingPerm ? "Pencil" : "Plus"} className="w-5 h-5 text-theme-1" />
              <span className="font-semibold text-slate-700">{editingPerm ? "Editar Permiso" : "Nuevo Permiso"}</span>
            </div>
            <button onClick={() => setFormOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </Slideover.Title>
          <Slideover.Description>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <FormLabel>Ruta (name) <span className="text-danger">*</span></FormLabel>
                <FormInput {...register("name")} placeholder="/payments" />
                <p className="text-xs text-slate-400 mt-1">Ruta del router o identificador único (ej: /payments)</p>
                <FieldError msg={errors.name?.message} />
              </div>
              <div>
                <FormLabel>Nombre visible <span className="text-danger">*</span></FormLabel>
                <FormInput {...register("displayName")} placeholder="Pagos" />
                <FieldError msg={errors.displayName?.message} />
              </div>
              <div>
                <FormLabel>Ícono Lucide <span className="text-danger">*</span></FormLabel>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field }) => (
                    <IconPickerInput value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
                <FieldError msg={errors.icon?.message} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FormLabel>Orden en menú</FormLabel>
                  <FormInput type="number" min={0} max={999} {...register("order")} />
                  <FieldError msg={errors.order?.message} />
                </div>
                <div>
                  <FormLabel>Permiso padre (opcional)</FormLabel>
                  <Controller
                    name="padreId"
                    control={control}
                    render={({ field }) => (
                      <FormSelect value={field.value ?? ""} onChange={e => field.onChange(e.target.value)}>
                        <option value="">— Sin padre —</option>
                        {parents.map(p => (
                          <option key={p.permissionId} value={p.permissionId}>
                            {p.displayName}
                          </option>
                        ))}
                      </FormSelect>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Controller
                    name="isVisible"
                    control={control}
                    render={({ field }) => (
                      <FormCheck.Input
                        type="checkbox"
                        checked={field.value ?? true}
                        onChange={e => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                  <FormLabel className="mb-0">Visible en menú</FormLabel>
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    name="isLeaf"
                    control={control}
                    render={({ field }) => (
                      <FormCheck.Input
                        type="checkbox"
                        checked={field.value ?? true}
                        onChange={e => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                  <FormLabel className="mb-0">Es hoja (ruta final)</FormLabel>
                </div>
              </div>
            </form>
          </Slideover.Description>
          <Slideover.Footer className="flex gap-2">
            <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving
                ? <LoadingIcon icon="three-dots" color="#fff" className="w-4 h-4 mr-1" />
                : <Lucide icon="Save" className="w-4 h-4 mr-1.5" />
              }
              Guardar
            </Button>
            <Button variant="outline-secondary" onClick={() => setFormOpen(false)}>Cancelar</Button>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
}

// ─── TAB: ASIGNACIÓN ──────────────────────────────────────────────────────────

function AssignmentTab() {
  const dispatch = useAppDispatch();
  const { roles, permissions, permissionsPerRole, selectedRoleId, assignStatus } =
    useAppSelector(selectRolePermissions);

  const isLoading = assignStatus === "loading";
  const isSaving = assignStatus === "saving";

  const [search, setSearch] = useState("");

  const selectedRole = roles.find(r => r.roleId === selectedRoleId) ?? null;

  const assignedSet = useMemo(
    () => new Set(permissionsPerRole.map(p => p.permissionId)),
    [permissionsPerRole]
  );

  const filteredPerms = useMemo(() => {
    if (!search.trim()) return permissions;
    const q = search.toLowerCase();
    return permissions.filter(p =>
      p.displayName.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [permissions, search]);

  const grouped = useMemo(() => {
    const parents = filteredPerms.filter(p => !p.padreId);
    return parents.map(parent => ({
      parent,
      children: filteredPerms.filter(c => c.padreId === parent.permissionId),
    }));
  }, [filteredPerms]);

  const orphans = useMemo(() => {
    const allChildIds = new Set(grouped.flatMap(g => g.children.map(c => c.permissionId)));
    return filteredPerms.filter(p => p.padreId && !allChildIds.has(p.permissionId));
  }, [filteredPerms, grouped]);

  const refresh = useCallback(() => {
    dispatch(loadRoles());
    dispatch(loadPermissions());
    if (selectedRoleId) dispatch(loadPermissionsPerRole(selectedRoleId));
  }, [dispatch, selectedRoleId]);

  const handleRoleChange = (roleId: string) => {
    dispatch(setSelectedRole(roleId || null));
    if (roleId) dispatch(loadPermissionsPerRole(roleId));
  };

  const handleToggle = (permissionId: string) => {
    if (!selectedRoleId) return;
    const assigned = assignedSet.has(permissionId);
    dispatch(togglePermission({ roleId: selectedRoleId, permissionId, assigned }));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 box box--stacked p-5">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 sm:col-span-5">
            <FormLabel className="text-xs text-slate-500 mb-1">Seleccionar Rol</FormLabel>
            <FormSelect value={selectedRoleId ?? ""} onChange={e => handleRoleChange(e.target.value)}>
              <option value="">— Selecciona un rol —</option>
              {roles.map(r => (
                <option key={r.roleId} value={r.roleId}>{r.displayName} ({r.name})</option>
              ))}
            </FormSelect>
          </div>
          {selectedRole && (
            <div className="col-span-12 sm:col-span-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-theme-1/5 rounded-lg border border-theme-1/20">
                <Lucide icon={(selectedRole.icon || "Shield") as any} className="w-5 h-5 text-theme-1" />
                <div>
                  <div className="text-sm font-medium text-slate-700">{selectedRole.displayName}</div>
                  <div className="text-xs text-slate-400">{assignedSet.size} permisos asignados</div>
                </div>
              </div>
            </div>
          )}
          {selectedRoleId && (
            <div className="col-span-12 sm:col-span-3 flex gap-2">
              <div className="relative flex-1">
                <Lucide icon="Search" className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
                <FormInput placeholder="Filtrar permisos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Button variant="outline-secondary" onClick={refresh} disabled={isLoading}>
                <Lucide icon="RefreshCw" className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {!selectedRoleId ? (
        <div className="col-span-12 box p-10 text-center">
          <Lucide icon="ShieldQuestion" className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">Selecciona un rol para gestionar sus permisos</p>
        </div>
      ) : isLoading ? (
        <div className="col-span-12 box p-10 flex items-center justify-center">
          <LoadingIcon icon="three-dots" color="#03b2cb" className="w-8 h-8" />
        </div>
      ) : (
        <div className="col-span-12 box">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              {assignedSet.size} de {permissions.length} permisos asignados
              {isSaving && <LoadingIcon icon="three-dots" color="#03b2cb" className="w-4 h-4 inline ml-2" />}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Asignado
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> No asignado
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4 max-h-[560px] overflow-y-auto">
            {grouped.map(({ parent, children }) => (
              <div key={parent.permissionId} className="rounded-lg border border-slate-100 overflow-hidden">
                <div
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    assignedSet.has(parent.permissionId)
                      ? "bg-emerald-50 border-l-4 border-l-emerald-400"
                      : "bg-slate-50 border-l-4 border-l-slate-200"
                  }`}
                  onClick={() => handleToggle(parent.permissionId)}
                >
                  <input
                    type="checkbox"
                    checked={assignedSet.has(parent.permissionId)}
                    onChange={() => handleToggle(parent.permissionId)}
                    className="w-4 h-4 rounded border-slate-300 text-theme-1 cursor-pointer"
                    onClick={e => e.stopPropagation()}
                  />
                  <Lucide icon={(parent.icon || "Layout") as any} className="w-4 h-4 text-theme-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700">{parent.displayName}</div>
                    <div className="text-xs text-slate-400 font-mono truncate">{parent.name}</div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Padre · orden {parent.order}</span>
                </div>
                {children.map(child => (
                  <div
                    key={child.permissionId}
                    className={`flex items-center gap-3 px-4 py-2.5 pl-10 border-t border-slate-100 cursor-pointer transition-colors ${
                      assignedSet.has(child.permissionId)
                        ? "bg-emerald-50/60"
                        : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => handleToggle(child.permissionId)}
                  >
                    <input
                      type="checkbox"
                      checked={assignedSet.has(child.permissionId)}
                      onChange={() => handleToggle(child.permissionId)}
                      className="w-4 h-4 rounded border-slate-300 text-theme-1 cursor-pointer"
                      onClick={e => e.stopPropagation()}
                    />
                    <Lucide icon={(child.icon || "ChevronRight") as any} className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-600">{child.displayName}</div>
                      <div className="text-xs text-slate-400 font-mono truncate">{child.name}</div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">orden {child.order}</span>
                  </div>
                ))}
              </div>
            ))}

            {orphans.length > 0 && (
              <div className="rounded-lg border border-slate-100 overflow-hidden">
                <div className="px-4 py-2 bg-amber-50 text-xs text-amber-600 font-medium">
                  Sin grupo asignado
                </div>
                {orphans.map(perm => (
                  <div
                    key={perm.permissionId}
                    className={`flex items-center gap-3 px-4 py-2.5 border-t border-slate-100 cursor-pointer transition-colors ${
                      assignedSet.has(perm.permissionId) ? "bg-emerald-50/60" : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => handleToggle(perm.permissionId)}
                  >
                    <input
                      type="checkbox"
                      checked={assignedSet.has(perm.permissionId)}
                      onChange={() => handleToggle(perm.permissionId)}
                      className="w-4 h-4 rounded border-slate-300 text-theme-1 cursor-pointer"
                      onClick={e => e.stopPropagation()}
                    />
                    <Lucide icon={(perm.icon || "Layout") as any} className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-600">{perm.displayName}</div>
                      <div className="text-xs text-slate-400 font-mono truncate">{perm.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {grouped.length === 0 && orphans.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Lucide icon="SearchX" className="w-10 h-10 mx-auto mb-2 stroke-[0.8]" />
                <div className="text-sm">No hay permisos que coincidan</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE (Main) ──────────────────────────────────────────────────────────────

type Tab = "roles" | "permissions" | "assignment";

function Main() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<Tab>("roles");

  dispatch(setBreadcrumb({ first: "Roles y Permisos", firstURL: "role-permissions" }));

  useEffect(() => {
    dispatch(loadRoles());
    dispatch(loadPermissions());
  }, []);

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "roles", label: "Roles", icon: "Shield" },
    { key: "permissions", label: "Permisos (Rutas)", icon: "Key" },
    { key: "assignment", label: "Asignación Role-Permiso", icon: "ShieldCheck" },
  ];

  return (
    <div className="grid grid-cols-12 gap-y-6 gap-x-6">
      <div className="col-span-12 flex items-center h-10">
        <div className="text-base font-medium">Gestión de Roles y Permisos</div>
        <div className="ml-auto flex items-center gap-2 text-slate-500 text-sm">
          <Lucide icon="ShieldCheck" className="w-4 h-4" />
          <span>Control de acceso al menú lateral</span>
        </div>
      </div>

      <div className="col-span-12 box box--stacked p-4 bg-blue-50/50 border border-blue-100">
        <div className="flex items-start gap-3">
          <Lucide icon="Info" className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Flujo:</strong> (1) Define los <strong>Roles</strong> de usuario (adminRole, coach, etc).
            (2) Define los <strong>Permisos</strong> que representan páginas del menú (nombre = ruta del router, ej: /payments).
            (3) En <strong>Asignación</strong>, selecciona un rol y activa/desactiva los permisos que tendrá acceso.
          </p>
        </div>
      </div>

      <div className="col-span-12">
        <div className="flex border-b border-slate-200 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? "border-theme-1 text-theme-1"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <Lucide icon={tab.icon as any} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-12">
        {activeTab === "roles" && <RolesTab />}
        {activeTab === "permissions" && <PermissionsTab />}
        {activeTab === "assignment" && <AssignmentTab />}
      </div>
    </div>
  );
}

export default Main;
