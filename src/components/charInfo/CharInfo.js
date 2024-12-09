import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';
import useMarvelServices from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = ({selectedId}) => {
    const [char, setChar] = useState(null);

    const {process, setProcess, getCharacter} = useMarvelServices();

    useEffect(() => {
        updateChar()
    }, [selectedId])

    const updateChar = () => {
        if(!selectedId){
            return;
        }
        getCharacter(selectedId).then(onCharLoaded).then(() => {setProcess('confirmed')})
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, char, View)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgClass = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit' : 'contain'} : {'objectFit' : 'cover'}

    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt="" style={imgClass}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {(comics.length > 0) ? null : 'there is no comics with this charecter'}
                    {  
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if(i > 9) return;
                            return(
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}


export default CharInfo;