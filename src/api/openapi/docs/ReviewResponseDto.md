
# ReviewResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`targetType` | [ReviewTargetType](ReviewTargetType.md)
`visibility` | [VisibilityStatus](VisibilityStatus.md)
`overallRating` | number
`comment` | string
`moderation` | [ModerationStatus](ModerationStatus.md)
`details` | [Array&lt;ReviewDetailResponseDto&gt;](ReviewDetailResponseDto.md)

## Example

```typescript
import type { ReviewResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "targetType": null,
  "visibility": null,
  "overallRating": null,
  "comment": null,
  "moderation": null,
  "details": null,
} satisfies ReviewResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReviewResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


