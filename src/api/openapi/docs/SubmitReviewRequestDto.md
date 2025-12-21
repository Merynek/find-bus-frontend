
# SubmitReviewRequestDto


## Properties

Name | Type
------------ | -------------
`token` | string
`userReview` | [ReviewRequestDto](ReviewRequestDto.md)
`platformReview` | [ReviewRequestDto](ReviewRequestDto.md)

## Example

```typescript
import type { SubmitReviewRequestDto } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "userReview": null,
  "platformReview": null,
} satisfies SubmitReviewRequestDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SubmitReviewRequestDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


