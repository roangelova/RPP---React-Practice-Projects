import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";



export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
            toast.success('New cabin successfully created!');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
            onCloseModal?.() //call if it existss
        },
        onError: (err) => toast.error(err.message)
    })

    return {isCreating, createCabin}
}