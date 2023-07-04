<template></template>
<script>
//import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            messages: [],
        }
    },
    computed: {
    // ...mapGetters([
    //   'stompClient'
    // ]),
    },
    created() {
       console.log(this.$stompClient,"socket client")
       this.$stompClient.subscribe("/topic/friends/signin",this.handleMessage)
       this.$stompClient.subscribe("/topic/friends/signout",this.handleMessage)
    },
    mounted() {

    },
    methods: {
        sendMessage() {
            const message = { text: 'Hello, world!' };
            this.stompClient.send('/app/send-message', {}, JSON.stringify(message));
        },
        handleMessage(message){
            console.log("receive msg:----------->",message)
        }
    }


}
</script>
<style></style>