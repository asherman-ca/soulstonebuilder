'use client'
import { createClient } from '@/utils/supabase/client'
import { FC } from 'react'

const getURL = () => {
	let url = process?.env?.NEXT_PUBLIC_SITE_URL as string
	// ?? // Set this to your site URL in production env.
	// process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
	// "http://localhost:3000/";

	// Make sure to include https:// when not localhost.
	url = url.includes('http') ? url : `https://${url}`
	// Make sure to including trailing /.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
	return url
}

type Inputs = {
	email: string
	password: string
}

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const supabase = createClient()
	const handleGoogleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getURL()}auth/callback`,
			},
		})
	}

	return (
		<div>
			<button onClick={handleGoogleSignIn}>Google</button>
		</div>
	)
}

export default page
