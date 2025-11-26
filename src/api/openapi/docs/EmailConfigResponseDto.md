
# EmailConfigResponseDto


## Properties

Name | Type
------------ | -------------
`userParams` | [EmailConfigResponseDtoUserParams](EmailConfigResponseDtoUserParams.md)
`templates` | [Array&lt;EmailTemplateResponseDto&gt;](EmailTemplateResponseDto.md)

## Example

```typescript
import type { EmailConfigResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "userParams": null,
  "templates": null,
} satisfies EmailConfigResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmailConfigResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


