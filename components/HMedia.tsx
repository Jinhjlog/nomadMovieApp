import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";

interface HMediaProps {
  poster_path: string;
  original_title: string;
  release_date?: string;
  vote_average?: number;
  overview: string;
  fullData: Movie;
}

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  width: 75%;
  margin-left: 15px;
`;

const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.8;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  release_date,
  vote_average,
  overview,
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
      <HMovie>
        <Poster path={poster_path} />
        <HColumn>
          <Title>{original_title.slice(0, 13)}</Title>
          {release_date ? (
            <Release>
              {new Date(release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {vote_average ? <Votes vote_average={vote_average}></Votes> : null}
          <OverView>
            {overview !== "" && overview.length > 80
              ? overview.slice(0, 110) + "..."
              : overview}
          </OverView>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
