//kinda a convention to have our server actions here
"use server" // -> they would run exclusively on the server; a bridge between the server and the clienet; 

import { signIn, signOut } from "./auth"

export async function signInAction(){
    await signIn("google", {redirectTo: '/account'})
}

export async function SignOutAction(){
    await signOut({redirectTo: '/'})
}

//Next.js creates an API endpoint with URL for each server action; A post request is made to that URL, but the function NEVER reaches the client,
//meaning that the code always stays on the server and is never exposed to the browser; Therefore, it is technically safe to expose API keys and connect direct to a db etc. 
//!!!Unlike server components, server actions actually require a running web server; 
//they could also be called from event handlers and useEffect; 