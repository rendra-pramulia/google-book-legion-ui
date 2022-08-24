import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Caption, Body, Heading, Spinner, Badge, Button, Anchor } from 'legion-ui';
import useApi from '../hooks/useApi';
import { getBookDetail } from '../api/books';
import { ShoppingBag, Star } from 'react-feather';

function Detail() {
    const imgPlaceholderURL = 'https://via.placeholder.com/300';
    const { id } = useParams();
    const [title, setTitle] = useState('');

    const Book = useApi(getBookDetail);

    const image = useMemo(() => {
        if (Book.data) {
            let img = Book.data.volumeInfo.imageLinks;
            return img.thumbnail || img.extraLarge || img.large || img.medium || imgPlaceholderURL;
        }
        return imgPlaceholderURL;
    }, [Book.data]);

    const author = useMemo(() => {
        let newAuthor = '';
        if (Book.data) {
            let authorList = Book.data.volumeInfo && Book.data.volumeInfo.authors;
            if (authorList) {
                newAuthor = authorList.join(', ');
            }
        }
        return newAuthor;
    }, [Book.data]);

    const getId = (query) => {
        let params = query.split('_');
        setTitle(params[1]);
        return params[0];
    };

    const currencyFormat = (num, code) => {
        return code + ' ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    useEffect(() => {
        if (id) {
            Book.request(getId(id));
        }
    }, [id]);

    return (
        <>
            {Book.loading ? (
                <Spinner variant="secondary" sx={{margin: '5em auto'}} />
            ) : (
                Book.data ? (
                    <>
                        <div className="detail-top-container">
                            <div className="detail-figure">
                                <img className="detail-image" src={image} alt={image ? image : 'no-image'} />
                            </div>
                            <div className="detail-item">
                                <Heading className="detail-margin" size="h6">{title}</Heading>
                                <div className="detail-category">
                                    <Body variant="lg_italic">{author}</Body>
                                </div>
                                <div className="mb-1">
                                    <Body variant="sm_underline_semibold">{`${Book.data.volumeInfo.publisher} (${Book.data.volumeInfo.publishedDate})`}</Body>
                                </div>
                                <div className="detail-category">
                                    {(Book.data.volumeInfo.categories || []).map((cat, idx) => (
                                        <Badge size="small" className="detail-category" variant="secondary" key={`category-${idx}`}>{cat}</Badge>
                                    ))}
                                </div>
                                {Boolean(Book.data.volumeInfo.ratingsCount) && (
                                    <div className="detail-rating">
                                        {Boolean(Book.data.volumeInfo.averageRating) ? (
                                            Array.from(Array(Math.round(Book.data.volumeInfo.averageRating)), (e, i) => <Star key={`star-${i}`} fill="#ffce3d" color="#ffce3d" size="16" />)
                                        ) : <div style={{height: 20}}></div>}
                                        <Caption className="detail-rating-count">({Book.data.volumeInfo.ratingsCount})</Caption>
                                    </div>
                                )}
                                {Book.data.saleInfo.saleability === 'FOR_SALE' && (
                                    <div className="detail-category mb-1">
                                        <Body variant="lg_semibold">{currencyFormat(Book.data.saleInfo.retailPrice.amount, Book.data.saleInfo.retailPrice.currencyCode)}</Body>
                                    </div>
                                )}
                                {Book.data.saleInfo.buyLink && (
                                    <Anchor href={Book.data.saleInfo.buyLink} target="_blank">
                                        <Button iconLeft={<ShoppingBag/>}>Buy Now</Button>
                                    </Anchor>
                                )}
                            </div>
                        </div>
                        <div className="detail-synopsis" dangerouslySetInnerHTML={{ __html: Book.data.volumeInfo.description }}>
                        </div>
                    </>
                ) : (
                    <Body className="center" variant="lg_italic">Data not found</Body>
                )
            )}
        </>
    );
}

export default Detail;
