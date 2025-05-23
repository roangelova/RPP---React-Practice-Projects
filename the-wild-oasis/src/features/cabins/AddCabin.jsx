import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpenModal(isOpenModal => !isOpenModal)}>Add new cabin</Button>

            {isOpenModal &&
                <Modal onClose={()=> setIsOpenModal(false)}>
                    <CreateCabinForm onCloseModal={()=> setIsOpenModal(false)}/>
                </Modal>}


        </>
    );
}

export default AddCabin;