// import { camelCase } from "change-case";
"use client";

import { camelCase } from "lodash";
import dynamic from "next/dynamic";
import { ossIcon } from "./constants/parent";
import { useMemo } from "react";

const images = Object.fromEntries(
  ossIcon.map((url) => [
    url,
    dynamic(() => import(`../icons/constants/images/${url}`), {
      loading: ({ isLoading }) => <div style={{ width: 24, height: 24 }}></div>,
    }),
  ])
);

export const OSSIcons = ({
  name,
  style,
  className,
  fill = "white",
  onClick = () => {},
  styleDiv,
  isStopBubbling = false,
  ref,
  alignItems = "items-center",
}) => {
  const url = ossIcon.find((key) => camelCase(key) === camelCase(name));

  const Icon = useMemo(() => images[url], [url]);

  const handleClick = (event) => {
    isStopBubbling && event.stopPropagation();
    onClick(event);
  };

  if (!url) return null;

  return (
    <div
      className={`flex justify-center ${alignItems} ${className}`}
      onClick={handleClick}
      style={{ ...styleDiv }}
      ref={ref}
    >
      <Icon fill={fill} style={style} />
    </div>
  );
};
