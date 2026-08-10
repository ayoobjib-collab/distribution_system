import React from 'react';

function Button({ isLoading, text = 'ذخیره', childClicked }) {

    return (
        <div className="form-button">
            <button
                type="submit"
                disabled={isLoading}
                onClick={childClicked}
            >
                <span>
                    {text}
                </span>
                {isLoading
                    &&
                    (
                        <svg
                            version="1.1"
                            id="loader-1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            width="20px"
                            height="20px"
                            viewBox="0 0 50 50"
                            style={{ enableBackground: 'new 0 0 50 50' }}
                            xmlSpace="preserve"
                        >
                            <path
                                fill="white"
                                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683
         c-10.318,0-18.683,8.365-18.683,18.683h4.068
         c0-8.071,6.543-14.615,14.615-14.615
         c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                            >
                                <animateTransform
                                    attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 25 25"
                                    to="360 25 25"
                                    dur="0.6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
                    )}

            </button>
        </div>
    )
}

export default React.memo(Button);