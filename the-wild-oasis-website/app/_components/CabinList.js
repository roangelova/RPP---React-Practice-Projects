import { unstable_noStore } from "next/cache";

import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
    unstable_noStore()

    const cabins = await getCabins();

    if (!cabins.length) return null;

    let displayedCabins;

    if (filter === 'all') {
        displayedCabins = cabins;
    }
    else if (filter === 'small') {
        displayedCabins = cabins.filter((c) => c.maxCapacity <= 3)
    }
    else if (filter === 'large') {
        displayedCabins = cabins.filter((c) => c.maxCapacity >= 4)
    }

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">

            {displayedCabins.length > 0 &&
                displayedCabins.map((cabin) => (
                    <CabinCard cabin={cabin} key={cabin.id} />
                ))}
        </div>
    );
}

export default CabinList;