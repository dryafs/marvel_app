import useHttp from "../hooks/http.hook"

const useMarvelServices = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e00000cd455f06e1f392f90906660fdf';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])

    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? comics.prices[0].price : 'not available',
            description: comics.description ? comics.description : 'There is no description',
            pages: comics.pageCount,
            language: comics.textObjects.language || 'en-us'
        }
    }

    return {
        process,
        setProcess, 
        getAllCharacters, 
        getCharacter, 
        getAllComics, 
        clearError, 
        getComic, 
        getCharacterByName
    }

}



export default useMarvelServices;