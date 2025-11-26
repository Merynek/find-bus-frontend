
# AdminUserDetailResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`email` | string
`active` | boolean
`banned` | boolean
`phoneNumber` | string
`financialSettings` | [UserFinancialSettingsResponseDto](UserFinancialSettingsResponseDto.md)
`transportRequirementsId` | number
`vehicles` | [Array&lt;VehicleResponseDto&gt;](VehicleResponseDto.md)
`userConfigs` | [Array&lt;UserConfigResponseDto&gt;](UserConfigResponseDto.md)

## Example

```typescript
import type { AdminUserDetailResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "active": null,
  "banned": null,
  "phoneNumber": null,
  "financialSettings": null,
  "transportRequirementsId": null,
  "vehicles": null,
  "userConfigs": null,
} satisfies AdminUserDetailResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AdminUserDetailResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


