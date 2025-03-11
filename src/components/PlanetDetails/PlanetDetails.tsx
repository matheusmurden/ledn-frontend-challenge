import { startCase } from "lodash";
import { usePlanetContext } from "../../hooks";
import { Table, Title } from "@mantine/core";
import styled from "styled-components";

const TableHeadCell = styled(Table.Th)`
	color: rgb(2, 61, 75);
`;

export const PlanetDetails = () => {
	const { data, isLoading } = usePlanetContext();
	if (isLoading) {
		return <p>Loading Planet Details...</p>
	}
	const planet = data?.planet!

	const diameter =
		Number.isNaN(Number(planet.diameter))
		? startCase(planet.diameter)
		:	`${Intl.NumberFormat(undefined, { maximumFractionDigits: 2 })
		.format(Number(planet.diameter))} Km`

	const population =
		Number.isNaN(Number(planet.population))
		? startCase(planet.population)
		: Intl.NumberFormat(undefined, { maximumFractionDigits: 2 })
			.format(Number(planet.population));

	const surfaceWater =
		Number.isNaN(Number(planet.surface_water))
		? startCase(planet.surface_water)
		: `${planet.surface_water}%`

	const [gravity, gravityLabel] = planet.gravity.split(' ');

	const terrain = planet.terrain
		.split(', ')
		.map((i) => startCase(i))
		.join(', ')

	const climate = planet.climate
		.split(', ')
		.map((i) => startCase(i))
		.join(', ')

	const orbitalPeriod =
		Number.isNaN(Number(planet.orbital_period))
		? startCase(planet.orbital_period)
		: `${planet.orbital_period} days`

	const rotationPeriod =
		Number.isNaN(Number(planet.rotation_period))
		? startCase(planet.rotation_period)
		: `${planet.rotation_period} hours`

	return (
		<div>
			<Title order={1} mt={0} mb="2rem" c="teal">{planet.name}</Title>
			<Table.ScrollContainer minWidth={240}>
			<Table variant="vertical" withTableBorder striped>
				<Table.Tbody>
					<Table.Tr>
						<TableHeadCell>Planet Diameter</TableHeadCell>
						<Table.Td>
								{diameter}
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Climate</TableHeadCell>
						<Table.Td>
							{climate}
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Terrain</TableHeadCell>
						<Table.Td>
							{terrain}
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Surface Water</TableHeadCell>
						<Table.Td>{surfaceWater}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Gravity</TableHeadCell>
						<Table.Td>{startCase(gravity)} {!!gravityLabel && `(${gravityLabel})`}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Orbital Period</TableHeadCell>
							<Table.Td>{orbitalPeriod}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Rotation Period</TableHeadCell>
							<Table.Td>{rotationPeriod}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<TableHeadCell>Population</TableHeadCell>
						<Table.Td>{population}</Table.Td>
					</Table.Tr>
				</Table.Tbody>
			</Table>
			</Table.ScrollContainer>
		</div>
	);
};
