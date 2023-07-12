import { useDispatch, useSelector } from "react-redux";
import API from "../API/API";
import { setStartData } from "../features/counter/counterSlice";
import { useEffect, useState } from "react";

const Playgame = () => {
    const { controller, startDate } = useSelector((state) => state.counter);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [updatedArray, setUpdatedArray] = useState([]);
    const [correctData, setCorrectData] = useState([]);
    const [incorrectData, setIncorrectData] = useState([]);
    const [errorData, setErrorData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getStartData() {
            try {
                const startDataResponse = await API.API.postStartPlay(controller);
                dispatch(setStartData(startDataResponse));
            } catch (error) {
                console.log("Error occurred while fetching start data:", error);
            }
        }
        getStartData();
    }, []);

    const handleVariantChange = (event) => {
        const variant = event.target.value;
        setSelectedVariant(variant);
        handleCheckAnswer(variant);
    };

    const handleCheckAnswer = (variant) => {
        const currentQuestion = startDate[currentIndex];
        const updatedQuestion = {
            ...currentQuestion,
            answer: variant || null
        };

        const newArray = [...updatedArray];
        newArray[currentIndex] = updatedQuestion;
        setUpdatedArray(newArray);
        setCurrentIndex(prevIndex => prevIndex + 1);
        setSelectedVariant('');
    };

    async function postEndData() {
        try {
            if (currentIndex >= startDate.length) {
                const { correct, incorrect, errorRes } = await API.API.postEndPlay(updatedArray);
                setCorrectData([...correct]);
                setIncorrectData([...incorrect]);
                setErrorData([...errorRes]);
            }
        } catch (error) {
            console.log("Error occurred while posting end data:", error);
        }
    }

    useEffect(() => {
        if (currentIndex >= startDate.length) {
            postEndData();
        }
    }, [currentIndex, startDate.length, updatedArray]);

    const currentQuestion = startDate[currentIndex];

    return (
        <div>
            {currentIndex < startDate.length ? (
                <>
                    <h3>{currentQuestion.question}</h3>
                    <div>
                        {currentQuestion.variants.map(variant => (
                            <label key={variant}>
                                <input
                                    type="radio"
                                    value={variant}
                                    checked={selectedVariant === variant}
                                    onChange={handleVariantChange}
                                />
                                {variant}
                            </label>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h3>Correct Answers:</h3>
                    {correctData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                    <h3>Incorrect Answers:</h3>
                    {incorrectData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                    <h3>Error Responses:</h3>
                    {errorData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                </>
            )}
        </div>
    );
};

export default Playgame;
