import { fetchUrl } from "../config"

export async  function Products() {
    const res = await fetch(`${fetchUrl}/api/products/`, { cache: 'no-store' })
    const data = await res.json()
    return data

}