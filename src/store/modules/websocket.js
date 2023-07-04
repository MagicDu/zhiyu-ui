import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import { getToken } from '@/utils/auth'
import Vue from 'vue'

const magicsocket = {
    state: {
        stompClient: null,
    },
    mutations: {
        setStompClient: (state, stompClient) => {
            state.stompClient = stompClient
            Vue.prototype.$stompClient = stompClient;// 测试用
        },
    },
    actions: {
        createStompClient({ commit }) {
            let token = getToken()
            if (token == "undefined" || token == null) {
                return
            }
            //const socketUrl = "ws://" + window.location.host + "/socket/messages"
            const socketUrl = "http://localhost:9527/messages"
            //const socketUrl = "ws://127.0.0.1:8081/marksocket/27235319153a88c381802a8fd99561397a9d0c6673202d8c35f2b000255688b014a27d93b69cbc7801fafd80cc9167dbc033cd655b84cb5d20f41ab9f8ff800d47526f217435593ef0ed44a2e26c3a8659f56c80165e4ccba3776ca9244f144ff1eb32682575a2846221852f5b7bff85ede1f80eb863e1dc2e7a86a75bbe186d332d5d0edb76010040d71b76d256678d390c8ca43118aeb5b6ff4585b0aaaa267874c74635cdb018a34fcac3c12c34b4b71e17f3329741e0d1d2195f9b062385f164db913ebf896bfac27d16609832d71c9dfd29c699ee5080d3892936eb657d590cd220f1d2c52c8b4ade2934ee361ae728f07bde9b4e78f1260b7701c6d4e0432f93674b34c11680715c528dc084bf092631b34acc1d8ee00eaba0f6dbfa842cc0691544bf60b0f9f2dc36e4c7a864482fee2b5227324566998203fb0262edfa628e9b41c2385873e8316ade26746d/1"
            const socket = new SockJS(socketUrl);
            const stompClient = Stomp.over(socket);
            // 设置请求头
            let headers={}
            headers['Authorization'] = 'Bearer ' + token;
            stompClient.connect(headers, () => {
                console.log("magic socket connect succesed")
                // WebSocket连接成功后的回调函数
            }, {
                // 设置请求头
                beforeSend: (headers) => {
                    headers['Authorization'] = 'Bearer ' + token;
                }
            });

            commit('setStompClient', stompClient)
        }
    }

}
export default magicsocket



