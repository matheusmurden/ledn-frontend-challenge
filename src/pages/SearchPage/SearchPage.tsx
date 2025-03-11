import { SearchBar } from "../../components"
import { SearchResults } from "../../components/SearchResults";
import { SearchContextProvider } from "../../hooks";


export const SearchPage = () => {
	return (
		<SearchContextProvider>
			<SearchBar />
			<SearchResults />
		</SearchContextProvider>
	)
};
