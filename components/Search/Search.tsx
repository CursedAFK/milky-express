import { products } from '@/db/products'
import { Product } from '@/types/product'
import { Dispatch, SetStateAction } from 'react'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

type SearchProps = {
	setProductListings: Dispatch<SetStateAction<Product[]>>
}

export default function Search({ setProductListings }: SearchProps) {
	const { toast } = useToast()

	return (
		<div className='flex justify-between items-center pt-6 flex-col md:flex-row gap-4'>
			<Input
				placeholder='Product Search'
				type='search'
				onChange={event => {
					const searchTerm = event.target.value
					const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
					setProductListings(filteredProducts)
				}}
				className='bg-[#EDEDED] md:w-[25%]'
			/>

			<Input
				placeholder='Choose Category'
				value='Choose Category'
				type='button'
				onClick={() =>
					toast({
						title: 'Coming Soon',
						description: 'This feature is coming soon!'
					})
				}
				className='cursor-pointer bg-[#EDEDED] md:w-[25%] text-brand-secondary'
			/>
		</div>
	)
}
