import { Button, Center, Paper, Title } from '@mantine/core'
// import { getTokenBodySchema } from '@topography/auth_api'
import React from 'react'
import { useForm } from 'react-hook-form'

export interface SigninPageProps {}

const SigninPage: React.FC<SigninPageProps> = ({}) => {
	const form = useForm({
		// resolver: zodResolver(getTokenBodySchema),
	})

	return (
		<Center>
			<Paper>
				<Title align='center'>Sign In</Title>
				<form>
					<Button>Sign In</Button>
				</form>
			</Paper>
		</Center>
	)
}

export default SigninPage
