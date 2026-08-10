import { createPortal } from "react-dom";
import { useState } from "react";

function ModalContent({ clickable, head, children }) {
    const modalWrap = document.getElementById('modalWrap');

    const [isopen, setIsOpen] = useState(false);

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
            {isopen &&
                createPortal((
                    (
                        <div className="modal-wrap" onClick={toggleModal}>
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <h1>{head}</h1>
                                <br />
                                <div className="">{children}</div>
                            </div>
                        </div>
                    )

                ), modalWrap)
            }
        </>
    )
}

export default ModalContent;