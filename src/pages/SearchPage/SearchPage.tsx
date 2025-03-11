import { SearchBar } from "../../components"
import { SearchResults } from "../../components";
import { SearchContextProvider } from "../../hooks";


export const SearchPage = () => {
	return (
		<SearchContextProvider>
			<SearchBar />
			<SearchResults />
		</SearchContextProvider>
	)
};
