import PropTypes from "prop-types";
import "./Location.css"

const Location = ({ location }) => {
  return (
    <section className="location">
      <h2>Name: {location.name}</h2>
      <ul>
        <li>
          <b>Type: </b>
          {location.type}
        </li>
        <li>
          <b>Dimension: </b>
          {location.dimension}
        </li>
        <li>
          <b>Pupulation: </b>
          {location.residents.length}
        </li>
      </ul>
    </section>
  );
};

Location.propTypes = {
    location: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        dimension: PropTypes.string,
        residents: PropTypes.array})
    
}
export default Location