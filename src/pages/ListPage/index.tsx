import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';
import DetailCard from "../../components/Card";
import ListNavBar from "../../components/Navbar/ListNavBar";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";

const ListContainer = styled.div`
    padding: 50px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    column-gap: calc((100% - 1500px) / 4);
    row-gap: 50px;
`
// 73fce80abcdc27f99e700a531b0d5b58
export default function ListPage() {
    const { data, hasMore, fetchData } = useUpcomingMovies();

    return (
        <>
            <ListNavBar />

            <InfiniteScroll
                dataLength={data?.length || 0}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <ListContainer>
                    {data?.map((list: any, index: number) => (
                        <Link key={index} to={`/${list.id}`} style={{ textDecoration: 'none', width: 'fit-content' }}>
                            <DetailCard title={list.original_title} description={list.overview} image={`https://image.tmdb.org/t/p/w500${list.poster_path}`} ranking={list.vote_average * 10} />
                        </Link>
                    ))}
                </ListContainer>
            </InfiniteScroll>
        </>
    )
}