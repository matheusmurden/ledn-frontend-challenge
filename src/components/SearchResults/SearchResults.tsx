import { Link } from "react-router-dom";
import { useSearchContext } from "../../hooks";

export const SearchResults = () => {
	const { filteredResults } = useSearchContext();
	return (
		<main>
			{filteredResults?.map((i) => (<p><Link key={i.name} to={`/planets/${i.id}`}>{i.name}</Link></p>))}
		</main>
	);
}
