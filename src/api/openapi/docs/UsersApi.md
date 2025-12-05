# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiUsersBanPost**](UsersApi.md#apiusersbanpost) | **POST** /api/Users/ban |  |
| [**apiUsersSendTransportRequirementsToVerificationPost**](UsersApi.md#apiuserssendtransportrequirementstoverificationpost) | **POST** /api/Users/sendTransportRequirementsToVerification |  |
| [**apiUsersSettingsGet**](UsersApi.md#apiuserssettingsget) | **GET** /api/Users/settings |  |
| [**apiUsersSettingsPost**](UsersApi.md#apiuserssettingspost) | **POST** /api/Users/settings |  |
| [**apiUsersTransportRequirementsCompleteDocumentUploadPost**](UsersApi.md#apiuserstransportrequirementscompletedocumentuploadpost) | **POST** /api/Users/transportRequirementsCompleteDocumentUpload |  |
| [**apiUsersTransportRequirementsCreateUploadDocumentPost**](UsersApi.md#apiuserstransportrequirementscreateuploaddocumentpost) | **POST** /api/Users/transportRequirementsCreateUploadDocument |  |
| [**apiUsersTransportRequirementsGet**](UsersApi.md#apiuserstransportrequirementsget) | **GET** /api/Users/transportRequirements |  |
| [**apiUsersTransportRequirementsPost**](UsersApi.md#apiuserstransportrequirementspost) | **POST** /api/Users/transportRequirements |  |
| [**apiUsersTransportRequirementsVerificationPost**](UsersApi.md#apiuserstransportrequirementsverificationpost) | **POST** /api/Users/transportRequirementsVerification |  |
| [**apiUsersUserGet**](UsersApi.md#apiusersuserget) | **GET** /api/Users/user |  |
| [**apiUsersUserTransportRequirementsGet**](UsersApi.md#apiusersusertransportrequirementsget) | **GET** /api/Users/userTransportRequirements |  |
| [**apiUsersUsersGet**](UsersApi.md#apiusersusersget) | **GET** /api/Users/users |  |



## apiUsersBanPost

> apiUsersBanPost(banUserRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersBanPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // BanUserRequestDto (optional)
    banUserRequestDto: ...,
  } satisfies ApiUsersBanPostRequest;

  try {
    const data = await api.apiUsersBanPost(body);
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
| **banUserRequestDto** | [BanUserRequestDto](BanUserRequestDto.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersSendTransportRequirementsToVerificationPost

> apiUsersSendTransportRequirementsToVerificationPost(transportRequirementsSendToVerificationRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersSendTransportRequirementsToVerificationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // TransportRequirementsSendToVerificationRequestDto (optional)
    transportRequirementsSendToVerificationRequestDto: ...,
  } satisfies ApiUsersSendTransportRequirementsToVerificationPostRequest;

  try {
    const data = await api.apiUsersSendTransportRequirementsToVerificationPost(body);
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
| **transportRequirementsSendToVerificationRequestDto** | [TransportRequirementsSendToVerificationRequestDto](TransportRequirementsSendToVerificationRequestDto.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersSettingsGet

> UserSettingsResponseDto apiUsersSettingsGet()



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersSettingsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.apiUsersSettingsGet();
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

[**UserSettingsResponseDto**](UserSettingsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersSettingsPost

> apiUsersSettingsPost(userSettingsRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersSettingsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // UserSettingsRequestDto (optional)
    userSettingsRequestDto: ...,
  } satisfies ApiUsersSettingsPostRequest;

  try {
    const data = await api.apiUsersSettingsPost(body);
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
| **userSettingsRequestDto** | [UserSettingsRequestDto](UserSettingsRequestDto.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersTransportRequirementsCompleteDocumentUploadPost

> apiUsersTransportRequirementsCompleteDocumentUploadPost(transportDocumentsCompleteUploadFilesRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersTransportRequirementsCompleteDocumentUploadPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // TransportDocumentsCompleteUploadFilesRequestDto (optional)
    transportDocumentsCompleteUploadFilesRequestDto: ...,
  } satisfies ApiUsersTransportRequirementsCompleteDocumentUploadPostRequest;

  try {
    const data = await api.apiUsersTransportRequirementsCompleteDocumentUploadPost(body);
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
| **transportDocumentsCompleteUploadFilesRequestDto** | [TransportDocumentsCompleteUploadFilesRequestDto](TransportDocumentsCompleteUploadFilesRequestDto.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersTransportRequirementsCreateUploadDocumentPost

> TransportRequirementsUploadSasUrlResponseDto apiUsersTransportRequirementsCreateUploadDocumentPost(transportRequirementsCreateUploadUrlFilesRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersTransportRequirementsCreateUploadDocumentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // TransportRequirementsCreateUploadUrlFilesRequestDto (optional)
    transportRequirementsCreateUploadUrlFilesRequestDto: ...,
  } satisfies ApiUsersTransportRequirementsCreateUploadDocumentPostRequest;

  try {
    const data = await api.apiUsersTransportRequirementsCreateUploadDocumentPost(body);
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
| **transportRequirementsCreateUploadUrlFilesRequestDto** | [TransportRequirementsCreateUploadUrlFilesRequestDto](TransportRequirementsCreateUploadUrlFilesRequestDto.md) |  | [Optional] |

### Return type

[**TransportRequirementsUploadSasUrlResponseDto**](TransportRequirementsUploadSasUrlResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersTransportRequirementsGet

> TransporterRequirementsResponseDto apiUsersTransportRequirementsGet()



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersTransportRequirementsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.apiUsersTransportRequirementsGet();
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

[**TransporterRequirementsResponseDto**](TransporterRequirementsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersTransportRequirementsPost

> number apiUsersTransportRequirementsPost(transportRequirementsRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersTransportRequirementsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // TransportRequirementsRequestDto (optional)
    transportRequirementsRequestDto: ...,
  } satisfies ApiUsersTransportRequirementsPostRequest;

  try {
    const data = await api.apiUsersTransportRequirementsPost(body);
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
| **transportRequirementsRequestDto** | [TransportRequirementsRequestDto](TransportRequirementsRequestDto.md) |  | [Optional] |

### Return type

**number**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersTransportRequirementsVerificationPost

> apiUsersTransportRequirementsVerificationPost(transportRequirementsVerificationRequestDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersTransportRequirementsVerificationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // TransportRequirementsVerificationRequestDto (optional)
    transportRequirementsVerificationRequestDto: ...,
  } satisfies ApiUsersTransportRequirementsVerificationPostRequest;

  try {
    const data = await api.apiUsersTransportRequirementsVerificationPost(body);
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
| **transportRequirementsVerificationRequestDto** | [TransportRequirementsVerificationRequestDto](TransportRequirementsVerificationRequestDto.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersUserGet

> AdminUserDetailResponseDto apiUsersUserGet(userId)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersUserGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies ApiUsersUserGetRequest;

  try {
    const data = await api.apiUsersUserGet(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**AdminUserDetailResponseDto**](AdminUserDetailResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersUserTransportRequirementsGet

> TransporterRequirementsResponseDto apiUsersUserTransportRequirementsGet(userId)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersUserTransportRequirementsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies ApiUsersUserTransportRequirementsGetRequest;

  try {
    const data = await api.apiUsersUserTransportRequirementsGet(body);
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
| **userId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**TransporterRequirementsResponseDto**](TransporterRequirementsResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiUsersUsersGet

> Array&lt;AdminUserDetailResponseDto&gt; apiUsersUsersGet(limit, offset)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { ApiUsersUsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // number
    limit: 56,
    // number
    offset: 56,
  } satisfies ApiUsersUsersGetRequest;

  try {
    const data = await api.apiUsersUsersGet(body);
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
| **limit** | `number` |  | [Defaults to `undefined`] |
| **offset** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;AdminUserDetailResponseDto&gt;**](AdminUserDetailResponseDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

