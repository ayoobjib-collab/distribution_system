import { useEffect, useMemo, useRef, useState } from 'react';
import '@/../css/components/jalali-date-picker.css';

const months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];


const isLeapJalali = (year) => {

    // Simple Jalali leap-year calculation
    const breaks = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111,
        1181, 1210, 1635, 2060, 2097, 2192, 2262,
        2324, 2394, 2456, 3178
    ];

    let gy = year + 621;
    let leapJ = -14;
    let jp = breaks[0];

    let jump;

    for (let i = 1; i < breaks.length; i++) {
        const jm = breaks[i];

        if (year < jm) {
            jump = jm - jp;
            break;
        }

        leapJ += Math.floor((jm - jp) / 33) * 8;
        jp = jm;
    }

    const n = year - jp;

    if (jump === undefined) {
        jump = year - jp;
    }

    leapJ += Math.floor(n / 33) * 8;
    leapJ += Math.floor(((n % 33) + 3) / 4);

    if (jump - n < 6) {
        const n2 = n - jump;
        leapJ += Math.floor((n2 + 1) / 33) * 8;
        leapJ += Math.floor(((n2 % 33) + 3) / 4);
    }

    const march = 20 + leapJ - Math.floor(gy / 4) + Math.floor((gy + 3) / 4);

    const leap = ((gy + 1) % 4 === 0 && (gy + 1) % 100 !== 0) ||
        (gy + 1) % 400 === 0;

    return leap;
};

const getDaysInMonth = (year, month) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;

    return isLeapJalali(year) ? 30 : 29;
};

const pad = (number) => String(number).padStart(2, '0');

const Wheel = ({
    items,
    value,
    onChange,
    formatter = (item) => item,
}) => {

    const containerRef = useRef(null);
    const itemHeight = 42;

    const scrollToValue = (value, smooth = false) => {
        const index = items.findIndex(item => item === value);

        if (index === -1 || !containerRef.current) return;

        containerRef.current.scrollTo({
            top: index * itemHeight,
            behavior: smooth ? 'smooth' : 'auto',
        });
    };

    useEffect(() => {
        scrollToValue(value);
    }, [value, items]);

    const handleScroll = () => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;

        const index = Math.round(scrollTop / itemHeight);

        const newValue = items[index];

        if (newValue !== undefined && newValue !== value) {
            onChange(newValue);
        }
    };

    return (
        <div className="date-wheel">
            <div
                ref={containerRef}
                className="date-wheel-scroll"
                onScroll={handleScroll}
            >
                <div className="date-wheel-space" />

                {items.map((item) => (
                    <div
                        key={item}
                        className={`date-wheel-item ${item === value ? 'selected' : ''
                            }`}
                        onClick={() => {
                            onChange(item);
                            scrollToValue(item, true);
                        }}
                    >
                        {formatter(item)}
                    </div>
                ))}

                <div className="date-wheel-space" />
            </div>

            <div className="date-wheel-selection" />
        </div>
    );
};

const JalaliDatePicker = ({
    value = '1405-01-01',
    onChange,
    minYear = 1405,
    maxYear = 1406,
}) => {

    const [year, setYear] = useState(1405);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i
    );

    // Read initial value
    useEffect(() => {
        if (!value) return;

        const parts = value.split('-').map(Number);

        if (parts.length === 3) {
            setYear(parts[0]);
            setMonth(parts[1]);
            setDay(parts[2]);
        }
    }, []);

    const days = useMemo(() => {
        const count = getDaysInMonth(year, month);

        return Array.from(
            { length: count },
            (_, index) => index + 1
        );
    }, [year, month]);

    // If selected day doesn't exist after changing month/year
    useEffect(() => {
        const maxDay = getDaysInMonth(year, month);

        if (day > maxDay) {
            setDay(maxDay);
        }
    }, [year, month]);

    // Notify parent
    useEffect(() => {
        if (!onChange) return;

        onChange(
            `${year}-${pad(month)}-${pad(day)}`
        );
    }, [year, month, day]);

    return (
        <div className="jalali-date-picker">

            <div className="date-wheel-columns">

                {/* Year */}
                <div className="date-wheel-column">
                    <div className="date-wheel-label">
                        سال
                    </div>

                    <Wheel
                        items={years}
                        value={year}
                        onChange={setYear}
                        formatter={(item) => item}
                    />
                </div>

                {/* Month */}
                <div className="date-wheel-column">
                    <div className="date-wheel-label">
                        ماه
                    </div>

                    <Wheel
                        items={months.map((_, i) => i + 1)}
                        value={month}
                        onChange={setMonth}
                        formatter={(item) => months[item - 1]}
                    />
                </div>

                {/* Day */}
                <div className="date-wheel-column">
                    <div className="date-wheel-label">
                        روز
                    </div>

                    <Wheel
                        items={days}
                        value={day}
                        onChange={setDay}
                        formatter={(item) => item}
                    />
                </div>

            </div>

            <div className="date-result">
                {year}
                /
                {month}
                /
                {day}
            </div>

        </div>
    );
};

export default JalaliDatePicker;