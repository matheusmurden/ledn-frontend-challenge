import { debounce, startCase } from "lodash";
import { useSearchContext } from "../../hooks";

export const SearchBar = () => {
	const { allClimates, allTerrains, isError, error, isLoading, filterValues, setSearchFilters } = useSearchContext();
	const { name, climate, terrain } = filterValues;

	if (isError) {
		return <p>Error: {error?.message}</p>
	}

	return (
		<header>
			<h1>Search planets by</h1>
			<div style={{ display: 'flex', gap: '2rem' }}>
				<label htmlFor="name">
					<p>Name:</p>
					<input
						name="name"
						id="name"
						type="text"
						defaultValue={name}
						onChange={debounce((e) => {
							setSearchFilters?.(e)
						}, 500)}
						disabled={isLoading}
					/>
				</label>
				<label htmlFor="climate">
					<p>
					Climate:
					</p>
					<select
						name="climate"
						id="climate"
						value={climate}
						onChange={setSearchFilters}
						disabled={isLoading}
					>
						<option value="">{isLoading ? 'Loading...' : ''}</option>
						{allClimates?.map((climate) => (
							<option key={climate} value={climate}>{startCase(climate)}</option>
						))}
					</select>
				</label>
				<label htmlFor="terrain">
					<p>
					Terrain:
					</p>
					<select
						name="terrain"
						id="terrain"
						value={terrain}
						onChange={setSearchFilters}
						disabled={isLoading}
					>
						<option value="">{isLoading ? 'Loading...' : ''}</option>
						{allTerrains?.map((terrain) => (
							<option key={terrain} value={terrain}>{startCase(terrain)}</option>
						))}
					</select>
				</label>
			</div>
		</header>
	);
};
