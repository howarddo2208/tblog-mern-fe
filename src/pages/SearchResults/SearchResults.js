import React, { useContext } from "react";
import Layout from "../../components/Layout";
import PostList from "../../components/PostList/PostList";
import { SearchContext } from "../../context/search";
import useHttpClient from "../../hooks/useHttpClient";

const SearchResults = (props) => {
  const searchContext = useContext(SearchContext);
  const { searchResults, searchValue } = searchContext;
  const { sendReq } = useHttpClient();
  const { isLoading } = sendReq;

  return (
    <Layout>
      <div className="container-posts container-search-results">
        <h2 className="results__heading">Search results for "{searchValue}"</h2>
        <PostList cover={false} items={searchResults} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default SearchResults;
