import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider theme={{ primaryColor: 'dark' }}>
			<App />
		</MantineProvider>
	</React.StrictMode>
)
