import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';

import style from './index.module.scss';

/**
* 圖片展示組件
* 可以展示最多4張圖片
* 1 張圖片直接填充滿
* 2 張圖片左右各一張
* 3 張圖片左一右二
* 4 張圖片左二右二
*/
const ImageCard = ({
  imgs = [],
}) => {
  const getWrapper = () => {
    switch (imgs.length) {
      case 1:
        return style.wrapper1;
      case 2:
        return style.wrapper2;
      case 3:
        return style.wrapper3;
      case 4:
        return style.wrapper4;
      default:
        return style.wrapper;
    }
  };

  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {/* 數組的話要有key, 由於不同張數的照片擺設不一樣,透過index來達成目的.className不照以往style寫法是因為他會跑出hash值,因此要用以下方法 */}
        {/* 單就以下呈現方法img${index},以全局下搜尋可能有重複的className而被其樣式影響,因此外面以className={style.wrpper}包裹 */}
        {/* 因為想同時針對所有圖片做同樣功效,因此在className前還是增加style.img */}
        {imgs.map((img, index) => (<Image fit="cover" className={classNames(style.img, `img${index}`)} key={classNames(img, index)} src={img} alt="" />))}
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  imgs: PropTypes.arrayOf(PropTypes.string),
};

export default ImageCard;
