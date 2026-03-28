import { useEffect, useState, useCallback, useRef } from "react";
import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  selectAppUsers,
  getAppUsers,
  getAppRoles,
  getCognitoUserInfo,
  createAppUserThunk,
  updateAppUserThunk,
  deleteAppUserThunk,
  setCognitoPasswordThunk,
  setCognitoStatusThunk,
  createCognitoUserThunk,
  clearMutationError,
  clearCognitoState,
} from "@/stores/AppUsers/slice";
import type { AppUser, UserFormData } from "@/stores/AppUsers/types";
import { emptyUserForm } from "@/stores/AppUsers/types";

/* ── helpers ────────────────────────────────────────────────────────────────── */
function sortUsers(users: AppUser[]): AppUser[] {
  return [...users].sort((a, b) => {
    const empA = a.isEmployed ? 0 : 1;
    const empB = b.isEmployed ? 0 : 1;
    if (empA !== empB) return empA - empB;
    return (a.name ?? "").localeCompare(b.name ?? "");
  });
}

type FilterType = "all" | "employees" | "active-employees" | "non-employees";

/* ── main page ──────────────────────────────────────────────────────────────── */
export default function UsersAdmin() {
  const dispatch = useAppDispatch();
  const {
    status, mutationStatus, users, roles, errorMessage,
    cognitoStatus, cognitoActionStatus, cognitoUser, cognitoErrorMessage,
  } = useAppSelector(selectAppUsers);

  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<AppUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppUser | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    Promise.all([dispatch(getAppUsers()), dispatch(getAppRoles())]).finally(
      () => { pendingRef.current = false; }
    );
  }, []);

  const handleOpenCreate = useCallback(() => {
    setEditUser(null);
    dispatch(clearMutationError());
    dispatch(clearCognitoState());
    setFormOpen(true);
  }, [dispatch]);

  const handleOpenEdit = useCallback(
    (user: AppUser) => {
      setEditUser(user);
      dispatch(clearMutationError());
      dispatch(clearCognitoState());
      // cargar estado Cognito al abrir
      dispatch(getCognitoUserInfo(user.id));
      setFormOpen(true);
    },
    [dispatch]
  );

  const handleCloseForm = useCallback(() => {
    setFormOpen(false);
    setEditUser(null);
    dispatch(clearCognitoState());
  }, [dispatch]);

  const handleSave = useCallback(
    async (data: UserFormData) => {
      if (editUser) {
        const result = await dispatch(updateAppUserThunk({ id: editUser.id, data }));
        if (!result.type.endsWith("/rejected")) setFormOpen(false);
      } else {
        if (data.createInCognito) {
          // Crear en Cognito + DynamoDB via Lambda
          const result = await dispatch(
            createCognitoUserThunk({
              email: data.id,
              name: data.name,
              temporaryPassword: data.temporaryPassword,
              contactPhone: data.contactPhone,
              roleId: data.roleId || undefined,
              isEmployed: data.isEmployed,
            })
          );
          if (!result.type.endsWith("/rejected")) {
            // también recargar lista
            dispatch(getAppUsers());
            setFormOpen(false);
          }
        } else {
          // Solo crear en DynamoDB
          const result = await dispatch(createAppUserThunk(data));
          if (!result.type.endsWith("/rejected")) setFormOpen(false);
        }
      }
    },
    [dispatch, editUser]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteAppUserThunk(deleteTarget.id));
    if (!result.type.endsWith("/rejected")) setDeleteTarget(null);
  }, [dispatch, deleteTarget]);

  const handleSetPassword = useCallback(
    async (email: string, password: string, permanent: boolean) => {
      await dispatch(setCognitoPasswordThunk({ email, password, permanent }));
    },
    [dispatch]
  );

  const handleToggleCognitoStatus = useCallback(
    async (email: string, currentEnabled: boolean) => {
      await dispatch(setCognitoStatusThunk({ email, enabled: !currentEnabled }));
    },
    [dispatch]
  );

  const roleLabel = useCallback(
    (roleId?: string) => {
      if (!roleId) return "—";
      return roles.find((r) => r.id === roleId)?.displayName ?? roleId;
    },
    [roles]
  );

  const filteredUsers = sortUsers(
    users.filter((u) => {
      if (filter === "employees" && !u.isEmployed) return false;
      if (filter === "active-employees" && !(u.isEmployed && u.isActive !== false)) return false;
      if (filter === "non-employees" && u.isEmployed) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          u.name?.toLowerCase().includes(q) ||
          u.id?.toLowerCase().includes(q) ||
          u.contactPhone?.toLowerCase().includes(q)
        );
      }
      return true;
    })
  );

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Gestión de Usuarios</h2>
          <p className="text-xs text-slate-400 mt-0.5">Administra usuarios y roles del sistema</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreate}>
          <Lucide icon="UserPlus" className="w-3.5 h-3.5 mr-1.5" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 box mb-5">
        <div className="flex rounded-md border border-slate-200 overflow-hidden text-sm">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "employees", label: "Empleados" },
              { key: "active-employees", label: "Empleados activos" },
              { key: "non-employees", label: "No empleados" },
            ] as { key: FilterType; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 transition-colors ${
                filter === key ? "bg-theme-1 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Lucide icon="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email o teléfono..."
            className="w-full border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">
          {filteredUsers.length} usuario{filteredUsers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="p-5 box">
        {status === "loading" && (
          <div className="flex justify-center items-center h-40">
            <LoadingIcon color="purple" icon="three-dots" className="w-10 h-10" />
          </div>
        )}
        {status === "failed" && <p className="text-danger text-sm">{errorMessage}</p>}
        {status === "idle" && filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Lucide icon="Users" className="w-14 h-14 text-slate-200 stroke-[0.5]" />
            <p className="mt-3 text-slate-400">No se encontraron usuarios.</p>
          </div>
        )}
        {status === "idle" && filteredUsers.length > 0 && (
          <div className="w-full overflow-x-auto">
            <Table className="border-b border-slate-200/60 w-full">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="py-3 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Nombre</Table.Td>
                  <Table.Td className="py-3 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Email</Table.Td>
                  <Table.Td className="py-3 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Teléfono</Table.Td>
                  <Table.Td className="py-3 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Rol</Table.Td>
                  <Table.Td className="py-3 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">Empleado</Table.Td>
                  <Table.Td className="py-3 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">Emp. Activo</Table.Td>
                  <Table.Td className="py-3 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">Academia</Table.Td>
                  <Table.Td className="py-3 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">Activo</Table.Td>
                  <Table.Td className="py-3 border-t bg-slate-50 border-slate-200/60" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredUsers.map((user, i) => (
                  <Table.Tr key={user.id || i} className="[&_td]:last:border-b-0">
                    <Table.Td className="py-3 border-dashed">
                      <div className="flex items-center gap-2">
                        {user.isEmployed && <span className="w-1.5 h-1.5 rounded-full bg-theme-1 flex-shrink-0" />}
                        <span className="text-sm font-medium text-slate-700">{user.name || "—"}</span>
                      </div>
                    </Table.Td>
                    <Table.Td className="py-3 border-dashed whitespace-nowrap">
                      <span className="text-sm text-slate-500">{user.id}</span>
                    </Table.Td>
                    <Table.Td className="py-3 border-dashed whitespace-nowrap">
                      <span className="text-sm text-slate-500">{user.contactPhone || "—"}</span>
                    </Table.Td>
                    <Table.Td className="py-3 border-dashed whitespace-nowrap">
                      <RoleBadge roleId={user.roleId} label={roleLabel(user.roleId)} />
                    </Table.Td>
                    <Table.Td className="py-3 border-dashed text-center"><BoolIcon value={!!user.isEmployed} /></Table.Td>
                    <Table.Td className="py-3 border-dashed text-center"><BoolIcon value={user.isActive !== false} /></Table.Td>
                    <Table.Td className="py-3 border-dashed text-center"><BoolIcon value={!!user.isAcademyStudent} /></Table.Td>
                    <Table.Td className="py-3 border-dashed text-center"><BoolIcon value={!!user.validated} /></Table.Td>
                    <Table.Td className="py-3 border-dashed text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleOpenEdit(user)}>
                          <Lucide icon="Pencil" className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => setDeleteTarget(user)}>
                          <Lucide icon="Trash2" className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Form Slideover */}
      <UserFormSlideover
        open={formOpen}
        editUser={editUser}
        roles={roles}
        mutationStatus={mutationStatus}
        errorMessage={mutationStatus === "failed" ? errorMessage : ""}
        cognitoUser={cognitoUser}
        cognitoStatus={cognitoStatus}
        cognitoActionStatus={cognitoActionStatus}
        cognitoErrorMessage={cognitoErrorMessage}
        onClose={handleCloseForm}
        onSave={handleSave}
        onSetPassword={handleSetPassword}
        onToggleCognitoStatus={handleToggleCognitoStatus}
      />

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteConfirmModal
          user={deleteTarget}
          isDeleting={mutationStatus === "deleting"}
          error={mutationStatus === "failed" ? errorMessage : ""}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

/* ── BoolIcon ───────────────────────────────────────────────────────────────── */
function BoolIcon({ value }: { value: boolean }) {
  return value
    ? <Lucide icon="CheckCircle" className="w-4 h-4 text-green-500 mx-auto" />
    : <Lucide icon="Circle" className="w-4 h-4 text-slate-200 mx-auto" />;
}

/* ── RoleBadge ──────────────────────────────────────────────────────────────── */
function RoleBadge({ roleId, label }: { roleId?: string; label: string }) {
  if (!roleId) return <span className="text-slate-300 text-xs">—</span>;
  const colorMap: Record<string, string> = {
    adminRole:   "bg-purple-100 text-purple-700",
    anfitrion:   "bg-blue-100 text-blue-700",
    coach:       "bg-green-100 text-green-700",
    parents:     "bg-orange-100 text-orange-700",
    academyRole: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorMap[roleId] ?? "bg-slate-100 text-slate-600"}`}>
      {label}
    </span>
  );
}

/* ── Toggle ─────────────────────────────────────────────────────────────────── */
function Toggle({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${checked ? "bg-theme-1" : "bg-slate-200"}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

/* ── UserFormSlideover ──────────────────────────────────────────────────────── */
interface FormProps {
  open: boolean;
  editUser: AppUser | null;
  roles: { id: string; displayName: string }[];
  mutationStatus: string;
  errorMessage: string;
  cognitoUser: any;
  cognitoStatus: string;
  cognitoActionStatus: string;
  cognitoErrorMessage: string;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  onSetPassword: (email: string, password: string, permanent: boolean) => void;
  onToggleCognitoStatus: (email: string, currentEnabled: boolean) => void;
}

function UserFormSlideover({
  open, editUser, roles, mutationStatus, errorMessage,
  cognitoUser, cognitoStatus, cognitoActionStatus, cognitoErrorMessage,
  onClose, onSave, onSetPassword, onToggleCognitoStatus,
}: FormProps) {
  const [form, setForm] = useState<UserFormData>(emptyUserForm);
  const [activeTab, setActiveTab] = useState<"data" | "cognito">("data");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPermanent, setPasswordPermanent] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveTab("data");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess(false);
      setForm(
        editUser
          ? {
              id: editUser.id,
              name: editUser.name ?? "",
              contactPhone: editUser.contactPhone ?? "",
              roleId: editUser.roleId ?? "",
              isEmployed: !!editUser.isEmployed,
              isActive: editUser.isActive !== false,
              isAcademyStudent: !!editUser.isAcademyStudent,
              validated: editUser.validated ?? true,
              createInCognito: false,
              temporaryPassword: "",
            }
          : emptyUserForm
      );
    }
  }, [open, editUser]);

  // cuando cognitoActionStatus pasa a idle después de cambio de contraseña
  useEffect(() => {
    if (cognitoActionStatus === "idle" && newPassword && !cognitoErrorMessage) {
      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
  }, [cognitoActionStatus]);

  const set = (field: keyof UserFormData, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isSaving = mutationStatus === "saving";
  const isCognitoSaving = cognitoActionStatus === "saving";
  const isEdit = !!editUser;

  const passwordValid =
    newPassword.length >= 8 && newPassword === confirmPassword;

  return (
    <Slideover open={open} onClose={onClose} size="md">
      <Slideover.Panel>
        <Slideover.Title>
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-slate-700">
              {isEdit ? `Editar: ${editUser?.name || editUser?.id}` : "Nuevo Usuario"}
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </div>
        </Slideover.Title>

        <Slideover.Description className="flex flex-col p-5 gap-0">
          {/* Tabs — solo en edición */}
          {isEdit && (
            <div className="flex border-b border-slate-200 mb-5 -mx-5 px-5">
              {(
                [
                  { key: "data",    label: "Datos" },
                  { key: "cognito", label: "Seguridad (Cognito)" },
                ] as { key: "data" | "cognito"; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`pb-2.5 mr-5 text-sm border-b-2 transition-colors ${
                    activeTab === key
                      ? "border-theme-1 text-theme-1 font-medium"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* ── Tab Datos ─────────────────────────────────────────────────────── */}
          {activeTab === "data" && (
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  value={form.id}
                  onChange={(e) => set("id", e.target.value.toLowerCase().trim())}
                  disabled={isEdit}
                  placeholder="usuario@ejemplo.com"
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1 disabled:bg-slate-50 disabled:text-slate-400"
                />
                {isEdit && <p className="text-xs text-slate-400">El email no se puede modificar.</p>}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Nombre completo"
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Teléfono</label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => set("contactPhone", e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500">Rol</label>
                <select
                  value={form.roleId}
                  onChange={(e) => set("roleId", e.target.value)}
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1 bg-white"
                >
                  <option value="">— Sin rol —</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.displayName}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-3 border border-slate-100 rounded-lg p-3 bg-slate-50">
                <Toggle label="Empleado" description="Pertenece al equipo de trabajo" checked={form.isEmployed} onChange={(v) => set("isEmployed", v)} />
                <Toggle label="Empleado activo" description="Empleado en actividad (isActive)" checked={form.isActive} onChange={(v) => set("isActive", v)} />
                <Toggle label="Alumno Academia" description="Es alumno de la academia" checked={form.isAcademyStudent} onChange={(v) => set("isAcademyStudent", v)} />
                <Toggle label="Activo / Validado" description="El usuario puede acceder al sistema" checked={form.validated} onChange={(v) => set("validated", v)} />
              </div>

              {/* Crear en Cognito (solo en creación) */}
              {!isEdit && (
                <div className="flex flex-col gap-3 border border-blue-100 rounded-lg p-3 bg-blue-50/50">
                  <Toggle
                    label="Crear también en Cognito"
                    description="Crea la cuenta de acceso al sistema"
                    checked={form.createInCognito}
                    onChange={(v) => set("createInCognito", v)}
                  />
                  {form.createInCognito && (
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-slate-500">
                        Contraseña temporal <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        value={form.temporaryPassword}
                        onChange={(e) => set("temporaryPassword", e.target.value)}
                        placeholder="Mín. 8 caracteres"
                        className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1 bg-white"
                      />
                      <p className="text-xs text-slate-400">
                        El usuario deberá cambiarla en su primer inicio de sesión.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Error */}
              {errorMessage && (
                <p className="text-xs text-danger bg-danger/5 border border-danger/20 rounded-md px-3 py-2">
                  {errorMessage}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-1">
                <Button variant="outline-secondary" size="sm" disabled={isSaving} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={
                    isSaving ||
                    !form.id.trim() ||
                    !form.name.trim() ||
                    (form.createInCognito && form.temporaryPassword.length < 8)
                  }
                  onClick={() => onSave(form)}
                >
                  {isSaving ? (
                    <><Lucide icon="Loader" className="w-3.5 h-3.5 mr-1.5 animate-spin" />Guardando...</>
                  ) : (
                    <><Lucide icon="Save" className="w-3.5 h-3.5 mr-1.5" />{isEdit ? "Actualizar" : "Crear Usuario"}</>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ── Tab Cognito ───────────────────────────────────────────────────── */}
          {activeTab === "cognito" && isEdit && (
            <div className="flex flex-col gap-5">
              {/* Estado Cognito */}
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 mb-3">Estado en Cognito</p>

                {cognitoStatus === "loading" && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Lucide icon="Loader" className="w-4 h-4 animate-spin" />
                    Cargando...
                  </div>
                )}

                {cognitoStatus === "failed" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      No encontrado en Cognito
                    </span>
                  </div>
                )}

                {cognitoStatus === "idle" && cognitoUser && (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cognitoUser.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {cognitoUser.enabled ? "Habilitado" : "Deshabilitado"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          {cognitoUser.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Creado: {new Date(cognitoUser.createdAt).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                    <Button
                      variant={cognitoUser.enabled ? "outline-danger" : "outline-success"}
                      size="sm"
                      disabled={isCognitoSaving}
                      onClick={() => onToggleCognitoStatus(editUser!.id, cognitoUser.enabled)}
                    >
                      {isCognitoSaving ? (
                        <Lucide icon="Loader" className="w-3.5 h-3.5 animate-spin" />
                      ) : cognitoUser.enabled ? (
                        <><Lucide icon="UserX" className="w-3.5 h-3.5 mr-1.5" />Deshabilitar</>
                      ) : (
                        <><Lucide icon="UserCheck" className="w-3.5 h-3.5 mr-1.5" />Habilitar</>
                      )}
                    </Button>
                  </div>
                )}

                {cognitoStatus === "idle" && !cognitoUser && (
                  <p className="text-xs text-slate-400">Usuario no registrado en Cognito.</p>
                )}

                {cognitoErrorMessage && cognitoActionStatus === "failed" && (
                  <p className="text-xs text-danger mt-2">{cognitoErrorMessage}</p>
                )}
              </div>

              {/* Cambiar contraseña */}
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 mb-3">Cambiar Contraseña</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">Nueva contraseña</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mín. 8 caracteres"
                      className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">Confirmar contraseña</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repetir contraseña"
                      className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-theme-1 ${
                        confirmPassword && !passwordValid
                          ? "border-danger focus:border-danger"
                          : "border-slate-200 focus:border-theme-1"
                      }`}
                    />
                    {confirmPassword && !passwordValid && (
                      <p className="text-xs text-danger">Las contraseñas no coinciden o son muy cortas.</p>
                    )}
                  </div>

                  <Toggle
                    label="Contraseña permanente"
                    description="Si no, el usuario deberá cambiarla al iniciar sesión"
                    checked={passwordPermanent}
                    onChange={setPasswordPermanent}
                  />

                  {cognitoErrorMessage && cognitoActionStatus === "failed" && (
                    <p className="text-xs text-danger bg-danger/5 border border-danger/20 rounded px-3 py-2">
                      {cognitoErrorMessage}
                    </p>
                  )}
                  {passwordSuccess && (
                    <p className="text-xs text-success flex items-center gap-1.5">
                      <Lucide icon="CheckCheck" className="w-3.5 h-3.5" />
                      Contraseña actualizada correctamente.
                    </p>
                  )}

                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!passwordValid || isCognitoSaving}
                      onClick={() => onSetPassword(editUser!.id, newPassword, passwordPermanent)}
                    >
                      {isCognitoSaving ? (
                        <><Lucide icon="Loader" className="w-3.5 h-3.5 mr-1.5 animate-spin" />Guardando...</>
                      ) : (
                        <><Lucide icon="KeyRound" className="w-3.5 h-3.5 mr-1.5" />Cambiar contraseña</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}

/* ── DeleteConfirmModal ─────────────────────────────────────────────────────── */
function DeleteConfirmModal({ user, isDeleting, error, onConfirm, onCancel }: {
  user: AppUser; isDeleting: boolean; error: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
            <Lucide icon="AlertTriangle" className="w-6 h-6 text-danger" />
          </div>
          <h3 className="font-semibold text-slate-700">Eliminar Usuario</h3>
          <p className="text-sm text-slate-500">
            ¿Estás seguro de eliminar a{" "}
            <span className="font-medium text-slate-700">{user.name}</span>?
            Esta acción no se puede deshacer.
          </p>
          <p className="text-xs text-slate-400">{user.id}</p>
          {error && <p className="text-xs text-danger w-full text-left bg-danger/5 border border-danger/20 rounded px-3 py-2">{error}</p>}
        </div>
        <div className="flex gap-2 mt-5">
          <Button variant="outline-secondary" className="flex-1" disabled={isDeleting} onClick={onCancel}>Cancelar</Button>
          <Button variant="danger" className="flex-1" disabled={isDeleting} onClick={onConfirm}>
            {isDeleting ? (
              <><Lucide icon="Loader" className="w-3.5 h-3.5 mr-1.5 animate-spin" />Eliminando...</>
            ) : "Eliminar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
