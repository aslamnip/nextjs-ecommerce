import { Products } from "@/app/Products/Products"
import React from 'react';
import Search from "../Search/Search";


async function page({ params }) {
  const { search } = params
  const allProducts = await Products()
  const filterProducts = allProducts.filter(data => data.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  return (
    <div>
      { filterProducts.length > 0?
        <div>
          <h3 className="mt-5 text-center">Products showing of {search}</h3>
          <Search allProducts={filterProducts} />
        </div> 
        : <h4 className="text-center my-5">!!! No Products Available !!!</h4>
      }
    </div>
  );
};

export default page;