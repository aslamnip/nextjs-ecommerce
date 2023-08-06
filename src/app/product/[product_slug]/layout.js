import { fetchUrl } from "@/app/config";

export async function generateMetadata({ params }) {
  const { product_slug } = params
  const res = await fetch(`${fetchUrl}/api/products/${product_slug}/`, { caches: 'no-store' })
  const data = await res.json()

  return { title: data.name };
}



export default function CategoryLayout({ children }) {
  return (
    
       <section>{children}</section> 
  )
}
