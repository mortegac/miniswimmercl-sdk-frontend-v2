/// <reference lib="webworker" />

import { precacheAndRoute, PrecacheEntry } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// No necesitamos declarar __WB_MANIFEST aquí, ya que Workbox lo proporciona

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

precacheAndRoute(self.__WB_MANIFEST)