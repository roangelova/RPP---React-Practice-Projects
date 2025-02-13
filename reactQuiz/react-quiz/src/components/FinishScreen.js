function FinishScreen({points, maxPoints}){
    return(
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPoints}!
        </p>
    )
};

export default FinishScreen;