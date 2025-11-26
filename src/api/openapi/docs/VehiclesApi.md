# VehiclesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiVehiclesCompleteFileUploadPost**](VehiclesApi.md#apivehiclescompletefileuploadpost) | **POST** /api/Vehicles/completeFileUpload |  |
| [**apiVehiclesCompletePublicPhotosUploadPost**](VehiclesApi.md#apivehiclescompletepublicphotosuploadpost) | **POST** /api/Vehicles/completePublicPhotosUpload |  |
| [**apiVehiclesCreatePublicUploadPhotosPost**](VehiclesApi.md#apivehiclescreatepublicuploadphotospost) | **POST** /api/Vehicles/createPublicUploadPhotos |  |
| [**apiVehiclesCreateUploadFilesPost**](VehiclesApi.md#apivehiclescreateuploadfilespost) | **POST** /api/Vehicles/createUploadFiles |  |
| [**apiVehiclesGet**](VehiclesApi.md#apivehiclesget) | **GET** /api/Vehicles |  |
| [**apiVehiclesPublicVehicleGet**](VehiclesApi.md#apivehiclespublicvehicleget) | **GET** /api/Vehicles/publicVehicle |  |
| [**apiVehiclesSendVehicleToVerificationPost**](VehiclesApi.md#apivehiclessendvehicletoverificationpost) | **POST** /api/Vehicles/sendVehicleToVerification |  |
| [**apiVehiclesTransportVerificationPost**](VehiclesApi.md#apivehiclestransportverificationpost) | **POST** /api/Vehicles/transportVerification |  |
| [**apiVehiclesVehicleGet**](VehiclesApi.md#apivehiclesvehicleget) | **GET** /api/Vehicles/vehicle |  |
| [**apiVehiclesVehiclePost**](VehiclesApi.md#apivehiclesvehiclepost) | **POST** /api/Vehicles/vehicle |  |
| [**apiVehiclesVehiclePut**](VehiclesApi.md#apivehiclesvehicleput) | **PUT** /api/Vehicles/vehicle |  |



## apiVehiclesCompleteFileUploadPost

> number apiVehiclesCompleteFileUploadPost(vehicleCompleteUploadFilesRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesCompleteFileUploadPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleCompleteUploadFilesRequestDto (optional)
    vehicleCompleteUploadFilesRequestDto: ...,
  } satisfies ApiVehiclesCompleteFileUploadPostRequest;

  try {
    const data = await api.apiVehiclesCompleteFileUploadPost(body);
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
| **vehicleCompleteUploadFilesRequestDto** | [VehicleCompleteUploadFilesRequestDto](VehicleCompleteUploadFilesRequestDto.md) |  | [Optional] |

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


## apiVehiclesCompletePublicPhotosUploadPost

> apiVehiclesCompletePublicPhotosUploadPost(vehicleCompletePublicUploadPhotosRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesCompletePublicPhotosUploadPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleCompletePublicUploadPhotosRequestDto (optional)
    vehicleCompletePublicUploadPhotosRequestDto: ...,
  } satisfies ApiVehiclesCompletePublicPhotosUploadPostRequest;

  try {
    const data = await api.apiVehiclesCompletePublicPhotosUploadPost(body);
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
| **vehicleCompletePublicUploadPhotosRequestDto** | [VehicleCompletePublicUploadPhotosRequestDto](VehicleCompletePublicUploadPhotosRequestDto.md) |  | [Optional] |

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


## apiVehiclesCreatePublicUploadPhotosPost

> VehiclePublicUploadSasUrlResponseDto apiVehiclesCreatePublicUploadPhotosPost(vehicleCreatePublicUploadUrlPhotosRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesCreatePublicUploadPhotosPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleCreatePublicUploadUrlPhotosRequestDto (optional)
    vehicleCreatePublicUploadUrlPhotosRequestDto: ...,
  } satisfies ApiVehiclesCreatePublicUploadPhotosPostRequest;

  try {
    const data = await api.apiVehiclesCreatePublicUploadPhotosPost(body);
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
| **vehicleCreatePublicUploadUrlPhotosRequestDto** | [VehicleCreatePublicUploadUrlPhotosRequestDto](VehicleCreatePublicUploadUrlPhotosRequestDto.md) |  | [Optional] |

### Return type

[**VehiclePublicUploadSasUrlResponseDto**](VehiclePublicUploadSasUrlResponseDto.md)

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


## apiVehiclesCreateUploadFilesPost

> VehicleUploadSasUrlResponseDto apiVehiclesCreateUploadFilesPost(vehicleCreateUploadUrlFilesRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesCreateUploadFilesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleCreateUploadUrlFilesRequestDto (optional)
    vehicleCreateUploadUrlFilesRequestDto: ...,
  } satisfies ApiVehiclesCreateUploadFilesPostRequest;

  try {
    const data = await api.apiVehiclesCreateUploadFilesPost(body);
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
| **vehicleCreateUploadUrlFilesRequestDto** | [VehicleCreateUploadUrlFilesRequestDto](VehicleCreateUploadUrlFilesRequestDto.md) |  | [Optional] |

### Return type

[**VehicleUploadSasUrlResponseDto**](VehicleUploadSasUrlResponseDto.md)

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


## apiVehiclesGet

> Array&lt;VehicleResponseDto&gt; apiVehiclesGet(verified)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // boolean (optional)
    verified: true,
  } satisfies ApiVehiclesGetRequest;

  try {
    const data = await api.apiVehiclesGet(body);
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
| **verified** | `boolean` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;VehicleResponseDto&gt;**](VehicleResponseDto.md)

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


## apiVehiclesPublicVehicleGet

> VehicleResponseDto apiVehiclesPublicVehicleGet(idVehicle)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesPublicVehicleGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number
    idVehicle: 56,
  } satisfies ApiVehiclesPublicVehicleGetRequest;

  try {
    const data = await api.apiVehiclesPublicVehicleGet(body);
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
| **idVehicle** | `number` |  | [Defaults to `undefined`] |

### Return type

[**VehicleResponseDto**](VehicleResponseDto.md)

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


## apiVehiclesSendVehicleToVerificationPost

> apiVehiclesSendVehicleToVerificationPost(vehicleVerificationRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesSendVehicleToVerificationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleVerificationRequestDto (optional)
    vehicleVerificationRequestDto: ...,
  } satisfies ApiVehiclesSendVehicleToVerificationPostRequest;

  try {
    const data = await api.apiVehiclesSendVehicleToVerificationPost(body);
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
| **vehicleVerificationRequestDto** | [VehicleVerificationRequestDto](VehicleVerificationRequestDto.md) |  | [Optional] |

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


## apiVehiclesTransportVerificationPost

> apiVehiclesTransportVerificationPost(vehicleTransportVerificationRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesTransportVerificationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // VehicleTransportVerificationRequestDto (optional)
    vehicleTransportVerificationRequestDto: ...,
  } satisfies ApiVehiclesTransportVerificationPostRequest;

  try {
    const data = await api.apiVehiclesTransportVerificationPost(body);
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
| **vehicleTransportVerificationRequestDto** | [VehicleTransportVerificationRequestDto](VehicleTransportVerificationRequestDto.md) |  | [Optional] |

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


## apiVehiclesVehicleGet

> VehicleResponseDto apiVehiclesVehicleGet(idVehicle)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesVehicleGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // number
    idVehicle: 56,
  } satisfies ApiVehiclesVehicleGetRequest;

  try {
    const data = await api.apiVehiclesVehicleGet(body);
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
| **idVehicle** | `number` |  | [Defaults to `undefined`] |

### Return type

[**VehicleResponseDto**](VehicleResponseDto.md)

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


## apiVehiclesVehiclePost

> number apiVehiclesVehiclePost(addVehicleRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesVehiclePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // AddVehicleRequestDto (optional)
    addVehicleRequestDto: ...,
  } satisfies ApiVehiclesVehiclePostRequest;

  try {
    const data = await api.apiVehiclesVehiclePost(body);
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
| **addVehicleRequestDto** | [AddVehicleRequestDto](AddVehicleRequestDto.md) |  | [Optional] |

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


## apiVehiclesVehiclePut

> number apiVehiclesVehiclePut(updateVehicleRequestDto)



### Example

```ts
import {
  Configuration,
  VehiclesApi,
} from '';
import type { ApiVehiclesVehiclePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new VehiclesApi(config);

  const body = {
    // UpdateVehicleRequestDto (optional)
    updateVehicleRequestDto: ...,
  } satisfies ApiVehiclesVehiclePutRequest;

  try {
    const data = await api.apiVehiclesVehiclePut(body);
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
| **updateVehicleRequestDto** | [UpdateVehicleRequestDto](UpdateVehicleRequestDto.md) |  | [Optional] |

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

