
# RetourInvitationDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`etudiantNomUtilisateur` | string
`message` | string
`type` | string
`titre` | string
`destination` | string
`envoyeurId` | string
`typeInvitation` | string

## Example

```typescript
import type { RetourInvitationDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "etudiantNomUtilisateur": null,
  "message": null,
  "type": null,
  "titre": null,
  "destination": null,
  "envoyeurId": null,
  "typeInvitation": null,
} satisfies RetourInvitationDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RetourInvitationDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


