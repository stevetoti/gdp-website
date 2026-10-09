import { handler } from "../_shared/handlers.ts";
Deno.serve((req) => handler("gdp-chat-worker", req));
