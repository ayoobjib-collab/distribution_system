export function formatAmount(amount) {
    // return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const num = amount.toString().replace(/,/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function showPretty(str) {
    try {
        const obj = JSON.parse(str);
        const pretty = JSON.stringify(obj, null, 2);
        return pretty;
    } catch (e) {
        return `Invalid JSON`;
    }
}


export function isValidNumber(value) {

    const regex = /^09\d{9}$/;

    if (!regex.test(value))
        return false;

    return true;
}


export function reFromatAmount(formatedAmount) {
    return formatedAmount.replace(/,/g, "");
}


export function getUrl(path) {

    if (path.startsWith('/'))
        path = path.replace('/', '');

    //get form .env
    const baseUrl = import.meta.env.VITE_ASSET_URL;
    const sperator = baseUrl.endsWith('/') ? '' : '/';

    return baseUrl + sperator + path;
}


// VITE_APP_NAME="${APP_NAME}"
// VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
// VITE_PUSHER_HOST="${PUSHER_HOST}"
// VITE_PUSHER_PORT="${PUSHER_PORT}"
// VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
// VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
// VITE_ASSET_URL="${ASSET_URL}"

/* <div className="flex flex-col gap-4 ic-search-wrap">
    <h4>انتخاب مشتری</h4>
    <AsyncSelect
        cacheOptions
        defaultOptions={false}
        loadOptions={getCustomers}
        onChange={addCustomer}
        placeholder="جستجوی مشتری با نام یا شماره ...."
        noOptionsMessage={() => "موردی یافت نشد"}
        required
    />
</div> */


// Route::get('/customer/{customer}/transactions', [TransactionController::class, 'index']);
// Route::get('/account/{account}/transactions',   [TransactionAccountController::class, 'index']);

// Route::get('/customer/{customer}/invoices',     [InvoiceController::class, 'index']);