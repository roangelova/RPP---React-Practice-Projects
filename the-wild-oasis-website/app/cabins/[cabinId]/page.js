import Cabin from "@/app/_components/Cabin";
import Spinner from "@/app/_components/Spinner";
import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { name } = await getCabin(awaitedParams.cabinId);
  return { title: `Cabin ${name}` };
}

//make NEXT.JS aware of all the possible ids since we know them beforehand
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const awaitedParams = await params;

  const cabin = await getCabin(awaitedParams.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve cabin {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
