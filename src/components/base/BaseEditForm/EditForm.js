import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col } from 'antd';
import FormItemDatePicker from '@/components/base/FormItem/FormItemDatePicker';
import FormItemDateRangePicker from '@/components/base/FormItem/FormItemDateRangePicker';
import FormItemTextArea from '@/components/base/FormItem/FormItemTextArea';
import FormItemTextSelect from '@/components/base/FormItem/FormItemTextSelect';
import FormItemSwitch from '@/components/base/FormItem/FormItemSwitch';
import MonitorItemInWarnRules from '@/components/baseFunctional/FormItem/MonitorItemInWarnRules';
import MonitorInStationPosition from '@/components/baseFunctional/FormItem/MonitorInStationPosition';
import WarnRulesTransferInStationPosition from '@/components/baseFunctional/FormItem/WarnRulesTransferInStationPosition';
import StationPositionTreeSelect from '@/components/baseFunctional/FormItem/StationPositionTreeSelect';
import OrgTreeSelect from '@/components/baseFunctional/FormItem/OrgTreeSelect';
import SystemUserSelect from '@/components/baseFunctional/FormItem/SystemUserSelect';
import InputList from '@/components/baseFunctional/FormItem/InputList';
import BatchEquipmentEntryList from '@/components/baseFunctional/FormItem/BatchEquipmentEntryList';
// 映射
const fieldTypeMapping = {
  text: Input,
  textPassword: Input.Password,
  hidden: Input,
  datePicker: FormItemDatePicker,
  dateRangePicker: FormItemDateRangePicker,
  textArea: FormItemTextArea,
  select: FormItemTextSelect,
  switch: FormItemSwitch,
  MonitorItemInWarnRules,
  MonitorInStationPosition,
  WarnRulesTransferInStationPosition,
  StationPositionTreeSelect,
  OrgTreeSelect,
  SystemUserSelect,
  InputList,
  BatchEquipmentEntryList,
};

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 8,
  },
};

export const EditFormItem = ({
  item,
  getFieldDecorator,
  specificFieldTypeMapping,
  needToValidate = true,
  formLayoutInline,
  type = 'add',
  otherProps = {},
}) => {
  const { fieldAttr = {} } = item;
  const { props: formItemComponentProps = {}, fieldDecoratorConfig = {} } = fieldAttr;
  const theFormItemLayout = fieldAttr.formItemLayout || formItemLayout;

  const mapping = {
    ...fieldTypeMapping,
    ...specificFieldTypeMapping,
  };

  const FormItemComponent = mapping[item.fieldType] || item.fieldType;
  const commonProps = { ...otherProps };
  if (type === 'edit') {
    if (item.otherConfig && item.otherConfig.disable && item.otherConfig.disable.edit) {
      commonProps.disabled = true;
    }
  }
  if (type === 'add') {
    if (item.otherConfig && item.otherConfig.disable && item.otherConfig.disable.add) {
      commonProps.disabled = true;
    }
  }
  const { labelCol, wrapperCol } = theFormItemLayout;
  const itemWrapperCol = {
    span: 24 - labelCol.span,
  };
  const itemLabelCol = {
    span: labelCol.span,
  };
  if (labelCol.lineFeed) {
    itemWrapperCol.span = 24;
  }
  const finalDecoratorConfig = {
    ...fieldDecoratorConfig,
  };
  if (!needToValidate) {
    finalDecoratorConfig.rules = [];
  }
  let displayNone = false;
  if (item.fieldType === 'hidden') {
    displayNone = true;
  }
  const { otherConfig = {} } = item;
  const { display = { add: true, edit: true } } = otherConfig;
  if (type === 'add' && !display.add) {
    displayNone = true;
  }
  if (type === 'edit' && !display.edit) {
    displayNone = true;
  }

  if (displayNone) {
    return (
      <div style={{ display: 'none' }}>
        <Form.Item label={item.label}>
          {getFieldDecorator(item.fieldKey, finalDecoratorConfig)(
            <FormItemComponent {...formItemComponentProps} {...commonProps} />,
          )}
        </Form.Item>
      </div>
    );
  }

  if (formLayoutInline) {
    return (
      <Form.Item label={item.label}>
        {getFieldDecorator(item.fieldKey, finalDecoratorConfig)(
          <FormItemComponent {...formItemComponentProps} {...commonProps} />,
        )}
      </Form.Item>
    );
  }

  return (
    <Col {...wrapperCol}>
      <Form.Item labelCol={itemLabelCol} wrapperCol={itemWrapperCol} label={item.label}>
        {getFieldDecorator(item.fieldKey, finalDecoratorConfig)(
          <FormItemComponent {...formItemComponentProps} {...commonProps} />,
        )}
      </Form.Item>
    </Col>
  );
};

export default class EditForm extends React.PureComponent {
  getBaseEditFormItemProps() {
    const { form, type, specificFieldTypeMapping, needToValidate, formLayoutInline } = this.props;
    const { getFieldDecorator } = form;
    const config = {
      getFieldDecorator,
      type,
      specificFieldTypeMapping,
      needToValidate,
      formLayoutInline,
    };
    return config;
  }

  getEditFormItemProps() {
    return this.getBaseEditFormItemProps();
  }

  rendFormItem(item) {
    const config = this.getEditFormItemProps();
    return <EditFormItem {...config} item={item} key={item.fieldKey} />;
  }

  rendFormItems() {
    const { formFieldsMap } = this.props;
    return Object.values(formFieldsMap)
      .filter(item => !!item)
      .map(item => this.rendFormItem(item));
  }

  render() {
    const { formLayoutInline } = this.props;
    if (formLayoutInline) {
      return this.rendFormItems();
    }
    return <Row>{this.rendFormItems()}</Row>;
  }
}

EditForm.propTypes = {
  form: PropTypes.object.isRequired,
  formFieldsMap: PropTypes.object.isRequired,
  // 个性化 specificFieldTypeMapping 映射
  specificFieldTypeMapping: PropTypes.object,
  type: PropTypes.oneOf(['add', 'edit', 'detail']).isRequired,
  needToValidate: PropTypes.bool,
  formLayoutInline: PropTypes.bool,
};

EditForm.defaultProps = {
  specificFieldTypeMapping: {},
  needToValidate: true,
  formLayoutInline: false,
};
