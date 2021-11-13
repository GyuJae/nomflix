import { motion, Variants } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { getSearchData, IMovieResult } from "../api";
import Loading from "../components/Loading";
import { makeImagePath } from "../utills";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  background-color: black;
`;

const Wraper = styled.div`
  padding-bottom: 80px;
  display: grid;
  padding-top: 50px;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  width: 100%;
`;

const Poster = styled(motion.div)<{ posterUrl: string }>`
  margin: auto;
  background-color: white;
  width: 300px;
  height: 400px;
  background-image: url(${(props) => props.posterUrl});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  border-radius: 6px;
`;

const ShowMore = styled(motion.div)`
  width: 150px;
  height: 50px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 0px 5px;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IMovieResult>(["movie", "search"], () =>
    getSearchData({ tvOrMovie: "movie", query: query || "" })
  );

  return (
    <Container>
      <Wraper>
        {isLoading ? (
          <Loading />
        ) : (
          data &&
          data.results
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                key={movie.id}
              >
                <Poster
                  posterUrl={makeImagePath(movie.poster_path)}
                  variants={cardVariants}
                />
              </motion.div>
            ))
        )}
      </Wraper>
      {data && data.total_pages > data.page ? (
        <ShowMore
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          whileHover={{
            scale: 1.2,
          }}
          key={0}
        >
          Show More
        </ShowMore>
      ) : null}
    </Container>
  );
};

export default Search;
