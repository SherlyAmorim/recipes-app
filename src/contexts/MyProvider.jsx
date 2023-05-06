import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_STATE1 = { nome: 'Xablau1', idade: 101 };
const INITIAL_STATE2 = { nome: 'Xablau2', idade: 102 };

function Provider({ children }) {
  const [state1, setState1] = useState(INITIAL_STATE1);
  const [state2, setState2] = useState(INITIAL_STATE2);
  const [enableSearch, setEnableSearch] = useState(false);

  const toggleEnableSearch = useCallback(() => {
    setEnableSearch(!enableSearch);
  }, [enableSearch, setEnableSearch]);

  const values = useMemo(() => ({
    state1,
    state2,
    enableSearch,
    setState1,
    setState2,
    toggleEnableSearch,
  }), [
    state1,
    state2,
    enableSearch,
    setState1,
    setState2,
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
