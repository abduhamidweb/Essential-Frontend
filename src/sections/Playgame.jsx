import { useDispatch, useSelector } from "react-redux";
import API from "../API/API";
import { setCorrect, setInCorrect, setStartData } from "../features/counter/counterSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Playgame = () => {
    const { controller, startDate } = useSelector((state) => state.counter);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [updatedArray, setUpdatedArray] = useState([]);
    const [cloneUpdatedArray, setCloneUpdatedArray] = useState([]);
    const [correctData, setCorrectData] = useState([]);
    const [incorrectData, setIncorrectData] = useState([]);
    const [errorData, setErrorData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        async function getStartData() {
            try {
                const startDataResponse = await API.API.postStartPlay(controller);
                setCloneUpdatedArray([...startDataResponse]);
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
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function findMatchingElements(correctData, allData) {
        const matchingElements = [];
        for (let i = 0; i < correctData.length; i++) {
            const unitId = correctData[i].unitId;
            for (let j = 0; j < allData.length; j++) {
                if (allData[j].unitId === unitId) {
                    matchingElements.push(allData[j]);
                    break; // Ichki tsikldan chiqish uchun break ishlatamiz
                }
            }
        }
        return matchingElements;
    }
    let allWordsTryAgain = () => {
        async function getStartData() {     
            try {
                dispatch(setStartData(shuffle([...cloneUpdatedArray])));
                setCurrentIndex(0);
                setCorrectData([]);
                setIncorrectData([]);
                setErrorData([]);
            } catch (error) {
                console.log("Error occurred while fetching start data:", error);
            }
        }
        getStartData();
    }
    let allCorrectWordsTryAgain = () => {
        if (correctData.length) {
            const matchedElements = findMatchingElements(correctData, updatedArray);
            dispatch(setStartData([]));
            setUpdatedArray([...matchedElements]);
            dispatch(setStartData(shuffle([...matchedElements])));
            setCurrentIndex(0);
            setCorrectData([]);
            setIncorrectData([]);
            setErrorData([]);
        }
    }
    let allInCorrectWordsTryAgain = () => {
        if (incorrectData.length) {
            const matchedElements = findMatchingElements(incorrectData, updatedArray);
            dispatch(setStartData([]));
            setUpdatedArray([...matchedElements]);
            dispatch(setStartData(shuffle([...matchedElements])));
            setCurrentIndex(0);
            setCorrectData([]);
            setIncorrectData([]);
            setErrorData([]);
        }
    };
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
                    <div className="d-flex mt-4">  <h3 >All words try again:  </h3><button className="btn mx-2" onClick={allWordsTryAgain}>submit</button></div>
                    <div className="d-flex mt-4">   <h3>Correct Answers: </h3> <button className="btn mx-2" onClick={allCorrectWordsTryAgain}> submit</button></div>
                    {correctData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                    <div className="d-flex mt-4"><h3>incorrect Answers: </h3> <button className="btn mx-2" onClick={allInCorrectWordsTryAgain}> submit</button></div>

                    {incorrectData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                    <h3>Error Responses:</h3>
                    {errorData.map(item => (
                        <p key={item._id}>{item.question} - {item.answer}</p>
                    ))}
                    <button onClick={() => {
                        navigate("/")
                    }}>try again</button>
                </>
            )}
        </div>
    );
};
export default Playgame;
