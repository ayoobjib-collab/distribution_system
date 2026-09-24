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

export const faToEn = (str) => {

    if (typeof str !== 'string') return str;

    return str

        // Persian digits ۰۱۲۳۴۵۶۷۸۹
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06F0))

        // Arabic-Indic digits ٠١٢٣٤٥٦٧٨٩
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
};

export const createRandomId = () => {
    return crypto.randomUUID();
}


// VITE_APP_NAME="${APP_NAME}"
// VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
// VITE_PUSHER_HOST="${PUSHER_HOST}"
// VITE_PUSHER_PORT="${PUSHER_PORT}"
// VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
// VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
// VITE_ASSET_URL="${ASSET_URL}"
