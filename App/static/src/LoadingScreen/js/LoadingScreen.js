import React, { useEffect, useState } from 'react'

function LoadingScreen(){
    let loadingMacket = [
        'Loading.',
        'Loading..',
        'Loading...'
    ];
    const[loading, setLoading] = useState(loadingMacket[0]);
    const[counter, setCounter] = useState(0);



    useEffect(() => {
        if(counter > 2 ){
            setCounter(0);
        }
        
        setLoading(loadingMacket[counter]);
        setTimeout(setCounter, 1000, (counter + 1));
    }, [counter]);
        
     
    return (

        <div>{loading}</div>
    )
}

export default LoadingScreen;