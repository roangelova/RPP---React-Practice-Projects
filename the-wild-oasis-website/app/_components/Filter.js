"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterBy() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const currentFilter = searchParams.get('capacity') ?? 'all';

    function handeFilter(filter) {

        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="border border-primary-800 flex">
            <button onClick={() => handeFilter('all')} className={`${currentFilter=== 'all' ? 'bg-primary-700 text-primary-50': null} px-5 py-2 hover:bg-primary-700`}>All cabins</button>
            <button onClick={() => handeFilter('small')} className={`${currentFilter=== 'small' ? 'bg-primary-700 text-primary-50': null} px-5 py-2 hover:bg-primary-700`}>1-3 guests</button>
            <button onClick={() => handeFilter('large')} className={`${currentFilter=== 'large' ? 'bg-primary-700 text-primary-50': null} px-5 py-2 hover:bg-primary-700`}>4-8 guests</button>
        </div>
    );
}

export default FilterBy;