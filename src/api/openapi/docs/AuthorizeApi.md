# AuthorizeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAuthorizeChangePasswordPost**](AuthorizeApi.md#apiauthorizechangepasswordpost) | **POST** /api/Authorize/changePassword |  |
| [**apiAuthorizeDontTouchGet**](AuthorizeApi.md#apiauthorizedonttouchget) | **GET** /api/Authorize/dontTouch |  |
| [**apiAuthorizeForgetPasswordPost**](AuthorizeApi.md#apiauthorizeforgetpasswordpost) | **POST** /api/Authorize/forgetPassword |  |
| [**apiAuthorizeLoginPost**](AuthorizeApi.md#apiauthorizeloginpost) | **POST** /api/Authorize/login |  |
| [**apiAuthorizeRefreshPost**](AuthorizeApi.md#apiauthorizerefreshpost) | **POST** /api/Authorize/refresh |  |



## apiAuthorizeChangePasswordPost

> apiAuthorizeChangePasswordPost(changePasswordRequestDto)



### Example

```ts
import {
  Configuration,
  AuthorizeApi,
} from '';
import type { ApiAuthorizeChangePasswordPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthorizeApi(config);

  const body = {
    // ChangePasswordRequestDto (optional)
    changePasswordRequestDto: ...,
  } satisfies ApiAuthorizeChangePasswordPostRequest;

  try {
    const data = await api.apiAuthorizeChangePasswordPost(body);
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
| **changePasswordRequestDto** | [ChangePasswordRequestDto](ChangePasswordRequestDto.md) |  | [Optional] |

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


## apiAuthorizeDontTouchGet

> apiAuthorizeDontTouchGet()



### Example

```ts
import {
  Configuration,
  AuthorizeApi,
} from '';
import type { ApiAuthorizeDontTouchGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthorizeApi(config);

  try {
    const data = await api.apiAuthorizeDontTouchGet();
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

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiAuthorizeForgetPasswordPost

> apiAuthorizeForgetPasswordPost(forgetPasswordRequestDto)



### Example

```ts
import {
  Configuration,
  AuthorizeApi,
} from '';
import type { ApiAuthorizeForgetPasswordPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthorizeApi(config);

  const body = {
    // ForgetPasswordRequestDto (optional)
    forgetPasswordRequestDto: ...,
  } satisfies ApiAuthorizeForgetPasswordPostRequest;

  try {
    const data = await api.apiAuthorizeForgetPasswordPost(body);
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
| **forgetPasswordRequestDto** | [ForgetPasswordRequestDto](ForgetPasswordRequestDto.md) |  | [Optional] |

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


## apiAuthorizeLoginPost

> LoginResponseDto apiAuthorizeLoginPost(loginRequestDto)



### Example

```ts
import {
  Configuration,
  AuthorizeApi,
} from '';
import type { ApiAuthorizeLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthorizeApi(config);

  const body = {
    // LoginRequestDto (optional)
    loginRequestDto: ...,
  } satisfies ApiAuthorizeLoginPostRequest;

  try {
    const data = await api.apiAuthorizeLoginPost(body);
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
| **loginRequestDto** | [LoginRequestDto](LoginRequestDto.md) |  | [Optional] |

### Return type

[**LoginResponseDto**](LoginResponseDto.md)

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


## apiAuthorizeRefreshPost

> AccessTokenDto apiAuthorizeRefreshPost(refreshTokenRequestDto)



### Example

```ts
import {
  Configuration,
  AuthorizeApi,
} from '';
import type { ApiAuthorizeRefreshPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AuthorizeApi(config);

  const body = {
    // RefreshTokenRequestDto (optional)
    refreshTokenRequestDto: ...,
  } satisfies ApiAuthorizeRefreshPostRequest;

  try {
    const data = await api.apiAuthorizeRefreshPost(body);
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
| **refreshTokenRequestDto** | [RefreshTokenRequestDto](RefreshTokenRequestDto.md) |  | [Optional] |

### Return type

[**AccessTokenDto**](AccessTokenDto.md)

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

