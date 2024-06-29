import datepickerIcon from '../../assets/datepicker-icon.svg';

import style from './index.module.css';

export default () => (
  <div className={style.birthdayInput}>
    <div className={style.birthdayTitleItem}>Date of birth</div>
    <div>
      {/* 如果用div會導致換行,所以要用span */}
      <span className={style.birthdayPlaceholder}>YYYY/MM/DD</span>
      <img src={datepickerIcon} alt="datepickerIcon" className={style.datepickerIcon} />
    </div>
  </div>
);
