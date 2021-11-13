import { motion, useViewportScroll } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { getDataDetail, IMovieDetail } from "../api";
import { makeImagePath } from "../utills";
import Loading from "./Loading";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const DetailMovie = () => {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => history.push("/");
  const { data, isLoading } = useQuery<IMovieDetail>(["movie", "detail"], () =>
    getDataDetail({
      tvOrMovie: "movie",
      id: bigMovieMatch?.params.movieId || "",
    })
  );
  return bigMovieMatch ? (
    isLoading ? (
      <Loading />
    ) : (
      <>
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <BigMovie
          style={{ top: scrollY.get() + 10 }}
          layoutId={bigMovieMatch.params.movieId}
        >
          {data && (
            <>
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    data.backdrop_path
                  )})`,
                }}
              />
              <BigTitle>{data.title}</BigTitle>
              <BigOverview>{data.overview}</BigOverview>
            </>
          )}
        </BigMovie>
      </>
    )
  ) : null;
};

export default DetailMovie;
