import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    //CredentialsProvider -> if we had a database; 
  ],
};

export const {auth, handlers: {GET, POST}} = NextAuth(authConfig)
//GET, POST --> ARE ACTUALLY ROUTE HANDLER FUNCTIONS