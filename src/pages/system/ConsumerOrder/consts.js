import { keyMapStation, enumStationStatus } from '@/enum/monitoringPlatform';
import { createRules, theRules } from '@/utils/validate';
import { enumToOptions } from '@/utils/processRenderData';

export const keyMap = keyMapStation;

export const namespace = 'orderConsumerOrder';

export const statusEnum = enumStationStatus;

export const consumerTypeEnumMap = {
  1: '停车消费',
  2: '充电消费',
  3: '到期清零',
  4: '余额转币',
  5: '余额充值',
  6: '停车包月',
  7: '平台现金扣除',
  8: '平台能量币扣除',
};
const optionEnum = {
  停车消费: '1',
  充电消费: '2',
  到期清空: '3',
  余额转币: '4',
};

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};
const initialValue = '';

// 'phoneNumber', 'wechatName', 'consumerType', 'money', 'createDate', 'stationName'
export const formFieldsMap = {
  phoneNumber: {
    label: '用户ID（手机号）',
    fieldKey: 'phoneNumber',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  wechatName: {
    label: '用户昵称',
    fieldKey: 'wechatName',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  consumerType: {
    label: '消费类型',
    fieldKey: 'consumerType',
    fieldType: 'select',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
      props: {
        allowClear: true,
        style: { width: '200px' },
        children: enumToOptions(optionEnum),
        placeholder: '请选择类型',
      },
    },
    otherConfig: {},
  },
  money: {
    label: '消费',
    fieldKey: 'money',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  createDate: {
    label: '消费时间',
    fieldKey: 'createTime',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  date: {
    label: '消费时间',
    fieldKey: 'date',
    fieldType: 'dateRangePicker',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  stationName: {
    label: '消费站点',
    fieldKey: 'stationName',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
  id: {
    label: '详情',
    fieldKey: 'id',
    fieldType: 'text',
    fieldAttr: {
      formItemLayout,
      fieldDecoratorConfig: {
        initialValue,
        rules: createRules(theRules.required),
      },
    },
    otherConfig: {},
  },
};
