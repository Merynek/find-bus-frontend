import {getRandomNumber} from "../src/utils/common";

export function getRandomDate(): Date {
    return new Date(
        getRandomNumber(2019, 2022),
        getRandomNumber(1, 10),
        getRandomNumber(1, 25),
        getRandomNumber(1, 23),
        getRandomNumber(1, 59),
        getRandomNumber(1, 59)
    )
}