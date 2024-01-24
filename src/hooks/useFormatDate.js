const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const useFormatDate = (date) => {

    const formatDate = new Date(date);

    const day = formatDate.getDate();
    const monthIndex = formatDate.getMonth();
    const year = formatDate.getFullYear();

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

    return {
        formattedDate
    }

}
