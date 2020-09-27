import React, { useEffect, useState } from "react";

import { Animated } from "react-native"; //server para criar componentes animados

import {  Small, Original } from "./styles";


const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({
    smallSource,
    source,
    aspectRatio,
    shouldLoad,
}) {

    const [ loaded , setLoaded ] = useState(false);

    const opacity = new Animated.Value(0);//server para fazer um valor inicial para a animação

    useEffect( () => {
        if( shouldLoad ) {
            // setTimeout( () => {
                setLoaded(true)
            // }, 5000) 
        }
    }, [ shouldLoad ] )

    function handleAnimate() {
        Animated.timing( opacity, {
            toValue: 1,// Onde especifica qual o valor que ele deve ir na animação
            duration: 500,
            useNativeDriver: true,//especifica que essa animação vai ser rodado nativamente
        }).start();
    }

    return(
        <Small 
            source={smallSource} 
            ratio={aspectRatio} 
            resizeMode="contain" 
            blurRadius={2}>
            {
                loaded &&
                <OriginalAnimated 
                    style={{ opacity }}
                    source={source}  
                    ratio={aspectRatio}
                    resideMode="contain"
                    onLoadEnd={handleAnimate}
                />    
            }
            

        </Small>
    ); 
}