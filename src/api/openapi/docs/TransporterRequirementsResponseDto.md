
# TransporterRequirementsResponseDto


## Properties

Name | Type
------------ | -------------
`id` | number
`concessionNumber` | string
`status` | [TransportRequirementStatus](TransportRequirementStatus.md)
`verificationFeedback` | [VerificationFeedbackResponseDto](VerificationFeedbackResponseDto.md)
`documents` | [Array&lt;TransportDocumentResponseDto&gt;](TransportDocumentResponseDto.md)

## Example

```typescript
import type { TransporterRequirementsResponseDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "concessionNumber": null,
  "status": null,
  "verificationFeedback": null,
  "documents": null,
} satisfies TransporterRequirementsResponseDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransporterRequirementsResponseDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


