'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

export default function MobileHeader() {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

	return (
		<div className='md:hidden'>
			<button className='text-4xl text-brand-secondary' onClick={() => setIsMobileNavOpen(true)}>
				<GiHamburgerMenu />
			</button>

			<AnimatePresence>
				{isMobileNavOpen && (
					<motion.div
						initial={{
							opacity: 0,
							x: -100
						}}
						animate={{
							opacity: 1,
							x: 0
						}}
						exit={{
							opacity: 0,
							x: -100
						}}
						className='fixed inset-0 bg-black/50 z-10'
					>
						<nav className='w-[80%] h-full px-[5%] py-3 bg-white shadow-md'>
							<div className='flex items-center justify-between'>
								<Image src={'/images/Logo Milky.png'} alt='Milky Express' priority width={155} height={135} className='w-24 h-auto' />

								<button className='text-4xl text-brand-secondary' onClick={() => setIsMobileNavOpen(false)}>
									<FaTimes />
								</button>
							</div>

							<div className='flex flex-col gap-4 py-8'>
								<Link href={'/'} className='transition-colors hover:text-brand-primary flex items-center justify-between'>
									<p>Home</p>

									<MdOutlineKeyboardArrowRight className='text-xl' />
								</Link>

								<Link href={'/orders'} className='transition-colors hover:text-brand-primary flex items-center justify-between'>
									<p>My Order</p>

									<MdOutlineKeyboardArrowRight className='text-xl' />
								</Link>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
