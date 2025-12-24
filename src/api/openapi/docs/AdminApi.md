# AdminApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAdminAllReviewsGet**](AdminApi.md#apiadminallreviewsget) | **GET** /api/Admin/allReviews |  |
| [**apiAdminAppConfigGet**](AdminApi.md#apiadminappconfigget) | **GET** /api/Admin/appConfig |  |
| [**apiAdminAppConfigPost**](AdminApi.md#apiadminappconfigpost) | **POST** /api/Admin/appConfig |  |
| [**apiAdminEmailConfigGet**](AdminApi.md#apiadminemailconfigget) | **GET** /api/Admin/emailConfig |  |
| [**apiAdminEmailConfigPost**](AdminApi.md#apiadminemailconfigpost) | **POST** /api/Admin/emailConfig |  |
| [**apiAdminUpdateReviewPost**](AdminApi.md#apiadminupdatereviewpost) | **POST** /api/Admin/updateReview |  |
| [**apiAdminUserConfigGet**](AdminApi.md#apiadminuserconfigget) | **GET** /api/Admin/userConfig |  |
| [**apiAdminUserConfigPost**](AdminApi.md#apiadminuserconfigpost) | **POST** /api/Admin/userConfig |  |



## apiAdminAllReviewsGet

> Array&lt;TripReviewDataResponseDto&gt; apiAdminAllReviewsGet(limit, offset)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminAllReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // number
    limit: 56,
    // number
    offset: 56,
  } satisfies ApiAdminAllReviewsGetRequest;

  try {
    const data = await api.apiAdminAllReviewsGet(body);
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

[**Array&lt;TripReviewDataResponseDto&gt;**](TripReviewDataResponseDto.md)

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


## apiAdminAppConfigGet

> AppBusinessConfigResponseDto apiAdminAppConfigGet()



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminAppConfigGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  try {
    const data = await api.apiAdminAppConfigGet();
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

[**AppBusinessConfigResponseDto**](AppBusinessConfigResponseDto.md)

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


## apiAdminAppConfigPost

> apiAdminAppConfigPost(updateAppBusinessConfigRequestDto)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminAppConfigPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // UpdateAppBusinessConfigRequestDto (optional)
    updateAppBusinessConfigRequestDto: ...,
  } satisfies ApiAdminAppConfigPostRequest;

  try {
    const data = await api.apiAdminAppConfigPost(body);
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
| **updateAppBusinessConfigRequestDto** | [UpdateAppBusinessConfigRequestDto](UpdateAppBusinessConfigRequestDto.md) |  | [Optional] |

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


## apiAdminEmailConfigGet

> EmailConfigResponseDto apiAdminEmailConfigGet()



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminEmailConfigGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  try {
    const data = await api.apiAdminEmailConfigGet();
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

[**EmailConfigResponseDto**](EmailConfigResponseDto.md)

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


## apiAdminEmailConfigPost

> apiAdminEmailConfigPost(updateEmailConfig)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminEmailConfigPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // UpdateEmailConfig (optional)
    updateEmailConfig: ...,
  } satisfies ApiAdminEmailConfigPostRequest;

  try {
    const data = await api.apiAdminEmailConfigPost(body);
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
| **updateEmailConfig** | [UpdateEmailConfig](UpdateEmailConfig.md) |  | [Optional] |

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


## apiAdminUpdateReviewPost

> apiAdminUpdateReviewPost(updateTripReviewRequestDto)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminUpdateReviewPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // UpdateTripReviewRequestDto (optional)
    updateTripReviewRequestDto: ...,
  } satisfies ApiAdminUpdateReviewPostRequest;

  try {
    const data = await api.apiAdminUpdateReviewPost(body);
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
| **updateTripReviewRequestDto** | [UpdateTripReviewRequestDto](UpdateTripReviewRequestDto.md) |  | [Optional] |

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


## apiAdminUserConfigGet

> UserConfigResponseDto apiAdminUserConfigGet(userConfigRequestDto)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminUserConfigGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // UserConfigRequestDto (optional)
    userConfigRequestDto: ...,
  } satisfies ApiAdminUserConfigGetRequest;

  try {
    const data = await api.apiAdminUserConfigGet(body);
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
| **userConfigRequestDto** | [UserConfigRequestDto](UserConfigRequestDto.md) |  | [Optional] |

### Return type

[**UserConfigResponseDto**](UserConfigResponseDto.md)

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


## apiAdminUserConfigPost

> apiAdminUserConfigPost(updateUserConfigRequestDto)



### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { ApiAdminUserConfigPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // UpdateUserConfigRequestDto (optional)
    updateUserConfigRequestDto: ...,
  } satisfies ApiAdminUserConfigPostRequest;

  try {
    const data = await api.apiAdminUserConfigPost(body);
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
| **updateUserConfigRequestDto** | [UpdateUserConfigRequestDto](UpdateUserConfigRequestDto.md) |  | [Optional] |

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

