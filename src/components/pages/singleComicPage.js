import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss' 


const SingleComicPage = () => {
    const [comic, setComic] = useState({})
    const {process, setProcess, getComic, clearError} = useMarvelServices();

    const {comicId} = useParams()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId).then(onComicLoaded).then(() => setProcess('confirmed'))
    }
    
    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    return (
        <div className="single-comic">
            {setContent(process, comic, View)}
        </div>
    )
}

const View = ({data}) => {
    const {title, thumbnail, description, pages, price, language} = data

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;