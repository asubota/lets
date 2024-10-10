const parseData = (text) => {
    const cleanText = text
        .replace('/*O_o*/', '')
        .replace(/\n/g, '')
        .replace('google.visualization.Query.setResponse(', '')
        .replace(/\);$/, '');
    const table = JSON.parse(cleanText).table;
    const columns = table.cols.map((column) => column.label);
    return table.rows.map((row) => {
        const obj = {};
        row.c.forEach((cell, index) => {
            const colName = columns[index];
            if (colName === 'pics' && cell) {
                const value = cell.v.toString();
                obj[colName] = !value.includes('[')
                    ? [value]
                    : Array.from(new Set(JSON.parse(value.replace(/'/g, '"'))));
            }
            else if (colName === 'name' && !cell) {
                const skuIndex = columns.indexOf('sku');
                const skuCell = row.c[skuIndex];
                obj[colName] = skuCell ? skuCell.v : '-';
            }
            else {
                obj[colName] = cell?.v ?? null;
            }
        });
        return obj;
    });
};

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
function notifyAppAboutCacheReset(count) {
    sw.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            const message = { type: 'cache-update', payload: { count } };
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
                    payload: {
                        sku: data.sku,
                        to: data.to,
                    },
                };
                focusedClient.postMessage(message);
            }
            else {
                sw.clients.openWindow('/lets/');
            }
        });
    };
    event.waitUntil(doNavigation().then(() => event.notification.close()));
});
sw.addEventListener('message', async (event) => {
    const message = event.data;
    // if (message.type === 'xxx') {
    //   notifyAppAboutCacheReset(123)
    // }
    if (message.type === 'push-me') {
        await sw.registration.showNotification(message.payload.title, message.payload.options);
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
                        fetchAndCache(event.request, cache).then((response) => {
                            response.text().then((text) => {
                                const items = parseData(text);
                                console.log('Cache updated, app notified.');
                                notifyAppAboutCacheReset(items.length);
                            });
                        });
                    }
                    else {
                        console.log('Cache is still valid, returning cached data.');
                    }
                    return cachedResponse;
                }
            }
            console.log('No cache found, fetching new data...');
            return fetchAndCache(event.request, cache);
        });
        event.respondWith(response);
    }
});
