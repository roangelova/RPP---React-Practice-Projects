function Options({
    question,
    answer,
    dispatch }) {

    const questionAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) =>
                <button
                className={`btn btn-option ${index === answer ? "answer" : ""} ${
                  questionAnswered
                    ? index === question.correctOption
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                key={option}
                disabled={questionAnswered}
                onClick={() => dispatch({ type: "newAnswer", payload: index })}
              >
                {option}
              </button>
            )}
        </div>
    )
};

export default Options;