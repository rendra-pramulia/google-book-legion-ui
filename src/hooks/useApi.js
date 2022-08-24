import { useState } from 'react';

const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const request = async (params) => {
        setError(false);
        if (params.startIndex) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await apiFunc(params);
            let newList = response.items || [];
            if (params.startIndex) {
                setLoadingMore(false);
                newList = [...list, ...newList];
            } else {
                setCount(response.totalItems);
                setLoading(false);
            }
            setError(false);
            setList(newList);
            setData(response || null);
            return response;
        } catch (error) {
            setError(true);
            setLoading(false);
            setLoadingMore(false);
            return { success: false, data: null };
        }
    };

    const updateData = (dt) => {
        setData(dt);
        setError(false);
        setLoading(false);
    };

    const updateList = (dt) => {
        setList(dt);
        setError(false);
        setLoading(false);
    };

    return { data, list, count, error, loading, loadingMore, request, updateData, updateList };
};

export default useApi;
