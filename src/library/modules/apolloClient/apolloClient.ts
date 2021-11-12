import { ApolloProvider, ApolloClient, InMemoryCache, from } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { stores } from "@lp/stores"
import { setContext } from "@apollo/client/link/context"
import { createUploadLink } from "apollo-upload-client"

const customFetch = (uri, options): Promise<any> => {
  if (stores.flagLoading) stores.setLoading(true)
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

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }
})
   
// depoly 5
const UploadLink = createUploadLink({
  uri: "http://localhost:8080/graphql",
  //uri:"https://f9d5-2409-4042-4cba-2f0a-a1e1-e303-8177-acb8.ngrok.io/graphql",
  //uri: "https://limsplus-api.azurewebsites.net/graphql",
  fetch: customFetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      if (extensions && extensions.validation) {
        const firstMessageKey = Object.keys(extensions.validation)[0]
        if (firstMessageKey) {
          alert(extensions.validation[firstMessageKey][0])
        }
      } else {
        alert("Something went wrong! Please try again.")
      }
    })
  }
  if (networkError) {
    stores.setLoading(false)
    console.log(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: authLink.concat(from([errorLink, UploadLink])),
  cache: new InMemoryCache(),
})

export { ApolloProvider }
