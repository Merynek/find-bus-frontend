
# TripReviewResultResponseDto


## Properties

Name | Type
------------ | -------------
`trip` | [TripBaseInfoItemResponseDto](TripBaseInfoItemResponseDto.md)
`userReview` | [ReviewResponseDto](ReviewResponseDto.md)
`platformReview` | [ReviewResponseDto](ReviewResponseDto.md)

## Example

```typescript
import type { TripReviewResultResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "trip": null,
  "userReview": null,
  "platformReview": null,
} satisfies TripReviewResultResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TripReviewResultResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


