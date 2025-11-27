# TripApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiTripDraftGet**](TripApi.md#apitripdraftget) | **GET** /api/Trip/draft |  |
| [**apiTripDraftsGet**](TripApi.md#apitripdraftsget) | **GET** /api/Trip/drafts |  |
| [**apiTripListGet**](TripApi.md#apitriplistget) | **GET** /api/Trip/list |  |
| [**apiTripPost**](TripApi.md#apitrippost) | **POST** /api/Trip |  |
| [**apiTripPublishPost**](TripApi.md#apitrippublishpost) | **POST** /api/Trip/publish |  |
| [**apiTripRecommendationPost**](TripApi.md#apitriprecommendationpost) | **POST** /api/Trip/recommendation |  |
| [**apiTripTripGet**](TripApi.md#apitriptripget) | **GET** /api/Trip/trip |  |
| [**apiTripUnauthorizedDraftPost**](TripApi.md#apitripunauthorizeddraftpost) | **POST** /api/Trip/unauthorizedDraft |  |



## apiTripDraftGet

> TripResponseDto apiTripDraftGet(tripId)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripDraftGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // number
    tripId: 56,
  } satisfies ApiTripDraftGetRequest;

  try {
    const data = await api.apiTripDraftGet(body);
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
| **tripId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**TripResponseDto**](TripResponseDto.md)

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


## apiTripDraftsGet

> Array&lt;TripItemResponseDto&gt; apiTripDraftsGet()



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripDraftsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  try {
    const data = await api.apiTripDraftsGet();
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

[**Array&lt;TripItemResponseDto&gt;**](TripItemResponseDto.md)

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


## apiTripListGet

> Array&lt;TripItemResponseDto&gt; apiTripListGet(limit, offset, start, maxNumberOfPersons, dietForTransporter, onlyMine, meOffered, distanceFromInMeters, distanceToInMeters, maxDistanceInMeters)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripListGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // number
    limit: 56,
    // number
    offset: 56,
    // Date (optional)
    start: 2013-10-20T19:20:30+01:00,
    // number (optional)
    maxNumberOfPersons: 56,
    // boolean (optional)
    dietForTransporter: true,
    // boolean (optional)
    onlyMine: true,
    // boolean (optional)
    meOffered: true,
    // number (optional)
    distanceFromInMeters: 56,
    // number (optional)
    distanceToInMeters: 56,
    // number (optional)
    maxDistanceInMeters: 56,
  } satisfies ApiTripListGetRequest;

  try {
    const data = await api.apiTripListGet(body);
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
| **start** | `Date` |  | [Optional] [Defaults to `undefined`] |
| **maxNumberOfPersons** | `number` |  | [Optional] [Defaults to `undefined`] |
| **dietForTransporter** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **onlyMine** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **meOffered** | `boolean` |  | [Optional] [Defaults to `undefined`] |
| **distanceFromInMeters** | `number` |  | [Optional] [Defaults to `undefined`] |
| **distanceToInMeters** | `number` |  | [Optional] [Defaults to `undefined`] |
| **maxDistanceInMeters** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TripItemResponseDto&gt;**](TripItemResponseDto.md)

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


## apiTripPost

> number apiTripPost(saveTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // SaveTripRequestDto (optional)
    saveTripRequestDto: ...,
  } satisfies ApiTripPostRequest;

  try {
    const data = await api.apiTripPost(body);
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
| **saveTripRequestDto** | [SaveTripRequestDto](SaveTripRequestDto.md) |  | [Optional] |

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


## apiTripPublishPost

> apiTripPublishPost(publishTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripPublishPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // PublishTripRequestDto (optional)
    publishTripRequestDto: ...,
  } satisfies ApiTripPublishPostRequest;

  try {
    const data = await api.apiTripPublishPost(body);
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
| **publishTripRequestDto** | [PublishTripRequestDto](PublishTripRequestDto.md) |  | [Optional] |

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


## apiTripRecommendationPost

> TripRecommendationResponseDto apiTripRecommendationPost(tripRecommendationRequestDto)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripRecommendationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // TripRecommendationRequestDto (optional)
    tripRecommendationRequestDto: ...,
  } satisfies ApiTripRecommendationPostRequest;

  try {
    const data = await api.apiTripRecommendationPost(body);
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
| **tripRecommendationRequestDto** | [TripRecommendationRequestDto](TripRecommendationRequestDto.md) |  | [Optional] |

### Return type

[**TripRecommendationResponseDto**](TripRecommendationResponseDto.md)

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


## apiTripTripGet

> TripResponseDto apiTripTripGet(tripId)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripTripGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // number
    tripId: 56,
  } satisfies ApiTripTripGetRequest;

  try {
    const data = await api.apiTripTripGet(body);
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
| **tripId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**TripResponseDto**](TripResponseDto.md)

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


## apiTripUnauthorizedDraftPost

> number apiTripUnauthorizedDraftPost(saveUnauthorizedTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripApi,
} from '';
import type { ApiTripUnauthorizedDraftPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripApi(config);

  const body = {
    // SaveUnauthorizedTripRequestDto (optional)
    saveUnauthorizedTripRequestDto: ...,
  } satisfies ApiTripUnauthorizedDraftPostRequest;

  try {
    const data = await api.apiTripUnauthorizedDraftPost(body);
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
| **saveUnauthorizedTripRequestDto** | [SaveUnauthorizedTripRequestDto](SaveUnauthorizedTripRequestDto.md) |  | [Optional] |

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

