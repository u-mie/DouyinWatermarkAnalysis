import React, { useContext } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { DownMethods } from './Detail'
import QueueAnim from 'rc-queue-anim';
function DownloadUrl () {
  const { videoUrL, handleDownCover, handleDownVideo, handleDownMusic } = useContext(DownMethods)
  if (videoUrL) {
    return (
      <QueueAnim delay={4}>
        <div key="demo1" className="download-url">
          <Button onClick={handleDownVideo} style={{ marginRight: '20px' }} type="primary" shape="round" icon={<DownloadOutlined />}>视频下载</Button>
          <Button onClick={handleDownCover} style={{ marginRight: '20px' }} type="primary" shape="round" icon={<DownloadOutlined />}>封面下载</Button>
          <Button onClick={handleDownMusic} type="primary" shape="round" icon={<DownloadOutlined />}>音乐下载</Button>
        </div>
      </QueueAnim>

    )
  }
  return null
}
export default DownloadUrl