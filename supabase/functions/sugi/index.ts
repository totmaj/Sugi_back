// supabase/functions/getBooks/index.ts

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import BookController from "../Controllers/BookController.ts";
import AuthController from "../Controllers/AuthController.ts";
import Router from "../routers/index.ts"; // Import the router

const bookController = new BookController();
const authController = new AuthController();
const router = new Router();

// Register routes
router.register("GET", "/sugi/books", bookController.getBooks, [
  authController.authorizeRequest.bind(authController),
]);
router.register("POST", "/sugi/auth/token", authController.getToken);
// Handle requests with the router
Deno.serve((req) => router.handleRequest(req));
