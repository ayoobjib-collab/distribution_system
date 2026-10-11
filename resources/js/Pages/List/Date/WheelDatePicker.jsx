import { useEffect, useMemo, useState } from 'react';

import {
    getCurrentGregorianDate,
} from './helper/gregorian-date';

import {
    getCurrentJalaliDate,
} from './helper/jalali-date';

import Button from './button';
import Input from './input';
import Modal from './modal';
import WheelPicker from './WheelPicker';

import {
    jalaliMonths,
    gregorianMonths,
    DEFAULT_MIN_YEARS,
    formatDate,
    formatDateWithFormat,
    isValidDate,
    getDaysInMonth,
    getValidInitialDate,
    generateYears,
    generateDays,
    getMonthIndex,
} from './helper';

const WheelDatePicker = ({
    value,
    onChange,
    minYear: minYearProp,
    maxYear: maxYearProp,
    className,
    input,
    modal,
    calendarType = 'jalali',
    displayFormat = 'default',
    button,
    ...wheelPickerProps
}) => {
    // Set RTL based on calendar type
    const rtl = calendarType === 'jalali';

    // Select months array based on calendar type
    const months = useMemo(() => {
        return calendarType === 'jalali' ? jalaliMonths : gregorianMonths;
    }, [calendarType]);

    // Set maxYear based on calendar type
    const maxYear = useMemo(() => {
        if (typeof maxYearProp === 'number') return maxYearProp;

        return calendarType === 'jalali'
            ? getCurrentJalaliDate().year
            : getCurrentGregorianDate().year;
    }, [calendarType, maxYearProp]);

    // Set minYear based on calendar type
    const minYear = useMemo(() => {
        if (typeof minYearProp === 'number') return minYearProp;

        return DEFAULT_MIN_YEARS[calendarType];
    }, [calendarType, minYearProp]);

    // Always return a valid date object
    const getValidInitial = () => {
        return getValidInitialDate(value, calendarType, displayFormat);
    };

    const [selected, setSelected] = useState(getValidInitial);
    const [modalOpen, setModalOpen] = useState(false);
    const [temp, setTemp] = useState(selected);

    // Update selected and temp when value prop or displayFormat changes
    useEffect(() => {
        const newSelected = getValidInitial();
        setSelected(newSelected);
        setTemp(newSelected);
    }, [value, displayFormat]);

    // Generate years array
    const years = useMemo(() => {
        return generateYears(minYear, maxYear);
    }, [minYear, maxYear]);

    // Generate days in month based on calendar type
    const daysInMonth = useMemo(() => {
        return getDaysInMonth(temp, calendarType);
    }, [temp, calendarType]);

    const days = useMemo(() => {
        return generateDays(daysInMonth);
    }, [daysInMonth]);

    // Update temp.day if overflow
    useEffect(() => {
        if (temp.day > daysInMonth) {
            setTemp(t => ({ ...t, day: daysInMonth }));
        }
    }, [daysInMonth, temp.day]);

    // Handlers for wheel pickers in modal
    const handleYearChange = val =>
        setTemp(t => ({ ...t, year: Number(val) }));

    const handleMonthChange = val =>
        setTemp(t => ({
            ...t,
            month: getMonthIndex(val, calendarType),
        }));

    const handleDayChange = val =>
        setTemp(t => ({ ...t, day: Number(val) }));

    // Handle Set/Cancel
    const handleSet = () => {

        setSelected(temp);
        setModalOpen(false);

        if (isValidDate(temp, calendarType)) {
            
            const dateString = formatDateWithFormat(
                temp,
                calendarType,
                displayFormat
            );

            onChange?.(dateString);
        }
    };

    const handleCancel = () => {
        setTemp(selected);
        setModalOpen(false);
    };

    // Display value for input
    const displayValue = useMemo(() => {
        if (!value) return '';

        return formatDateWithFormat(
            selected,
            calendarType,
            displayFormat
        );
    }, [selected, calendarType, displayFormat, value]);

    // Create wheel picker components
    const dayWheel = (
        <WheelPicker
            key='day'
            items={days}
            onChange={handleDayChange}
            value={temp.day.toString()}
            containerClassName="wd-datepicker-wheel-container"
            visibleCount={3}
            {...wheelPickerProps}
        />
    );

    const monthWheel = (
        <WheelPicker
            key='month'
            items={months}
            onChange={handleMonthChange}
            value={months[temp.month - 1]}
            containerClassName="wd-datepicker-wheel-container"
            visibleCount={3}
            {...wheelPickerProps}
        />
    );

    const yearWheel = (
        <WheelPicker
            key='year'
            items={years}
            onChange={handleYearChange}
            value={temp.year.toString()}
            containerClassName="wd-datepicker-wheel-container"
            visibleCount={3}
            {...wheelPickerProps}
        />
    );

    // Order wheels based on calendar type
    const wheelOrder = [dayWheel, monthWheel, yearWheel];

    return (
        <>
            <Input
                name={input?.name}
                value={displayValue}
                onClick={() => setModalOpen(true)}
                label={input?.label}
                rtl={rtl}
                {...input}
            />

            {/* <Modal
                placement="bottom"
                title={modal?.title}
                isOpen={modalOpen}
                onClose={handleCancel}
                rtl={rtl}
                {...modal}
            > */}
                <div
                    className={`wd-datepicker-modal-content ${rtl ? 'wd-datepicker-rtl' : ''} `}>
                    <div className={`wd-datepicker-wheels-container ${className || ''} `}>
                        {wheelOrder}
                    </div>

                    <Button
                        className="wd-datepicker-confirm-button"
                        size="medium"
                        onClick={handleSet}
                        {...button}
                    >
                        {button?.text
                            ? button.text
                            : calendarType === 'jalali'
                                ? 'تایید'
                                : 'set'}
                    </Button>
                </div>
            {/* </Modal> */}
        </>
    );
};

export default WheelDatePicker;