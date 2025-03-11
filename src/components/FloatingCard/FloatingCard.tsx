import { Card, Text } from "@mantine/core"
import { ReactNode } from "react"

export const FloatingCard = ({children}: {children: ReactNode}) => {
	return (
		<Card
			shadow="sm"
			padding="sm"
			radius="xl"
			withBorder
			style={{
				position: 'fixed',
				top: '1rem',
				right: '1rem',
				zIndex: 1000
			}}
		>
			<Text c="teal">
				<strong>{children}</strong>
			</Text>
		</Card>
	)
}
