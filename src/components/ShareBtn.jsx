import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const copy = require('clipboard-copy');

export default function ShareBtn() {
  const shareUrl = window.location.href;
  const [showAlert, setShowAlert] = useState(false);

  const handleShare = () => {
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
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Share
      </button>
    </div>
  );
}
