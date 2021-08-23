import React from 'react'

import { router } from '@forge/bridge';
import BitBucketLogo from '../../../../assets/Logos/Bitbucket.png'
import '../css/AccessBitBucket.css'

export default function AccessBitBucket(props){
    
    setTimeout(() => {
        let bitbucketAccess = document.getElementsByClassName("access access-successful-bitbucket");
        
        if(bitbucketAccess.length === 0){
        
                let bitbucket = document.getElementsByClassName("access no-access-bitbucket")[0];

                if(props.isBitBucketAccessExist === true){
                    
                    bitbucket.classList.remove('no-access-bitbucket');
                    bitbucket.classList.add('access-successful-bitbucket');
                    bitbucket.innerText = 'access-successful';
                }
            }   
    }, 0);
        
    function OpenBitBucketAccess(){

        router.open(`https://actionsofemployees.herokuapp.com/access_bitbucket?state=${props.state}`);
    }
    
    return(
        <label class="label-bitbucket label-access"   >
        <img 
            class="imgs"
            id='img-bitBucket'
            src={BitBucketLogo}
        />
        <div class="text">
            <span>Click on the label to authenticate our app "Actions Of Emplyees" in BitBucket</span>
        </div>

        <div class="access no-access-bitbucket">No access</div>
        <button id="btn-bitBucket" onClick={OpenBitBucketAccess}>AccessBitBucket</button>

    </label>
    )
} 


