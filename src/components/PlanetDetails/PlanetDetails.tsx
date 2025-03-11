import { startCase } from "lodash";
import { usePlanetContext } from "../../hooks";
import { Table } from "@mantine/core";

export const PlanetDetails = () => {
	const { data, isLoading } = usePlanetContext();
	if (isLoading) {
		return <p>Loading Planet Details...</p>
	}
	const planet = data?.planet!

	const diameter = Number(planet.diameter);

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

	return (
		<div>
			<h1 style={{ marginTop: 0 }}>{planet.name}</h1>
			<Table.ScrollContainer minWidth={240}>
			<Table variant="vertical" withTableBorder striped>
				<Table.Tbody>
					<Table.Tr>
						<Table.Th>Planet Diameter</Table.Th>
						<Table.Td>
							{Intl.NumberFormat(undefined, { maximumFractionDigits: 2 })
								.format(diameter)} Km
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Climate</Table.Th>
						<Table.Td>
							{climate}
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Terrain</Table.Th>
						<Table.Td>
							{terrain}
						</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Surface Water</Table.Th>
						<Table.Td>{surfaceWater}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Gravity</Table.Th>
						<Table.Td>{gravity} {!!gravityLabel && `(${gravityLabel})`}</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Orbital Period</Table.Th>
						<Table.Td>{planet.orbital_period} days</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Rotation Period</Table.Th>
						<Table.Td>{planet.rotation_period} hours</Table.Td>
					</Table.Tr>
					<Table.Tr>
						<Table.Th>Population</Table.Th>
						<Table.Td>{population}</Table.Td>
					</Table.Tr>
				</Table.Tbody>
			</Table>
			</Table.ScrollContainer>
		</div>
	);
};
