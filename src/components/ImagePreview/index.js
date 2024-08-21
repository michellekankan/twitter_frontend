import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';

import style from './index.module.scss';

/**
* 圖片預覽組件
* 可以展示最多4張圖片
* 1 張圖片直接填充滿
* 2 張圖片左右各一張
* 3 張圖片左一右二
* 4 張圖片左二右二
*/
const ImagePreview = ({
  imgs = [],
  handleDelImg,
}) => {
  if (!imgs || imgs.length === 0) return null;
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
        {imgs.map((img, index) => (
          <div key={classNames(img, index)} className={classNames(style.img, `img${index}`)}>
            <CloseOutline className={style.close} onClick={() => handleDelImg(index)} />
            <Image fit="cover" className={style.itemImg} src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  // eslint-disable-next-line react/require-default-props
  imgs: PropTypes.arrayOf(PropTypes.string),
  handleDelImg: PropTypes.func.isRequired,
};

export default ImagePreview;
