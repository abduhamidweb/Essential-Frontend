import { useDispatch, useSelector } from "react-redux";
import API from "../API/API";
import { setStartData } from "../features/counter/counterSlice";
import { useEffect, useState } from "react";

const Playgame = () => {
    const { controller, startDate } = useSelector((state) => state.counter);
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [updatedArray, setUpdatedArray] = useState([]);

    const handleNextQuestion = () => {
        if (currentIndex === startDate.length - 1) {
            console.log(startDate); // Array with all questions and answers
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleVariantChange = (event) => {
        setSelectedVariant(event.target.value);
    };

    const handleCheckAnswer = () => {
        const currentQuestion = startDate[currentIndex];
        const updatedQuestion = {
            ...currentQuestion,
            answer: selectedVariant
        };

        const newArray = [...updatedArray];
        newArray[currentIndex] = updatedQuestion;
        setUpdatedArray(newArray);

        setCurrentIndex(prevIndex => prevIndex + 1);
        setSelectedVariant('');
    };

    if (currentIndex >= startDate.length) {
        return <div>All questions answered!</div>;
    }

    const currentQuestion = startDate[currentIndex];

    return (
        <div>
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
            <button onClick={handleCheckAnswer}>Check Answer</button>
            <button onClick={handleNextQuestion}>Next Question</button>
            <div>
                <pre>{JSON.stringify(updatedArray, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Playgame;
