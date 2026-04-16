# TestControlleurApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**ajouterActivite**](TestControlleurApi.md#ajouteractivite) | **POST** /api/groupes/activites/ajouter |  |
| [**ajouterActivitePourEtudiant**](TestControlleurApi.md#ajouteractivitepouretudiant) | **POST** /api/etudiants/activites/ajouter |  |
| [**ajouterEtudiantDansGroupe**](TestControlleurApi.md#ajouteretudiantdansgroupe) | **POST** /api/groupes/ajouter |  |
| [**createEtudiant**](TestControlleurApi.md#createetudiant) | **POST** /api/etudiants |  |
| [**createGroup**](TestControlleurApi.md#creategroup) | **POST** /api/groupes |  |
| [**creerConversation**](TestControlleurApi.md#creerconversation) | **POST** /api/conversations |  |
| [**deleteEtudiant**](TestControlleurApi.md#deleteetudiant) | **DELETE** /api/etudiants |  |
| [**deleteNotification**](TestControlleurApi.md#deletenotification) | **DELETE** /api/notifications |  |
| [**envoyerInvitationGroupe**](TestControlleurApi.md#envoyerinvitationgroupe) | **POST** /api/groupes/invitations |  |
| [**getAllNotificationsFromEtudiant**](TestControlleurApi.md#getallnotificationsfrometudiant) | **GET** /api/notifications |  |
| [**getEtudiantByAuth**](TestControlleurApi.md#getetudiantbyauth) | **POST** /api/etudiant/auth |  |
| [**getEtudiantById**](TestControlleurApi.md#getetudiantbyid) | **GET** /api/etudiant |  |
| [**getEtudiantByUsername**](TestControlleurApi.md#getetudiantbyusername) | **GET** /api/etudiant/username |  |
| [**getGroupById**](TestControlleurApi.md#getgroupbyid) | **GET** /api/groupe |  |
| [**getGroupsFromEtudiant**](TestControlleurApi.md#getgroupsfrometudiant) | **GET** /api/groupes |  |
| [**getHoraireById**](TestControlleurApi.md#gethorairebyid) | **GET** /api/horaire |  |
| [**quitterGroupe**](TestControlleurApi.md#quittergroupe) | **POST** /api/groupes/quitter |  |
| [**retirerActivite**](TestControlleurApi.md#retireractivite) | **DELETE** /api/activite/retirer |  |
| [**retirerGroupe**](TestControlleurApi.md#retirergroupe) | **DELETE** /api/groupe/supprimer |  |
| [**setNotificationToWasSeen**](TestControlleurApi.md#setnotificationtowasseen) | **PUT** /api/notifications/vue |  |
| [**updateEtudiantPassword**](TestControlleurApi.md#updateetudiantpassword) | **PUT** /api/etudiants/password |  |
| [**updateEtudiantProfile**](TestControlleurApi.md#updateetudiantprofile) | **PUT** /api/etudiants/profil |  |
| [**virerEtudiantDunGroupe**](TestControlleurApi.md#vireretudiantdungroupe) | **POST** /api/groupes/virer |  |



## ajouterActivite

> SucessDTO ajouterActivite(requeteActiviteGroupeDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { AjouterActiviteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // RequeteActiviteGroupeDTO
    requeteActiviteGroupeDTO: ...,
  } satisfies AjouterActiviteRequest;

  try {
    const data = await api.ajouterActivite(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **requeteActiviteGroupeDTO** | [RequeteActiviteGroupeDTO](RequeteActiviteGroupeDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ajouterActivitePourEtudiant

> SucessDTO ajouterActivitePourEtudiant(ajouterActiviteDTOEtudiant)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { AjouterActivitePourEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // AjouterActiviteDTOEtudiant
    ajouterActiviteDTOEtudiant: ...,
  } satisfies AjouterActivitePourEtudiantRequest;

  try {
    const data = await api.ajouterActivitePourEtudiant(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **ajouterActiviteDTOEtudiant** | [AjouterActiviteDTOEtudiant](AjouterActiviteDTOEtudiant.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## ajouterEtudiantDansGroupe

> SucessDTO ajouterEtudiantDansGroupe(iNVITATIONGROUPEDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { AjouterEtudiantDansGroupeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // INVITATIONGROUPEDTO
    iNVITATIONGROUPEDTO: ...,
  } satisfies AjouterEtudiantDansGroupeRequest;

  try {
    const data = await api.ajouterEtudiantDansGroupe(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **iNVITATIONGROUPEDTO** | [INVITATIONGROUPEDTO](INVITATIONGROUPEDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createEtudiant

> Etudiant createEtudiant(creationEtudiantDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { CreateEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // CreationEtudiantDTO
    creationEtudiantDTO: ...,
  } satisfies CreateEtudiantRequest;

  try {
    const data = await api.createEtudiant(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **creationEtudiantDTO** | [CreationEtudiantDTO](CreationEtudiantDTO.md) |  | |

### Return type

[**Etudiant**](Etudiant.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createGroup

> Groupe createGroup(creationDeGroupeDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { CreateGroupRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // CreationDeGroupeDTO
    creationDeGroupeDTO: ...,
  } satisfies CreateGroupRequest;

  try {
    const data = await api.createGroup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **creationDeGroupeDTO** | [CreationDeGroupeDTO](CreationDeGroupeDTO.md) |  | |

### Return type

[**Groupe**](Groupe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## creerConversation

> SucessDTO creerConversation(id, creationConversationDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { CreerConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // CreationConversationDTO
    creationConversationDTO: ...,
  } satisfies CreerConversationRequest;

  try {
    const data = await api.creerConversation(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |
| **creationConversationDTO** | [CreationConversationDTO](CreationConversationDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteEtudiant

> SucessDTO deleteEtudiant(supprimerEtudiantDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { DeleteEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // SupprimerEtudiantDTO
    supprimerEtudiantDTO: ...,
  } satisfies DeleteEtudiantRequest;

  try {
    const data = await api.deleteEtudiant(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **supprimerEtudiantDTO** | [SupprimerEtudiantDTO](SupprimerEtudiantDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteNotification

> SucessDTO deleteNotification(idNotification)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { DeleteNotificationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idNotification: idNotification_example,
  } satisfies DeleteNotificationRequest;

  try {
    const data = await api.deleteNotification(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idNotification** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## envoyerInvitationGroupe

> SucessDTO envoyerInvitationGroupe(requeteInvitationDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { EnvoyerInvitationGroupeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // RequeteInvitationDTO
    requeteInvitationDTO: ...,
  } satisfies EnvoyerInvitationGroupeRequest;

  try {
    const data = await api.envoyerInvitationGroupe(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **requeteInvitationDTO** | [RequeteInvitationDTO](RequeteInvitationDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllNotificationsFromEtudiant

> Array&lt;Notification&gt; getAllNotificationsFromEtudiant(idEtudiant)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetAllNotificationsFromEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idEtudiant: idEtudiant_example,
  } satisfies GetAllNotificationsFromEtudiantRequest;

  try {
    const data = await api.getAllNotificationsFromEtudiant(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idEtudiant** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Notification&gt;**](Notification.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEtudiantByAuth

> Etudiant getEtudiantByAuth(authentificationDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetEtudiantByAuthRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // AuthentificationDTO
    authentificationDTO: ...,
  } satisfies GetEtudiantByAuthRequest;

  try {
    const data = await api.getEtudiantByAuth(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authentificationDTO** | [AuthentificationDTO](AuthentificationDTO.md) |  | |

### Return type

[**Etudiant**](Etudiant.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEtudiantById

> Etudiant getEtudiantById(id)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetEtudiantByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetEtudiantByIdRequest;

  try {
    const data = await api.getEtudiantById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Etudiant**](Etudiant.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEtudiantByUsername

> Etudiant getEtudiantByUsername(username)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetEtudiantByUsernameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    username: username_example,
  } satisfies GetEtudiantByUsernameRequest;

  try {
    const data = await api.getEtudiantByUsername(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Etudiant**](Etudiant.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGroupById

> Groupe getGroupById(idGroupe)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetGroupByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idGroupe: idGroupe_example,
  } satisfies GetGroupByIdRequest;

  try {
    const data = await api.getGroupById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idGroupe** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Groupe**](Groupe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGroupsFromEtudiant

> Array&lt;Groupe&gt; getGroupsFromEtudiant(idEtudiant)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetGroupsFromEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idEtudiant: idEtudiant_example,
  } satisfies GetGroupsFromEtudiantRequest;

  try {
    const data = await api.getGroupsFromEtudiant(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idEtudiant** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;Groupe&gt;**](Groupe.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getHoraireById

> Horaire getHoraireById(id)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetHoraireByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetHoraireByIdRequest;

  try {
    const data = await api.getHoraireById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Horaire**](Horaire.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## quitterGroupe

> SucessDTO quitterGroupe(quitterGroupeDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { QuitterGroupeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // QuitterGroupeDTO
    quitterGroupeDTO: ...,
  } satisfies QuitterGroupeRequest;

  try {
    const data = await api.quitterGroupe(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **quitterGroupeDTO** | [QuitterGroupeDTO](QuitterGroupeDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retirerActivite

> SucessDTO retirerActivite(activiteId)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { RetirerActiviteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    activiteId: activiteId_example,
  } satisfies RetirerActiviteRequest;

  try {
    const data = await api.retirerActivite(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **activiteId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## retirerGroupe

> SucessDTO retirerGroupe(supprimerGroupeDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { RetirerGroupeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // SupprimerGroupeDTO
    supprimerGroupeDTO: ...,
  } satisfies RetirerGroupeRequest;

  try {
    const data = await api.retirerGroupe(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **supprimerGroupeDTO** | [SupprimerGroupeDTO](SupprimerGroupeDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setNotificationToWasSeen

> SucessDTO setNotificationToWasSeen(idNotification)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { SetNotificationToWasSeenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idNotification: idNotification_example,
  } satisfies SetNotificationToWasSeenRequest;

  try {
    const data = await api.setNotificationToWasSeen(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **idNotification** | `string` |  | [Defaults to `undefined`] |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateEtudiantPassword

> SucessDTO updateEtudiantPassword(miseAJourEtudiantMotDePasse)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { UpdateEtudiantPasswordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // MiseAJourEtudiantMotDePasse
    miseAJourEtudiantMotDePasse: ...,
  } satisfies UpdateEtudiantPasswordRequest;

  try {
    const data = await api.updateEtudiantPassword(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **miseAJourEtudiantMotDePasse** | [MiseAJourEtudiantMotDePasse](MiseAJourEtudiantMotDePasse.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateEtudiantProfile

> SucessDTO updateEtudiantProfile(miseAJourEtudiantProfil)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { UpdateEtudiantProfileRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // MiseAJourEtudiantProfil
    miseAJourEtudiantProfil: ...,
  } satisfies UpdateEtudiantProfileRequest;

  try {
    const data = await api.updateEtudiantProfile(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **miseAJourEtudiantProfil** | [MiseAJourEtudiantProfil](MiseAJourEtudiantProfil.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## virerEtudiantDunGroupe

> SucessDTO virerEtudiantDunGroupe(virerEtudiantDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { VirerEtudiantDunGroupeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // VirerEtudiantDTO
    virerEtudiantDTO: ...,
  } satisfies VirerEtudiantDunGroupeRequest;

  try {
    const data = await api.virerEtudiantDunGroupe(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **virerEtudiantDTO** | [VirerEtudiantDTO](VirerEtudiantDTO.md) |  | |

### Return type

[**SucessDTO**](SucessDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

