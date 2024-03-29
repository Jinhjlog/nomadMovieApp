import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  poster_path: string;
  original_title?: string;
  vote_average?: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  original_title,
  vote_average,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={poster_path} />
        <Title>
          {original_title.slice(0, 8)}
          {original_title.length > 13 ? "..." : ""}
        </Title>
        <Votes vote_average={vote_average}></Votes>
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
