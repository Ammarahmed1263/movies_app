import { useAppDispatch, useAppSelector } from "./useRedux";
import { RootState } from "@redux/types";
import { searchMoviesByKeyword } from "@redux/search";
import { useCallback, useEffect } from "react";
import { resetSearch, setLoading } from "@redux/search/searchSlice";

const useMovieSearch = (keyword: string) => {
    const { results, page, total_pages, loading } = useAppSelector((state: RootState) => state.search)
    console.log('current state: ', keyword, results.length, page, total_pages, loading)
    const dispatch = useAppDispatch();

    const handleSearch = useCallback(async () => {
        dispatch(resetSearch());
        
        if (keyword === '') {
            dispatch(setLoading(false));
            // dispatch(resetSearch());
            return;
        }

        dispatch(setLoading(true));
        const id = setTimeout(() => dispatch(searchMoviesByKeyword({ query: keyword, page: 1 })), 500);
        console.log('body called')
        return () => clearTimeout(id);
    }, [dispatch, keyword]);

    const handlePagination = useCallback(() => {
        if (page < total_pages && !loading) {
            dispatch(searchMoviesByKeyword({ query: keyword, page: page + 1 }));
        }
    }, [dispatch, keyword, page, total_pages, loading]);

    useEffect(() => {
        handleSearch();
    }, [keyword, dispatch]);

    return {
        results,
        page,
        total_pages,
        loading,
        handlePagination
    }
}

export default useMovieSearch;