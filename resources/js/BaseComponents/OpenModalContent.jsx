import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

function OpenModalContent({ head, children }) {

    const modalRoot = document.getElementById('modalWrap');

    const [isOpen, setIsOpen] = useState(true);

    const generate = () => {
        const divBlur = document.createElement("div");
        divBlur.classList.add('modal-bar')
        // const divCount = document.createElement("div");

        // divBlur.appendChild(divCount);
        return divBlur;
    }

    const modalBar = useRef(generate());


    useEffect(function () {

        if (isOpen)
            modalRoot.appendChild(modalBar.current);
        // else {
        //     if (modalRoot.children.length)
        //         modalRoot.removeChild(modalBar.current);
        // }

        return () => {
            if (modalRoot.children.length) {
                modalRoot.removeChild(modalBar.current);
            }
        }
    }, [isOpen]);


    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {createPortal((
                (
                    <div className="modal-wrap" onClick={toggleModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h3>{head}</h3>
                            <br />
                            <div className="">{children}</div>
                        </div>
                    </div>
                )

            ), modalBar.current)}
        </>
    )
}

export default OpenModalContent;