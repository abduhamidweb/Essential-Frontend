import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAllContr } from "../features/counter/counterSlice";

const Controller = () => {
    const dispatch = useDispatch();
    dispatch(setAllContr("ok"));
    const [contr, setContr] = useState({});

    const { books, controller, units } = useSelector((state) => state.counter);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [wordsCount, setWordsCount] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Seçili birimler veya kitaplar değiştiğinde wordsCount'u güncelle
        let count = 0;
        selectedUnits.forEach(unitId => {
            const unit = units.find(unit => unit._id === unitId);
            count += unit.words.length;
        });
        setWordsCount(count);
    }, [selectedUnits, selectedBooks]);

    const handleBookCheckboxChange = (event, bookId) => {
        if (event.target.checked) {
            setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, bookId]);
        } else {
            setSelectedBooks(prevSelectedBooks =>
                prevSelectedBooks.filter(id => id !== bookId)
            );
            setSelectedUnits(prevSelectedUnits =>
                prevSelectedUnits.filter(unitId =>
                    units.find(unit => unit._id === unitId).bookId !== bookId
                )
            );
        }
    };
    const handleUnitCheckboxChange = (event, unitId) => {
        if (event.target.checked) {
            setSelectedUnits(prevSelectedUnits => [...prevSelectedUnits, unitId]);
        } else {
            setSelectedUnits(prevSelectedUnits =>
                prevSelectedUnits.filter(id => id !== unitId)
            );
        }
    };

    return (
        <>
            <div className="row">
                <div>
                    <h2>Kitoblar</h2>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    {books.map(book => (
                        <li key={book._id}>
                            <h3>{book.bookname.substring(30, 1000)}</h3>
                            <input
                                type="checkbox"
                                checked={selectedBooks.includes(book._id)}
                                onChange={event => handleBookCheckboxChange(event, book._id)}
                            />
                        </li>
                    ))}
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <h2>Unitlar</h2>

                    {units
                        .filter(unit => selectedBooks.includes(unit.bookId))
                        .map(unit => (
                            <li key={unit._id}>
                                <h3>{unit.unitname}</h3>
                                <p>{unit.description}</p>
                                <input
                                    type="checkbox"
                                    checked={selectedUnits.includes(unit._id)}
                                    onChange={event => handleUnitCheckboxChange(event, unit._id)}
                                />
                            </li>
                        ))}
                </div>
            </div>
            <p>qancha soz bilan randomli o'yin o'ynaysiz. taxminan {count ? count : wordsCount} bilan o'ynamoqchimisiz. bu ko'pmasmi?</p>
            <input type="range" max={wordsCount} maxLength={wordsCount}  onChange={(e) => {
                setCount(e.target.value);
            }} />
        </>
    );
};

export default Controller;
