import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import API from '../API/API';
import { setAllBooks, setAllUnits } from '../features/counter/counterSlice';
const Data = () => {
    const dispatch = useDispatch();
    async function getDataBooks() {
        let books = await API.API.getDataBook();
        dispatch(setAllBooks(books));
    }
    async function getDataUnits() {
        let units = await API.API.getDataUnits();
        dispatch(setAllUnits(units));
    }


    useEffect(() => {
        getDataBooks();
        getDataUnits()
    }, []);
    return (
        <>

        </>
    );
};

export default Data;