# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite, NODE_ENV=development)
npm run build     # TypeScript compile + Vite production build (auto-bumps patch version via prebuild)
npm run preview   # Preview the production build locally

# Amplify Gen 2 config regeneration (requires Node 20+, profile 'miniswimmer')
npm run generate:config   # Regenerate amplify_outputs.json from the deployed sandbox stack
npm run generate:graphql  # Regenerate src/graphql/ TypeScript files from the Gen 2 schema
```

There are no test or lint scripts configured.

## Architecture

**MiniSwimmer** is a React 18 + TypeScript + Vite PWA for managing a swimming academy (Chilean market). It uses AWS Amplify as its backend (AppSync GraphQL, Cognito auth, S3 storage).

### Key Stack
- **Routing**: React Router v6 with lazy-loaded pages. Routes split into `PrivateRoute` (RBAC) and `PublicRoute`.
- **State**: Redux Toolkit. Each feature domain has its own folder under `src/stores/` with `slice.ts`, `services.ts`, `types.ts`, and GraphQL `queries.ts`/`mutation.ts`. Use typed hooks from `src/stores/hooks.ts` (`useAppSelector`, `useAppDispatch`) — never raw Redux hooks.
- **API**: AWS Amplify `generateClient()` for all GraphQL calls. Services layer in each store's `services.ts` wraps the Amplify client; Redux async thunks call those services.
- **Styling**: Tailwind CSS 3.4 with CSS variables for dynamic color themes (dark mode support). Path alias `@` → `./src`.

### Directory Structure
```
src/
├── components/     # Reusable UI components
├── stores/         # Redux slices by domain (Users, Courses, Enrollments, Students, Locations, Payments, etc.)
├── pages/
│   ├── private/    # 34+ authenticated pages
│   └── public/     # Login, register, password recovery
├── router/         # index.tsx, PrivateRoute.tsx, PublicRoute.tsx, paths.tsx
├── graphql/        # Generated GraphQL queries and mutations
├── utils/          # dateHandler, helper, colors, dictionary utilities
├── themes/         # Layout components
├── types/          # Shared TypeScript types
└── fakers/         # Mock data for development
```

### AWS CLI Profile

**Always use profile `MINISWIMMER-05FEB2026`** for all AWS CLI commands in this project:

```bash
aws <command> --profile MINISWIMMER-05FEB2026
# or
export AWS_PROFILE=MINISWIMMER-05FEB2026
```

### AWS Configuration (Amplify Gen 2)
Amplify is configured in `src/main.tsx` using `amplify_outputs.json` (at the project root):
```ts
import outputs from '../amplify_outputs.json';
Amplify.configure(outputs);
```
- Backend: `miniswimmercl-sdk-backend-v2` (Amplify Gen 2, separate repo)
- CloudFormation stack: `amplify-backoffice-manu-sandbox-0b1ca78abf`
- AppSync endpoint: `us-east-2` — auth mode: `AMAZON_COGNITO_USER_POOLS` (no OAuth/Google)
- Cognito User Pool ID: `us-east-2_xtGftFnff`
- Cognito User Pool Client ID: `6o3gk8krb9m6jb0kqkrrj86u77`
- AppSync API ID: `ggfytzhgxvd3pcnyj2mjkfenre` (stack: `amplify-backoffice-v2sdkbackend-sandbox-2d9df2bc3d`)
- All GraphQL models use the `v2` prefix (e.g., `v2Users`, `v2AcademyCourses`)
- `amplify_outputs.json` is **not a secret** and should be committed
- To regenerate after backend changes, run `npm run generate:config` (requires Node 20)

The only `.env` variable is `VITE_GOOGLE_MAPS_API_KEY` in `.env.local`.

### RBAC
`PrivateRoute.tsx` contains `ProtectedRoute` which checks route permissions by role. Role IDs used in auth state:
- `adminRole` — full access to all routes
- `anfitrion` — attendance, documentation, student profile
- `coach` / `parents` / `academyRole` — `NONE_DASHBOARD` only

Permissions are defined as static arrays (`adminRolePermissions`, `AnfitrionesPermissions`, `NonePermissions`) mapping role → allowed path constants. Path constants live in `src/router/paths.tsx`.

### Redux Store Pattern
Every domain (e.g., Courses) follows this pattern:
1. `queries.ts` / `mutation.ts` — raw GraphQL strings
2. `services.ts` — calls `generateClient().graphql(...)`, returns typed data
3. `slice.ts` — `createAsyncThunk` calls the service; slice handles pending/fulfilled/rejected

**Note:** newer stores (`AppUsers/`, `GmailInbox/`) use `mutations.ts` (plural) instead of `mutation.ts`. This inconsistency exists in the codebase.

Active Redux slices: auth, location, student, course, sessionDetail, sessionType, enrollment, parameters, relationships, academyStudents, emailSend, paymentTransactions, shoppingCartDetails, schedules, shoppingCarts, WP, supportTickets, evaluations, studentEvaluations, product, quickResponse, rolePermissions, gmailInbox, appUsers, plus UI slices (darkMode, colorScheme, sideMenu, theme, compactMenu, pageLoader, breadcrumb).

### WP Store / WhatsApp Integration
The `WP` store and `/api/*` proxy to `https://api.whaticket.com` handle WhatsApp messaging (WhatTicket platform). This is a separate integration from the Amplify backend.



### AWS CLI Profile

> **CRITICAL:** Always use profile `MINISWIMMER-05FEB2026` for every AWS CLI command. Never run AWS CLI commands without this profile.

```bash
aws <command> --profile MINISWIMMER-05FEB2026
```

### AppSync GraphQL API — Endpoint Canónico

> **CRITICAL — ÚNICO ENDPOINT VÁLIDO PARA LOS 3 PROYECTOS**
>
> Los 3 proyectos Miniswimmer (Pagos, Backend, Backoffice) comparten el mismo endpoint AppSync.
> **NUNCA** usar ningún otro endpoint. Los archivos `aws-exports.ts` y `aws-exports.js` que existen
> en el proyecto son **código muerto** (no importados en ningún archivo) con endpoints legacy obsoletos — ignorarlos.
> El directorio `amplify-gen1-legacy/` también contiene endpoints antiguos — solo referencia histórica.

| Campo | Valor |
|---|---|
| **GraphQL URL** | `https://vibghdaimbgfnlypijdjpufbgu.appsync-api.us-east-2.amazonaws.com/graphql` |
| **API Key** | `da2-y5mbqnzliraotj2zgojiatx34a` |
| **Región** | `us-east-2` |
| **Auth modes** | `apiKey` (operaciones públicas), `userPool` (operaciones admin con Cognito) |
| **Fuente de verdad** | `amplify_outputs.json` (raíz del repo) → campo `data.url` |

```bash
# Verificar que amplify_outputs.json usa el endpoint correcto
grep "url" amplify_outputs.json
# Debe mostrar: vibghdaimbgfnlypijdjpufbgu.appsync-api.us-east-2.amazonaws.com/graphql
```

**Endpoints legacy a ignorar (código muerto):**
- `src/aws-exports.ts` → `https://https://m2hmnszh4je2rk3mdemcrudxw4...` — URL malformada, NO USAR
- `src/aws-exports.js` → endpoint `m2hmnszh4je2rk3mdemcrudxw4` — NO USAR
- `amplify-gen1-legacy/` → endpoints Amplify Gen 1 — solo referencia histórica

### AWS Cognito User Pools

> **CRITICAL — LEER ANTES DE CUALQUIER OPERACIÓN EN COGNITO**
>
> - **NUNCA** modificar, crear usuarios, ni hacer ningún cambio en el pool `us-east-2_RnbT7nPr9`.
>   Es el pool de clientes de pago legacy (11 usuarios reales) y cualquier cambio puede romper flujos de pago en producción.
> - **SIEMPRE** usar el pool `us-east-2_SAkrMOGEN` para todas las operaciones. Es el pool activo referenciado en `amplify_outputs.json`.

Este proyecto (backoffice frontend) se autentica contra el backend Amplify Gen 2 compartido. Región: `us-east-2`.

| Pool | ID | Client ID | Estado |
|---|---|---|---|
| **✅ USAR SIEMPRE** | `us-east-2_SAkrMOGEN` | `7ffvh1vqfmqhl36pjv3ugdsfg6` | Producción activa — referenciado en `amplify_outputs.json` |
| **⚠️ Solo lectura** | `us-east-2_xtGftFnff` | `6o3gk8krb9m6jb0kqkrrj86u77` | Deploy anterior — usuarios admin (`hola@miniswimmer.cl`, `hi@manuelo.dev`) |
| **🚫 NUNCA TOCAR** | `us-east-2_RnbT7nPr9` | — | Pool legacy de clientes de pago. 11 usuarios reales. Solo lectura. |
| **Dev (vacío)** | `us-east-2_g5cMGeymr` | — | Pool de desarrollo del frontend. Sin usuarios. |

```bash
# Perfil AWS a usar siempre
aws <command> --profile MINISWIMMER-05FEB2026

# Listar usuarios del pool activo
aws cognito-idp list-users --user-pool-id us-east-2_SAkrMOGEN --profile MINISWIMMER-05FEB2026

# Cambiar contraseña de usuario admin
aws cognito-idp admin-set-user-password \
  --user-pool-id us-east-2_SAkrMOGEN \
  --username <sub-del-usuario> \
  --password '<nueva-contraseña>' \
  --permanent \
  --profile MINISWIMMER-05FEB2026
```

## Proyectos Relacionados

Todos los proyectos comparten el mismo backend Amplify Gen 2 y el pool Cognito `us-east-2_SAkrMOGEN`.

| Proyecto | Ruta local | CLAUDE.md |
|---|---|---|
| **Frontend/Backoffice (este proyecto)** | `/Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl-sdk-frontend-v2` | `CLAUDE.md` |
| **Backend (Amplify Gen 2)** | `/Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl-sdk-backend-v2` | `CLAUDE.md` |
| **Pagos** | `/Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl_paymentsV2` | `CLAUDE.md` |

### amplify_outputs.json (compartido entre proyectos)

Los 3 proyectos usan el mismo `amplify_outputs.json`. Si el backend se redespliega, copiar el nuevo archivo a los otros dos proyectos.

```bash
# Después de un redeploy del backend, actualizar los otros proyectos:
cp /Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl-sdk-backend-v2/amplify_outputs.json \
   /Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl-sdk-frontend-v2/amplify_outputs.json

cp /Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl-sdk-backend-v2/amplify_outputs.json \
   /Users/manu/_CODE/MINISWIMMER.us/_CODE/miniswimmercl_paymentsV2/amplify_outputs.json
```


## CRITICAL
- Think before acting. Read files before writing code.
- Edit only the changes; do not rewrite entire files.
- Do not re-read files you have already read unless they have changed.
- Do not repeat unchanged code in your responses.
- No preambles, no summaries at the end, and do not explain the obvious.
- Test before completing the task.
<!-- - Piensa antes de actuar. Lee los archivos antes de escribir código
- Edita solo lo que cambia, no reescribas archivos enteros
- No releas archivos que ya hayas leído salvo que hayan cambiado
- No repitas código sin cambios en tus respuestas
- Sin preámbulos, sin resúmenes al final, sin explicar lo obvio
- Testea antes de dar por terminado -->