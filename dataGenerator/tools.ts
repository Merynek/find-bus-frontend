import {getRandomText} from "./texts/texts";
import {getRandomNumber} from "@/src/utils/common";
import {LOCALES} from "@/src/enums/locale";

export const getRandomBoolean = () => {
    return Math.random() + .5 >> 0 === 1;
}

export const getRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

export const getRandomId = () => {
    return getRandomNumber(1, 9999);
}

export const getRandomEmail = () => {
    return getRandomText(1) + "@gmail.com";
}

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffle = array.slice();

    for (let i = shuffle.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[rand]] = [shuffle[rand], shuffle[i]];
    }

    return shuffle;
};

export const getRandomEnum = <T>(anEnum: T, except?: T[keyof T]): T[keyof T] => {
    const enumValues = [];
    for (const enumMember in anEnum) {
        if (except && anEnum[enumMember] === except) {
            continue;
        }
        enumValues.push(anEnum[enumMember]);
    }
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    return enumValues[randomIndex];
}

export const getAllEnum = <T>(anEnum: T, except?: T[keyof T]): (T[keyof T])[] => {
    const enumValues: (T[keyof T])[] = [];
    for (const enumMember in anEnum) {
        if (except && anEnum[enumMember] === except) {
            continue;
        }
        enumValues.push(anEnum[enumMember] as T[keyof T]);
    }
    return enumValues;
}

export const getLocales = (): LOCALES[] => {
    return [LOCALES.en_US, LOCALES.cs_CZ];
}