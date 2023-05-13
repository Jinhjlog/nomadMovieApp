import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";
import { BlurView } from "@react-native-community/blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../api";

/**
 * 배경 이미지 컴포넌트
 */
const BgImg = styled.Image`
  flex: 1;
`;

/**
 * 텍스트 Title 컴포넌트
 */
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: DefaultTheme) =>
    props.isDark ? "white" : props.theme.textColor};
`;

/**
 * Poster와 Title을 수평 정렬하기 위한 Wrapper
 */
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text<{ isDark: boolean }>`
  margin-top: 1px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.8);"};
`;

const Votes = styled(OverView)<{ isDark: boolean }>`
  margin-top: 5px;
  font-size: 12px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
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
  // const isDark = useColorScheme() === "dark";
  const isDark = true;
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg source={{ uri: makeImgPath(backdrop_path) }} />
        <BlurView
          blurAmount={1}
          blurType={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark={isDark}>{original_title}</Title>
              {vote_average > 0 ? (
                <Votes isDark={isDark}>★{vote_average}/10</Votes>
              ) : null}
              <OverView isDark={isDark}>{overview.slice(0, 50)} ...</OverView>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
