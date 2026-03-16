# IDs de Servicios y Estado del AppId en AWS Amplify

## AppId Principal
- **AppId**: `d37ftx9odrh330`
- **Región**: `us-east-2`
- **Cuenta AWS**: `995007408497`
- **Ambiente**: `prod`

## Comandos para Consultar Estado en AWS Amplify

### 1. Obtener Estado General de la Aplicación
```bash
aws amplify get-app --app-id d37ftx9odrh330 --region us-east-2
```

### 2. Listar Branches y su Estado
```bash
aws amplify list-branches --app-id d37ftx9odrh330 --region us-east-2
```

### 3. Listar Jobs/Deployments
```bash
aws amplify list-jobs --app-id d37ftx9odrh330 --branch-name prod --region us-east-2
```

### 4. Obtener Estado del Stack de CloudFormation
```bash
aws cloudformation describe-stacks \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2 \
  --query "Stacks[0].[StackStatus,StackStatusReason,CreationTime,LastUpdatedTime]" \
  --output table
```

---

## IDs de Servicios por Categoría

### 🔵 AWS AppSync (GraphQL API)
- **API ID**: `t4pplxi6t5danh3iji6dcux5ku`
- **Endpoint**: `https://m2hmnszh4je2rk3mdemcrudxw4.appsync-api.us-east-2.amazonaws.com/graphql`
- **API Key**: `da2-ccnqqjpecvc33ijvwiphn2gjku`
- **Recurso Local**: `apiclients`
- **Tipo de Autenticación**: API_KEY

**Comando para consultar estado:**
```bash
aws appsync get-graphql-api --api-id t4pplxi6t5danh3iji6dcux5ku --region us-east-2
```

---

### 🔐 Amazon Cognito (Autenticación)
- **User Pool ID**: `us-east-2_RnbT7nPr9`
- **User Pool ARN**: `arn:aws:cognito-idp:us-east-2:995007408497:userpool/us-east-2_RnbT7nPr9`
- **User Pool Name**: `apiclientsbb306568_userpool_bb306568`
- **Identity Pool ID**: `us-east-2:70055e20-cfe6-4cef-9b1c-4a0649c450d5`
- **Identity Pool Name**: `apiclientsbb306568_identitypool_bb306568__prod`
- **App Client Web ID**: `3c7425phukqjelo0mt3833h6kj`
- **App Client ID**: `4v0vfgl4t7ug6lc867si9l0ho4`
- **Hosted UI Domain**: `apiclientsbb306568-bb306568-prod.auth.us-east-2.amazoncognito.com`
- **Recurso Local**: `apiclientsbb306568`

**Comandos para consultar estado:**
```bash
# User Pool
aws cognito-idp describe-user-pool --user-pool-id us-east-2_RnbT7nPr9 --region us-east-2

# Identity Pool
aws cognito-identity describe-identity-pool --identity-pool-id us-east-2:70055e20-cfe6-4cef-9b1c-4a0649c450d5 --region us-east-2

# App Clients
aws cognito-idp describe-user-pool-client --user-pool-id us-east-2_RnbT7nPr9 --client-id 3c7425phukqjelo0mt3833h6kj --region us-east-2
aws cognito-idp describe-user-pool-client --user-pool-id us-east-2_RnbT7nPr9 --client-id 4v0vfgl4t7ug6lc867si9l0ho4 --region us-east-2
```

---

### ⚡ AWS Lambda (Funciones Serverless)

#### Lambda Layer
- **Nombre**: `apiclientslayer-prod`
- **ARN**: `arn:aws:lambda:us-east-2:995007408497:layer:apiclientslayer-prod:8`
- **Versión**: `8`
- **Recurso Local**: `apiclientslayer`

**Comando para consultar estado:**
```bash
aws lambda get-layer-version --layer-name apiclientslayer-prod --version-number 8 --region us-east-2
```

#### Funciones Lambda (17 funciones)

1. **authPostAuthentication**
   - Nombre: `authPostAuthentication-prod`
   - Recurso Local: `authPostAuthentication`

2. **authPostConfirmation**
   - Nombre: `authPostConfirmation-prod`
   - Recurso Local: `authPostConfirmation`

3. **authPreAuthentication**
   - Nombre: `authPreAuthentication-prod`
   - Recurso Local: `authPreAuthentication`

4. **authPreSignup**
   - Nombre: `authPreSignup-prod`
   - Recurso Local: `authPreSignup`

5. **fnCalculateSessionsEnrollment**
   - Nombre: `fnCalculateSessionsEnrollment-prod`
   - Recurso Local: `fnCalculateSessionsEnrollment`

6. **fnRemoveEnrollment**
   - Nombre: `fnRemoveEnrollment-prod`
   - Recurso Local: `fnRemoveEnrollment`

7. **fnRenovationEnrollment**
   - Nombre: `fnRenovationEnrollment-prod`
   - Recurso Local: `fnRenovationEnrollment`

8. **fnCreateEvaluation**
   - Nombre: `fnCreateEvaluation-prod`
   - Recurso Local: `fnCreateEvaluation`

9. **sendEmailResolver**
   - Nombre: `sendEmailResolver-prod`
   - Recurso Local: `sendEmailResolver`

10. **sendEmailResolveremailJs**
    - Nombre: `sendEmailResolveremailJs-prod`
    - Recurso Local: `sendEmailResolveremailJs`

11. **sendWhatsappResolver**
    - Nombre: `sendWhatsappResolver-prod`
    - Recurso Local: `sendWhatsappResolver`

12. **webpayStart**
    - Nombre: `webpayStart-prod`
    - Recurso Local: `webpayStart`

13. **webpayCommit**
    - Nombre: `webpayCommit-prod`
    - Recurso Local: `webpayCommit`

14. **webpayStatus**
    - Nombre: `webpayStatus-prod`
    - Recurso Local: `webpayStatus`

15. **fngGetEconomicParams**
    - Nombre: `fngGetEconomicParams-prod`
    - Recurso Local: `fngGetEconomicParams`

16. **cronUpdateSessions**
    - Nombre: `cronUpdateSessions-prod`
    - Recurso Local: `cronUpdateSessions`

17. **cronUpdateStatus**
    - Nombre: `cronUpdateStatus-prod`
    - Recurso Local: `cronUpdateStatus`

**Comando para listar todas las funciones Lambda:**
```bash
aws lambda list-functions --region us-east-2 \
  --query "Functions[?contains(FunctionName, 'apiclients') || contains(FunctionName, 'auth')].[FunctionName,FunctionArn,LastModified,State]" \
  --output table
```

**Comando para consultar una función específica:**
```bash
aws lambda get-function --function-name authPostAuthentication-prod --region us-east-2
```

---

### 📦 Amazon S3 (Almacenamiento)
- **Bucket de Deployment**: `amplify-apiclients-prod-c7835-deployment`
- **Región**: `us-east-2`

**Comando para consultar estado:**
```bash
aws s3api head-bucket --bucket amplify-apiclients-prod-c7835-deployment --region us-east-2
aws s3 ls s3://amplify-apiclients-prod-c7835-deployment/ --region us-east-2
```

---

### ☁️ AWS CloudFormation (Infraestructura)
- **Stack Principal**: `amplify-apiclients-prod-c7835`
- **Stack ID**: `arn:aws:cloudformation:us-east-2:995007408497:stack/amplify-apiclients-prod-c7835/1a2d3310-d775-11ef-965f-0a256ce16093`
- **Stack Anidado (Cognito)**: `amplify-apiclients-prod-c7835-authapiclientsbb306568-1OAQX4GKAKJ0C`

**Comando para consultar estado:**
```bash
# Stack principal
aws cloudformation describe-stacks \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2 \
  --query "Stacks[0].[StackName,StackStatus,StackStatusReason,CreationTime,LastUpdatedTime]" \
  --output table

# Stack de Cognito
aws cloudformation describe-stacks \
  --stack-name amplify-apiclients-prod-c7835-authapiclientsbb306568-1OAQX4GKAKJ0C \
  --region us-east-2 \
  --query "Stacks[0].[StackName,StackStatus]" \
  --output table

# Listar todos los recursos del stack principal
aws cloudformation describe-stack-resources \
  --stack-name amplify-apiclients-prod-c7835 \
  --region us-east-2 \
  --query "StackResources[*].[ResourceType,LogicalResourceId,PhysicalResourceId,ResourceStatus]" \
  --output table
```

---

### 🔑 AWS IAM (Roles y Permisos)
- **Auth Role**: `amplify-apiclients-prod-c7835-authRole`
- **Unauth Role**: `amplify-apiclients-prod-c7835-unauthRole`
- **User Pool Client Lambda Role**: `apiclibb306568_userpoolclient_lambda_role`
- **Group Role**: `us-east-2_RnbT7nPr9-poolAuthMiniswimmerGroupRole`
- **Group Role ARN**: `arn:aws:iam::995007408497:role/us-east-2_RnbT7nPr9-poolAuthMiniswimmerGroupRole`

**Comando para consultar roles:**
```bash
aws iam get-role --role-name amplify-apiclients-prod-c7835-authRole
aws iam get-role --role-name amplify-apiclients-prod-c7835-unauthRole
```

---

### 📅 Amazon EventBridge (Eventos Programados)
- Usado para triggers cron en funciones Lambda
- Reglas CloudWatch Events asociadas a:
  - `cronUpdateSessions-prod`
  - `cronUpdateStatus-prod`

**Comando para listar reglas:**
```bash
aws events list-rules --region us-east-2 \
  --query "Rules[?contains(Name, 'cronUpdate')].[Name,ScheduleExpression,State]" \
  --output table
```

---

### 📧 Amazon SES (Simple Email Service)
- Permisos configurados en función `sendEmailResolver-prod`
- Usado para envío de emails desde Lambda

**Comando para verificar configuración:**
```bash
aws ses get-account-sending-enabled --region us-east-2
aws ses list-verified-email-addresses --region us-east-2
```

---

### 👥 Cognito User Pool Groups
- **Grupo**: `poolAuthMiniswimmer`
- **Role ARN**: `arn:aws:iam::995007408497:role/us-east-2_RnbT7nPr9-poolAuthMiniswimmerGroupRole`

**Comando para consultar grupos:**
```bash
aws cognito-idp list-groups --user-pool-id us-east-2_RnbT7nPr9 --region us-east-2
```

---

## Script para Consultar Estado Completo

Crea un script `check-amplify-status.sh`:

```bash
#!/bin/bash

APP_ID="d37ftx9odrh330"
REGION="us-east-2"
STACK_NAME="amplify-apiclients-prod-c7835"

echo "=== Estado de AWS Amplify App ==="
aws amplify get-app --app-id $APP_ID --region $REGION --query "[name,defaultDomain,repository,platform]" --output table

echo -e "\n=== Branches ==="
aws amplify list-branches --app-id $APP_ID --region $REGION --query "branches[*].[branchName,stage,activeJobId]" --output table

echo -e "\n=== Estado del Stack CloudFormation ==="
aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].[StackName,StackStatus,LastUpdatedTime]" --output table

echo -e "\n=== Recursos del Stack ==="
aws cloudformation describe-stack-resources --stack-name $STACK_NAME --region $REGION --query "StackResources[*].[ResourceType,LogicalResourceId,ResourceStatus]" --output table

echo -e "\n=== Funciones Lambda ==="
aws lambda list-functions --region $REGION --query "Functions[?contains(FunctionName, 'apiclients') || contains(FunctionName, 'auth')].[FunctionName,LastModified,State]" --output table

echo -e "\n=== AppSync API ==="
aws appsync list-graphql-apis --region $REGION --query "graphqlApis[?contains(apiId, 't4pplxi6t5danh3iji6dcux5ku')].[name,apiId,uris.GRAPHQL]" --output table

echo -e "\n=== Cognito User Pool ==="
aws cognito-idp describe-user-pool --user-pool-id us-east-2_RnbT7nPr9 --region $REGION --query "[UserPool.Name,UserPool.Status,UserPool.CreationDate]" --output table
```

**Para ejecutar:**
```bash
chmod +x check-amplify-status.sh
./check-amplify-status.sh
```

---

## URLs de Consolas AWS

- **Amplify Console**: https://console.aws.amazon.com/amplify/home?region=us-east-2#/d37ftx9odrh330
- **AppSync Console**: https://console.aws.amazon.com/appsync/home?region=us-east-2#/apis/t4pplxi6t5danh3iji6dcux5ku
- **Cognito Console**: https://console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-2_RnbT7nPr9/users?region=us-east-2
- **Lambda Console**: https://console.aws.amazon.com/lambda/home?region=us-east-2#/functions
- **CloudFormation Console**: https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks
- **S3 Console**: https://s3.console.aws.amazon.com/s3/buckets/amplify-apiclients-prod-c7835-deployment?region=us-east-2
