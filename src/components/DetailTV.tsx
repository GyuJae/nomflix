import { motion, useViewportScroll } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { getDataDetail, ITVDetail } from "../api";
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
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  padding-bottom: 10px;
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

const DetailTV = () => {
  const history = useHistory();
  const bigTVMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => history.push("/tv");
  const { data, isLoading } = useQuery<ITVDetail>(["tv", "detail"], () =>
    getDataDetail({
      tvOrMovie: "tv",
      id: bigTVMatch?.params.tvId || "",
    })
  );
  return bigTVMatch ? (
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
          layoutId={bigTVMatch.params.tvId}
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
              <BigTitle>{data.name}</BigTitle>
              <BigOverview>{data.overview}</BigOverview>
            </>
          )}
        </BigMovie>
      </>
    )
  ) : null;
};

export default React.memo(DetailTV);
