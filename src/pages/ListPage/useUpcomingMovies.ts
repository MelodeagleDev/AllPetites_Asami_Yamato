import axios from "axios";
import { useEffect, useState } from "react";


const compareReleaseDates = (a: any, b: any) => {
    const dateA: any = new Date(a.release_date);
    const dateB: any = new Date(b.release_date);
    return dateB - dateA;
};

export default function useUpcomingMovies() {
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData]:any = useState([]);
    const [hasMore, setHasMore] = useState(true);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?page=${pageIndex}`, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2ZjZTgwYWJjZGMyN2Y5OWU3MDBhNTMxYjBkNWI1OCIsInN1YiI6IjY1MDdlMGFiMzczYWMyMDBjNTMyYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uOgn0-RidB4vJL2ccJaoa3331welkTFeTJrXFE91HVI",
                    "Accept": "application/json"
                }
            });
            const newData = response.data.results;
            setData([...data, ...newData]);
            setHasMore(pageIndex !== response.data.total_pages);
            setPageIndex(pageIndex + 1);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return {
        data: data?.sort(compareReleaseDates),
        fetchData,
        hasMore
    }
}