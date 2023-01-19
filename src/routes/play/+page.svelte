<script>
    import Generic from "../../components/generic/Generic.svelte";
    import Waiting from "../../components/waiting/Waiting.svelte";
    import Main from "../../components/main/Main.svelte";
    import {websocket,score,icon,boardState,chance,statusMessage,mode} from "../../components/stores/stores";
    import { PUBLIC_server_url,PUBLIC_socket_url,PUBLIC_main_host } from '$env/static/public'

    import { onMount } from "svelte";
    let state = 0,roomid; // 0 -> loading , 1 -> waiting , 2 -> game , 3 -> error ,4-> left

    onMount(()=>{
        fetch(PUBLIC_server_url)
            .then((d)=>d.json())
            .then((d)=>{
                console.log(d);
                if(d.status != 200){
                    state = 3;
                    return;
                }
                state = 1;
                roomid = d.roomId;

                socket(`${PUBLIC_socket_url}${d.roomId}`);

            })
            .catch(()=>state=3)
    })


    const socket = (url) =>{

        const socket = new WebSocket(url);

        socket.addEventListener('open', (event) => {
            websocket.update(()=>socket)
        });

        socket.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data)
            console.log(payload)
            if (payload.mes == "gstarted"){
                state = 2;
                mode.update(()=>0);
                chance.update(()=>payload.chance);
                icon.update(()=>payload.icon);
                boardState.update(()=>payload.state);
                score.update((p)=>{
                    return {...p,you:payload.you,other:payload.other};
                });
                statusMessage.update(()=>{
                    if($chance){
                        return "Yours Chance" ;
                    }
                    return "Others Chance";
                });

                console.log($chance,$icon,$boardState,$score);
            }else if (payload.mes == "gmud"){
                boardState.update(()=>payload.payload);
                chance.update(()=>payload.chance);
                statusMessage.update(()=>{
                    if($chance){
                        return "Yours Chance" ;
                    }
                    return "Others Chance";
                });
                console.log($boardState);
            }else if (payload.mes == "gmend"){
                score.update((p)=>{
                    return {...p,you:payload.you,other:payload.other};
                });
                boardState.update(()=>payload.payload);
                statusMessage.update(()=>"Game End");
                chance.update(()=>false);
            }else if (payload.mes == "pdeleted"){
                state = 4
            }else if (payload.mes == "select"){
                mode.update(()=>1);
            }
        });

        socket.addEventListener('error', (event) => {
            state = 3
        });

        socket.addEventListener('close', (event) => {
            state = 3
        });
    }

    const copyClipboard = ()=>{
        navigator.clipboard.writeText(`${PUBLIC_main_host}play/${roomid}`);
    }
</script>

{#if state == 0}
    <Generic message="Creating Game" animation="https://assets5.lottiefiles.com/packages/lf20_gDwXMwVtha.json" />
{:else if state == 1}
    <Waiting on:click={copyClipboard} message="waiting for other" buttonmessage="copy" url={`${PUBLIC_main_host}play/${roomid}`}/>
{:else if state == 2}
    <Main/>
{:else if state == 3}
    <Generic message="Can't able to create Game" animation="https://assets4.lottiefiles.com/packages/lf20_kw7o4s5y.json" />
{:else if state == 4}
<Generic message="Other Player Left The Game" animation="https://assets4.lottiefiles.com/packages/lf20_kw7o4s5y.json" />
{/if}


