import { handler } from "../_shared/handlers.ts";
Deno.serve((req) => handler("whatsapp-send", req));
