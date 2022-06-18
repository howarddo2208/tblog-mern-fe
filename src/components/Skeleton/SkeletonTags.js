import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";
import { renderRepeatedSkeletons } from "../../utils";

export const SkeletonTags = () => {
  return (
    <>
      { renderRepeatedSkeletons(
        <div className="skeleton__tag-item">
          { renderRepeatedSkeletons(<SkeletonElement type="text" />, 4) }
        </div>,
        10
      ) }
      <Shimmer />
    </>
  );
};

export default SkeletonTags;
