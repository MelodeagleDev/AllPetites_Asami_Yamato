import axios from "axios";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const compareReleaseDates = (a: any, b: any) => {
    const dateA: any = new Date(a.release_date);
    const dateB: any = new Date(b.release_date);
    return dateB - dateA;
};

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getKey = (pageIndex: number) => {
    console.log("pageIndex", pageIndex);
    return `https://api.themoviedb.org/3/movie/upcoming?page=${pageIndex + 1}`                    // SWR key
}

const fetchData = async (url: string) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2ZjZTgwYWJjZGMyN2Y5OWU3MDBhNTMxYjBkNWI1OCIsInN1YiI6IjY1MDdlMGFiMzczYWMyMDBjNTMyYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uOgn0-RidB4vJL2ccJaoa3331welkTFeTJrXFE91HVI",
                "Accept": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default function useUpcomingMovies() {
    const { data, size, setSize } = useSWRInfinite(getKey, (url) => fetchData(url));
    const response = data?.at(data.length - 1);
    console.log(">>>>>>", data)

    const moviesData = data ? ([] as any[]).concat(...response.results) : [];
    console.log("????", moviesData);
    const hasMore = size !== response?.total_pages;
    const isEmpty = response?.results?.at(0)?.length === 0;
    console.log("isEmpty", isEmpty);
    const isReachingEnd = isEmpty
        || !!(response && response.results[response.results.length - 1]?.length < PAGE_SIZE);
    console.log("isReachingEnd", isReachingEnd);
    const loadMore = () => isReachingEnd ? null : setSize(size + 1);

    return {
        data: moviesData?.sort(compareReleaseDates),
        loadMore,
        hasMore
    }
}