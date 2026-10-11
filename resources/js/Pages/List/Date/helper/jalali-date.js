// Convert Gregorian to Jalali
export function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    let jy = gy <= 1600 ? 0 : 979;

    gy -= gy <= 1600 ? 621 : 1600;

    const gy2 = gm > 2 ? gy + 1 : gy;

    let days =
        365 * gy +
        parseInt(String((gy2 + 3) / 4)) -
        parseInt(String((gy2 + 99) / 100)) +
        parseInt(String((gy2 + 399) / 400)) -
        80 +
        gd +
        g_d_m[gm - 1];

    jy += 33 * parseInt(String(days / 12053));
    days %= 12053;

    jy += 4 * parseInt(String(days / 1461));
    days %= 1461;

    jy += parseInt(String((days - 1) / 365));

    if (days > 365) {
        days = (days - 1) % 365;
    }

    const jm =
        days < 186
            ? 1 + parseInt(String(days / 31))
            : 7 + parseInt(String((days - 186) / 30));

    const jd =
        1 + (days < 186 ? days % 31 : (days - 186) % 30);

    return { year: jy, month: jm, day: jd };
}

// Convert Jalali to Gregorian
export function jalaliToGregorian(jy, jm, jd) {
    let gy = jy <= 979 ? 621 : 1600;

    jy -= jy <= 979 ? 0 : 979;

    let days =
        365 * jy +
        parseInt(String(jy / 33)) * 8 +
        parseInt(String(((jy % 33) + 3) / 4)) +
        78 +
        jd +
        (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

    gy += 400 * parseInt(String(days / 146097));
    days %= 146097;

    if (days > 36524) {
        gy += 100 * parseInt(String(--days / 36524));
        days %= 36524;

        if (days >= 365) {
            days++;
        }
    }

    gy += 4 * parseInt(String(days / 1461));
    days %= 1461;

    if (days > 365) {
        gy += parseInt(String((days - 1) / 365));
        days = (days - 1) % 365;
    }

    const gd = days + 1;

    const sal_a = [
        0,
        31,
        (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let gm;
    let day = gd;

    for (gm = 0; gm < 13 && day > sal_a[gm]; gm++) {
        day -= sal_a[gm];
    }

    return { year: gy, month: gm, day };
}

// Get days in month for Jalali year/month
export function getDaysInJalaliMonth(year, month) {
    if (month <= 6) return 31;
    if (month <= 11) return 30;

    // Esfand (month 12)
    return isLeapJalaliYear(year) ? 30 : 29;
}

// Check if Jalali year is leap
export function isLeapJalaliYear(year) {
    return ((year + 12) % 33) % 4 === 1;
}

// Parse Jalali date string (YYYY/MM/DD format)
export function parseJalaliDate(dateString) {
    const match = dateString.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

    if (!match) return null;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    if (month < 1 || month > 12) return null;

    if (day < 1 || day > getDaysInJalaliMonth(year, month)) {
        return null;
    }

    return { year, month, day };
}

// Format Jalali date to string (YYYY/MM/DD format)
export function formatJalaliDate(date) {
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');

    return `${ date.year } /${month}/${ day } `;
}

// Get current Jalali date
export function getCurrentJalaliDate() {
    const now = new Date();

    return gregorianToJalali(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
    );
}

// Validate Jalali date
export function isValidJalaliDate(date) {
    if (date.month < 1 || date.month > 12) return false;

    if (
        date.day < 1 ||
        date.day > getDaysInJalaliMonth(date.year, date.month)
    ) {
        return false;
    }

    return true;
}