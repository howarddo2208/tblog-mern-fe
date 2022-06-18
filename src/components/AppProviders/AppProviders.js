import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { SearchContext } from '../../context/search'
import '../../styles/main.css'

const AppProviders = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default AppProviders

