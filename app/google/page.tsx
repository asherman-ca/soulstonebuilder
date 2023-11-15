// 'use client'
// import { createClient } from '@/utils/supabase/client'
// import { FC } from 'react'

// const getURL = () => {
// 	let url = process?.env?.NEXT_PUBLIC_SITE_URL as string
// 	// ?? // Set this to your site URL in production env.
// 	// process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
// 	// "http://localhost:3000/";

// 	// Make sure to include https:// when not localhost.
// 	url = url.includes('http') ? url : `https://${url}`
// 	// Make sure to including trailing /.
// 	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
// 	return url
// }

// type Inputs = {
// 	email: string
// 	password: string
// }

// interface pageProps {}

// const page: FC<pageProps> = ({}) => {
// 	const supabase = createClient()
// 	const handleGoogleSignIn = async () => {
// 		const { data, error } = await supabase.auth.signInWithOAuth({
// 			provider: 'google',
// 			options: {
// 				redirectTo: `${getURL()}auth/callback`,
// 			},
// 		})
// 	}

// 	return (
// 		<div>
// 			<button onClick={handleGoogleSignIn}>Google</button>
// 		</div>
// 	)
// }

// export default page

'use client'

import { createClient } from '@/utils/supabase/client'
// import { Input } from '@nextui-org/react'
// import { Button } from '@nextui-org/react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

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

export default function Login() {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const router = useRouter()
	const supabase = createClient()
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<Inputs>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleSignUp: SubmitHandler<Inputs> = async (data) => {
		const { email, password } = data
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		})
		if (error) {
			toast.error('Authentication failed')
		} else {
			router.refresh()
		}
	}

	const handleSignIn: SubmitHandler<Inputs> = async (data) => {
		const payload = {
			email: data.email,
			password: data.password,
		}
		const { error } = await supabase.auth.signInWithPassword(payload)
		if (error) {
			toast.error('Authentication failed')
		} else {
			router.refresh()
			router.push('/')
		}
	}

	const handleGuest = async () => {
		const payload = {
			email: 'liquifyguest@yahoo.com',
			password: 'liquifyguest',
		}
		const { error } = await supabase.auth.signInWithPassword(payload)
		if (error) {
			console.log('error', error)
			toast.error('Authentication failed')
		} else {
			router.refresh()
			router.push('/')
		}
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	const handleGoogleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getURL()}auth/callback`,
			},
		})
	}

	return (
		<div className='flex justify-center px-6 pt-32 md:px-0'>
			<div className='flex flex-col gap-8 rounded-md border-gray-300 p-8 md:border-1'>
				<h1 className='text-2xl font-semibold text-blue-500'>liquify</h1>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl font-semibold'>Sign in to Liquify</h2>
					<p>Not your device? Use a private or incognito window to sign in.</p>
				</div>
				<div className='flex flex-col gap-4'>
					<input
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Entered value does not match email format',
							},
						})}
						// label='Email'
						type='email'
						// errorMessage={errors.email && errors.email.message}
						// isRequired
					/>
					<input
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters',
							},
						})}
						// label='Password'
						type='password'
						// errorMessage={errors.password && errors.password.message}
						// isRequired
					/>
					<div className='mt-4 flex w-full gap-4'>
						<button
							onClick={handleSubmit(handleSignIn)}
							color='primary'
							className='flex-1'
						>
							Sign in
						</button>
						<button
							onClick={handleSubmit(handleSignUp)}
							color='primary'
							className='flex-1'
						>
							Sign up
						</button>
					</div>
				</div>
				<div className='relative flex justify-center'>
					<p className='bg-white px-2 text-center text-sm dark:bg-black'>OR</p>
					<div className='absolute left-0 top-[50%] -z-10 w-full border-b-1 border-gray-300'></div>
				</div>
				<div className='flex gap-4'>
					<button
						// variant='ghost'
						onClick={handleGoogleSignIn}
						className='mx-auto flex-1'
					>
						<Image
							src='/googleIcon.png'
							alt='Google Icon'
							width={48}
							height={48}
							className='h-5 w-5'
						/>
						<p>Sign in with Google</p>
					</button>

					<button
						// variant='ghost'
						onClick={handleGuest}
						className='mx-auto flex-1'
					>
						<UserCircle2 className='h-5 w-5' />
						Login as Guest
					</button>
				</div>
			</div>
		</div>
	)
}
