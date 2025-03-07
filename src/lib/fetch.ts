export const fetchApi = async <T>(url: string, options: RequestInit, fallbackErrorMessage?: string): Promise<T> => {
  const response = await fetch(url, options)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || fallbackErrorMessage || "Failed to fetch data")
  }
  return response.json() as Promise<T>
}
