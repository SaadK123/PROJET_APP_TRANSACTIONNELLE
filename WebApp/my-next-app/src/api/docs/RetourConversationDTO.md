
# RetourConversationDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`chefId` | string
`participantsIds` | Array&lt;string&gt;
`estConversationGroupe` | boolean
`messages` | [Array&lt;RetourMessageDTO&gt;](RetourMessageDTO.md)
`nom` | string

## Example

```typescript
import type { RetourConversationDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "chefId": null,
  "participantsIds": null,
  "estConversationGroupe": null,
  "messages": null,
  "nom": null,
} satisfies RetourConversationDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetourConversationDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


