export function inputSizeEnumToNumber(size: InputSize): number {
    switch (size) {
        case InputSize.LARGE:
            return 56;
        case InputSize.MEDIUM:
            return 48;
        case InputSize.SMALL:
            return 32;
    }
}

export enum ValidationState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    NORMAL = "NORMAL"
}

export enum InputSize {
    LARGE = "LARGE",
    MEDIUM = "MEDIUM",
    SMALL = "SMALL"
}