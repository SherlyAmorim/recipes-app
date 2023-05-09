import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareBtn() {
  const currentUrl = window.location.href;
  const shareUrl = currentUrl.replace(/(\/(?:meals|drinks)\/\d+)\/.*/, '$1');
  const [showAlert, setShowAlert] = useState(false);

  const handleShare = () => {
    console.log(shareUrl);
    copy(shareUrl);
    setShowAlert(true);
  };

  return (
    <div>
      {showAlert
        ? (
          <Alert
            variant="success"
            dismissible
            onClose={ () => setShowAlert(false) }
          >
            Link copied!
          </Alert>)
        : ''}
      <button
        className="btn btn-light"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img
          src={ ShareIcon }
          alt="share"
        />
      </button>
    </div>
  );
}
