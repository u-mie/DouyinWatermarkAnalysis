import React from 'react';
import { Row, Col } from 'antd';
function Topic () {
  return (
    <Row gutter={10}>
      <Col xl={{ span: 12, offset: 0 }} xs={{ span: 24 }} >
        <div className='logo-center'>
          <img className="logo" alt="logo" src={require('../../assets/img/logo.png')}></img>
          <span className='logo-f'>抖音无水印解析</span>
        </div>
      </Col>
    </Row>
  )
}

export default Topic