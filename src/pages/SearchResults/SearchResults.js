import React from 'react'
import PostList from '../../components/PostList/PostList'
import useHttpClient from '../../hooks/useHttpClient'
import { useSearch } from '../../state'

const SearchResults = (props) => {
  const { searchResults, searchValue } = useSearch()
  const { sendReq } = useHttpClient()
  const { isLoading } = sendReq

  return (
    <>
      <div className="container-posts container-search-results">
        <h2 className="results__heading">Search results for "{searchValue}"</h2>
        <PostList cover={false} items={searchResults} isLoading={isLoading} />
      </div>
    </>
  )
}

export default SearchResults

