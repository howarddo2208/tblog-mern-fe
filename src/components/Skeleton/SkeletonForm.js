import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";
import { renderAlternateSkeletons } from "../../utils";
import "./SkeletonElement.css";

const SkeletonForm = ({ type }) => {
  return (
    <>
      {renderAlternateSkeletons(
        <SkeletonElement type="span" />,
        <SkeletonElement type="text" />,
        20
      )}
      <Shimmer />
    </>
  );
};

export default SkeletonForm;
