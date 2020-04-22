import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import theme1 from './echartsTheme/theme1';
import wonderland from './echartsTheme/wonderland.project';

echarts.registerTheme('theme1', theme1);
echarts.registerTheme(wonderland.themeName, wonderland.theme);

export const echartsOrigin = echarts;
export const ReactEchartsOrigin = ReactEcharts;
