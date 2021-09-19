import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { stores } from "@lp/stores"


const customFetch = (uri, options): Promise<any> => {
  stores.setLoading(true)
  const response = fetch(uri, options).then((response) => {
    stores.setLoading(false)
    if (response.status >= 500) {
      // or handle 400 errors
      return Promise.reject(response.status)
    }
    return response
  })
  return response
}


     // http link
const httpLink = new HttpLink({   
  uri: "http://localhost:8080/graphql",
  //uri: "https://limsplus-api.azurewebsites.net/graphql",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjMwLjE5MTo4MDAxXC9ncmFwaHFsIiwiaWF0IjoxNjMxMTkwNzU4LCJleHAiOjE2MzExOTQzNTgsIm5iZiI6MTYzMTE5MDc1OCwianRpIjoiYWxrYU02YXVmOFlrV25IRiIsInN1YiI6MjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpZCI6MjEsIm5hbWUiOiJUZXN0IFVzZXIiLCJtb2JpbGUiOiIxMjM0NTY3ODkwIn0.XnUqFohQedUpR-rip6zi_l88OPNOQwFHTb7mZqY68Yk",
  },
  fetch: customFetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export { ApolloProvider }
