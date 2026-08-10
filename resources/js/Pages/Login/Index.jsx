import Button from '@/BaseComponents/Button';
import BackButton from '@/BaseComponents/BackButton';
import FullPageFormLayout from "@/Layouts/FullPage/Layout";

import { useState, useEffect } from 'react';
import { FcCancel } from "react-icons/fc";
import { Link, router } from '@inertiajs/react'


const LoginForm = ({ errors, sendUrl, registerUrl, otpLoginUrl }) => {

    //Active first input
    useEffect(() => {
        document.querySelector('input:first-child').focus();
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [valid, setValid] = useState({
        mobile: '',
        password: ''
    });

    const [values, setValues] = useState({
        mobile: "",
        password: "",
    });


    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        setValid((prevValid) => {
            let newValidate = { ...prevValid }

            switch (key) {
                case "mobile":
                    newValidate.mobile = validmobile(value);
                    break;
                case "password":
                    newValidate.password = validPassword(value);
                    break;
            }

            return newValidate;
        })

        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function validmobile(val) {
        return (val.length > 11) ? 'شماره باید 11 رقم باشد' : '';
    }

    function validPassword(val) {
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.post(sendUrl, values, {
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                //console.error('Login error:', errors);
            }
        });

    }

    return (
        <>
            <div className="form-head">
                <BackButton />
                <p className='form-title'>
                    ورود
                </p>
            </div>


            {errors.mobile &&
                <div className="errors top">
                    <FcCancel />
                    {errors.mobile}
                </div>
            }

            <form action="#" onSubmit={handleSubmit}>

                <div className={`form-group ${valid.mobile === '' ? '' : 'not-valid'}`}>
                    <input type="tel" required value={values.mobile} onChange={handleChange} id="mobile" placeholder='' maxLength="11" />
                    <label htmlFor='mobile'>
                        نام کاربری
                    </label>
                </div>

                <div className="form-group">
                    <input type="password" required value={values.password} onChange={handleChange} id="password" placeholder='' />
                    <label htmlFor='password'>
                        رمز عبور
                    </label>
                </div>

                <Button isLoading={isLoading} text='ورود' />
            </form>

            <div className='button-link'>
                <div className="or-line flex">
                    <span className='line'></span>
                    <small>یا</small>
                    <span className='line'></span>
                </div>

                <div className='links flex'>
                    <Link href={registerUrl}>
                        ثبت نام
                    </Link>

                    <Link href={otpLoginUrl}>
                        ورود با کد یکبار مصرف
                    </Link>
                </div>

            </div>
        </>
    )
};


LoginForm.layout = page => <FullPageFormLayout children={page} />

export default LoginForm;