import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './comicsList.scss';

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

const ComicsList = () => {
    const {getAllComics,process, setProcess, clearError} = useMarvelServices()

    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [comicsEnd, setComicsEnd] = useState(false) 

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        getAllComics(offset).then(onComicsLoaded).then(() => setProcess('confirmed'))
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        clearError()

    }

    const onComicsLoaded = (newComics) => {
        newComics.length > 8 ? setComicsEnd(true) : setComicsEnd(false) 

        setComics([...comics, ...newComics])
        setNewItemLoading(false)
        setOffset(offset+8)
    }



    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {setContent(process, newItemLoading, () => <View comics={comics}/>)}
            </ul>
            <button className="button button__main button__long" disabled={newItemLoading} style={comicsEnd ? {'display' : 'none'} : {'display' : 'block'}} onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({comics}) => {
    return(
        <>
            {
                comics.map(item => {
                    const {title, thumbnail, price, id} = item;
                    return(
                        <li className="comics__item" key={id}>
                            <Link to={`/comics/${id}`}>
                                <img src={thumbnail} alt="x-men" key={id} className="comics__item-img"/>
                                <div className="comics__item-name">{title}</div>
                                <div className="comics__item-price">{price}$</div>
                            </Link>
                        </li>
                    )
                })
            }
        
        </>

    )
}


export default ComicsList;