import React from 'react'
import AuthButton from '../AuthButton'

const Nav = () => {
	return (
		<nav className='px-8 py-6 flex justify-between items-center w-full border-b border-gray-300'>
			<h1 className='text-xl font-semibold'>Soulstone Builder</h1>
			<AuthButton />
		</nav>
	)
}

export default Nav
