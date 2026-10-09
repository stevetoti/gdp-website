import { handler } from "../_shared/handlers.ts";
Deno.serve((req) => handler("whatsapp-inbound", req));
