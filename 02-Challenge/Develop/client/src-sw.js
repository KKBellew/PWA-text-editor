import React, { useEffect } from 'react';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

const PageCacheComponent = () => {
  useEffect(() => {
    precacheAndRoute(self.__WB_MANIFEST);

    const pageCache = new CacheFirst({
      cacheName: 'page-cache',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    });

    warmStrategyCache({
      urls: ['/index.html', '/'],
      strategy: pageCache,
    });

    // Implement asset caching
    registerRoute(
      ({ request }) =>
        request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'image',
      new CacheFirst({
        cacheName: 'assets-cache',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      })
    );
  }, []);

  //return null;
};

export default PageCacheComponent;