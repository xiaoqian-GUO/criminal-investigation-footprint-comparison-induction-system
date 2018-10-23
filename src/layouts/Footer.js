import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        // {
        //   key: 'Pro 首页',
        //   title: 'Pro 首页',
        //   href: '#',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <Icon type="github" />,
        //   href: '#',
        //   blankTarget: true,
        // },
        {
          key: '哈尔滨工业大学',
          title: '哈尔滨工业大学',
          href: '#',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 刑侦足迹对比系统
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
