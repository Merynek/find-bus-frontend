
# EmailTemplateResponseDto


## Properties

Name | Type
------------ | -------------
`params` | [EmailTemplateResponseDtoParams](EmailTemplateResponseDtoParams.md)
`type` | [EmailType](EmailType.md)
`localizations` | [Array&lt;EmailConfigLocalizationResponseDto&gt;](EmailConfigLocalizationResponseDto.md)

## Example

```typescript
import type { EmailTemplateResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "params": null,
  "type": null,
  "localizations": null,
} satisfies EmailTemplateResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmailTemplateResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


