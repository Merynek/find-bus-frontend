# TripOfferApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiTripOfferAcceptOfferPost**](TripOfferApi.md#apitripofferacceptofferpost) | **POST** /api/TripOffer/acceptOffer |  |
| [**apiTripOfferCloseTripPost**](TripOfferApi.md#apitripofferclosetrippost) | **POST** /api/TripOffer/closeTrip |  |
| [**apiTripOfferDownloadDocumentGet**](TripOfferApi.md#apitripofferdownloaddocumentget) | **GET** /api/TripOffer/downloadDocument |  |
| [**apiTripOfferFinishTripPost**](TripOfferApi.md#apitripofferfinishtrippost) | **POST** /api/TripOffer/finishTrip |  |
| [**apiTripOfferGetTripOffersGet**](TripOfferApi.md#apitripoffergettripoffersget) | **GET** /api/TripOffer/getTripOffers |  |
| [**apiTripOfferOfferDelete**](TripOfferApi.md#apitripofferofferdelete) | **DELETE** /api/TripOffer/offer |  |
| [**apiTripOfferOfferPost**](TripOfferApi.md#apitripofferofferpost) | **POST** /api/TripOffer/offer |  |
| [**apiTripOfferOfferPut**](TripOfferApi.md#apitripofferofferput) | **PUT** /api/TripOffer/offer |  |
| [**apiTripOfferPayedOfferPost**](TripOfferApi.md#apitripofferpayedofferpost) | **POST** /api/TripOffer/payedOffer |  |
| [**apiTripOfferStartTripPost**](TripOfferApi.md#apitripofferstarttrippost) | **POST** /api/TripOffer/startTrip |  |
| [**apiTripOfferStateMovementsGet**](TripOfferApi.md#apitripofferstatemovementsget) | **GET** /api/TripOffer/stateMovements |  |



## apiTripOfferAcceptOfferPost

> apiTripOfferAcceptOfferPost(acceptOfferRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferAcceptOfferPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // AcceptOfferRequestDto (optional)
    acceptOfferRequestDto: ...,
  } satisfies ApiTripOfferAcceptOfferPostRequest;

  try {
    const data = await api.apiTripOfferAcceptOfferPost(body);
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
| **acceptOfferRequestDto** | [AcceptOfferRequestDto](AcceptOfferRequestDto.md) |  | [Optional] |

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


## apiTripOfferCloseTripPost

> apiTripOfferCloseTripPost(closeTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferCloseTripPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // CloseTripRequestDto (optional)
    closeTripRequestDto: ...,
  } satisfies ApiTripOfferCloseTripPostRequest;

  try {
    const data = await api.apiTripOfferCloseTripPost(body);
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
| **closeTripRequestDto** | [CloseTripRequestDto](CloseTripRequestDto.md) |  | [Optional] |

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


## apiTripOfferDownloadDocumentGet

> Blob apiTripOfferDownloadDocumentGet(documentId, type)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferDownloadDocumentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // number
    documentId: 56,
    // FinancialDocumentType
    type: ...,
  } satisfies ApiTripOfferDownloadDocumentGetRequest;

  try {
    const data = await api.apiTripOfferDownloadDocumentGet(body);
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
| **documentId** | `number` |  | [Defaults to `undefined`] |
| **type** | `FinancialDocumentType` |  | [Defaults to `undefined`] [Enum: PENALTY, DEPOSIT, INVOICE, TRIP_INVOICE] |

### Return type

**Blob**

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


## apiTripOfferFinishTripPost

> apiTripOfferFinishTripPost(finishTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferFinishTripPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // FinishTripRequestDto (optional)
    finishTripRequestDto: ...,
  } satisfies ApiTripOfferFinishTripPostRequest;

  try {
    const data = await api.apiTripOfferFinishTripPost(body);
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
| **finishTripRequestDto** | [FinishTripRequestDto](FinishTripRequestDto.md) |  | [Optional] |

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


## apiTripOfferGetTripOffersGet

> Array&lt;TripOfferResponseDto&gt; apiTripOfferGetTripOffersGet(tripId)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferGetTripOffersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // number
    tripId: 56,
  } satisfies ApiTripOfferGetTripOffersGetRequest;

  try {
    const data = await api.apiTripOfferGetTripOffersGet(body);
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

[**Array&lt;TripOfferResponseDto&gt;**](TripOfferResponseDto.md)

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


## apiTripOfferOfferDelete

> apiTripOfferOfferDelete(deleteTripOfferRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferOfferDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // DeleteTripOfferRequestDto (optional)
    deleteTripOfferRequestDto: ...,
  } satisfies ApiTripOfferOfferDeleteRequest;

  try {
    const data = await api.apiTripOfferOfferDelete(body);
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
| **deleteTripOfferRequestDto** | [DeleteTripOfferRequestDto](DeleteTripOfferRequestDto.md) |  | [Optional] |

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


## apiTripOfferOfferPost

> apiTripOfferOfferPost(createOfferRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferOfferPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // CreateOfferRequestDto (optional)
    createOfferRequestDto: ...,
  } satisfies ApiTripOfferOfferPostRequest;

  try {
    const data = await api.apiTripOfferOfferPost(body);
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
| **createOfferRequestDto** | [CreateOfferRequestDto](CreateOfferRequestDto.md) |  | [Optional] |

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


## apiTripOfferOfferPut

> apiTripOfferOfferPut(updateOfferRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferOfferPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // UpdateOfferRequestDto (optional)
    updateOfferRequestDto: ...,
  } satisfies ApiTripOfferOfferPutRequest;

  try {
    const data = await api.apiTripOfferOfferPut(body);
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
| **updateOfferRequestDto** | [UpdateOfferRequestDto](UpdateOfferRequestDto.md) |  | [Optional] |

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


## apiTripOfferPayedOfferPost

> apiTripOfferPayedOfferPost(payedOfferRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferPayedOfferPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // PayedOfferRequestDto (optional)
    payedOfferRequestDto: ...,
  } satisfies ApiTripOfferPayedOfferPostRequest;

  try {
    const data = await api.apiTripOfferPayedOfferPost(body);
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
| **payedOfferRequestDto** | [PayedOfferRequestDto](PayedOfferRequestDto.md) |  | [Optional] |

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


## apiTripOfferStartTripPost

> apiTripOfferStartTripPost(startTripRequestDto)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferStartTripPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // StartTripRequestDto (optional)
    startTripRequestDto: ...,
  } satisfies ApiTripOfferStartTripPostRequest;

  try {
    const data = await api.apiTripOfferStartTripPost(body);
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
| **startTripRequestDto** | [StartTripRequestDto](StartTripRequestDto.md) |  | [Optional] |

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


## apiTripOfferStateMovementsGet

> Array&lt;TripOfferMovementsResponseDto&gt; apiTripOfferStateMovementsGet(tripId)



### Example

```ts
import {
  Configuration,
  TripOfferApi,
} from '';
import type { ApiTripOfferStateMovementsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TripOfferApi(config);

  const body = {
    // number
    tripId: 56,
  } satisfies ApiTripOfferStateMovementsGetRequest;

  try {
    const data = await api.apiTripOfferStateMovementsGet(body);
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

[**Array&lt;TripOfferMovementsResponseDto&gt;**](TripOfferMovementsResponseDto.md)

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

