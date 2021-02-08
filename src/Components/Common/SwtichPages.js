import React, {useState} from 'react';
import styles from './switchpages.module.css'

export const SwitchPages = ({totalItemsCount,pageSize,currentPage,portionSize=10,...props}) =>{
    const pagesCount = Math.ceil(totalItemsCount/pageSize);
    const pages = [];
    for(let i = 1 ; i <=pagesCount;i++){
        pages.push(i);
    };
    let [currentPortion, setCurrentPortion] = useState(1);
    let portionCount = Math.ceil(pagesCount/portionSize);
    let leftlim = (currentPortion-1)*portionSize+1;
    let rightlim = currentPortion*portionSize;
return <span>
    {leftlim >1 && <button onClick={()=>setCurrentPortion(1)}>{'<<<'}</button>}
    {leftlim >1 && <button onClick={()=>setCurrentPortion(currentPortion-1)}>{'<'}</button>}
    {
        pages.filter(p=> p<= rightlim && p>= leftlim)
            .map(p=>{
                return <span onClick={()=>props.onPageChanged(p)}>

                    {p==currentPage?<b>{p} </b> :p}{' '}
                </span>
            })
    }
    {currentPortion < portionCount && <button onClick={()=>{setCurrentPortion(currentPortion+1)}}>{'>'}</button>  }
    {currentPortion < portionCount && <button onClick={()=>{setCurrentPortion(portionCount)}}>{'>>>'}</button>  }
</span>

}