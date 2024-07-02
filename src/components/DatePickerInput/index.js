/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';
import PropTypes from 'prop-types';
import datepickerIcon from '../../assets/datepicker-icon.svg';
import style from './index.module.scss';

/**
 * 出生日期選擇器
 */
const DatePickerInput = ({
  value = '',
  onChange = () => {},
}) => {
  const [visible, setVisible] = useState(false);

  const onClickDatePicker = () => {
    setVisible(true);
  };

  return (
    <>
      <DatePicker
        title="时间选择"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(val) => {
          onChange(moment(val).format('YYYYMMDD'));
        }}
      />
      <div className={style.birthdayInput} onClick={onClickDatePicker}>
        <div className={style.birthdayTitleItem}>Date of birth</div>
        <div>
          {/* 如果用div會導致換行,所以要用span */}
          <span className={style.birthdayPlaceholder}>{value ? moment(value).format('YYYY/MM/DD') : 'YYYY/MM/DD'}</span>
          <img src={datepickerIcon} alt="datepickerIcon" className={style.datepickerIcon} />
        </div>
      </div>
    </>
  );
};

DatePickerInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

// DatePickerInput.defaultProps = {
//   value: '',
//   onChange: () => {},
// };
export default DatePickerInput;
