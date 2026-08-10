const FullPageFormLayout = ({ children }) => {

    return (
        <div className="form-wrap full-page">

            <div className='form-box'>
                {children}
            </div>

            <div className="fp-img hide-im-mob">

            </div>
        </div>
    )
}

export default FullPageFormLayout;