import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'

export default async function page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession()

	const { data: skills } = await supabase.from('skills').select('*')
	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', sessionData?.session.user.id)

	console.log(skills)
	console.log(sessionData)
	console.log(profile)

	return (
		<div>
			{skills?.map((skill) => (
				// <Image src={skills.image} alt='skill image' />
				<img src={skill.image} alt='' />
			))}
		</div>
	)
}
