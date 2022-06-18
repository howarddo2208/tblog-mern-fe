import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSearch } from '../../stateManagements'

const SearchBar = (props) => {
  const { search, searchValue } = useSearch()
  const [value, setValue] = useState('')
  const history = useHistory()
  //handle input change for search bar
  const onInputChange = (evt) => {
    setValue(evt.target.value)
  }

  //handle 'enter' press event
  const onEnterKey = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault()
      search(value, history)
    }
  }

  return (
    <input
      className={
        props.showSearchOnMobile ? 'search-bar--mobile ' : 'search-bar '
      }
      key="random1"
      value={value}
      placeholder={'Search...'}
      onChange={onInputChange}
      onKeyDown={onEnterKey}
    />
  )
}

export default SearchBar

