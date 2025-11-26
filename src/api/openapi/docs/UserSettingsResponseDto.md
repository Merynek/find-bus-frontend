
# UserSettingsResponseDto


## Properties

Name | Type
------------ | -------------
`phoneNumber` | string
`notifications` | [Array&lt;NotificationsEnum&gt;](NotificationsEnum.md)
`financialSettings` | [UserFinancialSettingsResponseDto](UserFinancialSettingsResponseDto.md)
`transportRequirementsId` | number

## Example

```typescript
import type { UserSettingsResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "phoneNumber": null,
  "notifications": null,
  "financialSettings": null,
  "transportRequirementsId": null,
} satisfies UserSettingsResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserSettingsResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


