function InvoiceHead({ type, childClicked }) {

    return (

        <section className='invoice-head flex flex-col gap-8' >

            <div className="flex ih-type flex-col gap-2"  onClick={childClicked}>
                <h4>ایجاد فاکتور جدید</h4>

                {/* <div className="flex ih-buttons">
                    <span type="pre" className={type === 'pre' ? 'active' : ''}>
                        پیش فاکتور
                    </span>
                    <span className="hr"></span>
                    <span type="get" className={type === 'get' ? 'active' : ''}>
                        فاکتور خرید
                    </span>
                    <span className="hr"></span>
                    <span type="pay" className={type === 'pay' ? 'active' : ''}>
                        فاکتور فروش
                    </span>
                </div> */}

            </div>

            <div className="flex ih-date gap-2">

                {/* <div className='flex flex-col'>
                    تاریخ:
                    <input type="date" name="" id="" />
                </div>

                <div className='flex flex-col'>
                    سر رسید پرداخت:
                    <input type="date" name="" id="" />
                </div> */}

            </div>

        </section>

    )
}

export default InvoiceHead;