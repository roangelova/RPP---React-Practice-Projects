import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending : isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinAPI(id),
        //invalidate cash as soon as its done
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
            toast.success('Successfully deleted cabin!')
        }
        , onError: (err) => toast.error(err.message)
    })

    return {isDeleting, deleteCabin};
}

//CUSTOM HOOK