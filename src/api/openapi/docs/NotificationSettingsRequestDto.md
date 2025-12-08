
# NotificationSettingsRequestDto


## Properties

Name | Type
------------ | -------------
`isEmailEnabled` | boolean
`isSmsEnabled` | boolean
`isAppPushEnabled` | boolean
`type` | [NotificationsEnum](NotificationsEnum.md)
`settingsJson` | [NotificationSettingsDataRequestDto](NotificationSettingsDataRequestDto.md)

## Example

```typescript
import type { NotificationSettingsRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "isEmailEnabled": null,
  "isSmsEnabled": null,
  "isAppPushEnabled": null,
  "type": null,
  "settingsJson": null,
} satisfies NotificationSettingsRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NotificationSettingsRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


