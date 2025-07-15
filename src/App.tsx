import { useState, useEffect } from 'react'
import './App.css'

// GitHub徽标组件
const GitHubBadge = () => {
  const handleClick = () => {
    window.open('https://github.com/cc11001100/wx-bug-editor', '_blank');
  };

  return (
    <div className="github-badge" onClick={handleClick} title="查看GitHub仓库">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="github-icon"
      >
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    </div>
  );
};

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
      <GitHubBadge />
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
          <h3>⚠️ 重要使用说明：</h3>
          <div className="important-notice">
            <p><strong>复制文案通过文件助手发送给自己的手机会无效！</strong></p>
            <p>正确使用方法：请在手机上直接访问此网址进行操作</p>
            <p className="website-url">🔗 手机访问：<span>https://www.cc11001100.com/wx-bug-editor/</span></p>
          </div>

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
