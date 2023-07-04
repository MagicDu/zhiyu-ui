<template></template>
<script>

export default {
    data() {
        return {
            stompClient: null,
            messages: [],
        }
    },
    created() {
      
    },
    mounted() {

    },
    methods: {
        sendMessage() {
            const message = { text: 'Hello, world!' };
            this.stompClient.send('/app/send-message', {}, JSON.stringify(message));
        },
    }


}
</script>
<style></style>