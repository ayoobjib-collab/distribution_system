import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react';
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function UserInfo({ userUrl }) {

    const { auth } = usePage().props

    return (
        <div className="account-info">
            <Link href={userUrl}>
                <div>
                    <div className="account-info-picture">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="size-full">
                            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="#535A8C">
                            </rect>
                            <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#646DA3">
                            </rect>
                            <path opacity="0.4" d="M19.9998 6.6665C16.5065 6.6665 13.6665 9.5065 13.6665 12.9998C13.6665 16.4265 16.3465 19.1998 19.8398 19.3198C19.9465 19.3065 20.0532 19.3065 20.1332 19.3198C20.1598 19.3198 20.1732 19.3198 20.1998 19.3198C20.2132 19.3198 20.2132 19.3198 20.2265 19.3198C23.6398 19.1998 26.3198 16.4265 26.3332 12.9998C26.3332 9.5065 23.4932 6.6665 19.9998 6.6665Z" fill="#FCFDFF"></path>
                            <path d="M26.7733 22.8668C23.0533 20.3868 16.9866 20.3868 13.2399 22.8668C11.5466 24.0002 10.6133 25.5335 10.6133 27.1735C10.6133 28.8135 11.5466 30.3335 13.2266 31.4535C15.0933 32.7068 17.5466 33.3335 19.9999 33.3335C22.4533 33.3335 24.9066 32.7068 26.7733 31.4535C28.4533 30.3202 29.3866 28.8002 29.3866 27.1468C29.3733 25.5068 28.4533 23.9868 26.7733 22.8668Z" fill="#FCFDFF"></path>
                        </svg>
                    </div>
                    <div className="account-info-name">
                        {auth.user !== null && auth.user.full_name}
                    </div>
                </div>

                <MdKeyboardArrowLeft size={25} />
            </Link>
        </div >
    )
}