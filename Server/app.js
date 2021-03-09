const express = require('express');
const request = require('superagent');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3333;
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//获取抖音视频中重定向连接的ItemId
async function getItemId (url) {
  let RedirectUrl = await request.get(url);
  let RedirectItemId = await RedirectUrl.request.url.match(/\d+/)[0];
  return RedirectItemId;
}
//将获取的抖音视频itemid拼接抖音重定向后的连接，获取视频的返回数据
async function getAnalysisVideo (url) {
  let RedirectItemId = await getItemId(url);
  let baseUrl = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${RedirectItemId}`;
  let dataList = new Map();
  let douyinData = await request.get(baseUrl);
  let { item_list } = JSON.parse(douyinData.text);
  let realUrl = '';
  let analysisUrl = '';
  item_list.map((item) => {
    realUrl = JSON.stringify(item.video.play_addr.url_list[0]);
    analysisUrl = realUrl.replace('playwm', 'play').replace('"', '').replace('"', '');
    dataList.set('desc', item.desc);
    dataList.set('music', item.music.play_url.uri);
    dataList.set('dynamic_cover', item.video.dynamic_cover.url_list[0]);
  })
  let RedirectVideoUrl = await request.get(analysisUrl).set('User-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1');
  dataList.set('analysis_video', RedirectVideoUrl.redirects[0]);
  let dataObject = strMapToObject(dataList);
  return dataObject;

}
function strMapToObject (strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Method', 'post')
  res.header('Access-Control-Allow-Credentials', "true")
  res.header('Access-Control-Allow-Headers', "Source,X-Date,Authorization,Content-Type,Accept")
  res.send()
})
app.post('/api/getAnalysisVideo', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', "true")
  let isConnect = /(https|http):\/\/(v.douyin.com)\/[a-zA-Z]+/.test(req.body.url);
  if (isConnect) {
    getAnalysisVideo(req.body.url.match(/[a-zA-z]+:\/\/[^\s]*/)[0]).then(data => {
      res.json({ 'status': 200, data });
    }, err => {
      res.status(404).send(err);
    })

  } else {
    res.status(400).send('系统参数错误，请检查参数是否正确');
  }

})
app.listen(port, () => console.log(`Server Start`));