import { useEffect, useState } from "react";

export const usePagination = (list, quantityPerPage) => {
  const [pageNumber, setPageNumber] = useState(1);
  
  const lowerLimit = quantityPerPage * (pageNumber-1);
  const upperLimit = quantityPerPage * pageNumber - 1;
  const totalPages = Math.ceil(list.length/quantityPerPage);

  const listSlice = list.slice(lowerLimit,upperLimit+1);

  const changePageTo = (page) => {
    if(page > totalPages)setPageNumber(totalPages);
    else if(page < 1)setPageNumber(1);
    else setPageNumber(page);
  };

  const pages = Array(totalPages)
  .fill()
  .map((_,i)=>(i+1));

  useEffect(()=>{
    setPageNumber(1);
  },[quantityPerPage])

  return [pageNumber,listSlice,pages,changePageTo]
}