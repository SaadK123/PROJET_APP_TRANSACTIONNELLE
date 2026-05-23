
# RetourNotificationDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`titre` | string
`message` | string
`type` | string
`estVu` | boolean
`tempsCreation` | string
`groupe` | [RetourGroupeDTO](RetourGroupeDTO.md)
`envoyeur` | [RetourEtudiantDTO](RetourEtudiantDTO.md)

## Example

```typescript
import type { RetourNotificationDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "titre": null,
  "message": null,
  "type": null,
  "estVu": null,
  "tempsCreation": null,
  "groupe": null,
  "envoyeur": null,
} satisfies RetourNotificationDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetourNotificationDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


