# Solución para el Template de CloudFormation en S3

## Problema
El template de CloudFormation almacenado en S3 tiene una referencia incorrecta al cliente de Cognito `4v0vfgl4t7ug6lc867si9l0ho4` que causa el error durante `amplify push`.

## URL del Template
```
https://s3.amazonaws.com/amplify-apiclients-prod-c7835-deployment/amplify-cfn-templates/auth/apiclientsbb306568-cloudformation-template.json
```

## Soluciones

### Opción 1: Amplify Pull (Recomendado)
Sincroniza el estado desde CloudFormation:

```bash
amplify pull --appId d37ftx9odrh330 --envName prod
```

O simplemente:
```bash
amplify pull
```

### Opción 2: Descargar Template desde S3 con AWS CLI

1. **Descargar el template:**
```bash
aws s3 cp s3://amplify-apiclients-prod-c7835-deployment/amplify-cfn-templates/auth/apiclientsbb306568-cloudformation-template.json ./template-auth.json
```

2. **Buscar y reemplazar referencias problemáticas:**
```bash
# Buscar referencias al cliente problemático
grep -n "4v0vfgl4t7ug6lc867si9l0ho4" ./template-auth.json

# Si encuentras referencias, reemplázalas con el cliente web:
# Reemplazar 4v0vfgl4t7ug6lc867si9l0ho4 con 3c7425phukqjelo0mt3833h6kj
```

3. **Subir el template modificado:**
```bash
aws s3 cp ./template-auth.json s3://amplify-apiclients-prod-c7835-deployment/amplify-cfn-templates/auth/apiclientsbb306568-cloudformation-template.json
```

### Opción 3: Actualizar Stack desde AWS Console

1. Ve a **AWS CloudFormation Console**
2. Busca el stack: `amplify-apiclients-prod-c7835-authapiclientsbb306568-1OAQX4GKAKJ0C`
3. Selecciona **Update stack**
4. Selecciona **Use current template**
5. En los parámetros, verifica que los valores de `AppClientID` y `AppClientIDWeb` sean correctos
6. Continúa con la actualización

### Opción 4: Forzar Regeneración del Template

1. **Eliminar el recurso de auth temporalmente:**
```bash
amplify remove auth
```

2. **Recrear el recurso de auth:**
```bash
amplify add auth
```

**⚠️ ADVERTENCIA:** Esta opción puede causar pérdida de datos si no se hace correctamente. Solo úsala como último recurso.

### Opción 5: Verificar Permisos IAM

El error podría ser por permisos insuficientes. Verifica que el rol IAM usado por Amplify tenga:

- `cognito-idp:DescribeUserPoolClient`
- `cognito-idp:DescribeUserPool`
- `cognito-idp:ListUserPoolClients`
- `s3:GetObject` (para leer templates)
- `s3:PutObject` (para escribir templates)

## Verificación Post-Solución

Después de aplicar cualquier solución:

1. Verifica el estado:
```bash
amplify status
```

2. Intenta hacer push:
```bash
amplify push
```

3. Si el error persiste, verifica los logs:
```bash
amplify push --debug
```

## Notas Importantes

- El template en S3 es la fuente de verdad durante `amplify push`
- Los cambios locales en `amplify-meta.json` pueden ser sobrescritos por el estado en S3
- `amplify pull` es la forma más segura de sincronizar el estado
- Siempre haz backup antes de modificar templates manualmente
