import React, { useEffect } from "react";
import { LayoutContentWrapper } from "./layoutWrapper.style";
import { useLocation } from "react-router";
import { getPath } from "../../helpers/utility";
export default (props) => {
  const location = useLocation();
  const path = getPath(location.pathname);
  const isIframe = JSON.parse(localStorage.getItem("data_config"))?.isIframe
    ? JSON.parse(localStorage.getItem("data_config")).isIframe
    : false;
  const heightFooter =
    document.querySelectorAll(".ant-layout-footer")[0]?.clientHeight;
  const defaultPaddingTop = path === "dashboard" ? 60 : 110;
  useEffect(() => {
    const checkTopbar = () => {
      const isoComponentTitle = document.querySelector(".isoComponentTitle");
      const heightTitle = isoComponentTitle?.clientHeight;
      const isoLayoutContentWrapper = document.querySelector(
        ".isoLayoutContentWrapper"
      );
      if (heightTitle > 60) {
        isoLayoutContentWrapper.style.paddingTop = `160px`;
      } else {
        isoLayoutContentWrapper.style.paddingTop = `${defaultPaddingTop}px`;
      }
    };
    window.addEventListener("resize", () => {
      checkTopbar();
    });
    checkTopbar();

    return () => {
      window.removeEventListener("resize", checkTopbar);
    };
  }, []);

  return (
    <LayoutContentWrapper
      style={{
        height: isIframe ? "100%" : heightFooter ? `100%` : "auto",
        paddingTop: defaultPaddingTop,
        paddingBottom: 40,
      }}
      isIframe={isIframe}
      className={
        props.className != null
          ? `${props.className} isoLayoutContentWrapper`
          : "isoLayoutContentWrapper"
      }
      {...props}
    >
      {props.children}
    </LayoutContentWrapper>
  );
};
