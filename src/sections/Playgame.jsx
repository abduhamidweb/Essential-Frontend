import { useDispatch, useSelector } from "react-redux";
import API from "../API/API";
import { setStartData } from "../features/counter/counterSlice";
import { useEffect, useState } from "react";

const Playgame = () => {
    const { controller, startDate } = useSelector((state) => state.counter);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [updatedArray, setUpdatedArray] = useState([]);

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

    const handleNextQuestion = () => {
        if (currentIndex === startDate.length - 1) {
            console.log(startDate); // Array with all questions and answers
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleVariantChange = (event) => {
        setSelectedVariant(event.target.value);
        // handleCheckAnswer()
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

    useEffect(() => {
        async function postEndData() {
            try {
                if (currentIndex >= startDate.length) {
                    const endDataResponse = await API.API.postEndPlay(updatedArray);
                    // Handle the end data response as needed
                }
            } catch (error) {
                console.log("Error occurred while posting end data:", error);
            }
        }
        if (currentIndex >= startDate.length) {
            postEndData();
        }

    }, [updatedArray])
    if (currentIndex >= startDate.length) {
        return "sa"
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
