import { useState, useEffect } from 'react'
import './App.css'

// 预设文案列表
const presetTexts = [
  {
    content: "爸爸",
    display: "【肯德基疯狂星期四】V我50，请你吃原味鸡+汉堡+可乐=19.9！👉点击领取优惠券👈 手慢无！错过再等一周！"
  },
  {
    content: "老公",
    display: "❤️宝贝，我想你了，点击查看我给你准备的惊喜~"
  },
  {
    content: "转账",
    display: "【微信支付】您收到一笔1000元转账，点击领取"
  },
  {
    content: "红包",
    display: "【微信红包】恭喜发财，大吉大利！点击领取88.88元红包"
  },
  {
    content: "抽奖",
    display: "🎁您已获得iPhone 15抽奖资格，点击参与抽奖，100%中奖！"
  },
  {
    content: "外卖",
    display: "【美团外卖】您的外卖已送达，满意度评价送20元无门槛红包，点击评价"
  },
  {
    content: "视频",
    display: "【腾讯视频】您的VIP会员已到期，点击免费领取7天会员"
  },
  {
    content: "打车",
    display: "【滴滴出行】感谢您的使用，点击领取20元打车券"
  },
  {
    content: "健康码",
    display: "您的健康码已更新，点击查看最新状态"
  },
  {
    content: "快递",
    display: "【顺丰快递】您有一个包裹待取件，点击查看取件码"
  }
];

function App() {
  const [messageType, setMessageType] = useState<'text' | 'call'>('text')
  const [messageContent, setMessageContent] = useState('爸爸')
  const [displayText, setDisplayText] = useState('【肯德基疯狂星期四】V我50，请你吃原味鸡+汉堡+可乐=19.9！👉点击领取优惠券👈 手慢无！错过再等一周！')
  const [callDisplayText, setCallDisplayText] = useState('给文件传输助手打电话')
  const [callUsername, setCallUsername] = useState('filehelper')  // 新增状态，专门用于存储打电话的微信号
  const [copySuccess, setCopySuccess] = useState(false)
  
  // 当消息类型变更时设置默认值
  useEffect(() => {
    if (messageType === 'call') {
      setCallUsername('filehelper')
      setCallDisplayText('给文件传输助手打电话')
    }
  }, [messageType])
  
  // 选择预设文案
  const selectPreset = (content: string, display: string) => {
    setMessageContent(content);
    setDisplayText(display);
  };
  
  const getPreviewContent = (): string => {
    if (messageType === 'text') {
      return `<a
href="weixin://bizmsgmenu
?msgmenucontent=${messageContent}
&msgmenuid=960">${displayText}</a>`
    } else {
      return `<a href="weixin://voip/callagain/?username=${callUsername}">${callDisplayText}</a>`
    }
  }
  
  // 复制内容到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getPreviewContent())
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('复制失败: ', err);
        alert('复制失败，请手动复制');
      });
  };

  // 截断文本显示
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="container">
      <div className="video-container">
        <video 
          src={import.meta.env.BASE_URL + "demo.mp4"} 
          autoPlay 
          loop 
          muted 
          playsInline
          onClick={(e) => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              e.currentTarget.requestFullscreen();
            }
          }}
        />
        <div className="video-hint">点击视频全屏观看</div>
      </div>
      
      <h1>微信bug消息编辑器</h1>
      
      <div className="preview-section">
        <h2>消息预览</h2>
        <div className="preview-box">
          <pre>{getPreviewContent()}</pre>
        </div>
      </div>
      
      <div className="editor-section">
        <div className="form-group">
          <label>消息类型：</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="messageType" 
                checked={messageType === 'text'} 
                onChange={() => setMessageType('text')} 
              />
              强制好友发送指定的文本消息
            </label>
            <label>
              <input 
                type="radio" 
                name="messageType" 
                checked={messageType === 'call'} 
                onChange={() => setMessageType('call')} 
              />
              强制好友打语音电话
            </label>
          </div>
        </div>
        
        {messageType === 'text' && (
          <>
            <div className="form-group">
              <label>消息内容：</label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="输入要发送的文本内容"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label>显示文本：</label>
              <textarea
                value={displayText}
                onChange={(e) => setDisplayText(e.target.value)}
                placeholder="输入显示的文本内容"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label>预设文案：</label>
              <div className="preset-container">
                {presetTexts.map((preset, index) => (
                  <div 
                    key={index} 
                    className="preset-item" 
                    onClick={() => selectPreset(preset.content, preset.display)}
                  >
                    <div className="preset-title">{preset.content}</div>
                    <div className="preset-preview">{truncateText(preset.display, 20)}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {messageType === 'call' && (
          <>
            <div className="form-group">
              <label>微信号：</label>
              <textarea
                value={callUsername}
                onChange={(e) => setCallUsername(e.target.value)}
                placeholder="输入要拨打电话的微信号"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label>显示文本：</label>
              <textarea
                value={callDisplayText}
                onChange={(e) => setCallDisplayText(e.target.value)}
                placeholder="输入显示的文本内容"
                rows={3}
              />
            </div>
          </>
        )}
        
        <div className="form-group">
          <button 
            className={`copy-button ${copySuccess ? 'success' : ''}`} 
            onClick={copyToClipboard}
          >
            {copySuccess ? '复制成功！' : '复制消息内容'}
          </button>
        </div>
        
        <div className="compatibility-info">
          <h3>测试情况：</h3>
          <ul>
            <li>苹果无法发送和点击，会直接看到代码。</li>
            <li>鸿蒙5能够发送，但是自己点不了，好友点击有效果。</li>
            <li>双方都是安卓基本都可以。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
