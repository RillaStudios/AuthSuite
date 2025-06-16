import React from "react";
import classes from "../../css/LoaderCube.module.css";

const LoaderCube = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={`${classes.spinner} ${className ?? ""}`}
    style={style}
    {...props}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
));

export default LoaderCube;
