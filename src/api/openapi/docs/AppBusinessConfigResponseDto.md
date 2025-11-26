
# AppBusinessConfigResponseDto


## Properties

Name | Type
------------ | -------------
`minEndOrderFromNowInHours` | number
`minDateToAcceptOfferInHours` | number
`minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours` | number
`minDiffBetweenStartTripAndEndOrderInHours` | number
`payInvoiceWarningAfterAcceptOfferInHours` | number
`payRestOfPriceWarningBeforeStartTripInHours` | number
`tripDepositInPercentage` | number
`tripCancelFeePercentageForDemander` | number
`tripCancelFeeAfterLimitPercentageForDemander` | number
`tripOfferCommissionPercentage` | number
`tripCancelPenaltyLimitInDays` | number
`tripCancelPenaltyPercentageForTransporterFromCompany` | number
`tripCancelPenaltyMinAmountInCzkForTransporterFromCompany` | number
`tripCancelPenaltyPercentageForTransporterFromDemander` | number
`tripCancelPenaltyMinAmountInCzkForTransporterFromDemander` | number
`tripCancelPenaltyAfterLimitPercentageForTransporter` | number

## Example

```typescript
import type { AppBusinessConfigResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "minEndOrderFromNowInHours": null,
  "minDateToAcceptOfferInHours": null,
  "minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours": null,
  "minDiffBetweenStartTripAndEndOrderInHours": null,
  "payInvoiceWarningAfterAcceptOfferInHours": null,
  "payRestOfPriceWarningBeforeStartTripInHours": null,
  "tripDepositInPercentage": null,
  "tripCancelFeePercentageForDemander": null,
  "tripCancelFeeAfterLimitPercentageForDemander": null,
  "tripOfferCommissionPercentage": null,
  "tripCancelPenaltyLimitInDays": null,
  "tripCancelPenaltyPercentageForTransporterFromCompany": null,
  "tripCancelPenaltyMinAmountInCzkForTransporterFromCompany": null,
  "tripCancelPenaltyPercentageForTransporterFromDemander": null,
  "tripCancelPenaltyMinAmountInCzkForTransporterFromDemander": null,
  "tripCancelPenaltyAfterLimitPercentageForTransporter": null,
} satisfies AppBusinessConfigResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AppBusinessConfigResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


