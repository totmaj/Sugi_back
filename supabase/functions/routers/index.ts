// routers/index.ts

type Handler = (req: Request) => Promise<Response>;
type Middleware = (req: Request) => Promise<boolean>;

class Router {
  private routes: Record<string, { handler: Handler; middleware?: Middleware[] }> = {};

  register(method: string, path: string, handler: Handler, middleware?: Middleware[]) {
    this.routes[`${method}:${path}`] = { handler, middleware };
  }

  async handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const route = this.routes[`${req.method}:${url.pathname}`];

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    // Run middlewares if any
    if (route.middleware) {
      for (const middleware of route.middleware) {
        const authorized = await middleware(req);
        if (!authorized) {
          return new Response("Unauthorized", { status: 401 });
        }
      }
    }

    // Call the main handler
    return route.handler(req);
  }
}

export default Router;
