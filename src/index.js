import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.less';
import Topic from './pages/Header/Topic';
import Detail from './pages/Detail/Detail'
import './assets/css/style.css';
const { Header, Footer, Content } = Layout;
function DouYingAnalysis () {
  useEffect(() => {
    document.title = "抖音无水印视频在线解析"
  })
  return (
    <>
      <Layout className="layout">
        <Header style={{ height: '110px', background: '#161823' }}>
          <Topic />
        </Header>
        <Content style={{ background: '#161823' }}>
          <Detail></Detail>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#0e0f1a', paddingTop: '50px', color: '#fff', marginTop: '10px' }}>©2020 本站仅供技术学习交流</Footer>
      </Layout>
    </>
  )
}

ReactDOM.render(
  <DouYingAnalysis />,
  document.getElementById('root')
)



