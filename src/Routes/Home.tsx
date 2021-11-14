import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getData, IMovieResult } from "../api";
import Loading from "../components/Loading";
import SliderMovies from "../components/SliderMovies";
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

const Home = () => {
  const { data: now_playing, isLoading: now_playing_loading } =
    useQuery<IMovieResult>(["movies", "now_playing", "1"], () =>
      getData({ tvOrMovie: "movie", category: "now_playing" })
    );
  const { data: now_playing2, isLoading: now_playing_loading2 } =
    useQuery<IMovieResult>(["movies", "now_playing", "2"], () =>
      getData({ tvOrMovie: "movie", category: "now_playing", pageNum: 2 })
    );
  const { data: now_playing3, isLoading: now_playing_loading3 } =
    useQuery<IMovieResult>(["movies", "now_playing", "3"], () =>
      getData({ tvOrMovie: "movie", category: "now_playing", pageNum: 3 })
    );
  // const { data: upcoming, isLoading: upcoming_loading } =
  //   useQuery<IMovieResult>(["movies", "upcoming"], () =>
  //     getData({ tvOrMovie: "movie", category: "upcoming" })
  //   );
  const isLoading =
    now_playing_loading || now_playing_loading2 || now_playing_loading3;
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              (now_playing && now_playing?.results[0].backdrop_path) || ""
            )}
          >
            <Title>{now_playing && now_playing?.results[0].title}</Title>
            <Overview>
              {now_playing && now_playing?.results[0].overview}
            </Overview>
          </Banner>
          {now_playing && <SliderMovies {...now_playing} location={0} />}
          {now_playing2 && <SliderMovies {...now_playing2} location={1} />}
          {now_playing3 && <SliderMovies {...now_playing3} location={2} />}
          {/* {upcoming && <SliderMovies {...upcoming} location={1} />} */}
        </>
      )}
    </Wrapper>
  );
};

export default Home;
