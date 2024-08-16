/*
middleware.js is a file where you define middleware functions that will be executed for
incoming requests before they reach the route handlers. Middleware functions can 
perform various tasks like modifying the request and response objects, handling 
authentication, logging, and more.

Accoding to nextAuth docs :-
Add optional Middleware to keep the session alive, this will update the session expiry 
every time its called.


*/
export { auth as middleware } from "@/auth";
