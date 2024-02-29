'use client'

import Product from '@/components/Product/Product'
import Search from '@/components/Search/Search'
import { products } from '@/db/products'
import { container } from '@/lib/utils'
import { useState } from 'react'

export default function Home() {
	const [productListings, setProductListings] = useState(products)

	return (
		<div className={`${container} pb-20 md:pb-24`}>
			<Search setProductListings={setProductListings} />

			<div className='pt-8 md:pt-6'>
				{productListings.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4'>
						{productListings.map(product => (
							<Product product={product} key={product.id} />
						))}
					</div>
				) : (
					<p className='text-center text-lg md:text-xl font-semibold pt-20 md:pt-16'>No product found ...</p>
				)}
			</div>
		</div>
	)
}
