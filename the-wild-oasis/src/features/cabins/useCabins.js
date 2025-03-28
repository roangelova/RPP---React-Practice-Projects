import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";


export function useCabins(){
    const { data: cabins, isPending, error } = useQuery({
        //must be an array
        queryKey: ['cabins'],
        //needs to return a promise
        queryFn: getCabins
      })
    
      return {isPending, error, cabins}
}