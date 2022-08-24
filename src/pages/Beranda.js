import { useState, useMemo, useEffect } from 'react';
import { Body, Textfield, Spinner, Button } from 'legion-ui';
import { X, Search } from 'react-feather';
import useDebounce from '../hooks/useDebounce';
import { getBooks } from '../api/books';
import useApi from '../hooks/useApi';
import BookComponent from '../components/Book';
import { useSearchParams } from 'react-router-dom';

const defaultLimit = 10;

function Beranda() {
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(0);

    const Book = useApi(getBooks); 
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    const [searchParams, setSearchParams] = useSearchParams();

    const variant = useMemo(() => {
        if (!keyword) {
            return 'normal'
        } else if (keyword.length < 3) {
            return 'error'
        } else {
            return 'success'
        }
    }, [keyword]);

    const showLoadMore = useMemo(() => {
        if (Book.data?.items?.length && !Book.loadingMore) {
            return Boolean(defaultLimit % Book.data.items.length === 0);
        }
        return false;
    }, [limit, Book.data, Book.loadingMore]);

    const getBook = (limits) => {
        if (variant !== 'error') {
            Book.request({keyword, maxResults: defaultLimit, startIndex: limits});
            setSearchParams({ keyword });
        }
    };

    const onLoadMore = async () => {
        let newLimit = limit + defaultLimit;
        setLimit(newLimit);
        getBook(newLimit);
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            getBook();
        } else {
            setSearchParams({ keyword: '' });
            Book.updateData(null);
            Book.updateList([]);
        }
    },[debouncedSearchTerm]);

    useEffect(() => {
        const key = searchParams.get('keyword');
        if (key) {
            setKeyword(key);
        }
    }, []);
    
    return (
        <>
            <div className="search-container">
                <Textfield
                    placeholder="Search Book"
                    name="keyword"
                    errorMessage={variant === 'error' && 'Must have a minimum of 3 characters'}
                    iconLeft={<Search/>}
                    iconRight={Book.loading ? <Spinner variant="secondary" /> : variant === 'success' ? <X onClick={() => setKeyword('') } /> : false}
                    disabled={Book.loading}
                    value={keyword}
                    variant={variant}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className="center item-found">
                {Book.loading === false && Book.data && (
                    <Body variant="lg_reguler">Found {Book.count} books</Body>
                )}
            </div>
            {Book.loading === true ? (
                <div className="center">
                    <Spinner variant="secondary" sx={{mt: '10em'}} />
                </div>
            ) : (
                <>
                    <ul className="content">
                        {Book?.list && Book.list.map((item, index) => <BookComponent data={item} index={index} key={`books-${item.id}`} />)}
                    </ul>
                    {showLoadMore && (
                        <Button className="load-more-container" variant="outlineSecondary" onClick={onLoadMore}>Load more</Button>
                    )}
                    {Book.loadingMore && (
                        <Spinner className="load-more-container" variant="secondary" />
                    )}
                </>
            )}
        </>
    );
}

export default Beranda;
