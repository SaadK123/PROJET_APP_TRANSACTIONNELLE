
# Etudiant


## Properties

Name | Type
------------ | -------------
`id` | string
`dernierDate` | Date
`courriel` | string
`nomUtilisateur` | string
`nom` | string
`prenom` | string
`ecole` | string
`horaire` | [Horaire](Horaire.md)
`notifications` | [Array&lt;Notification&gt;](Notification.md)

## Example

```typescript
import type { Etudiant } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "dernierDate": null,
  "courriel": null,
  "nomUtilisateur": null,
  "nom": null,
  "prenom": null,
  "ecole": null,
  "horaire": null,
  "notifications": null,
} satisfies Etudiant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Etudiant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


