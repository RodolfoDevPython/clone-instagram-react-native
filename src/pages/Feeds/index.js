import React,  { useState, useEffect, useCallback } from "react";
import { View , FlatList } from "react-native";

import LazyImage from "../../components/lazyImage";
import { Post, Header, Avatar, Name, Description, Loading } from "./styles";

export default function Feed(){

    const [ feed, setFeed ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ total, setTotal ] = useState(0); 
    const [ loading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ viewable, setViewable ] = useState([]);

    async function loadPage(pageNumber = page, shoudRefresh = false) {

            // shoudRefresh -> Esse Parametro faz com que seja armazenado só os novos valores.... e descartar os valores antigos que supostamente foram trazido dos scrolls anteriores

            //validação para ele não fazer mais request quando acabar as imagens
            if (total && pageNumber > total) return;

            setLoading(true)

            //lembrando que no android ele não enxerga o localhost (Pelo Emulador)
            //para isso basta rodar o adb (se ele estiver no config do path) e add o codigo -> adb reverse tcp:3000 tcp:3000 ou se não estiver no path vá até C:\Users\Econverse\AppData\Local\Android\Sdk\platform-tools e rode o mesmo comando
            const NumberPageShow = 5
            const response = await fetch(`http://8757f341677c.ngrok.io/feed?_expand=author&_limit=${NumberPageShow}&_page=${pageNumber}`);

            const data = await response.json();
            const totalItems = response.headers.get('X-Total-Count');//isso venho da api fake isso pode variar 

            setTotal(Math.floor(totalItems/NumberPageShow)); //isso vai trazer o numero de total de resultados paginas ex: se tenho 10 imgs e quero trazer 5 eu vou conseguer puxar somente duas vezes

            setFeed(shoudRefresh ? data : [... feed, ... data ]);///isso faz com que tenho a copia dos feeds alteriores
            setPage(pageNumber + 1);

            setLoading(false)
    }

    useEffect( () => {
        loadPage();
    }, []);

    async function refreshList() {
        setRefreshing(true);
        ///1° Param -> vamos carregar os primeiros conteúdos por isso passei o 1 como parâmetro 
        ///2° Param -> passamos true para no parametro para ativar a flag de não duplicar os item no flatlist
        await loadPage(1, true);
        setRefreshing(false);
    }

    //HandleViewableChange essa function eu não posso declara como function pq o flatlist vai reclarmar
    //Obs: Pq toda vez que o componente muda de estado as funções com declarações function é recriada e no caso do HandleViewableChange ela não deve ser recriada

    const handleViewableChange = useCallback( ({ changed }) => { 
        // changed -> Param que traz os itens que estão visiveis no momento

        setViewable(changed.map( ({ item }) => item.id  ));// return somente os ids

    }, []);

    return(
        <View>
            <FlatList 
                data={feed}
                keyExtractor={ post => String(post.id) }//O Flat precisa que vc crie campos unicos e devem ser retornados em string por isso uso o String()
                //RenderItem -> É onde vamos renderizar os itens de fato e podemos passar ele no formato jsx direto
                renderItem={ ({ item }) => (
                    <Post>
                        <Header>
                            <Avatar source={{ uri: item.author.avatar }} />
                            <Name>{ item.author.name }</Name>
                        </Header>

                        <LazyImage 
                            shouldLoad={viewable.includes(item.id) }
                            aspectRatio={item.aspectRatio} 
                            smallSource={{ uri: item.small }} 
                            source={{ uri: item.image }} 
                        />

                        <Description>
                            <Name>{ item.author.name }</Name> 
                            { item.description }
                        </Description>
                    </Post>
                )}
                onRefresh={refreshList} //Propriedade responsavel por rodar uma function quando o usuario tentar usar o refresh nativo
                refreshing={refreshing} //Propriedade responsavel por verificar se a flatlist está em refresh ou não retorna true or false 
                onEndReached={() => loadPage()} //não passei ele direto como referencia pq o onEndReached ele passa alguns parametros por default e não vou utilizar no momento
                onEndReachedThreshold={0.1}//Range de valores de 0 - 1; logo 0.1 significa 10% da tela.. então ele vai esperar chegar em 10% da flatlist para chamar o onEndReached
                onViewableItemsChanged={handleViewableChange}//Propriedade responsável por dispara uma function quando os itens que estão visiveis em tela mudarem
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}//faz com que o gatilho da onViewableItemsChanged seja executado quando passar de 60%
                ListFooterComponent={loading && <Loading /> }//Propriedade onde podemos configurar um componente para ser renderizado no final
            />
        </View>
    );
}