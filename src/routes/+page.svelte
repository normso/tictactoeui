<script>

	const clickHandler = () =>{
        window.location.href = "/play"
    }
</script>


<div class="container">
    <p>Get three in a row with Tic Tac Toe!</p>
    <button on:click={clickHandler}>Create New Game</button>
</div>


<style>
    .container{
        margin-top: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:80px;
    }
    p{
        width:80%;
        background-color: #bbbbbb;
        box-shadow: 10px 10px;
        margin: auto;
        font-size: 30px;
        text-align: center;
        padding: 20px;
    }

    @media (min-width:961px){
        p{
            width:50%;
        }
    }

    button{
        border: 0;
        font-size: 20px;
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
</style>
