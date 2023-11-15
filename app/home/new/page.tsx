import Nav from '@/components/nav/Nav'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'

const page = async () => {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession()

	const { data: skills } = await supabase.from('skills').select('*')

	return (
		<div className='flex flex-col w-full'>
			<Nav />
			{skills?.map((skill) => (
				<Image src={skill.image} alt='skill image' />
				// <ClientImage url={skill.image} />
			))}
		</div>
	)
}

export default page
