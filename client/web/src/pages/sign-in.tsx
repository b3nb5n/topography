import {
	Button,
	Center,
	Group,
	Paper,
	PasswordInput,
	TextInput,
	Title,
} from '@mantine/core'
// import { getTokenBodySchema } from '@topography/auth_api'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = ({}) => {
	const form = useForm({
		// resolver: zodResolver(getTokenBodySchema),
	})

	return (
		<Center>
			<Paper component='form' p='lg' shadow='md' withBorder>
				<Group direction='column' spacing='sm' grow>
					<Title>Sign In</Title>
					<TextInput label='Email' />
					<PasswordInput label='Password' />
					<Group position='right'>
						<Button>Sign In</Button>
					</Group>
				</Group>
			</Paper>
		</Center>
	)
}

export default SignInPage
