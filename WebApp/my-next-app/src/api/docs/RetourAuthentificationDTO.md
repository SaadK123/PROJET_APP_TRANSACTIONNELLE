
# RetourAuthentificationDTO


## Properties

Name | Type
------------ | -------------
`etudiant` | [RetourEtudiantDTO](RetourEtudiantDTO.md)
`token` | string

## Example

```typescript
import type { RetourAuthentificationDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "etudiant": null,
  "token": null,
} satisfies RetourAuthentificationDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetourAuthentificationDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


