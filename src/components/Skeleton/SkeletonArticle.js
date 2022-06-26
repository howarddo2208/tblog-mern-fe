import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'
import { renderRepeatedSkeletons } from '../../utils'
import './SkeletonElement.css'

const SkeletonArticle = ({ type, firstEl }) => {
  const miniArticle = type === 'mini' || !firstEl
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-article">
        {miniArticle ? (
          <SkeletonElement type="title" />
        ) : (
          <SkeletonElement type="thumbnail" />
        )}
        {[1, 2, 3].map((n, index) => (
          <SkeletonElement key={`skeleEle${index}`} type="body" />
        ))}
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonArticle

