# Servicios AWS Asociados al AppId: d37ftx9odrh330

## Métodos para Consultar Servicios Asociados

### Método 1: AWS Amplify CLI (Recomendado)

```bash
# Ver todos los recursos del proyecto
amplify status

# Ver información detallada de la aplicación
amplify env list

# Ver recursos por categoría
amplify status --verbose
```

### Método 2: AWS CLI - Consultar App de Amplify

```bash
# Obtener información de la aplicación Amplify
aws amplify get-app --app-id d37ftx9odrh330 --region us-east-2

# Listar branches de la aplicación
aws amplify list-branches --app-id d37ftx9odrh330 --region us-east-2

# Listar jobs de la aplicación
aws amplify list-jobs --app-id d37ftx9odrh330 --region us-east-2
```

### Método 3: AWS CLI - Consultar CloudFormation Stack

```bash
# Obtener información del stack principal
aws cloudformation describe-stacks \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2

# Listar todos los recursos del stack
aws cloudformation describe-stack-resources \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2

# Listar stacks anidados (nested stacks)
aws cloudformation list-stacks \
  --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE \
  --region us-east-2 \
  --query "StackSummaries[?contains(StackName, 'amplify-apiclients-prod')]"
```

### Método 4: AWS Console

1. **AWS Amplify Console:**
   - URL: https://console.aws.amazon.com/amplify/home?region=us-east-2#/d37ftx9odrh330
   - Muestra información de la aplicación, branches, deployments, etc.

2. **CloudFormation Console:**
   - Stack principal: `amplify-apiclients-prod-c7835`
   - URL: https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks

## Servicios Identificados en la Configuración Local

### 1. **AWS AppSync** (GraphQL API)
- **API ID**: `t4pplxi6t5danh3iji6dcux5ku`
- **Endpoint**: `https://m2hmnszh4je2rk3mdemcrudxw4.appsync-api.us-east-2.amazonaws.com/graphql`
- **API Key**: `da2-ccnqqjpecvc33ijvwiphn2gjku`
- **Autenticación**: API_KEY
- **Recurso**: `apiclients`

### 2. **Amazon Cognito** (Autenticación)
- **User Pool ID**: `us-east-2_RnbT7nPr9`
- **User Pool Name**: `apiclientsbb306568_userpool_bb306568`
- **Identity Pool ID**: `us-east-2:70055e20-cfe6-4cef-9b1c-4a0649c450d5`
- **App Client Web**: `3c7425phukqjelo0mt3833h6kj`
- **App Client**: `4v0vfgl4t7ug6lc867si9l0ho4`
- **Hosted UI Domain**: `apiclientsbb306568-bb306568-prod.auth.us-east-2.amazoncognito.com`
- **Proveedores Sociales**: Google
- **Recurso**: `apiclientsbb306568`

### 3. **AWS Lambda** (Funciones Serverless)

#### Lambda Layer:
- **apiclientslayer**: Capa compartida para funciones Lambda
  - ARN: `arn:aws:lambda:us-east-2:995007408497:layer:apiclientslayer-prod:8`

#### Funciones Lambda:
1. **authPostAuthentication** - Trigger post-autenticación
2. **authPostConfirmation** - Trigger post-confirmación
3. **authPreAuthentication** - Trigger pre-autenticación
4. **authPreSignup** - Trigger pre-registro
5. **fnCalculateSessionsEnrollment** - Cálculo de sesiones de inscripción
6. **fnRemoveEnrollment** - Eliminación de inscripciones
7. **fnRenovationEnrollment** - Renovación de inscripciones
8. **fnCreateEvaluation** - Creación de evaluaciones
9. **sendEmailResolver** - Envío de emails (con permisos SES)
10. **sendEmailResolveremailJs** - Envío de emails con EmailJS
11. **sendWhatsappResolver** - Envío de mensajes WhatsApp
12. **webpayStart** - Inicio de transacciones Webpay
13. **webpayCommit** - Confirmación de transacciones Webpay
14. **webpayStatus** - Estado de transacciones Webpay
15. **fngGetEconomicParams** - Obtención de parámetros económicos
16. **cronUpdateSessions** - Actualización de sesiones (cron job)
17. **cronUpdateStatus** - Actualización de estado (cron job)

### 4. **Amazon S3** (Almacenamiento)
- **Bucket de Deployment**: `amplify-apiclients-prod-c7835-deployment`
- Usado para almacenar:
  - Templates de CloudFormation
  - Artefactos de build de Lambda
  - Archivos de configuración

### 5. **AWS CloudFormation** (Infraestructura como Código)
- **Stack Principal**: `amplify-apiclients-prod-c7835`
- **Stack ID**: `arn:aws:cloudformation:us-east-2:995007408497:stack/amplify-apiclients-prod-c7835/1a2d3310-d775-11ef-965f-0a256ce16093`
- **Stacks Anidados**:
  - `amplify-apiclients-prod-c7835-authapiclientsbb306568-1OAQX4GKAKJ0C` (Cognito)
  - Stacks individuales para cada función Lambda

### 6. **AWS IAM** (Roles y Permisos)
- **Auth Role**: `amplify-apiclients-prod-c7835-authRole`
- **Unauth Role**: `amplify-apiclients-prod-c7835-unauthRole`
- Roles de ejecución para cada función Lambda
- Políticas personalizadas (ej: permisos SES para sendEmailResolver)

### 7. **Amazon EventBridge** (Eventos Programados)
- Reglas CloudWatch Events para funciones Lambda con triggers cron
- Usado en: `cronUpdateSessions`, `cronUpdateStatus`

### 8. **Amazon SES** (Simple Email Service)
- Permisos configurados en `sendEmailResolver` para envío de emails

### 9. **Cognito User Pool Groups**
- **Grupo**: `poolAuthMiniswimmer`
- **Role ARN**: `arn:aws:iam::995007408497:role/us-east-2_RnbT7nPr9-poolAuthMiniswimmerGroupRole`

## Comandos Útiles para Consultar Recursos

### Listar todas las funciones Lambda
```bash
aws lambda list-functions --region us-east-2 \
  --query "Functions[?contains(FunctionName, 'apiclients') || contains(FunctionName, 'auth')]"
```

### Listar User Pools de Cognito
```bash
aws cognito-idp list-user-pools --max-results 10 --region us-east-2
```

### Listar APIs de AppSync
```bash
aws appsync list-graphql-apis --region us-east-2
```

### Listar buckets S3 relacionados
```bash
aws s3 ls | grep amplify-apiclients-prod
```

### Ver recursos de CloudFormation
```bash
aws cloudformation describe-stack-resources \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2 \
  --query "StackResources[*].[ResourceType,LogicalResourceId,PhysicalResourceId]" \
  --output table
```

## Información del Proyecto

- **AppId**: `d37ftx9odrh330`
- **Región**: `us-east-2`
- **Cuenta AWS**: `995007408497`
- **Ambiente Actual**: `prod`
- **Nombre del Proyecto**: `apiclients`

## Notas

- Todos los recursos están en la región `us-east-2`
- El proyecto usa CloudFormation para gestionar la infraestructura
- Las funciones Lambda usan Node.js 18.x
- El proyecto tiene integración con servicios externos (WhatsApp, EmailJS, Webpay)
