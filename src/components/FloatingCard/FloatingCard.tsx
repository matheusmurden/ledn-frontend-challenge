import { Card, Text } from "@mantine/core"
import { ReactNode } from "react"

export const FloatingCard = ({children}: {children: ReactNode}) => {
	return (
		<Card
			shadow="sm"
			padding="sm"
			radius="md"
			withBorder
			style={{
				position: 'fixed',
				top: '2rem',
				right: '2rem',
				zIndex: 1000
			}}
		>
			<Text c="teal">
				<strong>{children}</strong>
			</Text>
		</Card>
	)
}
