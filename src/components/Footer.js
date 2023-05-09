import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const onDrinkClick = useCallback(() => {
    history.push('/drinks');
  }, [history]);

  const onMealClick = useCallback(() => {
    history.push('/meals');
  }, [history]);

  return (
    <div data-testid="footer" className="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ onDrinkClick }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ onMealClick }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal icon" />
      </button>
    </div>
  );
}

export default Footer;
