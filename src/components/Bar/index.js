/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { ActionSheet, TabBar, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { cancelLike, likes } from '@services/comment';
import style from './index.module.scss';
import {
  ACTION_KEYS, ACTIONS, BAR_KEYS, getBars,
  OBJECT_KEYS,
} from './constants';

/**
* 評論 轉發 喜歡 分享的bar
*/
const Bar = ({
  isBottom = false,
  commentsCount = 0,
  likesCount = 0,
  id = -1,
  onlyStar = false,
  type = '',
}) => {
  const [activeKey, setActiveKey] = useState(null); // 原本是useState()但commentCard的like沒被觸發,所以我加null
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const onChangeTabItem = (key) => {
    setActiveKey(key);
    if (key === BAR_KEYS.CYCLE) {
      Toast.show('轉發成功'); // 這個功能沒有細做
    }
    if (key === BAR_KEYS.UP) {
      setVisible(true);
    }
    if (key === BAR_KEYS.LIKE) {
      setLiked(!liked);
      if (liked) {
        cancelLike({
          content_type: type,
          object_id: id,
        }).then((res) => {
          if (res.success) {
            Toast.show('取消點讚成功');
            setLiked(false);
            return;
          }
          Toast.show('取消點讚失敗');
        });
      } else {
        likes({
          content_type: type,
          object_id: id,
        }).then((res) => {
          if (res.success) {
            Toast.show('點讚成功');
            setLiked(true);
            return;
          }
          Toast.show('點讚失敗');
        });
      }
    }
    setActiveKey(null); // 我自己加的,若沒有加這個 將無法連續點擊相同icon
  };

  const nav = useNavigate(); // 因為是hooks要寫在組件內而非直接寫在getBars

  const onAction = (e) => {
    if (e.key === ACTION_KEYS.COPY) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/tweet/${id}`);
        Toast.show('複製成功');
      }
    }
    setVisible(false);
  };

  return (
    <div className={classNames({
      [style.container]: !isBottom,
      [style.containerBottom]: isBottom,
    })}
    >
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBars({
          commentsCount, likesCount, nav, id, onlyStar, liked,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
      <ActionSheet
        visible={visible}
        actions={ACTIONS}
        onClose={() => setVisible(false)}
        onAction={onAction}
      />
    </div>
  );
};

Bar.propTypes = {
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
  isBottom: PropTypes.bool,
  id: PropTypes.number,
  onlyStar: PropTypes.bool,
  type: PropTypes.oneOf([OBJECT_KEYS.COMMENT, OBJECT_KEYS.TWEET]),
};

export default Bar;
