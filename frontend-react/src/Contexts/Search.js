import { useState, useContext, createContext } from "react";


const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [authorization, setAuthorization] = useState({
       key: "",
       results: []
    })

    return <SearchContext.Provider value={[authorization,setAuthorization]}>
        {children}
    </SearchContext.Provider>
}

// custom hooks
const useSearch =() =>useContext(SearchContext)

export {useSearch, SearchProvider}