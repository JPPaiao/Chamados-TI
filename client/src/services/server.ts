import { store } from "../store/store"

export interface HttpRequest {
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: any,
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<R>
}

const httpClientFactory = (): HttpClient => new FetchHttpClientAdapter()

class FetchHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    const user = store.getState().users.user
    let response: any

    try {
      response = await fetch(`http://localhost:3001/api/${data.url}`, {
        method: data.method,
        headers: {
          "authorization": `Bearer ${user?.token}`,
          ...data?.headers
        },
        body: data.body
      }).then(d => d.json())

    } catch (err) {
      throw new Error("Error " + err)
    }

    return response
  }
}

export { FetchHttpClientAdapter, httpClientFactory }