import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';

import msgSvg from '@assets/comment.svg';
import likeSvg from '@assets/like.svg';
import cycleSvg from '@assets/forward.svg';
import upSvg from '@assets/share.svg';
import style from './index.module.scss';

const getBars = ({
  commentsCount,
  likesCount,
}) => [
  {
    key: 'msg',
    icon: (
      <div>
        <img className={style.icon} src={msgSvg} alt="" />
        {commentsCount > 0 && <span className={style.count}>{commentsCount}</span>}
      </div>),
  },
  {
    key: 'cycle',
    icon: <img className={style.icon} src={cycleSvg} alt="" />,
  },
  {
    key: 'like',
    icon: (
      <div>
        <img className={style.icon} src={likeSvg} alt="" />
        {likesCount > 0 && <span className={style.count}>{likesCount}</span>}
      </div>),
  },
  {
    key: 'up',
    icon: <img className={style.icon} src={upSvg} alt="" />,
  },
];

/**
* 評論 轉發 喜歡 分享的bar
*/
const Bar = ({
  isBottom = false,
  commentsCount,
  likesCount,
}) => {
  const [activeKey, setActiveKey] = useState();

  const onChangeTabItem = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={classNames({
      [style.container]: true,
      [style.containerBottom]: isBottom,
    })}
    >
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBars({ commentsCount, likesCount }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  isBottom: PropTypes.bool,
};

export default Bar;
