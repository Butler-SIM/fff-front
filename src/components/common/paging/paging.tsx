import React, { useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { useColorModeValue } from "@chakra-ui/react";
import "./paging.css";

interface PagingProps {
  activePage?: number;
  totalItemsCount: number;
  onChange: (pageNumber: number) => void;
  activePageBg?: string;
  currentPageBg?: string;
}

const Paging = ({ activePage = 1, totalItemsCount, onChange }: PagingProps) => {
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={15}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={10}
      prevPageText={"<"}
      nextPagText={">"}
      onChange={(pageNumber: number) => onChange(pageNumber)}
    />
  );
};

export default Paging;
