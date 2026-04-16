
# Notification


## Properties

Name | Type
------------ | -------------
`id` | string
`message` | string
`type` | string
`tempsCreation` | Date
`titre` | string
`estVu` | boolean

## Example

```typescript
import type { Notification } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "message": null,
  "type": null,
  "tempsCreation": null,
  "titre": null,
  "estVu": null,
} satisfies Notification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Notification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


