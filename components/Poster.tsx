import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
/**
 * 영화 포스터 이미지 채워넣기
 */
const Image = styled.Image`
  width: 80px;
  height: 140px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
