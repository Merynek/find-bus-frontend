import {
    TransferInfoResponseDto
} from "../api/openapi";
import {TransferInfo} from "@/src/data/transferInfo";

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