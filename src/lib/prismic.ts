// import * as prismic from '@prismicio/client'
// import { PrismicProvider } from '@prismicio/react'

// // Crear el cliente de Prismic
// export const client = prismic.createClient('https://miniswimmerchile.cdn.prismic.io/api/v2', {
//   // accessToken: 'your-access-token', // Opcional si tu repo es público
// })
// import { Content } from '@prismicio/client'

// import * as prismic from '@prismicio/client'
// // import { enableAutoPreviews } from '@prismicio/client'
// import { ElementType } from 'react'

// export const repositoryName = 'https://miniswimmerchile.cdn.prismic.io/api/v2'

// // Crear el cliente con tipos
// export const client = prismic.createClient<Content.AllDocumentTypes>(repositoryName, {
//   // accessToken: process.env.PRISMIC_ACCESS_TOKEN,
//   routes: [
//     {
//       type: 'documentation',
//       path: '/doc/:uid',
//     },
//   ],
// })

import { createClient } from '@prismicio/client'

export const client = createClient('https://miniswimmerchile.cdn.prismic.io/api/v2', {
  // accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
})