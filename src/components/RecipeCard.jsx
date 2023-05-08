import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ id, type, title, photo }) {
  const history = useHistory();

  return (
    <div>
      <button onClick={ () => { history.push(`/${type}/${id}`); } }>
        <img
          src={ photo }
          alt={ title }
          style={ { width: '100px' } }
        />
        {title}
      </button>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default RecipeCard;
