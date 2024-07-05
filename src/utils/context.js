import {
  createContext, useContext, useState, useMemo,
} from 'react';
import PrpTypes from 'prop-types';

/**
 * 默認 store
 */
const defaultStore = {
  closeHeaderHandler: null,
};

/**
 * 第一步: 創建context對象
 */
const AppContext = createContext();

/**
 * 第二步: 包裹組件
 */
export const CxtProvider = ({
  children,
}) => {
  const [store, setStore] = useState(defaultStore);

  const value = useMemo(() => ({
    store, setStore,
  }), [store]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

CxtProvider.propTypes = {
  children: PrpTypes.node.isRequired,
};

/**
 * 第三步: 調用useContext使用數據
 */
export const useAppContext = () => {
  const cxt = useContext(AppContext);
  return [cxt.store, cxt.setStore];
};

// 解釋useContext
const AContext = createContext();

const Aa = ({
  // eslint-disable-next-line react/prop-types
  cc,
}) => (
  <div>
    {cc}
    <B cc={cc} />
  </div>
);

const A = ({
  // eslint-disable-next-line react/prop-types
  cc,
}) => (
  <div>
    {cc}
    <B cc={cc} />
  </div>
);
const B = () => {
  const store = useContext(AContext);
  return <div onClick={() => store.setCc('dddd')}>{store.cc}</div>;
};
// eslint-disable-next-line no-unused-vars
const C = () => {
  // eslint-disable-next-line no-unused-vars
  const [cc, setCc] = useState();
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AContext.Provider value={{ cc, setCc }}>
      <div>
        <Aa />
        <A cc={cc} />
      </div>
    </AContext.Provider>
  );
};
