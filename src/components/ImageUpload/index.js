import PropTypes from 'prop-types';
import IconButton from '@components/IconButton';
import createTweetSvg from '@assets/createTweetIcon.svg';
import { fileByBase64 } from '@utils/index';
import style from './index.module.scss';

/**
* 圖片上傳組件
*/
const ImageUpload = ({
  onChange,
}) => {
  const onChangeUpFile = (e) => {
    const { files } = e.target;
    // console.log('files', files);
    const fls = Object.values(files);
    // console.log('fls', fls);
    const flss = fls.map((f) => new Promise((r) => {
      fileByBase64(f).then((res) => {
        // console.log('res', res);
        r({
          key: f.name,
          content: res,
        });
      });
    }));
    // console.log('flss', flss);
    Promise.all(flss).then((res) => {
      const result = {};
      res.forEach((item) => {
        result[item.key] = item.content;
      });
      onChange(result); // 把onChange設成從外部引入 這樣拿到result就能泡出去了
    });
    e.target.value = ''; // 這樣就算刪掉一張圖片再重新上傳也行
  };

  return (
    <div className={style.container}>
      <input
        type="file"
        encType="multipart/form-data"
        accept="image/gif.image/jpg"
        className={style.upFile}
        multiple="multiple"
        onChange={onChangeUpFile}
      />
      <IconButton
        src={createTweetSvg}
        className={style.imageButton}
        svgClass={style.imageUpload}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageUpload;
