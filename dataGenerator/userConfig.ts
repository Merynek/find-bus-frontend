import {getRandomNumber} from "@/src/utils/common";
import {UserConfig} from "@/src/data/userConfig";
import {getRandomDate} from "@/dataGenerator/time";

export function getRandomUserConfig(): UserConfig {
    return new UserConfig({
        created: getRandomDate(),
        tripOfferCommissionPercentage: getRandomNumber(1, 100)
    })
}