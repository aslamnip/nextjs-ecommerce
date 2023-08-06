import { fetchUrl } from "@/app/config";

export async function generateMetadata({ params }) {
  const { category_slug } = params
  const res = await fetch(`${fetchUrl}/api/categories/${category_slug}/`, { caches: 'no-store' })
  const data = await res.json()

  return { title: data.name };
}



export default function CategoryLayout({ children }) {
  return (
    
       <section>{children}</section> 
  )
}
