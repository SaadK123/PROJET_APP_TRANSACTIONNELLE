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
| [**envoyerInvitationConversation**](TestControlleurApi.md#envoyerinvitationconversation) | **POST** /api/invitation |  |
| [**envoyerInvitationGroupe**](TestControlleurApi.md#envoyerinvitationgroupe) | **POST** /api/groupes/invitations |  |
| [**envoyerMessage**](TestControlleurApi.md#envoyermessage) | **POST** /api/conversation/envoyerMessage |  |
| [**getAllNotificationsFromEtudiant**](TestControlleurApi.md#getallnotificationsfrometudiant) | **GET** /api/notifications |  |
| [**getConversationById**](TestControlleurApi.md#getconversationbyid) | **GET** /api/conversation |  |
| [**getConversationsParEtudiant**](TestControlleurApi.md#getconversationsparetudiant) | **GET** /api/conversations |  |
| [**getEtudiantByAuth**](TestControlleurApi.md#getetudiantbyauth) | **POST** /api/etudiant/auth |  |
| [**getEtudiantById**](TestControlleurApi.md#getetudiantbyid) | **GET** /api/etudiant |  |
| [**getEtudiantByUsername**](TestControlleurApi.md#getetudiantbyusername) | **GET** /api/etudiant/username |  |
| [**getGroupById**](TestControlleurApi.md#getgroupbyid) | **GET** /api/groupe |  |
| [**getGroupsFromEtudiant**](TestControlleurApi.md#getgroupsfrometudiant) | **GET** /api/groupes |  |
| [**getHoraireById**](TestControlleurApi.md#gethorairebyid) | **GET** /api/horaire |  |
| [**logout**](TestControlleurApi.md#logout) | **POST** /api/etudiant/logout |  |
| [**quitterConversation**](TestControlleurApi.md#quitterconversation) | **POST** /api/quitter |  |
| [**quitterGroupe**](TestControlleurApi.md#quittergroupe) | **POST** /api/groupes/quitter |  |
| [**rejoindreConversation**](TestControlleurApi.md#rejoindreconversation) | **POST** /api/rejoindre |  |
| [**retirerActivite**](TestControlleurApi.md#retireractivite) | **DELETE** /api/activite/retirer |  |
| [**retirerGroupe**](TestControlleurApi.md#retirergroupe) | **DELETE** /api/groupe/supprimer |  |
| [**setNotificationToWasSeen**](TestControlleurApi.md#setnotificationtowasseen) | **PUT** /api/notifications/vue |  |
| [**supprimerConversation**](TestControlleurApi.md#supprimerconversation) | **DELETE** /api/conversations |  |
| [**updateEtudiantPassword**](TestControlleurApi.md#updateetudiantpassword) | **PUT** /api/etudiants/password |  |
| [**updateEtudiantProfile**](TestControlleurApi.md#updateetudiantprofile) | **PUT** /api/etudiants/profil |  |
| [**virerEtudiantConversation**](TestControlleurApi.md#vireretudiantconversation) | **POST** /api/virer |  |
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

> RetourEtudiantDTO createEtudiant(creationEtudiantDTO)



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

[**RetourEtudiantDTO**](RetourEtudiantDTO.md)

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

> RetourGroupeDTO createGroup(creationDeGroupeDTO)



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

[**RetourGroupeDTO**](RetourGroupeDTO.md)

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

> SucessDTO creerConversation(creationConversationDTO)



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


## envoyerInvitationConversation

> SucessDTO envoyerInvitationConversation(requeteInvitationDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { EnvoyerInvitationConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // RequeteInvitationDTO
    requeteInvitationDTO: ...,
  } satisfies EnvoyerInvitationConversationRequest;

  try {
    const data = await api.envoyerInvitationConversation(body);
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


## envoyerMessage

> SucessDTO envoyerMessage(envoyerMessageDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { EnvoyerMessageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // EnvoyerMessageDTO
    envoyerMessageDTO: ...,
  } satisfies EnvoyerMessageRequest;

  try {
    const data = await api.envoyerMessage(body);
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
| **envoyerMessageDTO** | [EnvoyerMessageDTO](EnvoyerMessageDTO.md) |  | |

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

> Array&lt;RetourNotificationDTO&gt; getAllNotificationsFromEtudiant(idEtudiant)



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

[**Array&lt;RetourNotificationDTO&gt;**](RetourNotificationDTO.md)

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


## getConversationById

> RetourConversationDTO getConversationById(id)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetConversationByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    id: id_example,
  } satisfies GetConversationByIdRequest;

  try {
    const data = await api.getConversationById(body);
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

[**RetourConversationDTO**](RetourConversationDTO.md)

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


## getConversationsParEtudiant

> Array&lt;RetourConversationDTO&gt; getConversationsParEtudiant(idEtudiant)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { GetConversationsParEtudiantRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    idEtudiant: idEtudiant_example,
  } satisfies GetConversationsParEtudiantRequest;

  try {
    const data = await api.getConversationsParEtudiant(body);
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

[**Array&lt;RetourConversationDTO&gt;**](RetourConversationDTO.md)

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

> RetourEtudiantDTO getEtudiantByAuth(authentificationDTO)



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

[**RetourEtudiantDTO**](RetourEtudiantDTO.md)

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

> RetourEtudiantDTO getEtudiantById(id)



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

[**RetourEtudiantDTO**](RetourEtudiantDTO.md)

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

> RetourEtudiantDTO getEtudiantByUsername(username)



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

[**RetourEtudiantDTO**](RetourEtudiantDTO.md)

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

> RetourGroupeDTO getGroupById(idGroupe)



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

[**RetourGroupeDTO**](RetourGroupeDTO.md)

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

> Array&lt;RetourGroupeDTO&gt; getGroupsFromEtudiant(idEtudiant)



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

[**Array&lt;RetourGroupeDTO&gt;**](RetourGroupeDTO.md)

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

> RetourHoraireDTO getHoraireById(id)



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

[**RetourHoraireDTO**](RetourHoraireDTO.md)

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


## logout

> SucessDTO logout()



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { LogoutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  try {
    const data = await api.logout();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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


## quitterConversation

> SucessDTO quitterConversation(quitterGroupeDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { QuitterConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // QuitterGroupeDTO
    quitterGroupeDTO: ...,
  } satisfies QuitterConversationRequest;

  try {
    const data = await api.quitterConversation(body);
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


## rejoindreConversation

> SucessDTO rejoindreConversation(iNVITATIONGROUPEDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { RejoindreConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // INVITATIONGROUPEDTO
    iNVITATIONGROUPEDTO: ...,
  } satisfies RejoindreConversationRequest;

  try {
    const data = await api.rejoindreConversation(body);
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


## supprimerConversation

> SucessDTO supprimerConversation(id)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { SupprimerConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // string
    id: id_example,
  } satisfies SupprimerConversationRequest;

  try {
    const data = await api.supprimerConversation(body);
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


## virerEtudiantConversation

> SucessDTO virerEtudiantConversation(virerEtudiantDTO)



### Example

```ts
import {
  Configuration,
  TestControlleurApi,
} from '';
import type { VirerEtudiantConversationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestControlleurApi();

  const body = {
    // VirerEtudiantDTO
    virerEtudiantDTO: ...,
  } satisfies VirerEtudiantConversationRequest;

  try {
    const data = await api.virerEtudiantConversation(body);
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

