import {TransferInfo} from "@/src/data/transferInfo";
import {TransferInfoResponseDto} from "@/src/api/openapi";

export class TransferInfoConverter {
    public static toInstance(response: TransferInfoResponseDto): TransferInfo {
        return new TransferInfo({
            iban: response.iban,
            swift: response.swift
        });
    }

    public static toJson(info: TransferInfo): TransferInfoResponseDto {
        return {
            iban: info.iban,
            swift: info.swift
        }
    }
}