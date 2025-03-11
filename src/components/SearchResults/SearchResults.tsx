import { Link } from "react-router-dom";
import { useSearchContext } from "../../hooks";
import { Card, Grid, GridCol, NumberFormatter, Text, Title } from "@mantine/core";
import styled from "styled-components";
import { startCase } from "lodash";

const StyledLink = styled(Link)`
	text-decoration: none;
	& > div {
		transition: all 100ms ease-out;
	}
	&:hover > div {
		scale: 1.02;
		background-color: rgb(212, 242, 211);
	}
`;

export const SearchResults = () => {
	const { filteredResults } = useSearchContext();
	return (
		<main>
			<Grid columns={4} >
			{filteredResults?.map((i) =>
				(
					<GridCol span={{ base: 4, md: 2, lg: 1 }}>
						<StyledLink to={`/planets/${i.id}`}>
							<Card
								key={i.name}
								shadow="xs"
								padding="lg"
								radius="xs"
								withBorder
								h={200}
							>
								<Card.Section
									inheritPadding
								>
									<Title order={3} c="teal" fw={700} my="1rem">{i.name}</Title>
								</Card.Section>
								<Card.Section
									inheritPadding
								>
									<Text>
										<Text inline span c="rgb(2, 61, 75)" fw={ 700}>Climate: </Text>
										{startCase(i.climate)?.split(' ')?.join(', ')}
									</Text>
									<Text>
										<Text inline span c="rgb(2, 61, 75)" fw={700}> Terrain: </Text>
										{startCase(i.terrain)?.split(' ')?.join(', ')}
									</Text>
									<Text>
										<Text inline span c="rgb(2, 61, 75)" fw={700}>Population: </Text>
										{Number.isNaN(Number(i.population))
											? startCase(i.population)
											: (
												<NumberFormatter
													value={i.population}
													thousandSeparator
												/>
											)
										}
									</Text>
									<Text>
										<Text inline span c="rgb(2, 61, 75)" fw={700}>Planet Diameter: </Text>
										<NumberFormatter
											value={i.diameter}
											thousandSeparator
										/>
									</Text>
								</Card.Section>
							</Card>
						</StyledLink>
					</GridCol>
				)
			)}
			</Grid>
		</main>
	);
}
