import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {} from "react-native";
import styled from "styled-components/native";
import { movieApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isInitialLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(
    /**
     * useQuery의 Key가 자동으로 fetcher에 보내진다.
     */
    ["searchMovies", query],
    movieApi.search,
    {
      enabled: false,
    }
  );
  const {
    isInitialLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(
    /**
     * useQuery의 Key가 자동으로 fetcher에 보내진다.
     */
    ["searchTv", query],
    tvApi.search,
    {
      enabled: false,
    }
  );
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    }

    /**
     * refetch 함수는 query가 다시 동작하게 해줌
     */
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        autoCapitalize="none"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
