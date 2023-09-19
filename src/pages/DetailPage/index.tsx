import React, { useEffect, useState } from "react";
import DetailNavBar from "../../components/Navbar/DetailNavBar";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";

const DetailContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 50px;
    box-sizing: border-box;
    gap: 30px;
`

export default function DetailPage() {
    const params = useParams();
    const Id = params.id;
    const [data, setData]:any = useState({});
    const [casts, setCasts] = useState([]);
    const [director, setDirector]:any = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}?api_key=73fce80abcdc27f99e700a531b0d5b58`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCasts = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${Id}/casts?api_key=73fce80abcdc27f99e700a531b0d5b58`);
            setCasts(response.data.cast);
            const selectedData = []
            for (let index = 0; index < response.data.crew.length; index++) {
                if(response.data.crew[index].job === 'Director') {
                    selectedData.push(response.data.crew[index])
                }
            }
            setDirector(selectedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCasts();
    }, []);

    return (
        <>
            <DetailNavBar />
            <DetailContainer>
                <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt="Clicked Image"
                    width={400}
                    height={600}
                />
                <Box color={"#4a4a4a"}>
                    <Box display='flex' alignItems={'center'} mb={3}>
                        <Typography variant="h4">{data.original_title}</Typography>
                        <Typography variant="h4" color={"#9b9b9b"}>&nbsp;({Math.floor(data.vote_average * 10)})</Typography>
                    </Box>
                    <Typography mb={2} variant="h5">{data.release_date?.slice(0, 4)} | {Math.floor(data.runtime/60)}h {data.runtime%60}m | {director.map((crew:any, index:any) => (
                        <span key={index} style={{ marginRight: "10px" }}>{crew.name}</span>
                    ))}</Typography>
                    <Typography mb={2} variant="h5">{casts.map((cast:any, index:any) => (
                        index === 0 ? <span key={index}>{cast.name}</span> : <span key={index}>, {cast.name}</span>
                    ))}</Typography>
                    <Typography variant="h5">Description: {data.overview}</Typography>
                </Box>
            </DetailContainer>
        </>
    )
}