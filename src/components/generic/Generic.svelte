<script>
    export let message , animation;
</script>

<div class="container">
    <lottie-player src={animation}  background="transparent"  speed="1"  style="height: 200px;"  loop autoplay></lottie-player>
    <span>{message}</span>
</div>


<style>

    .container{
        /* border: 2px solid red; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 150px;
    }

    span{
        font-size:14px;
        color:#000;
        background-color: #bbbbbb;
        padding: 10px;
        box-shadow: 5px 5px;
        margin-top: 40px;
    }

</style>