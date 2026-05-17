
# Activite


## Properties

Name | Type
------------ | -------------
`id` | string
`estRepete` | boolean
`description` | string
`tempsDebut` | Date
`tempsFin` | Date
`titre` | string

## Example

```typescript
import type { Activite } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "estRepete": null,
  "description": null,
  "tempsDebut": null,
  "tempsFin": null,
  "titre": null,
} satisfies Activite

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Activite
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


