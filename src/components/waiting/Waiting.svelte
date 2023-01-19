<script>
    export let message,buttonmessage,url;
    
</script>

<div class="container">
    <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_r1f2tztw.json" background="transparent"  speed="1"  style="height: 200px"  loop autoplay></lottie-player>
    <span>{message}</span>
    <div class="link">
        <input placeholder={url} disabled/>
        <button on:click>{buttonmessage}</button>
    </div>
</div>

<style>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    span{
        font-size:14px;
        color:#000;
        background-color: #bbbbbb;
        padding: 10px;
        box-shadow: 5px 5px;
        margin-top: 20px;
    }

    button{
        border: 0;
        font-size: 22px;
        color:#fff;
        width:fit-content;
        padding: 5px 20px 10px;
        background-color: #000;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        text-align: center;
    }

    button:active{
        box-shadow: none;
        background-color: #fff;
        color: #000;
    }

    input{
        border:4px solid black ;
        width:250px;
        height:50px;
        text-align: center;
        font-size: 18px;
        padding: 5px;
        color:#899376;
    }

    .link{
        margin-top: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:20px;

    }

</style>