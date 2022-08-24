const apiKey = 'AIzaSyCIxIIcpTwWrV5HmCj_q4AWZRAqD7y6CFI';
const apiURL = 'https://www.googleapis.com/books/v1/volumes';

export const getBooks = ({keyword = '', startIndex = 0, maxResults = 10}) => {
    return fetch(`${apiURL}?key=${apiKey}&q=${keyword}&startIndex=${startIndex}&maxResults=${maxResults}`)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
};

export const getBookDetail = (id) => {
    return fetch(`${apiURL}/${id}?key=${apiKey}`)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
};
