export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ------------------
    const AUTH_TOKEN = 'l2c2';
    const DOH_PATH = '/gdns';
    const ENABLE_CACHE = true;export default {
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

      const response = await fetch(new Request(targetUrl, fetchOptions));
      return new Response(response.body, response);

    }

    return new Response('Not Found', { status: 404 });
    
  }
};

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
      
      const response = await fetch(new Request(targetUrl, fetchOptions));
      return new Response(response.body, response);

    }

    return new Response('Not Found', { status: 404 });
  }
};
