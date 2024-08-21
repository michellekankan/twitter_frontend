import { useState } from 'react';
import Header from '@components/Header';
import TButton from '@components/TButton';
import ImagePreview from '@components/ImagePreview';
import ImageUpload from '@components/ImageUpload';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { createTweet } from '@services/tweets';
import { TextArea, Toast } from 'antd-mobile';
import style from './index.module.scss';

/**
* 發推
*/
const CreateTweet = () => {
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState([]);
  const [store] = useAppContext();
  const go = useGoTo();

  const onClickCreate = () => {
    createTweet({
      content,
      files: Object.values(imgs),
    }).then((res) => {
      if (res.success) {
        Toast.show('發布成功');
        go();
        return;
      }
      Toast.show('發布失敗');
    });
  };

  const onChangeContent = (v) => {
    setContent(v);
  };

  // 這是在實現關掉選取圖片視窗後再開開點選新的圖片 舊的不會被覆蓋掉
  const onChangeFile = (v) => {
    if (v && Object.keys(v).length < 5) {
      setImgs((oldV) => ({
        ...oldV,
        ...v,
      }));
      return;
    }
    Toast.show('只能上傳4張圖片');
  };

  const handleDelImg = (index) => {
    const key = Object.keys(imgs).find((item, idx) => idx === index);
    setImgs((item) => {
      const newItem = { ...item };
      delete newItem[key];
      return newItem;
    });
  };

  return (
    <div className={style.container}>
      <Header>
        <TButton
          disabled={content.length === 0 && Object.keys(imgs).length === 0}
          onClick={onClickCreate}
        >
          發推
        </TButton>
      </Header>
      <div className={style.content}>
        <div className={style.left}>
          <img className={style.avatar} src={store.user?.avatar_url} alt="avatar" />
        </div>
        <div className={style.right}>
          <TextArea rows={5} value={content} onChange={onChangeContent} className={style.text} placeholder="有什麼新鮮事?" />
          <ImagePreview imgs={Object.values(imgs)} handleDelImg={handleDelImg} />
          <div className={style.button}>
            <ImageUpload onChange={onChangeFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
