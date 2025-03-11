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
		@media screen and (prefers-color-scheme: dark) {
			background-color: rgb(2, 61, 75);
		}
	}
`;

const PlanetPropertyText = styled(Text.withProps({ span: true, inline: true, fw: 700 }))`
	color: rgb(2, 61, 75);
	@media screen and (prefers-color-scheme: dark) {
		color: #92b7b1;
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
										<PlanetPropertyText>Climate: </PlanetPropertyText>
										{startCase(i.climate)?.split(' ')?.join(', ')}
									</Text>
									<Text>
										<PlanetPropertyText> Terrain: </PlanetPropertyText>
										{startCase(i.terrain)?.split(' ')?.join(', ')}
									</Text>
									<Text>
										<PlanetPropertyText>Population: </PlanetPropertyText>
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
										<PlanetPropertyText>Planet Diameter: </PlanetPropertyText>
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
