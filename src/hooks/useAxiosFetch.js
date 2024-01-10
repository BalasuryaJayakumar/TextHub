import axios from 'axios'
import { useEffect, useState } from 'react'

const useAxiosFetch = (dataURL) => {
    const [ data, setData ] = useState([])
    const [ fetchError, setFetchError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source()

        const fetchItems = async (URL) => {
            setIsLoading(true)
            try {
                const response = await axios.get(URL, {
                    cancelToken: source.token
                })
                if(isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            }  catch (err) {
                if(isMounted) {
                    setFetchError(err.message)
                    setData([])
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchItems(dataURL)

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp

    }, [dataURL])

  return { data, fetchError, isLoading }

}

export default useAxiosFetch