import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { ITVResult } from "../api";
import { makeImagePath } from "../utills";
import DetailTV from "./DetailTV";

const Slider = styled.div<{ location: number }>`
  position: relative;
  top: ${(props) => `${props.location * 200 + -100}px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 95%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 130px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  border-radius: 6px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const RightIncreaseBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  width: 40px;
  margin-left: 20px;
  right: 0px;
  border-radius: 8px;
  &:hover {
    background-color: rgba(250, 250, 250, 0.2);
    cursor: pointer;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  h4 {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
  }
`;

const rowVariants = {
  initial: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.8,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface SliderTVsProps extends ITVResult {
  location: number;
}

const SliderTV: React.FC<SliderTVsProps> = ({ results, location }) => {
  const history = useHistory();
  const bigTVMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const offset = 6;
  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState<boolean>(false);
  const incraseIndex = () => {
    if (results.length !== 0) {
      if (leaving) return;
      toggleLeaving();
      const totalTVs = results.length - 1;
      const maxIndex = Math.floor(totalTVs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };

  return (
    <>
      <Slider location={location}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .filter((movie) => movie.backdrop_path !== null)
              .map((tv) => (
                <Box
                  layoutId={tv.id + ""}
                  key={tv.id}
                  bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(tv.id)}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>

        <RightIncreaseBtn onClick={incraseIndex}>▶</RightIncreaseBtn>
      </Slider>
      <AnimatePresence>{bigTVMatch ? <DetailTV /> : null}</AnimatePresence>
    </>
  );
};

export default SliderTV;
