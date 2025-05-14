//needs to be at the top of the app; 
import { NextResponse } from "next/server";

//runs for every single route;
//export function middleware(request){
//    
//    //retun NextResponse to redirect -> a wrapper around the native response; 
//    return NextResponse.redirect(new URL("/about", request.url));
//
//}

import {auth} from "@/app/_lib/auth";

export const middleware = auth; //the auth server as a middleware function

//routes, at which this middleware should run
export const config = {
    matcher: ["/account"] //the route we want to protect
}