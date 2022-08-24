import { useEffect, useState, useMemo } from 'react';
import { Body, Caption, Button } from 'legion-ui';
import { Star } from 'react-feather';
import { Link } from 'react-router-dom';

function Book({data, index, ...rest}) {
    const imgPlaceholderURL = 'https://via.placeholder.com/150';
    const [authorList, setAuthorList] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const link = useMemo(() => {
        let name = data.volumeInfo.title.replace(' ', '-');
        return `/${data.id}_${name}`;
    }, [data]);

    const getAuthorList = (item) => {
        let newAuthor = '';
        let authorList = item.volumeInfo && item.volumeInfo.authors;
        if (authorList) {
            newAuthor = authorList.join(', ');
        }
        setAuthorList(newAuthor);
    };

    const getThumbnail = (item) => {
        let thumbnail = item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
        setThumbnail(thumbnail ? thumbnail : imgPlaceholderURL);
    };

    useEffect(() => {
        if (data) {
            getAuthorList(data);
            getThumbnail(data);
        }
    }, [data]);

    return (
        <li className="item" key={`books-${index}`}>
            <div className="item-figure">
                <img className="item-image" src={thumbnail} alt={thumbnail ? data.volumeInfo.title : 'no-image'} />
            </div>
            <div className="item-title">
                <Body className='ellipsis2' variant="sm_bold">{data.volumeInfo.title}</Body>
            </div>
            <Caption className="ellipsis1 item-author" variant="sm_bold">{authorList}</Caption>
            <div className="item-rating">
                {Boolean(data.volumeInfo.averageRating) ? (
                    Array.from(Array(Math.round(data.volumeInfo.averageRating)), (e, i) => <Star key={`star-${i}`} fill="#ffce3d" color="#ffce3d" size="16" />)
                ) : <div style={{height: 20}}></div>}
            </div>
            <Link to={link}>
                <Button className="item-button" variant="softSecondary">view</Button>
            </Link>
        </li>
    );
};

export default Book;
