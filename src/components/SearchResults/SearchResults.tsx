import { Link } from "react-router-dom";
import { useSearchContext } from "../../hooks";

export const SearchResults = () => {
	const { filteredResults } = useSearchContext();
	return (
		<main>
			<h2># of results: {filteredResults?.length}</h2>
			{filteredResults?.map((i) => (<p><Link key={i.name} to={`/planets/${i.id}`}>{i.name}</Link></p>))}
		</main>
	);
}
