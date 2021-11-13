import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getData, ITVResult } from "../api";
import Loading from "../components/Loading";
import SliderTV from "../components/SliderTV";
import { makeImagePath } from "../utills";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 500px;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 25px;
  width: 40%;
`;

const TV = () => {
  const { data: topRated, isLoading: isLoading1 } = useQuery<ITVResult>(
    ["tvs,top_rated", "1"],
    () => getData({ tvOrMovie: "tv", category: "top_rated" })
  );
  const { data: topRated2, isLoading: isLoading2 } = useQuery<ITVResult>(
    ["tvs,top_rated", "2"],
    () => getData({ tvOrMovie: "tv", category: "top_rated", pageNum: 2 })
  );
  const { data: topRated3, isLoading: isLoading3 } = useQuery<ITVResult>(
    ["tvs,top_rated", "3"],
    () => getData({ tvOrMovie: "tv", category: "top_rated", pageNum: 3 })
  );
  const isLoading = isLoading1 || isLoading2 || isLoading3;
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              (topRated && topRated.results[0].backdrop_path) || ""
            )}
          >
            <Title>{topRated && topRated.results[0].name}</Title>
            <Overview>{topRated && topRated.results[0].overview}</Overview>
          </Banner>
          {topRated && <SliderTV {...topRated} location={0} />}
          {topRated2 && <SliderTV {...topRated2} location={1} />}
          {topRated3 && <SliderTV {...topRated3} location={2} />}
        </>
      )}
    </Wrapper>
  );
};

export default TV;
