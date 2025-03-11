import { startCase } from "lodash";
import { usePlanetContext } from "../../hooks";

export const PlanetDetails = () => {
	const { data, isLoading } = usePlanetContext();
	if (isLoading) {
		return <p>Loading Planet Details...</p>
	}
	const planet = data?.planet!
	const diameter = Number(planet.diameter);
	const population = Number.isNaN(Number(planet.population)) ? startCase(planet.population) : Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(Number(planet.population));
	const [gravity, gravityLabel] = planet.gravity.split(' ');
	const surfaceWater = Number.isNaN(Number(planet.surface_water)) ? startCase(planet.surface_water) : `${planet.surface_water}%`
	return (
		<div>
			<h1>{planet.name}</h1>
			<p>Planet Diameter: {Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(diameter)} Km</p>
			<p>Climate: {planet.climate.split(', ').map((i) => startCase(i)).join(', ')}</p>
			<p>Terrain: {planet.terrain.split(', ').map((i) => startCase(i)).join(', ')}</p>
			<p>Surface Water: {surfaceWater}</p>
			<p>Gravity: {gravity} {!!gravityLabel && `(${gravityLabel})`}</p>
			<p>Orbital Period: {planet.orbital_period} days</p>
			<p>Rotation Period: {planet.rotation_period} hours</p>
			<p>Population: {population}</p>
		</div>
	);
};
