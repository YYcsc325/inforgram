import FormInput from './FormInput/index';
import FormSelect from './FormSelect/index';
import FormSwitch from './FormSwitch/index';
import FormDatePicker from './FormDatePicker/index';
import FormInputNumber from './FormInputNumber/index';
import FromRadio from './FormRadio/index';
import FormHideMode from './FormHideMore/index';
import FormCheckbox from './FormCheckbox/index';
import FormTree from './FormTree/index';

const mapUi = {
  Radio: FromRadio,
  Input: FormInput,
  Select: FormSelect,
  Switch: FormSwitch,
  DatePicker: FormDatePicker,
  InputNumber: FormInputNumber,
  HideMore: FormHideMode,
  Checkbox: FormCheckbox,
  Tree: FormTree,
}

export default mapUi;
