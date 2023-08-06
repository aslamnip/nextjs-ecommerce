'use client'
import CartPage from "../CartPage"


export default function page({ params }) {
  const { cartItem } = params
  const x =cartItem.split('-')
const itemId = (x[x.length - 1])
  return (
    <div>
      <CartPage itemId={itemId} />
    </div>
  )
}