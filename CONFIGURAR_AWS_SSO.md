# Configuración de AWS SSO

## Paso 1: Configurar el perfil de AWS SSO

Crea o edita el archivo `~/.aws/config` con la siguiente estructura:

```ini
[profile nombre-perfil]
sso_start_url = https://tu-sso-portal.awsapps.com/start
sso_region = us-east-2
sso_account_id = 995007408497
sso_role_name = tu-rol-sso
region = us-east-2
output = json
```

**Ejemplo para tu proyecto:**
```ini
[profile apiclients-prod]
sso_start_url = https://d-9067xxxxxx.awsapps.com/start
sso_region = us-east-2
sso_account_id = 995007408497
sso_role_name = AdministratorAccess
region = us-east-2
output = json
```

## Paso 2: Iniciar sesión en AWS SSO

```bash
aws sso login --profile nombre-perfil
```

O si es el perfil por defecto:
```bash
aws sso login
```

Esto abrirá tu navegador para autenticarte.

## Paso 3: Verificar la configuración

```bash
# Verificar que estás autenticado
aws sts get-caller-identity --profile nombre-perfil

# O si es el perfil por defecto
aws sts get-caller-identity
```

## Paso 4: Configurar el perfil por defecto (Opcional)

Si quieres usar un perfil específico por defecto, puedes configurarlo:

```bash
export AWS_PROFILE=nombre-perfil
```

O agregarlo a tu `~/.zshrc` o `~/.bashrc`:
```bash
echo 'export AWS_PROFILE=nombre-perfil' >> ~/.zshrc
source ~/.zshrc
```

## Información necesaria para configurar SSO

Necesitas obtener esta información de tu administrador de AWS o del portal de AWS SSO:

1. **sso_start_url**: URL del portal de inicio de sesión de AWS SSO
   - Formato: `https://d-xxxxxxxxxx.awsapps.com/start`
   - Puedes encontrarlo en: AWS Console → IAM Identity Center → Settings → Identity source

2. **sso_region**: Región donde está configurado AWS SSO (generalmente `us-east-1` o `us-east-2`)

3. **sso_account_id**: ID de la cuenta de AWS (ya lo tienes: `995007408497`)

4. **sso_role_name**: Nombre del rol que quieres usar (ej: `AdministratorAccess`, `PowerUser`, etc.)

## Comandos útiles

```bash
# Listar perfiles configurados
aws configure list-profiles

# Ver configuración de un perfil específico
aws configure list --profile nombre-perfil

# Verificar si la sesión está activa
aws sts get-caller-identity --profile nombre-perfil

# Cerrar sesión SSO
aws sso logout --profile nombre-perfil
```

## Solución de problemas

### Error: "Token has expired"
```bash
aws sso login --profile nombre-perfil
```

### Error: "Profile not found"
Verifica que el perfil esté correctamente configurado en `~/.aws/config`

### Error: "Unable to locate credentials"
Asegúrate de haber ejecutado `aws sso login` antes de usar comandos de AWS

### Verificar configuración actual
```bash
cat ~/.aws/config
```

## Configuración rápida para tu proyecto

Basándote en la información de tu proyecto, aquí está una configuración sugerida:

```ini
[profile apiclients-prod]
sso_start_url = https://TU-SSO-URL.awsapps.com/start
sso_region = us-east-2
sso_account_id = 995007408497
sso_role_name = AdministratorAccess
region = us-east-2
output = json
```

**Nota:** Reemplaza `TU-SSO-URL` con la URL real de tu portal de AWS SSO.
