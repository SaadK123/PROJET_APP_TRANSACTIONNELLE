
# RetourGroupeDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`chef` | [RetourEtudiantDTO](RetourEtudiantDTO.md)
`nomGroupe` | string
`etudiants` | [Array&lt;RetourEtudiantDTO&gt;](RetourEtudiantDTO.md)
`retourHoraireDTO` | [RetourHoraireDTO](RetourHoraireDTO.md)

## Example

```typescript
import type { RetourGroupeDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "chef": null,
  "nomGroupe": null,
  "etudiants": null,
  "retourHoraireDTO": null,
} satisfies RetourGroupeDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetourGroupeDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


