import {
    formatGregorianDate,
    getCurrentGregorianDate,
    getDaysInGregorianMonth,
    isValidGregorianDate,
    parseGregorianDate,
} from './gregorian-date';

import {
    formatJalaliDate,
    getCurrentJalaliDate,
    getDaysInJalaliMonth,
    isValidJalaliDate,
    parseJalaliDate,
} from './jalali-date';

import {
    formatDateWithCustomFormat,
    parseDateWithCustomFormat,
} from './format-utils';

export const getCurrentDate = (calendarType) => {
    return calendarType === 'jalali'
        ? getCurrentJalaliDate()
        : getCurrentGregorianDate();
};

export const parseDate = (value, calendarType) => {
    return calendarType === 'jalali'
        ? parseJalaliDate(value)
        : parseGregorianDate(value);
};

export const formatDate = (date, calendarType) => {
    if (calendarType === 'jalali') {
        return isValidJalaliDate(date)
            ? formatJalaliDate(date)
            : '';
    } else {
        return isValidGregorianDate(date)
            ? formatGregorianDate(date)
            : '';
    }
};

export const formatDateWithFormat = (
    date,
    calendarType,
    format
) => {
    if (calendarType === 'jalali') {
        return isValidJalaliDate(date)
            ? formatDateWithCustomFormat(date, calendarType, format)
            : '';
    } else {
        return isValidGregorianDate(date)
            ? formatDateWithCustomFormat(date, calendarType, format)
            : '';
    }
};

export const parseDateWithFormat = (
    value,
    calendarType,
    format
) => {
    // First try to parse with the specified format
    const parsedWithFormat = parseDateWithCustomFormat(
        value,
        calendarType,
        format
    );

    if (parsedWithFormat) return parsedWithFormat;

    // Fallback to default parsing if format parsing fails
    return parseDate(value, calendarType);
};

export const isValidDate = (date, calendarType) => {
    return calendarType === 'jalali'
        ? isValidJalaliDate(date)
        : isValidGregorianDate(date);
};

export const getDaysInMonth = (date, calendarType) => {
    if (calendarType === 'jalali') {
        return getDaysInJalaliMonth(date.year, date.month);
    } else {
        return getDaysInGregorianMonth(date.year, date.month);
    }
};

export const getValidInitialDate = (
    value,
    calendarType,
    format = 'default'
) => {
    if (value) {
        const parsed = parseDateWithFormat(
            value,
            calendarType,
            format
        );

        if (parsed) return parsed;
    }

    return getCurrentDate(calendarType);
};