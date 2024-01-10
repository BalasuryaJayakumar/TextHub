import { useState, createContext, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";




const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [ posts, setPosts ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ searchResult, setSearchResult ] = useState([])

    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts")

    /*   useEffect(()=> {
        const fetchItem = async () => {
        try {
            const response = await api.get(API_URL)
            setPosts(response.data)
        } catch(err) {
            if(err.message) {
            console.log(err.message.data);
            console.log(err.message.status);
            console.log(err.message.headers);
            } else {
            console.log(`Error: ${err.message}`);
            }
        }
        } 
        fetchItem()
    }, []) */

    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {
        const filteredResult = posts.filter(post => 
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        || ((post.body).toLowerCase()).includes(search.toLowerCase()));
        setSearchResult(filteredResult.reverse())
    }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResult,
            posts, fetchError, isLoading, setPosts
        }}> 
            { children } 
        </DataContext.Provider>
    )
}

export default DataContext