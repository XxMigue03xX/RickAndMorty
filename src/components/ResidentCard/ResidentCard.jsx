import PropTypes from "prop-types";
import { getCharacterByUrl } from "../../services/getCharacterByUrl";
import { useEffect, useState } from "react";
import "./ResidentCard.css"

export const ResidentCard = ({ url }) => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const loadResident = async () => {
      const residentData = await getCharacterByUrl(url);
      setResident(residentData);
    };
    loadResident();
  }, [url]);
  return (
    <>
      {!resident ? (
        <p>Loading Character</p>
      ) : (
        <article className="resident_card">
          <div className="resident_card__img">
            <img src={resident.image} alt={resident.name} />
          </div>
          <div className="resident_card__content">
          <h3>{resident.name}</h3>
          <ul style={{listStyle: "none"}}>
            <li>
              <b>Especie: </b>
              {resident.species}
            </li>
            <li>
              <b>Origin: </b>
              {resident.origin.name}
            </li>
            <li>
              <b>Status: </b>
              {resident.status}
            </li>
            <li>
              <b>Appearances: </b>
              {resident.episode.length}
            </li>
          </ul>
          </div>
        </article>
      )}
    </>
  );
};
ResidentCard.propTypes = {
  url: PropTypes.string.isRequired,
};
