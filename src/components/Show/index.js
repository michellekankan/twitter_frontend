import PropTypes from 'prop-types';

/**
 * 用於顯示或隱藏其他的組件
 * - css 來控制的顯示與否 組件緩存
 * - 卸載組件的方式 不需要緩存
 */
const Show = ({
  visible,
  isMount,
  children,
}) => (
  <div style={{ display: visible ? 'block' : 'none' }}>
    {(!isMount || visible) && children}
  </div>
);

Show.propTypes = {
  visible: PropTypes.bool.isRequired,
  isMount: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Show;
