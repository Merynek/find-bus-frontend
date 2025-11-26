# RegistrationApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiRegistrationActivePost**](RegistrationApi.md#apiregistrationactivepost) | **POST** /api/Registration/active |  |
| [**apiRegistrationUserPost**](RegistrationApi.md#apiregistrationuserpost) | **POST** /api/Registration/user |  |



## apiRegistrationActivePost

> apiRegistrationActivePost(userActiveRequestDto)



### Example

```ts
import {
  Configuration,
  RegistrationApi,
} from '';
import type { ApiRegistrationActivePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegistrationApi(config);

  const body = {
    // UserActiveRequestDto (optional)
    userActiveRequestDto: ...,
  } satisfies ApiRegistrationActivePostRequest;

  try {
    const data = await api.apiRegistrationActivePost(body);
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
| **userActiveRequestDto** | [UserActiveRequestDto](UserActiveRequestDto.md) |  | [Optional] |

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


## apiRegistrationUserPost

> apiRegistrationUserPost(registrationUserRequestDto)



### Example

```ts
import {
  Configuration,
  RegistrationApi,
} from '';
import type { ApiRegistrationUserPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RegistrationApi(config);

  const body = {
    // RegistrationUserRequestDto (optional)
    registrationUserRequestDto: ...,
  } satisfies ApiRegistrationUserPostRequest;

  try {
    const data = await api.apiRegistrationUserPost(body);
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
| **registrationUserRequestDto** | [RegistrationUserRequestDto](RegistrationUserRequestDto.md) |  | [Optional] |

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

