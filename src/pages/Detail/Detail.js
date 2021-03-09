import React, { useState, createContext } from 'react';
import { Input, Row, Col, message } from 'antd';
import Desc from './Desc';
import DownloadUrl from './DownloadUrl';
import axios from 'axios';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import { saveAs } from 'file-saver';
const { Search } = Input;
function Detail() {
  const [videoUrL, setvideoUrl] = useState('');
  const [inputValue, setinputValue] = useState('');
  const [cover, setCover] = useState('');
  const [desc, setDesc] = useState('');
  const [music, setMusic] = useState('');
  const [controls, setControls] = useState('');
  const [isLoading, setisLoading] = useState(false);
  // Serverless API接口鉴权
  let nowDate = new Date();
  let dateTime = nowDate.toGMTString();
  const SecretId = ""; //云函数密钥
  const SecretKey = "";
  const source = "douyin";
  let auth = `hmac id="${SecretId}", algorithm="hmac-sha1", headers="x-date source", signature="`;
  let signStr = `x-date: ${dateTime}\nsource: ${source}`;
  let sign = HmacSHA1(signStr, SecretKey);
  sign = Base64.stringify(sign);
  sign = auth + sign + "\"";
  let getAnalysis = axios.create({
    baseURL: "https://service-lio7hjuo-1251998888.gz.apigw.tencentcs.com:443",
    timeout: 5000,
    headers: {
      "Source": source,
      "X-Date": dateTime,
      "Authorization": sign
    },
    withCredentials: true
  })
  // ----------------------------------
  const handleOnChange = (e) => {
    return setinputValue(e.target.value)
  }
  const getAnalysisVideo = () => {
    setisLoading(true)
    getAnalysis.post('/api/getAnalysisVideo', { url: inputValue }).then(res => {
      setCover(res.data.data.dynamic_cover)
      setvideoUrl(res.data.data.analysis_video)
      setDesc(res.data.data.desc)
      setMusic(res.data.data.music)
      setControls('controls')
      setisLoading(false)
    }, err => {
      setisLoading(false)
      message.error('请输入正确的抖音网址')
    })
  }
  const fileName = desc
  const handleDownVideo = () => {
    saveAs(videoUrL, fileName, 'video/mp4')
  }
  const handleDownCover = () => {
    saveAs(cover, fileName, 'image/webp')
  }
  const handleDownMusic = () => {
    saveAs(music, fileName, 'audio/mpeg')
  }

  return (
    <Row>
      <Col md={{ span: '12', offset: '6' }} xs={{ span: '24', offset: '0' }}>
        <div className="analysis-box">
          <Search size="middle" loading={isLoading} placeholder="请输入要解析的抖音地址" enterButton="开始解析" onChange={(e) => handleOnChange(e)} value={inputValue} onSearch={getAnalysisVideo} />
          <DescContext.Provider value={desc}>
            <Desc />
          </DescContext.Provider>
          <DownMethods.Provider value={{ videoUrL: videoUrL, handleDownCover: handleDownCover, handleDownVideo: handleDownVideo, handleDownMusic: handleDownMusic }}>
            <DownloadUrl />
          </DownMethods.Provider>
          <video poster={cover} src={videoUrL} controls={controls}></video>
        </div>
      </Col>
    </Row>
  )
}

export const DescContext = createContext();
export const DownMethods = createContext();
export default Detail;