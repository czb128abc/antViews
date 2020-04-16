import React from 'react';
import { FormattedMessage, Link } from 'umi';

import PageHeader from '@/components/PageHeader';

import MenuContext from '@/layouts/MenuContext';
import GridContent from './GridContent';
import styles from './index.less';

const PageHeaderWrapper = ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {(value) => (
        <PageHeader
          home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={(item) =>
            // if (item.locale) {
            //   return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
            // }
            item.name
          }
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default PageHeaderWrapper;
