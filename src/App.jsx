import { useEffect, useState } from 'react'
import { getLocationById } from './services/getLocationById.js'
import { getRandomNumber } from './utils/getRandomNumber.js'
import Location from './components/Location/Location.jsx'
import Loader from './components/Loader/Loader.jsx'
import ResidentList from './components/ResidentList/ResidentList.jsx'
import SearchForm from './components/searchForm/searchForm'
import axios from 'axios'
import image1 from "./assets/images/bannerRick&Morty.png"
import './App.css'

// El valor de un input en react no puede ser null ni undefined

// Api paginada
const getLocations = async (page) => {
  const res = await axios.get("https://rickandmortyapi.com/api/location",
    {params: {page}
  });

  return res.data.results.map(x=>({id: x.id, name: x.name}));
}

function App() {
  const [location, setLocation] = useState(null);

  // Funcion que carga la informacion de la ubicacion con el id suministrado
  const loadLocation = async (id) => {
    const locationInfo = await getLocationById(id);
    setLocation(locationInfo);
  };

  const handleSend = async (id) => {
    // Declaramos una variable para guardar la nueva location info
    let locationInfo;
    // Si es un string vacio se le asigna un numero random y se llama al servicio
    if (!id) {
      const randomId = getRandomNumber(1, 126);
      locationInfo = await getLocationById(randomId);
    }
    // Si tiene un valor valido llamamos al servicio mandando el id suministrado
    else {
      locationInfo = await getLocationById(id);
    }
    // Actualizamos la variable de estado
    setLocation(locationInfo);
  };
  
  // Efecto que renderice una location random en la primera renderización
  useEffect(() => {
    const randomId = getRandomNumber(1,126)
    loadLocation(randomId);


    const loadAllLocations = async () => {
      const promiseLocations = []
      for(let i=1; i<=7; i++){
        promiseLocations.push(getLocations(i));
      }
      const locations = await Promise.allSettled(promiseLocations);
      console.log(locations.flat().map((x)=>x.value).flat())
    };
    loadAllLocations();

  }, []);

  return (
    <>
      <header>
        <img src={image1} alt="header_image"/>
      </header>
      {location ? <Location location={location} /> : <Loader />}
      <SearchForm sending={handleSend}/>
      <ResidentList residents={location?.residents} currentLocation={location} />
      {/* <footer>
        <h3>Made with ❤️ in Academlo</h3>
        <h3>Developer: Miguel Garavito</h3>
      </footer> */}
    </>
  );
}

export default App
