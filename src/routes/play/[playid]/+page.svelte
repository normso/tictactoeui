<script>
    export let data;
    import Generic from "../../../components/generic/Generic.svelte";
    import Waiting from "../../../components/waiting/Waiting.svelte";
    import Main from "../../../components/main/Main.svelte";
    import {websocket,score,icon,boardState,chance,statusMessage,mode} from "../../../components/stores/stores";
    import { PUBLIC_socket_url,PUBLIC_main_host } from '$env/static/public'
    
    let state = 0; // 0 -> waiting , 1 -> game , 2 -> error , 3 -> left

    const joinGame = () =>{
        socket(`${PUBLIC_socket_url}${data.playid}`);
    }

    const socket = (url) =>{

        const socket = new WebSocket(url);

        socket.addEventListener('open', (event) => {
            websocket.update(()=>socket)
        });

        socket.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data)

            if (payload.mes == "gstarted"){
                state = 1;
                mode.update(()=>0)
                chance.update(()=>payload.chance);
                icon.update(()=>payload.icon);
                boardState.update(()=>payload.state);
                score.update((p)=>{
                    return {...p,you:payload.you,other:payload.other};
                })
                statusMessage.update(()=>{
                    if($chance){
                        return "Yours Chance" ;
                    }
                    return "Others Chance";
                });
                statusMessage.update(()=>{
                    if($chance){
                        return "Yours Chance" ;
                    }
                    return "Others Chance";
                });

            }else if (payload.mes == "gmud"){
                boardState.update(()=>payload.payload);
                chance.update(()=>payload.chance);
                statusMessage.update(()=>{
                    if($chance){
                        return "Yours Chance" ;
                    }
                    return "Others Chance";
                });

            }else if (payload.mes == "gmend"){
                score.update((p)=>{
                    return {...p,you:payload.you,other:payload.other};
                });
                boardState.update(()=>payload.payload);
                statusMessage.update(()=>"Game End");
                chance.update(()=>false);
            }else if (payload.mes == "pdeleted"){
                state = 3
            }else if (payload.mes == "select"){
                mode.update(()=>1);
            }

        });

        socket.addEventListener('error', (event) => {

        });

        socket.addEventListener('close', (event) => {
            state = 2
        });
    }
</script>


{#if state == 0}
    <Waiting on:click={joinGame} message="Other Is Waiting" buttonmessage="Join" url={`${PUBLIC_main_host}play/${data.playid}`}/>
{:else if state == 1}
    <Main/>
{:else if state == 2}
    <Generic message="Can't able to Join Game" animation="https://assets4.lottiefiles.com/packages/lf20_kw7o4s5y.json" />
{:else if state == 3}
    <Generic message="Other Player Left The Game" animation="https://assets4.lottiefiles.com/packages/lf20_kw7o4s5y.json" />
    
{/if}
