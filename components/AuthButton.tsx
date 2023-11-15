import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@mantine/core'

export default async function AuthButton() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const signOut = async () => {
		'use server'

		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		await supabase.auth.signOut()
		return redirect('/login')
	}

	return user ? (
		<div className='flex items-center gap-4'>
			Hey, {user.email}!
			<form action={signOut}>
				<Button variant='default' type='submit'>
					Sign Out
				</Button>
			</form>
		</div>
	) : (
		<Button variant='default'>
			<Link
				href='/login'
				className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
			>
				Sign In
			</Link>
		</Button>
	)
}
