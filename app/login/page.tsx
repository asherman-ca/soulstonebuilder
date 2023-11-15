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
import { TextInput, Button } from '@mantine/core'
// import { Input } from '@nextui-org/react'
// import { Button } from '@nextui-org/react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserCircle2 } from 'lucide-react'
import { Span } from 'next/dist/trace'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
			<Link
				href='/'
				className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
				>
					<polyline points='15 18 9 12 15 6' />
				</svg>{' '}
				Back
			</Link>
			<div className='flex flex-col gap-8 rounded-md border-gray-300 p-8 md:border-1'>
				<h1 className='text-2xl font-semibold text-blue-500'>
					SoulstoneBuilder
				</h1>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl font-semibold'>
						Sign in to Soulstone Builder
					</h2>
					<p>Not your device? Use a private or incognito window to sign in.</p>
				</div>
				<div className='flex flex-col gap-4'>
					<TextInput
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Entered value does not match email format',
							},
						})}
						label='Email'
						type='email'
						placeholder='email@domain.com'
						error={errors.email && errors.email.message}
					/>
					<TextInput
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters',
							},
						})}
						placeholder='password123'
						label='Password'
						type='password'
						error={errors.password && errors.password.message}
					/>
					<div className='mt-4 flex w-full gap-4'>
						<Button
							onClick={handleSubmit(handleSignIn)}
							variant='default'
							className='flex-1'
						>
							Sign in
						</Button>
						<Button
							onClick={handleSubmit(handleSignUp)}
							variant='default'
							className='flex-1'
						>
							Sign up
						</Button>
					</div>
				</div>
				<div className='relative flex justify-center'>
					<p className='bg-white px-2 text-center text-sm dark:bg-black'>OR</p>
					<div className='absolute left-0 top-[50%] -z-10 w-full border-b-1 border-gray-300'></div>
				</div>
				<div className='flex gap-4'>
					<Button
						onClick={handleGoogleSignIn}
						className='flex-1'
						variant='default'
						leftSection={<div>google</div>}
					>
						<p>Sign in with Google</p>
					</Button>

					<Button
						onClick={handleGuest}
						className='flex-1'
						variant='default'
						leftSection={<UserCircle2 className='h-5 w-5' />}
					>
						Sign in as Guest
					</Button>
				</div>
			</div>
		</div>
	)
}
