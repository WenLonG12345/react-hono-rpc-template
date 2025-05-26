// import { oauthRouter } from '@/api/oauth';
// import { auth } from '@/lib/auth';
import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { API_URL, APP_URL, IS_PROD } from './config/server';
import { httpLogger } from './config/utils/logger';
// import { bullboardServerAdapter } from './queues';
// import { apiRouter } from '@/api';

// const app = new Hono<{
//   Variables: {
//     user: typeof auth.$Infer.Session.user | null;
//     session: typeof auth.$Infer.Session.session | null;
//   };
// }>();

// app.use(trimTrailingSlash());

const app = new Hono();

// TODO: https://github.com/honojs/node-server/issues/39#issuecomment-1521589561
// app.use(compress());
if (IS_PROD) {
  app.use(httpLogger);
}

// cors middleware (only set it for /api/* routes)
app.use(
  '/*',
  cors({
    origin: [API_URL, APP_URL],
    credentials: true,
  }),
);

// app.use('*', async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });

//   if (!session) {
//     c.set('user', null);
//     c.set('session', null);
//     return next();
//   }

//   c.set('user', session.user);
//   c.set('session', session.session);
//   return next();
// });

// app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

// // handle twitter auth
// app.route('/api/oauth', oauthRouter);

// app.route('/api', apiRouter);

// // handle bull-board requests
// // app.use("/ctrls", bullBoardAuthMiddleware);
// app.route('/ctrls', bullboardServerAdapter.registerPlugin());

app.get('/health', (c) => {
  return c.text('OK');
});

const port = Number(process.env.PORT ?? 3000);

serve(
  {
    ...app,
    port,
  },
  () => {
    console.log(`Hono server listening at port ${port}`);
  },
);

export default app;
