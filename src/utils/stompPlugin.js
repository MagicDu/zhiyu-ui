import Stomp from 'stompjs';
import { getToken } from '@/utils/auth'

const stompPlugin = {
  install(Vue, options) {
    const socket = new WebSocket('ws://localhost:9527/messages');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      // WebSocket连接成功后的回调函数
    }, {
      // 设置请求头
      beforeSend: (headers) => {
        headers['Authorization'] = 'Bearer ' + getToken();
      }
    });

    // 将STOMP客户端添加到Vue.prototype中
    Vue.prototype.$stompClient = stompClient;
  }
};