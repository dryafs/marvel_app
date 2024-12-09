import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './charList.scss';

const setContent = (process, newItemLoading, Component) => {
    switch(process){
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed':
            return <Component/>
            break
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = ({onCharSelected}) => {
    const [chars, setChars] = useState([])
    const [id, setId] = useState(null)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, process, setProcess, getAllCharacters} = useMarvelServices()

    const onCharSelecte = id => onCharSelected(id) 

    useEffect(() => {
        onRequest(offset, true);

    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset).then(onCharListLoaded).then(() => {setProcess('confirmed')})
    }

    const onCharListLoaded = (newChars) => {
        let ended = false
        if(newChars.length < 9){
            ended = true
        }

        setChars((chars) => [...chars, ...newChars])
        setNewItemLoading(false)
        setOffset(offset => offset+9)
        setCharEnded(ended)
        console.log(newChars)

    }


    const onSelected = (id) => {
        onCharSelecte(id)
        setId(id)

    }


    return (
        <div className="char__list">
            <ul className="char__grid">
                {setContent(process, newItemLoading, () => <View chars={chars} onSelected={onSelected} Sid={id}/>)}
            </ul>
            <button className="button button__main button__long" disabled={newItemLoading} style={charEnded ? {'display' : 'none'} : {'display' : 'block'}} onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>    
    )
}

const View = ({chars, onSelected, Sid}) => { 
    return (
        <>
            {chars.map(item => {
                const {name, thumbnail, id} = item
                let liClass = id === Sid ? "char__item char__item_selected" : "char__item"
                let imgClass = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit' : 'unset'} : {'objectFit' : 'cover'}
                
                return(
                    <li className={liClass} key={id} onClick={() => onSelected(id)}>
                        <img src={thumbnail} alt={name} style={imgClass}/>
                        <div className="char__name">{name}</div>
                    </li>
                )
            })}
        </>
    )
}


export default CharList;