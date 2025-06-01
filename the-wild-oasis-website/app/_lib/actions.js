//kinda a convention to have our server actions here
"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";

export async function signInAction() {
    await signIn("google", { redirectTo: '/account' })
}

export async function SignOutAction() {
    await signOut({ redirectTo: '/' })
}

//creates a POST req to the url that next.js auto created for us
export async function updateProfile(formData) {
    //the form auto passes ALL form data
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    //we should assume that the data is unsafe

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national ID");

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId);

    if (error) throw new Error("Guest could not be updated");

    //browser stores the data ot dynamic pages for 30 seconds
    revalidatePath("/account/profile"); //-> manual on demand revalidation
}