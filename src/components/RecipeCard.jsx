import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function RecipeCard({ id, type, title, photo }) {
  const history = useHistory();

  return (
    <Card
      onClick={ () => { history.push(`/${type}/${id}`); } }
      style={ { height: '100px' } }
    >
      <img
        src={ photo }
        alt={ title }
        style={ { width: '100px' } }
      />
      {title}
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default RecipeCard;
