/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormMegaLayout,
  FormButtonGroup,
  createFormActions,
} from '@formily/antd';
import FormItemDatePicker from '@/components/base/FormItem/FormItemDatePicker';
import FormItemDateRangePicker from '@/components/base/FormItem/FormItemDateRangePicker';
import FormItemTextArea from '@/components/base/FormItem/FormItemTextArea';
import FormItemTextSelect from '@/components/base/FormItem/FormItemTextSelect';
import FormItemSwitch from '@/components/base/FormItem/FormItemSwitch';
import InputList from '@/components/baseFunctional/FormItem/InputList';
import { Button, Input, message } from 'antd';
// 映射
const fieldTypeMapping = {
  text: Input,
  textPassword: Input,
  hidden: Input,
  datePicker: FormItemDatePicker,
  dateRangePicker: FormItemDateRangePicker,
  textArea: FormItemTextArea,
  select: FormItemTextSelect,
  switch: FormItemSwitch,
  InputList,
};

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const actions = createFormActions();

export const EditFormItem = ({
  item,
  formLayoutInline,
  type = 'add',
  needToValidate,
  otherProps = {},
}) => {
  const theFormItemLayout = formItemLayout;
  const { initialValue, rules } = item.fieldAttr.fieldDecoratorConfig;
  const { props = {} } = item.fieldAttr;
  const itemProps = {
    name: item.fieldKey,
    title: item.label,
    // labelCol: theFormItemLayout.labelCol.span,
    // wrapperCol: 24 - theFormItemLayout.wrapperCol.span,
    'x-rules': needToValidate ? rules : [],
    initialValue,
    'x-component': item.fieldType,
    'x-mega-props': {
      ...theFormItemLayout,
    },
    // 'x-component-props':props,
  };
  itemProps['x-component-props'] = props;

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

  const FiedView = <Field {...itemProps} />;
  let displayNone = false;
  if (item.fieldType === 'hidden') {
    displayNone = true;
  }

  if (displayNone) {
    return <div style={{ display: 'none' }}>{FiedView}</div>;
  }

  if (formLayoutInline) {
    return { FiedView };
  }
  return FiedView;
};

export default class EditForm extends React.Component {
  getBaseEditFormItemProps() {
    const { type, specificFieldTypeMapping, needToValidate, formLayoutInline } = this.props;
    const config = {
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

  getAction() {
    return actions;
  }

  getInitialValues() {
    const values = {};
    const { formFieldsMap } = this.props;
    Object.values(formFieldsMap).forEach((item) => {
      values[item.fieldKey] = item.fieldAttr.fieldDecoratorConfig.initialValue || '';
    });
    console.log('EditForm -> getInitialValues -> values', values);

    return values;
  }

  getSchemaFormProps() {
    const { formFieldsMap } = this.props;
    const theComponents = {
      Input,
      ...fieldTypeMapping,
    };
    Object.values(formFieldsMap)
      .filter((item) => typeof item.fieldType !== 'string')
      .forEach((item) => {
        theComponents[item.fieldType] = item.fieldType;
      });

    return {
      actions: this.getAction(),
      effects: this.handleEffects,
      components: theComponents,
    };
  }

  async getFormValue() {
    await this.getAction().validate();
    return this.getAction().getFormState();
  }

  handleEffects = ($, event) => {
    console.log('EditForm -> handleEffects -> args', event);
    const { formilyEffects } = this.props;
    if (typeof formilyEffects === 'function') {
      formilyEffects($, event);
    }
  };

  handleOk = async () => {
    const { onSubmit } = this.props;
    const { values, valid, errors } = await this.getFormValue();
    if (valid && typeof onSubmit === 'function') {
      const resetFields = () => {
        this.getAction().reset();
        this.getAction().clearErrors();
      };
      onSubmit(values, resetFields);
    } else {
      message.error(`提交错误: ${errors[0]}`);
    }
  };

  handleCancle = () => {
    const { onCancle } = this.props;
    if (typeof onCancle === 'function') {
      onCancle();
    }
  };

  rendFormItem(item) {
    const config = this.getEditFormItemProps();
    return <EditFormItem {...config} item={item} key={item.fieldKey} />;
  }

  rendFormItems() {
    const { formFieldsMap } = this.props;
    return Object.values(formFieldsMap)
      .filter((item) => !!item)
      .map((item) => this.rendFormItem(item));
  }

  render() {
    const { formLayoutInline, loading, type, continueWithSave = false } = this.props;

    const schemaFormProps = this.getSchemaFormProps();
    return (
      <SchemaForm {...schemaFormProps}>
        <FormMegaLayout {...formItemLayout} inline={formLayoutInline}>
          {this.rendFormItems()}
        </FormMegaLayout>
        <FormButtonGroup sticky style={{ textAlign: 'right', paddingRight: 16 }}>
          <Button onClick={this.handleCancle}>取消</Button>
          {type === 'add' && continueWithSave && (
            <Button onClick={() => this.handleOk(continueWithSave)} type="primary">
              保存并继续添加
            </Button>
          )}
          <Button loading={loading} onClick={() => this.handleOk()} type="primary">
            确定
          </Button>
        </FormButtonGroup>
      </SchemaForm>
    );
  }
}

EditForm.propTypes = {
  // form: PropTypes.object.isRequired,
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
