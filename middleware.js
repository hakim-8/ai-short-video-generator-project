import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  const isPublic = isPublicRoute(request);

  // Log the incoming request and its status
  console.log('Middleware: Incoming Request');
  console.log(`Path: ${url.pathname}`);
  console.log(`Is Public Route: ${isPublic}`);

  if (isPublic) {
    // If the user is logged in and tries to access public routes like sign-in/sign-up, redirect them to dashboard
    if (auth.userId) {
      return Response.redirect('/dashboard');  // Redirect logged-in users to /dashboard
    }
    return;  // Allow access to public routes like /sign-in, /sign-up if not logged in
  }

  try {
    console.log(`Protected route accessed: ${url.pathname}`);
    await auth.protect(); // Protect other routes
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error; // Let Clerk handle redirection or errors
  }
});

// Update matcher configuration
export const config = {
  matcher: [
    // Explicitly define routes to avoid unnecessary interception
    '/',
    '/sign-in',
    '/sign-up',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
