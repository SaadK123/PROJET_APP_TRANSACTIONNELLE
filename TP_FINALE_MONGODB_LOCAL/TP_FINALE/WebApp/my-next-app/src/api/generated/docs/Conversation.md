
# Conversation


## Properties

Name | Type
------------ | -------------
`id` | string
`chef` | string
`participants` | Set&lt;string&gt;
`estConversationGroupe` | boolean
`messages` | [Array&lt;Message&gt;](Message.md)
`nom` | string

## Example

```typescript
import type { Conversation } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "chef": null,
  "participants": null,
  "estConversationGroupe": null,
  "messages": null,
  "nom": null,
} satisfies Conversation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Conversation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


