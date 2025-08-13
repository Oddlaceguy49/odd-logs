export const locales = navigator.languages;

export function formatDate(
    dateString: string,
    dateOptions?: Intl.DateTimeFormatOptions
): string {
    return new Intl.DateTimeFormat(locales, dateOptions).format(
        new Date(dateString)
    );
}
