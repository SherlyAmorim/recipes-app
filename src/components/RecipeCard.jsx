import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function RecipeCard({ id, type, title, photo, index }) {
  const history = useHistory();

  return (
    <Card
      onClick={ () => { history.push(`/${type}/${id}`); } }
      style={ { height: '100px' } }
      data-testid={ `${index}-recipe-card` }
      className="d-flex flex-row gap-3 align-items-center"
    >
      <Card.Img
        src={ photo }
        alt={ title }
        style={ { width: '100px' } }
        data-testid={ `${index}-card-img` }
      />
      <Card.Title data-testid={ `${index}-card-name` }>
        {title}
      </Card.Title>
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
