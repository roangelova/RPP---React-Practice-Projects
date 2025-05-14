//HERE, WE SHOULDN'T HAVE A PAJE.JS, BECAUSE WE ARE NOT RETURNING HTML.

import { getCabin } from "@/app/_lib/data-service";

//ROUTE HANDLER EXAMPLE
export async function GET(request, { params }) { 
  //This is not a Next.js func, but they do have some extensions of it
  const { cabinId } = await params;

  try {
    let cabinData = await getCabin(cabinId);
  } catch {
    return Response.json({ message: "Cabin was not found" });
  }

  return Response.json({ cabin: cabinData });
}
