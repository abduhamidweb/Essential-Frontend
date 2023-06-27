import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAllContr } from "../features/counter/counterSlice";

const Controller = () => {
    const { books, controller, units } = useSelector((state) => state.counter);

    const [contr, setContr] = useState({});
    const [bookId, setBookId] = useState([]);
    const dispatch = useDispatch();
    dispatch(setAllContr("ok"));
    function handlerBook(e) {
        if (e.target.value) {
            books.forEach(book => {
                if (book.bookname == e.target.value) {
                    bookId.push(book._id);
                    setBookId([...bookId]);
                }
            })
        }
    }

    // {
    //     units.map((unit) => {
    //         {
    //             bookId.map((bookId) => {
    //                 if (bookId == unit._id) {
    //                     // return <option key={unit._id} className="form-control">{unit.unitname}</option>
    //                 }
    //             })
    //         }
    //     })
    // }
    function handlerUnit(e) {
        if (e.target.value) {
            // books.forEach(book => {
            //     if (book.bookname == e.target.value) {
            //         bookId.push(book._id);
            //         setBookId([...bookId]);
            //     }
            // })
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <select name="" id="" className="form-control" onChange={(e) => {
                        handlerBook(e);
                    }}>
                        <option selected disabled>select book</option>
                        {
                            books.map((book) => {
                                return <>
                                    <option className="form-control">{book.bookname}</option>
                                </>
                            })
                        }
                    </select>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <select name="" id="" className="form-control" onChange={(e) => {
                        handlerUnit(e);
                    }}>
                        <option selected disabled>select units</option>
                        {
                            // bookId.length ? bookId.map(bookid => {
                            //     units.map(unit => {
                            //         if (unit.bookId == bookid) {
                            //             // return <><option >{ unit.unitname}</option></>  
                            //             return <>
                            //                 <option value={unit.unitname}> unit.unitname </option>
                            //             </>
                            //         }
                            //     })
                            // }) : ""
                        }
                    </select>
                </div>
            </div>
        </>
    );
};

export default Controller;