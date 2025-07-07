import {PriceDto} from "../api/openapi";
import {Price} from "../data/price";

export class PriceConverter {
    public static toClient(price: PriceDto): Price {
        return new Price({
            amount: price.amount,
            currency: price.currency
        })
    }

    public static toServer(price: Price): PriceDto {
        return {
            amount: price.amount,
            currency: price.currency
        }
    }
}