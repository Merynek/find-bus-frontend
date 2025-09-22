export function parseNumberParam(
    paramValue: string | undefined,
    defaultValue: number
): number {
    if (paramValue === undefined || paramValue === '') {
        return defaultValue;
    }

    const num = Number(paramValue);

    if (isNaN(num)) {
        return defaultValue;
    }

    return num;
}

export function parseBooleanParam(
    paramValue: string | undefined,
    defaultValue: boolean
): boolean {
    if (paramValue === undefined || paramValue === '') {
        return defaultValue;
    }

    const normalizedValue = paramValue.toLowerCase();

    if (['true'].includes(normalizedValue)) {
        return true;
    }
    if (['false'].includes(normalizedValue)) {
        return false;
    }

    return defaultValue;
}

export function parseStringParam(
    paramValue: string | undefined,
    defaultValue: string
): string {
    if (paramValue === undefined) {
        return defaultValue;
    }

    const trimmed = paramValue.trim();

    if (trimmed === '') {
        return defaultValue;
    }

    return trimmed;
}