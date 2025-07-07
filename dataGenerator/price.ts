import {Price} from "../src/data/price";
import {getRandomNumber} from "../src/utils/common";
import {getRandomBoolean} from "./tools";
import {Currency} from "../src/api/openapi";

export function getRandomPrice() {
    return new Price({
        amount: getRandomNumber(100, 9999),
        currency: getRandomBoolean() ? Currency.CZK : Currency.USD
    })
}