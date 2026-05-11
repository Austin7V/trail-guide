export function formatDate(dateValue: string): string {
    return new Date(dateValue).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}