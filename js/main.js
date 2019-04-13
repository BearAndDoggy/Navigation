  //1.初始化localstorage
  var object = init()
  var keys = object['keys']
  var hash = object['hash']
  //2.生成键盘
  generateKeyboard(keys, hash)
  //3.监听用户动作
  listenUsers(hash)


  function init() {
      var keys = {
      '0': {'0':'q','1':'w','2':'e','3':'r','4':'t','5':'y','6': 'u','7': 'i','8': 'o','9': 'p','length':'10'},
      '1': {'0':'a','1':'s','2':'d','3':'f','4':'g','5':'h','6':'j','7':'k','8':'l','length':'9'},
      '2': {'0':'z','1':'x','2':'c','3':'v','4':'b','5':'n','6':'m','length':'7'},
      'length': 3,
      }
  
      var hash = {
          'q': 'www.qq.com',
          'w': 'weibo.com',
          'e': 'ele.com',
          'r': 'ruanyifeng.com',
          't': 'taobao.com',
          'i': 'iqiyi.com',
          'k': 'www.kaixin001.com',
          'j': 'jd.com',
          'h': 'www.hexun.com',
          'g': 'ganji.com',
          'a': 'alibaba.com',
          'm': 'meituan.com',
          'd': 'douban.com',
          'z': 'zhihu.com',
          'x': 'xunlei.com',
          'c': 'cctv.com',
          'v': 'V2ex.com',
          'b': 'baihe.com',
          'f': 'ifeng.com',
      }

      var hash1 = getLocalStorage('url')
      if (hash1) {
          hash = hash1
      }

      return {
          'keys': keys,
          'hash': hash,
      }
  }

  function getLocalStorage(name) {
      return JSON.parse(localStorage.getItem(name) || 'null')   
  }
  
  function tag(tagName) {
      return document.createElement(tagName) 
  }

  function createSpan(textContent) {
      var span = tag('span')
      span.textContent = textContent
      return span
  }

  function createButton(textContent) {
      var button = tag('button')
      button.textContent = 'E'
      button.id = textContent

      button.onclick = function(event) {
          var x = prompt('请输入一个网址,如：baidu.com或者www.baidu.com')
          var cr = event.target.id
          hash[cr] = x
          localStorage.setItem('url', JSON.stringify(hash)) 

          var button = event.target
          var img = button.nextSibling
          img.src = 'http://' + x + '/favicon.ico'

          img.onerror = function(event) {
          event.target.src = 'http://i.loli.net/2017/11/10/5a05afbc5e183.png'
          }
          
      }
      return button
  }

  function createImage(domain) {
      var img = tag('img')
      if (domain) {
          img.src = 'http://' + domain + '/favicon.ico' 
      } else {
          img.src = 'http://i.loli.net/2017/11/10/5a05afbc5e183.png'
      }

      img.onerror = function(e){
        e.target.src = 'http://i.loli.net/2017/11/10/5a05afbc5e183.png'
      }

      return img
  }

  function generateKeyboard(keys, hash) {
      for (let index = 0; index < keys['length']; index++) {
          var div = tag('div')
          mains.appendChild(div)

          for (let index2 = 0; index2 <  keys[index]['length']; index2++) {
              var textContent = keys[index][index2]
              var domain = hash[textContent]

              var kbd = tag('kbd')
              kbd.className = 'key'
              
              var img = createImage(domain)
              var span = createSpan(textContent)
              var button = createButton(textContent)
              kbd.appendChild(span)   
              div.appendChild(kbd)
              kbd.appendChild(button)           
              kbd.appendChild(img)      
          }      
      }
  }

  function listenUsers(hash) {
      document.onkeypress = function(event) {
      var key = event.key
      var website = hash[key]
      console.log(website);
      window.open('http://' + website, "_blank")
      }
  }