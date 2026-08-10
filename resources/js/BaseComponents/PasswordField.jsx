import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

function PasswordField({ label, value, handleChange }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-group" >
            <input type={showPassword ? 'text' : 'password'} required value={value.password} onChange={handleChange} id="password" placeholder='' />
            <div className="password-eyes" onClick={() => { setShowPassword(!showPassword) }}>
                {showPassword ? <LuEyeClosed size={23} /> : <LuEye size={23} />}
            </div>
            <label htmlFor="password">{label}</label>
        </div>
    )
}

export default PasswordField;