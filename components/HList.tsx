import React from "react";
import styled from "styled-components/native";
import { View, Text, ScrollView, FlatList } from "react-native";
import VMedia from "./VMedia";

export const HListSperator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

interface HListProps {
  title: string;
  data: dataProps[];
}

interface dataProps {
  id: number;
  poster_path: string;
  original_title?: string;
  original_name?: string;
  vote_average?: number;
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={HListSperator}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <VMedia
              poster_path={item.poster_path}
              original_title={item.original_title ?? item.original_name}
              vote_average={item.vote_average}
              fullData={item}
            />
          );
        }}
      />
    </ListContainer>
  );
};

export default HList;
