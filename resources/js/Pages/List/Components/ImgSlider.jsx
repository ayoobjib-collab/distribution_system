import { useRef } from "react";
import '@/../css/components/img-slider.css';
import { AiOutlineLeftCircle } from "react-icons/ai";
import { AiOutlineRightCircle } from "react-icons/ai";

export default function ImgSlider({ imgs }) {

    const sliderRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const next = () => {
        const slider = sliderRef.current;

        if (!slider) return;

        if (
            slider.scrollLeft + slider.clientWidth >=
            slider.scrollWidth - 1
        ) {
            nextBtnRef.current?.classList.add("hidden");
        }

        prevBtnRef.current?.classList.remove("hidden");

        slider.scrollBy({
            left: slider.clientWidth,
            behavior: "smooth",
        });
    };

    const prev = () => {
        const slider = sliderRef.current;

        if (!slider) return;

        if (slider.scrollLeft <= 0) {
            prevBtnRef.current?.classList.add("hidden");
        }

        nextBtnRef.current?.classList.remove("hidden");

        slider.scrollBy({
            left: -slider.clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="img-slider-wrapper">

            <span
                ref={prevBtnRef}
                className="slider-btn slider-prev"
                onClick={prev}
            >
                <AiOutlineLeftCircle />
            </span>

            <div className="img-slider" ref={sliderRef}>
                <div className="img-slider-track">
                    {imgs.map((el, index) => (
                        <div className="img-slide" key={index}>
                            <img
                                src={el.medium}
                                loading="lazy"
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>

            <span
                ref={nextBtnRef}
                className="slider-btn slider-next"
                onClick={next}
            >
                <AiOutlineRightCircle />
            </span>

        </div>
    );
}
