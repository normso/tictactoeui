<script>
    import {boardState,chance,icon,score,websocket,statusMessage,mode} from "../stores/stores.js"
    import { onMount } from "svelte";

    let mde; // 0 -> new , 1 -> reset


    const handleIcon =(e,r,c)=>{
        if (!$chance){
            if($boardState[r][c] == 0 ){
                e.target.style.backgroundColor = "#a34d4d9a";
                setTimeout(()=>{
                    e.target.style.backgroundColor = "transparent";
                },100);
                return;
            }
            return;
        }
        $boardState[r][c] = $icon
        $websocket.send(JSON.stringify({
            "mes":"gmud",
            "row":r+"",
            "column":c+""
        }))
        
    }

    

    const newBoard = (e)=>{
        const ele = document.querySelector(".overlay");
        console.log(ele.style.display)
        if (ele.style.display == "flex"){
            ele.style.display = "none";
            return;
        }
        ele.style.display = "flex";
        mde = 0
        
    }

    const resetBoard = (e)=>{
        const ele = document.querySelector(".overlay");
        if (ele.style.display == "flex"){
            ele.style.display = "none";
            return;
        }
        ele.style.display = "flex";
        mde = 1
    }

    const makeGame = (ic)=>{
        const ele = document.querySelector(".overlay");
        if(mde == 0){
            $websocket.send(JSON.stringify({
                "mes":"start",
                "payload" : ic+""
            }));
        }else if (mde == 1){
            $websocket.send(JSON.stringify({
                "mes":"reset",
                "payload" : ic+""
            }));
        }
        ele.style.display = "none";
    }

    const hideOverlay =()=>{
        const ele = document.querySelector(".overlay");
        ele.style.display = "none";
    }



</script>

<div class="container">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|self={hideOverlay} class="overlay">
        <div class="overlay-main-container">
            <span class="noshadow" style="margin-top:-10px">Play as :- </span>
            <div class="buttons">
                <button class="overlay-button" on:click={() => makeGame(2)}>{"✖"}</button>
                <button class="overlay-button" on:click={() => makeGame(1)} style="margin-left:20px;">{"〇"}</button>
            </div>

        </div>
    </div>

    <div class="score">
        <span class="shadow">{"You "}{$icon == 1 ? "( 〇 )" : "( ❌ )"}</span>
        <span style="margin:0 20px">{`${$score.you} - ${$score.other}`}</span>
        <span class="shadow">{"other "}{$icon == 1 ? "( ❌ )" : "( 〇 )"}</span>
    </div>

    <div class="label" style="margin-top:50px;">
        <span class="noshadow">{$statusMessage}</span>
        
    </div>

    <div class="board">
        <div class="row">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,0,0)} class="rbborder space">
                {#if $boardState[0][0] == 1}
                    <div class="circle"></div>
                {:else if $boardState[0][0] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,0,1)} class="rbborder space">
                {#if $boardState[0][1] == 1}
                    <div class="circle"></div>
                {:else if $boardState[0][1] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,0,2)} class="bborder space">
                {#if $boardState[0][2] == 1}
                    <div class="circle"></div>
                {:else if $boardState[0][2] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
        </div>

        <div  class="row">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,1,0)} class="rbborder space">
                {#if $boardState[1][0] == 1}
                    <div class="circle"></div>
                {:else if $boardState[1][0] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,1,1)} class="rbborder space">
                {#if $boardState[1][1] == 1}
                    <div class="circle"></div>
                {:else if $boardState[1][1] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,1,2)} class="bborder space">
                {#if $boardState[1][2] == 1}
                    <div class="circle"></div>
                {:else if $boardState[1][2] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
        </div>

        <div class="row">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,2,0)} class="rborder space">
                {#if $boardState[2][0] == 1}
                    <div class="circle"></div>
                {:else if $boardState[2][0] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,2,1)} class="rborder space">
                {#if $boardState[2][1] == 1}
                    <div class="circle"></div>
                {:else if $boardState[2][1] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={(e)=>handleIcon(e,2,2)} class="space">
                {#if $boardState[2][2] == 1}
                    <div class="circle"></div>
                {:else if $boardState[2][2] == 2}
                    <span class="cross">❌</span>
                {/if}
            </div>
        </div>
    </div>

    

    <div class="buttons">
        
            <button  on:click={newBoard} >{"New Round"}</button>
            <button  on:click={resetBoard} style="margin-left:20px;" >{"Reset Score"}</button>
        
        
    </div>
</div>

<style>

    .overlay{
        position: fixed;
        top:0;
        left: 0;
        min-width:100vw;
        min-height:100vh;
        display: none;
        justify-content: center;
        align-items: center;
    }

    .overlay-main-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 50px 100px;
        background-color: #fff;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    .shadow{
        font-size:14px;
        color:#000;
        background-color: #bbbbbb;
        padding: 10px;
        box-shadow: 5px 5px;
        margin-top: 20px;
    }

    .noshadow{
        font-size:12px;
        color:#000;
        background-color: #bbbbbb;
        padding: 10px;
        margin-top: 20px;
    }

    .board{
        margin-top: 80px;
        height:40vh;
        
    }
    .row{
        display: flex;
        width:65vw;
        height:33.3%;
    }

    .rbborder{
        border-right: 5px solid #000000;
        border-bottom: 5px solid #000;
        
    }
    .bborder{
        border-bottom: 5px solid #000;
    }
    .rborder{
        border-right: 5px solid #000;
    }
    .space{
        width:33.3%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buttons{
        margin-top: 50px;
    }

    button{
        border: 0;
        font-size: 18px;
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

    .overlay-button{
        padding: 5px 15px 5px;
    }

    .cross{

        font-size: 30px;
    }

    .circle{
        width:40px;
        height:40px;
        border-radius: 20px;
        border: 4px solid #000 ;
    }

    button:disabled{
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (min-width:961px){
        .row{
            width:28vw;
        }
        .board{
            height:40vh;
        }
    }
    
</style>