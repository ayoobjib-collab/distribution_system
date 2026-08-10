import { GoArrowRight } from "react-icons/go";

function BackButton() {

    function goBack() {
        const referrer = document.referrer; // previous page
        const currentHost = window.location.host;

        if (referrer && referrer.includes(currentHost)) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }

    return (
        <GoArrowRight size={24} onClick={goBack} />
    )
}

export default BackButton;