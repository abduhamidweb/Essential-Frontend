import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import API from '../API/API';
import { setAllProducts, setAllCategory } from '../features/counter/counterSlice';
const Data = () => {
    const { category } = useSelector((state) => state.counter)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                let data = await API.API.getData(category)
                dispatch(setAllProducts(data))
            } catch (error) {
                console.error(error); // Xatolarni konsolega chiqarish
            }
        };

        fetchData(); // fetchData funksiyasini chaqirish
        // [] deps massivida bo'sh o'rin yaratish, shu bilan birga useEffect funktsiyasini faqat bir martta ishga tushirish
    }, [category]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await API.API.getData()
                dispatch(setAllCategory(data))
            } catch (error) {
                console.error(error); // Xatolarni konsolega chiqarish
            }
        };
        fetchData(); // fetchData funksiyasini chaqirish
        // [] deps massivida bo'sh o'rin yaratish, shu bilan birga useEffect funktsiyasini faqat bir martta ishga tushirish
    }, []);
    return (
        <>

        </>
    );
};

export default Data;