import PropTypes from 'prop-types'
import { ResidentCard } from '../ResidentCard/ResidentCard.jsx';
import { useEffect, useState } from 'react';
import { usePagination } from '../../hooks/usePagination.js';
import "./ResidentList.css"

  // Paginación
  // Es dividir en grupos mas pequeños una lista de elementos
  // Minimamente se necesitan 2 datos, la lista y la cantidad de elementos de cada grupo

  // Lógica
  // limiteInferior = quantity * (numberPage - 1)
  // limiteSuperior = quantity * numberPage -1

  // Logica + Estado === Hook

const ResidentList = ({ residents = [], currentLocation }) => {
  const [quantityPagination, setQuantityPagination] = useState(5);
  const [numberPage, residentsSlice, pages, changePageTo] = usePagination(residents, quantityPagination)

  // Forma 1
  // const getPageButtons = () => {
  //   const buttons = [];
  //   for(let i=1; i<=totalPages; i++){
  //     const button = <button onClick={()=>changePageTo(i)}>{i}</button>
  //     buttons.push(button);
  //   }
  //   return buttons;
  // }

  useEffect(()=>{
    changePageTo(1);
  },[currentLocation])

  return (
    <section className='residents'>
      <div className='page_buttons'>
        <button onClick={() => changePageTo(numberPage - 1)}>Back</button>
        {/* Forma 1 {getPageButtons()} */}
        {pages.map((i) => (
          <button
            key={i + 1}
            onClick={() => changePageTo(i)}
            style={{ color: numberPage === i ? "red" : undefined }}
          >
            {i}
          </button>
        ))}
        <button onClick={() => changePageTo(numberPage + 1)}>Next</button>
      </div>
      <select
        className='select_pagination'
        name="quantity_per_page"
        value={quantityPagination}
        onChange={(e) => setQuantityPagination(Number(e.target.value))}
      >
        <option>5</option>
        <option>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <div className='no_residents'>
        {!residentsSlice.length && <p>There is no residents in this location</p>}
      </div>
      <div>
        {Boolean(residentsSlice.length) && (
          <ul style={{listStyle: 'none'}} className='residents_container'>
            {residentsSlice.map((residentUrl) => (
              <li key={residentUrl}>
                <ResidentCard url={residentUrl} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
ResidentList.propTypes = {
    residents: PropTypes.array,
    currentLocation: PropTypes.object
};

export default ResidentList