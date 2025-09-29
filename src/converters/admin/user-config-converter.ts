import {type UserConfigResponseDto} from "@/src/api/openapi";
import {UserConfig} from "@/src/data/userConfig";

export class UserConfigConverter {
    public static toInstance(response: UserConfigResponseDto): UserConfig {
        return new UserConfig({
            created: response.created,
            tripOfferCommissionPercentage: response.tripOfferCommissionPercentage
        })
    }

    public static toJson(user: UserConfig): UserConfigResponseDto {
        return {
            created: user.created,
            tripOfferCommissionPercentage: user.tripOfferCommissionPercentage
        }
    }
}