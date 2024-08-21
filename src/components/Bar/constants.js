import { LinkOutline } from 'antd-mobile-icons';
import msgSvg from '@assets/comment.svg';
import likeSvg from '@assets/like.svg';
import cycleSvg from '@assets/forward.svg';
import upSvg from '@assets/share.svg';
import likeRedSvg from '@assets/likeRed.svg';

import style from './index.module.scss';

/**
 * 定義bar key的常量
 */
export const BAR_KEYS = {
  MSG: 'msg',
  CYCLE: 'cycle',
  LIKE: 'like',
  UP: 'up',
};

/**
 * 獲取bar的配置
 */
export const getBars = ({
  commentsCount,
  likesCount,
  nav,
  id,
  onlyStar,
  liked,
}) => {
  if (onlyStar) {
    return [
      {
        key: BAR_KEYS.LIKE,
        icon: (
          <div>
            {liked ? <img className={style.icon} src={likeRedSvg} alt="" /> : <img className={style.icon} src={likeSvg} alt="" />}
            {likesCount > 0 && <span className={style.count}>{likesCount}</span>}
          </div>
        ),
      },
    ];
  }
  return [
    {
      key: BAR_KEYS.MSG,
      icon: (
        <div onClick={() => nav(`/comment/${id}`)}>
          <img className={style.icon} src={msgSvg} alt="" />
          {commentsCount > 0 && <span className={style.count}>{commentsCount}</span>}
        </div>),
    },
    {
      key: BAR_KEYS.CYCLE,
      icon: <img className={style.icon} src={cycleSvg} alt="" />,
    },
    {
      key: BAR_KEYS.LIKE,
      icon: (
        <div>
          {liked ? <img className={style.icon} src={likeRedSvg} alt="" /> : <img className={style.icon} src={likeSvg} alt="" />}
          {likesCount > 0 && <span className={style.count}>{likesCount}</span>}
        </div>),
    },
    {
      key: BAR_KEYS.UP,
      icon: <img className={style.icon} src={upSvg} alt="" />,
    },
  ];
};

/**
 * 定義操作按鈕的常量
 */
export const ACTION_KEYS = {
  COPY: 'copy',
  CANCEL: 'cancel',
};

export const ACTIONS = [
  {
    text:
  <div className={style.copyButton}>
    <LinkOutline style={{ marginRight: 10 }} />
    複製推文連結
  </div>,
    key: ACTION_KEYS.COPY,
  },
  { text: <div className={style.cancelButton}>取消</div>, key: ACTION_KEYS.CANCEL },
];

// 點贊的對象, tweet: 點贊的是推文, comment: 點贊的是評論
export const OBJECT_KEYS = {
  TWEET: 'tweet',
  COMMENT: 'comment',
};
