
# ReviewDetailResponseDto


## Properties

Name | Type
------------ | -------------
`criterion` | [ReviewCriterionType](ReviewCriterionType.md)
`rating` | number
`comment` | string

## Example

```typescript
import type { ReviewDetailResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "criterion": null,
  "rating": null,
  "comment": null,
} satisfies ReviewDetailResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewDetailResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


