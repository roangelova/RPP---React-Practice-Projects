import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    //CredentialsProvider -> if we had a database;
  ],
  callbacks: {
    //will be called when a user tries to acces the protected route;
    authorized({ auth, request }) {
      return !!auth?.user; //convert any value to booleab
    },
    //we will create the data when the user signs in for te first time
    // we cant add the user Id to the session hre, as the session has not been created yet;
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch {
        return false;
      }
    }, //caled after the user submits their credentials, but before they are actually logged in;
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
//GET, POST --> ARE ACTUALLY ROUTE HANDLER FUNCTIONS
