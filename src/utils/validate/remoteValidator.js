/**
 * 用法
 *
 nameRemoteValidator = (rule, value, callback) => {
    const { form, routeParams } = this.props;
    const param = { id: routeParams.id || '', name: form.getFieldValue('name') };
    const defaultFieldsVal = this.calcDefaultFieldsVal();
    if (param.name === defaultFieldsVal.name) {
      // nothing change
      callback([]);
    } else {
      remoteValidator(api.isNotExistName, param, callback);
    }
  };


 <Form.Item label="名称" {...formItemStyle.normal.formItem}>
 {
   getFieldDecorator('name',
     {
       initialValue: formFieldsVal.name,
       validateTrigger: ['onBlur'],
       rules: [
         rules.isRequireString('第一语言不能为空'),
         { validator: this.nameRemoteValidator }
       ]
     }
   )(<Input style={formItemStyle.normal.inputStyle} placeholder="第一语言" />)
 }
 </Form.Item>
 */

/**
 *
 * @param apiFunction
 * @param param
 * @param callback
 * @param fieldName
 * @returns {Promise.<void>}
 */
export async function remoteValidator(apiFunction, param, callback, fieldName = '名称') {
  const errorMessage = `此${fieldName}已存在, 请检核!`;
  try {
    const result = await apiFunction(param);
    if (result.body) {
      callback([]);
    } else {
      callback([errorMessage]);
    }
  } catch (e) {
    callback(['后台返回参数错误']);
  }
}

export default remoteValidator;
