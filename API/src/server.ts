import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';
import { config } from "https://deno.land/x/dotenv/mod.ts";

const PORT = config().PORT ?? 3001;
const HOST = config().HOST ?? '127.0.0.1';

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Deno is running at https://${HOST}:${PORT}`);
app.listen(`${HOST}:${PORT}`);