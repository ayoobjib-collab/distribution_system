import WheelPicker from '../WheelPicker';
import { jalaliMonths, gregorianMonths } from './constants';

export const generateYears = (minYear, maxYear) => {
    const arr = [];

    for (let y = minYear; y <= maxYear; y++) {
        arr.push(y.toString());
    }

    return arr;
};

export const generateDays = (daysInMonth) => {
    return Array.from(
        { length: daysInMonth },
        (_, i) => (i + 1).toString()
    );
};

export const getMonthIndex = (monthName, calendarType) => {
    const months =
        calendarType === 'jalali'
            ? jalaliMonths
            : gregorianMonths;

    return months.indexOf(monthName) + 1;
};

export const getMonthName = (monthIndex, calendarType) => {
    const months =
        calendarType === 'jalali'
            ? jalaliMonths
            : gregorianMonths;

    return months[monthIndex - 1];
};

export const createDayWheel = (
    days,
    currentDay,
    onDayChange,
    wheelPickerProps
) => (
    <WheelPicker
        items={days}
        onChange={onDayChange}
        value={currentDay.toString()}
        containerClassName="wd-datepicker-wheel-container"
        visibleCount={3}
        {...wheelPickerProps}
    />
);

export const createMonthWheel = (
    months,
    currentMonth,
    onMonthChange,
    wheelPickerProps
) => (
    <WheelPicker
        items={months}
        onChange={onMonthChange}
        value={months[currentMonth - 1]}
        containerClassName="wd-datepicker-wheel-container"
        visibleCount={3}
        {...wheelPickerProps}
    />
);

export const createYearWheel = (
    years,
    currentYear,
    onYearChange,
    wheelPickerProps
) => (
    <WheelPicker
        items={years}
        onChange={onYearChange}
        value={currentYear.toString()}
        containerClassName="wd-datepicker-wheel-container"
        visibleCount={3}
        {...wheelPickerProps}
    />
);

export const getWheelOrder = (
    dayWheel,
    monthWheel,
    yearWheel,
    calendarType
) => {
    return calendarType === 'miladi'
        ? [yearWheel, monthWheel, dayWheel]
        : [dayWheel, monthWheel, yearWheel];
};