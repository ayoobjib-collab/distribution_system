export const formatDateWithCustomFormat = (
    date,
    calendarType,
    format = 'default'
) => {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');

    switch (format) {
        case 'dash':
            return `${year} -${month} -${day} `;

        case 'dot':
            return `${year}.${month}.${day} `;

        case 'space':
            return `${year} ${month} ${day} `;

        case 'default':
        default:
            return `${year} /${month}/${day} `;
    }
};

export const parseDateWithCustomFormat = (
    dateString,
    calendarType,
    format = 'default'
) => {
    let regex;

    switch (format) {
        case 'dash':
            regex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
            break;

        case 'dot':
            regex = /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/;
            break;

        case 'space':
            regex = /^(\d{4})\s+(\d{1,2})\s+(\d{1,2})$/;
            break;

        case 'default':
        default:
            regex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
            break;
    }

    const match = dateString.match(regex);

    if (!match) return null;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    return { year, month, day };
};