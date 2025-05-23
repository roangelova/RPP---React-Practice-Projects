import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import FilterBy from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: 'Cabins'
}

//cache will be invalidated in t
export const revalidate = 3600; //now that we have added filtering, the page is dynamic and this no longer takes effect

export default async function Page({ searchParams }) {
const params = await searchParams;
  const filter = params.capacity ?? 'all';


  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <FilterBy />
      </div>

    
      <Suspense key={filter} fallback={<Spinner />}> 
        <CabinList filter={filter} />
        <ReservationReminder/>
      </Suspense>

    </div>
  );
}