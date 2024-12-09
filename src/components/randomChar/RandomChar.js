import { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {
    const [char, setChar] = useState({})

    const {process, setProcess, getCharacter, clearError} = useMarvelServices();

    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        clearError();
        return getCharacter(id).then(onCharLoaded).then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, char, View)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, wiki, homepage} = data
    let imgNotF = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    let classThum = thumbnail === imgNotF ? 'randomchar__img not_found' : 'randomchar__img';

    return(
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className={classThum}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;