
# Groupe


## Properties

Name | Type
------------ | -------------
`id` | string
`chef` | [Etudiant](Etudiant.md)
`nomGroupe` | string
`etudiants` | [Set&lt;Etudiant&gt;](Etudiant.md)
`horaire` | [Horaire](Horaire.md)

## Example

```typescript
import type { Groupe } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "chef": null,
  "nomGroupe": null,
  "etudiants": null,
  "horaire": null,
} satisfies Groupe

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Groupe
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


