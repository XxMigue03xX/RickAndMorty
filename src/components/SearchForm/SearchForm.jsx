import { useState } from "react";
import "./SearchForm.css"

const SearchForm = ({ sending }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [errorSearchLocation, setErrorSearchLocation] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Valida que de principio a fin son digitos
    //if(!/^\d$/.test(newValue))
    // Si está vacío no hay error
    if (newValue === "") {
      setErrorSearchLocation("");
    }
    // Si no es un numero hay error
    else if (isNaN(Number(newValue))) {
      setErrorSearchLocation("El id debe ser un número");
    }
    // Si es menor a uno hay error
    else if (Number(newValue) < 1) {
      setErrorSearchLocation("El menor id existente es 1");
    }
    // Si es mayor a 126 hay error
    else if (Number(newValue) > 126) {
      setErrorSearchLocation("El mayor id existente es 126");
    }
    // Si lo anterior es falso no hay error
    else {
      setErrorSearchLocation("");
    }
    // Siempre se actualiza el valor
    setSearchLocation(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Confirmamos que no haya errores y que haya valor de busqueda
    if (errorSearchLocation) return;

    sending(searchLocation);
  }

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchLocation} onChange={handleChange} placeholder="Input a dimension number from 1 to 126"/>
      </form>
      <button type="submit">Search</button>
      <p style={{ color: "red" }} role="alert">
        {errorSearchLocation}
      </p>
    </section>
  );
};

export default SearchForm;
