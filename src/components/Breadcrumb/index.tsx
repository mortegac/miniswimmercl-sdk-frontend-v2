import React, { useState, useId } from "react";
// import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Base/Breadcrumb";

import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { selectBreadcrumb } from '../../stores/breadcrumb';





interface Props {
  first?:string;
  firstURL?:string;
  second?:string;
  secondURL?:string;
  third?:string;
  thirdURL?:string;
  
}

function BreadcrumbApp(){
 
  const {start, startURL, first, firstURL, second, secondURL, third, thirdURL } = useAppSelector(selectBreadcrumb);

  
  return (
    <>
      <Breadcrumb light className="flex-1 hidden xl:block">
        <Breadcrumb.Link to={startURL}>{start}</Breadcrumb.Link>
        { first === "" ? <></>:<Breadcrumb.Link to={firstURL}>{first}</Breadcrumb.Link>}
        { second === "" ? <></>:<Breadcrumb.Link to={secondURL}>{second}</Breadcrumb.Link>}
        { third === "" ? <></>:<Breadcrumb.Link to={thirdURL}>{third}</Breadcrumb.Link>}
        {/* 
         */}
        {/* <Breadcrumb.Link to="/">Inicio</Breadcrumb.Link>
        <Breadcrumb.Link to="/" active={true}>
          asas
        </Breadcrumb.Link> */}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbApp;
