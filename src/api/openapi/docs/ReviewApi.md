# ReviewApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiReviewAllReviewsGet**](ReviewApi.md#apireviewallreviewsget) | **GET** /api/Review/allReviews |  |
| [**apiReviewPlatformReviewsGet**](ReviewApi.md#apireviewplatformreviewsget) | **GET** /api/Review/platformReviews |  |
| [**apiReviewSubmitReviewPost**](ReviewApi.md#apireviewsubmitreviewpost) | **POST** /api/Review/submitReview |  |
| [**apiReviewTripReviewForSubmitGet**](ReviewApi.md#apireviewtripreviewforsubmitget) | **GET** /api/Review/tripReviewForSubmit |  |
| [**apiReviewUpdateReviewPost**](ReviewApi.md#apireviewupdatereviewpost) | **POST** /api/Review/updateReview |  |
| [**apiReviewUserReviewsGet**](ReviewApi.md#apireviewuserreviewsget) | **GET** /api/Review/userReviews |  |



## apiReviewAllReviewsGet

> Array&lt;TripReviewDataResponseDto&gt; apiReviewAllReviewsGet(limit, offset)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewAllReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // number
    limit: 56,
    // number
    offset: 56,
  } satisfies ApiReviewAllReviewsGetRequest;

  try {
    const data = await api.apiReviewAllReviewsGet(body);
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


## apiReviewPlatformReviewsGet

> Array&lt;ReviewResponseDto&gt; apiReviewPlatformReviewsGet(limit, offset)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewPlatformReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // number
    limit: 56,
    // number
    offset: 56,
  } satisfies ApiReviewPlatformReviewsGetRequest;

  try {
    const data = await api.apiReviewPlatformReviewsGet(body);
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

[**Array&lt;ReviewResponseDto&gt;**](ReviewResponseDto.md)

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


## apiReviewSubmitReviewPost

> apiReviewSubmitReviewPost(submitReviewRequestDto)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewSubmitReviewPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // SubmitReviewRequestDto (optional)
    submitReviewRequestDto: ...,
  } satisfies ApiReviewSubmitReviewPostRequest;

  try {
    const data = await api.apiReviewSubmitReviewPost(body);
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
| **submitReviewRequestDto** | [SubmitReviewRequestDto](SubmitReviewRequestDto.md) |  | [Optional] |

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


## apiReviewTripReviewForSubmitGet

> TripReviewResponseDto apiReviewTripReviewForSubmitGet(token)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewTripReviewForSubmitGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // string
    token: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiReviewTripReviewForSubmitGetRequest;

  try {
    const data = await api.apiReviewTripReviewForSubmitGet(body);
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
| **token** | `string` |  | [Defaults to `undefined`] |

### Return type

[**TripReviewResponseDto**](TripReviewResponseDto.md)

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


## apiReviewUpdateReviewPost

> apiReviewUpdateReviewPost(updateTripReviewRequestDto)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewUpdateReviewPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // UpdateTripReviewRequestDto (optional)
    updateTripReviewRequestDto: ...,
  } satisfies ApiReviewUpdateReviewPostRequest;

  try {
    const data = await api.apiReviewUpdateReviewPost(body);
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


## apiReviewUserReviewsGet

> Array&lt;ReviewResponseDto&gt; apiReviewUserReviewsGet(userId)



### Example

```ts
import {
  Configuration,
  ReviewApi,
} from '';
import type { ApiReviewUserReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ReviewApi(config);

  const body = {
    // number
    userId: 56,
  } satisfies ApiReviewUserReviewsGetRequest;

  try {
    const data = await api.apiReviewUserReviewsGet(body);
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

[**Array&lt;ReviewResponseDto&gt;**](ReviewResponseDto.md)

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

