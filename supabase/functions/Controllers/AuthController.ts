// controllers/AuthController.ts

import type { SupabaseAuthClient } from "../../../node_modules/@supabase/supabase-js/dist/main/lib/SupabaseAuthClient.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Initialize the Supabase client with your URL and anon key
const supabase = createClient(
    "https://mhypofwfqwtxejiwflyb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oeXBvZndmcXd0eGVqaXdmbHliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDExOTUzMiwiZXhwIjoyMDQ1Njk1NTMyfQ.0B4ROAQ5bmaM-t-x0thF6Dcgkv11_djDSW6I_EyErOI",
);

class AuthController {
    async getToken(req: Request): Promise<Response> {
        try {
            // Extract username and password from the request body
            const { username, password } = await req.json();

            // Authenticate the user with Supabase
            const { data, error } = await (supabase.auth as SupabaseAuthClient).signInWithPassword({
                email: username,
                password,
            });

            if (error) {
                return new Response(
                    JSON.stringify({ error: error.message }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            // Return the authentication token if successful
            return new Response(
                JSON.stringify({ token: data.session?.access_token }),
                { headers: { "Content-Type": "application/json" } }
            );
        } catch (err) {
            return new Response(
                JSON.stringify({ error: "Invalid request" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    async authorizeRequest(req: Request): Promise<boolean> {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) return false;
    
        const token = authHeader.replace("Bearer ", "");
        const { data, error } = await (supabase.auth as SupabaseAuthClient).getUser(token);
    
        return !error && data?.user !== null;
      }
}

export default AuthController;
