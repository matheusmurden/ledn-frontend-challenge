import { debounce, startCase } from "lodash";
import { useSearchContext } from "../../hooks";
import { Card, Grid, GridCol, NativeSelect, TextInput, Title } from "@mantine/core";

export const SearchBar = () => {
	const { allClimates, allTerrains, isError, error, isLoading, filterValues, setSearchFilters } = useSearchContext();
	const { name, climate, terrain } = filterValues;

	if (isError) {
		return <p>Error: {error?.message}</p>
	}

	return (
		<header style={{marginBottom: '2rem', width: 'fit-content'}}>
			<Card
				shadow="md"
				padding="xl"
				radius="sm"
				withBorder
			>
				<Title order={1} c="rgb(2, 61, 75)" mt={0} mb="1.5rem">
					Intergalactic Planetary Index
				</Title>
				<Grid columns={3}>
					<GridCol span={{ base: 3, md: 1, lg: 1 }}>
						<TextInput
				      label="Name"
							name="name"
				      placeholder="Search by planet name"
							defaultValue={name}
							onChange={debounce((e) => {
								setSearchFilters?.(e)
							}, 500)}
							disabled={isLoading}
				    />
					</GridCol>
					<GridCol span={{ base: 3, md: 1, lg: 1 }}>
						<NativeSelect
							label="Climate"
				      value={climate}
							name="climate"
				      onChange={setSearchFilters}
							disabled={isLoading}
				      data={[
											{ value: "", label: "Any" },
											...(allClimates || [])
												?.map((climate) =>
													({ value: climate, label: startCase(climate) }))
							]}
				    />
					</GridCol>
					<GridCol span={{ base: 3, md: 1, lg: 1 }}>
						<NativeSelect
							label="Terrain"
				      value={terrain}
							name="terrain"
				      onChange={setSearchFilters}
							disabled={isLoading}
				      data={[
											{ value: "", label: "Any" },
											...(allTerrains || [])
												?.map((terrain) =>
													({ value: terrain, label: startCase(terrain) }))
							]}
				    />
					</GridCol>
				</Grid>
			</Card>
		</header>
	);
};
