#!/usr/bin/env node
/**
 * Migración de datos JSON → API GraphQL v2 (AppSync + Cognito)
 * Modelos: Roles, Coach, Location, EvaluationLevel, ProfitCenter,
 *          EvaluationObjetives, Product, Users, StudentEvaluations, StudentEvaluationsDetail
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { createHmac, createHash } from 'crypto';

// ── Config ──────────────────────────────────────────────────────────────────
const ENDPOINT        = 'https://4awnoywdgnbidh4drditfrb5bq.appsync-api.us-east-2.amazonaws.com/graphql';
const CLIENT_ID       = '1l6ll60p3bjd6q4uo2cpshtrc5';
const EMAIL           = 'hi@manuelo.dev';
const PASSWORD        = 'Admin1234!';
const DIR             = '/Users/manu/_PROYECTOS/MINI-SWIMMER/DATABASE/RESPALDO-15-Marzo-2026/restantes';
const IDENTITY_POOL   = 'us-east-2:e8388c36-3b29-48de-a714-f64f68642da4';
const ACCOUNT_ID      = '995007408497';
const REGION          = 'us-east-2';

// ── Helpers ──────────────────────────────────────────────────────────────────
const sleep    = ms => new Promise(r => setTimeout(r, ms));
const toFloat  = v  => (v === null || v === undefined || v === '') ? null : (isNaN(parseFloat(v)) ? null : parseFloat(v));
const readJSON = f  => { const d = JSON.parse(readFileSync(join(DIR, f), 'utf-8')); return Array.isArray(d) ? d : (d.items || [d]); };

// ── IAM / SigV4 helpers ───────────────────────────────────────────────────
async function getGuestCredentials() {
  const idRes = await fetch(`https://cognito-identity.${REGION}.amazonaws.com/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityService.GetId',
    },
    body: JSON.stringify({ AccountId: ACCOUNT_ID, IdentityPoolId: IDENTITY_POOL }),
  });
  const { IdentityId } = await idRes.json();
  if (!IdentityId) throw new Error('GetId failed: ' + JSON.stringify(await idRes.text()));

  const credRes = await fetch(`https://cognito-identity.${REGION}.amazonaws.com/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityService.GetCredentialsForIdentity',
    },
    body: JSON.stringify({ IdentityId }),
  });
  const { Credentials } = await credRes.json();
  if (!Credentials) throw new Error('GetCredentialsForIdentity failed');
  console.log('✅ Credenciales IAM (guest) obtenidas');
  return {
    accessKeyId: Credentials.AccessKeyId,
    secretAccessKey: Credentials.SecretKey,
    sessionToken: Credentials.SessionToken,
  };
}

function hmac(key, data, enc) {
  return createHmac('sha256', key).update(data).digest(enc || undefined);
}
function hash(data) {
  return createHash('sha256').update(data).digest('hex');
}
function pad2(n) { return String(n).padStart(2, '0'); }

function sigV4Headers(creds, method, url, body) {
  const u = new URL(url);
  const now = new Date();
  const dateStr = `${now.getUTCFullYear()}${pad2(now.getUTCMonth()+1)}${pad2(now.getUTCDate())}`;
  const timeStr = `${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}`;
  const amzDate = `${dateStr}T${timeStr}Z`;
  const service = 'appsync';
  const bodyHash = hash(body);

  // Use lowercase keys for signing
  const signingHeaders = {
    'content-type': 'application/json',
    'host': u.hostname,
    'x-amz-date': amzDate,
    'x-amz-security-token': creds.sessionToken,
  };

  const signedHeaderNames = Object.keys(signingHeaders).sort();
  const canonicalHeaders = signedHeaderNames.map(k => `${k}:${signingHeaders[k]}\n`).join('');
  const signedHeaders = signedHeaderNames.join(';');

  const canonicalRequest = [method, u.pathname, '', canonicalHeaders, signedHeaders, bodyHash].join('\n');

  const scope = `${dateStr}/${REGION}/${service}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, hash(canonicalRequest)].join('\n');

  const signingKey = hmac(
    hmac(hmac(hmac(`AWS4${creds.secretAccessKey}`, dateStr), REGION), service),
    'aws4_request',
  );
  const signature = hmac(signingKey, stringToSign, 'hex');

  const authorization = `AWS4-HMAC-SHA256 Credential=${creds.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  // Return headers with proper casing for fetch (host is set automatically by Node.js fetch)
  return {
    'Content-Type': signingHeaders['content-type'],
    'x-amz-date': signingHeaders['x-amz-date'],
    'x-amz-security-token': signingHeaders['x-amz-security-token'],
    'Authorization': authorization,
  };
}

async function gqlIAM(creds, mutation, inputType, input) {
  const query = `mutation M($input: ${inputType}!) { ${mutation}(input: $input) { id } }`;
  const body = JSON.stringify({ query, variables: { input } });
  const headers = sigV4Headers(creds, 'POST', ENDPOINT, body);
  const r = await fetch(ENDPOINT, { method: 'POST', headers, body });
  return r.json();
}

async function migrateIAM(label, items, mutation, inputType, mapFn, creds) {
  console.log(`\n📦 ${label} — ${items.length} registros (IAM guest)`);
  let ok = 0, skipped = 0, failed = 0;
  for (const item of items) {
    let input;
    try {
      input = mapFn(item);
      if (input === null) { skipped++; continue; }
    } catch (e) {
      console.error(`  ❌ map error [${item.id}]: ${e.message}`); failed++; continue;
    }
    try {
      const res = await gqlIAM(creds, mutation, inputType, input);
      if (res.errors) {
        const msg = res.errors[0]?.message || '';
        if (msg.includes('ConditionalCheckFailed') || msg.includes('already exists')) { skipped++; }
        else { console.error(`  ❌ [${item.id}] ${msg}`); failed++; }
      } else { ok++; }
    } catch (e) {
      console.error(`  ❌ [${item.id}] fetch error: ${e.message}`); failed++;
    }
    await sleep(40);
  }
  console.log(`  ✅ creados: ${ok}  ⏭ skipped: ${skipped}  ❌ errores: ${failed}`);
  return { ok, skipped, failed };
}

async function getToken() {
  const r = await fetch('https://cognito-idp.us-east-2.amazonaws.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    },
    body: JSON.stringify({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: CLIENT_ID,
      AuthParameters: { USERNAME: EMAIL, PASSWORD: PASSWORD },
    }),
  });
  const d = await r.json();
  if (!d.AuthenticationResult) throw new Error('Auth failed: ' + JSON.stringify(d));
  console.log('✅ Autenticado como', EMAIL);
  return d.AuthenticationResult.AccessToken;
}

async function gql(token, mutation, inputType, input) {
  const query = `mutation M($input: ${inputType}!) { ${mutation}(input: $input) { id } }`;
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ query, variables: { input } }),
  });
  return r.json();
}

async function migrate(label, items, mutation, inputType, mapFn, token) {
  console.log(`\n📦 ${label} — ${items.length} registros`);
  let ok = 0, skipped = 0, failed = 0;

  for (const item of items) {
    let input;
    try {
      input = mapFn(item);
      if (input === null) { skipped++; continue; }
    } catch (e) {
      console.error(`  ❌ map error [${item.id}]: ${e.message}`);
      failed++;
      continue;
    }

    try {
      const res = await gql(token, mutation, inputType, input);
      if (res.errors) {
        const msg = res.errors[0]?.message || '';
        if (msg.includes('ConditionalCheckFailed') || msg.includes('already exists')) {
          skipped++;
        } else {
          console.error(`  ❌ [${item.id}] ${msg}`);
          failed++;
        }
      } else {
        ok++;
      }
    } catch (e) {
      console.error(`  ❌ [${item.id}] fetch error: ${e.message}`);
      failed++;
    }

    await sleep(40); // ~25 req/s — evita throttling
  }

  console.log(`  ✅ creados: ${ok}  ⏭ skipped: ${skipped}  ❌ errores: ${failed}`);
  return { ok, skipped, failed };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const token = await getToken();
  const guestCreds = await getGuestCredentials();
  const results = {};

  // 1. Roles
  results.Roles = await migrate('Roles', readJSON('Roles.json'),
    'createV2Roles', 'CreateV2RolesInput',
    r => ({
      id: r.id,
      name: r.name,
      displayName: r.displayName,
      icon: r.icon,
    }), token);

  // 2. Coach
  results.Coach = await migrate('Coach', readJSON('Coach.json'),
    'createV2Coach', 'CreateV2CoachInput',
    c => ({
      id: c.id,
      name: c.name,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone || null,
      whatsapp: c.whatsapp || null,
      isActive: c.isActive ?? true,
      isCertificated: c.isCertificated ?? false,
    }), token);

  // 3. Location
  results.Location = await migrate('Location', readJSON('Location.json'),
    'createV2Location', 'CreateV2LocationInput',
    l => ({
      id: l.id,
      name: l.name,
      address: l.address || null,
      city: l.city || null,
      country: l.country || null,
      directions: l.directions || null,
      group: l.group || null,
      imageMap: l.imageMap || null,
      isActive: l.isActive ?? true,
      isVisible: l.isVisible ?? true,
      maximumTemperature: l.maximumTemperature ?? null,
      minimumTemperature: l.minimumTemperature ?? null,
      phone: l.phone || null,
      region: l.region || null,
      urlMap: l.urlMap || null,
    }), token);

  // 4. EvaluationLevel
  results.EvaluationLevel = await migrate('EvaluationLevel', readJSON('EvaluationLevel.json'),
    'createV2EvaluationLevel', 'CreateV2EvaluationLevelInput',
    e => ({
      id: e.id,
      name: e.name,
      description: e.description || null,
      ico: e.ico || null,
      order: e.order ?? null,
      startingAge: e.startingAge ?? null,
      endingAge: e.endingAge ?? null,
    }), token);

  // 5. ProfitCenter (allow.guest() → IAM signing)
  results.ProfitCenter = await migrateIAM('ProfitCenter', readJSON('ProfitCenter.json'),
    'createV2ProfitCenter', 'CreateV2ProfitCenterInput',
    p => ({
      id: p.id,
      name: p.name,
      code: p.code || null,
      description: p.description || null,
      isActive: p.isActive ?? true,
      managerID: p.managerID || null,
      parentProfitCenterID: p.parentProfitCenterID || null,
    }), guestCreds);

  // 6. EvaluationObjetives (depende de EvaluationLevel)
  results.EvaluationObjetives = await migrate('EvaluationObjetives', readJSON('EvaluationObjetives.json'),
    'createV2EvaluationObjetives', 'CreateV2EvaluationObjetivesInput',
    e => ({
      id: e.id,
      texto: e.texto || null,
      isActive: e.isActive ?? true,
      isMandatory: e.isMandatory ?? false,
      evaluationLevelId: e.evaluationLevelEvaluationObjectivesId,
    }), token);

  // 7. Product (allow.guest() → IAM signing)
  results.Product = await migrateIAM('Product', readJSON('Product.json'),
    'createV2Product', 'CreateV2ProductInput',
    p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      criticalStock: p.criticalStock ?? 0,
      currentStock: p.currentStock ?? 0,
      isActive: p.isActive ?? true,
      profits: p.profits ?? 0,
      purchasePrice: p.purchasePrice ?? 0,
      sellingPrice: p.sellingPrice ?? 0,
      supplierId: 'no-supplier',
    }), guestCreds);

  // 8. Users (1379 registros — latitude/longitude String→Float, usersRolesId→roleId)
  results.Users = await migrate('Users', readJSON('Users.json'),
    'createV2Users', 'CreateV2UsersInput',
    u => {
      if (!u.email) return null; // skip sin email
      return {
        id: u.id || undefined,
        name: (u.name || '').trim() || 'Sin nombre',
        email: u.email.trim().toLowerCase(),
        contactPhone: u.contactPhone || null,
        ig: u.ig || null,
        city: u.city || null,
        country: u.country || null,
        state: u.state || null,
        streetAddress: u.streetAddress || null,
        zipCode: u.zipCode || null,
        latitude: toFloat(u.latitude),
        longitude: toFloat(u.longitude),
        isEmployed: u.isEmployed ?? false,
        isAcademyStudent: u.isAcademyStudent ?? false,
        validated: u.validated ?? false,
        firstContact: u.firstContact ?? false,
        roleId: u.usersRolesId || null,
        salesCommission: toFloat(u.salesCommission),
        zoomLevel: u.zoomLevel ?? null,
      };
    }, token);

  // 9. StudentEvaluations (depende de EvaluationLevel, Students, Users)
  results.StudentEvaluations = await migrate('StudentEvaluations', readJSON('StudentEvaluations.json'),
    'createV2StudentEvaluations', 'CreateV2StudentEvaluationsInput',
    e => ({
      id: e.id,
      studentId: e.studentId || e.studentStudentEvaluationsId,
      userId: e.userId || e.usersStudentEvaluationsId,
      evaluationLevelId: e.evaluationLevelId || e.evaluationLevelStudentEvaluationsId,
      age: e.age ?? null,
      date: e.date || null,
      observations: e.observations || null,
      previousLevel: e.previousLevel || null,
      sessionsCarriedOut: e.sessionsCarriedOut ?? null,
      wasApproved: e.wasApproved ?? false,
    }), token);

  // 10. StudentEvaluationsDetail (depende de StudentEvaluations, EvaluationObjetives)
  results.StudentEvaluationsDetail = await migrate('StudentEvaluationsDetail', readJSON('StudentEvaluationsDetail.json'),
    'createV2StudentEvaluationsDetail', 'CreateV2StudentEvaluationsDetailInput',
    e => ({
      id: e.id,
      studentEvaluationsId: e.studentEvaluationsStudentEvaluationsDetailsId || e.studentEvaluationsId,
      evaluationObjectiveId: e.evaluationObjetivesStudentEvaluationsDetailsId || e.evaluationObjectiveId,
      text: e.text || null,
      wasAchieved: e.wasAchieved ?? false,
    }), token);

  // ── Resumen final ─────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════');
  console.log('📊 RESUMEN MIGRACIÓN');
  console.log('═══════════════════════════════════════');
  let totalOk = 0, totalFailed = 0;
  for (const [model, r] of Object.entries(results)) {
    console.log(`  ${model.padEnd(28)} ✅ ${String(r.ok).padStart(4)}  ❌ ${r.failed}`);
    totalOk += r.ok;
    totalFailed += r.failed;
  }
  console.log('───────────────────────────────────────');
  console.log(`  TOTAL${' '.repeat(23)} ✅ ${String(totalOk).padStart(4)}  ❌ ${totalFailed}`);
  console.log('═══════════════════════════════════════\n');
}

main().catch(e => { console.error('\n💥 Error fatal:', e.message); process.exit(1); });
