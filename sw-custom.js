const sw = self;
async function fetchAndCache(request, cache) {
    const networkResponse = await fetch(request);
    await cache.put(request, networkResponse.clone());
    await cache.put(`${request.url}-time`, new Response(Date.now().toString()));
    return networkResponse;
}
function isStale(cachedDate, currentDate) {
    const currentHour = currentDate.getHours();
    const cachedHour = cachedDate.getHours();
    return (currentDate.getDate() !== cachedDate.getDate() || currentHour !== cachedHour);
}
function notifyApp() {
    sw.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            const message = { type: 'cache-update' };
            client.postMessage(message);
        });
    });
}
sw.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    const doNavigation = async () => {
        return sw.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
            const focusedClient = windowClients.find((client) => 'focus' in client && client.focused);
            if (focusedClient) {
                const message = {
                    type: 'navigate',
                    ...data,
                };
                focusedClient.postMessage(message);
            }
            else {
                sw.clients.openWindow(data.to);
            }
        });
    };
    event.waitUntil(doNavigation().then(() => event.notification.close()));
});
sw.addEventListener('message', async (event) => {
    const message = event.data;
    if (message.type === 'push-me') {
        await sw.registration.showNotification(message.title, message.options);
    }
});
sw.addEventListener('fetch', (event) => {
    const { request: { url, method }, } = event;
    if (method === 'GET' && url.includes('docs.google.com')) {
        const response = sw.caches.open('lets-bike-api').then(async (cache) => {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                const cachedTime = await cache.match(`${event.request.url}-time`);
                if (cachedTime) {
                    const cachedDate = new Date(Number(await cachedTime.text()));
                    const now = new Date();
                    if (isStale(cachedDate, now)) {
                        console.log('Cache is stale, fetching new data...');
                        return fetchAndCache(event.request, cache).then((response) => {
                            notifyApp();
                            return response;
                        });
                    }
                    else {
                        console.log('Cache is still valid, returning cached data.');
                        return cachedResponse;
                    }
                }
            }
            console.log('No cache found, fetching new data...');
            return fetchAndCache(event.request, cache);
        });
        event.respondWith(response);
    }
});
