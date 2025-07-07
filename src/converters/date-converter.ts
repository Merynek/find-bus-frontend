export class DateConverter {
    public static dateToServer(date: Date): string {
        return (new Date(date.getTime() - (date.getTimezoneOffset())*60000)).toISOString().split("T")[0];
    }

    public static dateTimeToServer(date: Date): string {
        return date.toISOString();
    }

    public static dateTimeToClient(date: string): Date {
        return new Date(date)
    }
}