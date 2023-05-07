import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [enableSearch, setEnableSearch] = useState(false);

  const toggleEnableSearch = useCallback(() => {
    setEnableSearch(!enableSearch);
  }, [enableSearch, setEnableSearch]);

  const values = useMemo(() => ({
    enableSearch,
    toggleEnableSearch,
  }), [
    enableSearch,
    toggleEnableSearch,
  ]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
