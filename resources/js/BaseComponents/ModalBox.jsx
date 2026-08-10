import { useState } from "react";

function ModalBox({ clickable = "", head, children, defualtOpen = false }) {

    const [isopen, setIsOpen] = useState(defualtOpen);

    function OpenModal() {
        return (
            <button onClick={toggleModal}>
                {clickable}
            </button>
        )
    }

    function toggleModal() {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            <OpenModal />

            {isopen && (
                <div className="modal-wrap" onClick={toggleModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div>{head}</div>
                        <br />
                        <div>{children}</div>
                    </div>
                </div>)
            }
        </>
    )
}

export default ModalBox;