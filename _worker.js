export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ------------------
    const AUTH_TOKEN = 'pass';
    const DOH_PATH = '/dns-query';
    const ENABLE_CACHE = true;
    // ------------------

    if (url.pathname === DOH_PATH) {
      const token = url.searchParams.get('token');

      if (token !== AUTH_TOKEN) {
        return new Response('Not Found', { status: 404 });
      }

      url.searchParams.delete('token');
      const targetUrl = 'https://dns.google/dns-query' + url.search;

      const newHeaders = new Headers(request.headers);
      newHeaders.set('Host', 'dns.google');

      const fetchOptions = {
        method: request.method,
        headers: newHeaders,
        body: request.method === 'POST' ? request.body : null,
        redirect: 'follow'
      };

      if (ENABLE_CACHE === true) {
        fetchOptions.cf = {
          cacheEverything: true,
          cacheTtl: 60
        };
      }

      try {
        const response = await fetch(new Request(targetUrl, fetchOptions));
        return new Response(response.body, response);
      } catch (err) {
        return new Response('Error', { status: 500 });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
