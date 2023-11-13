export const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        dateObject,
    );

    return formattedDate;
};
