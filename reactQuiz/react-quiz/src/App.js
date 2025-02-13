import { useEffect, useReducer } from 'react';
import Header from './components/Header.js'
import Main from './components/Main.js';
import Error from './components/Error.js';
import Loader from './components/Loader.js';
import StartScreen from './components/StartScreen.js';
import Question from './components/Question.js';
import NextButton from './components/NextButton.js';
import ProgressBar from './components/ProgressBar.js';
import FinishScreen from './components/FinishScreen.js';
import Footer from './components/Footer.js';
import Timer from './components/Timer.js';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state, questions: action.payload,
        status: 'ready'
      };
    case 'loading':
      return { ...state, status: 'loading' };
    case 'error':
      return {
        ...state, status: 'error'
      }
    case 'start': {
      return { ...state, status: 'active', 
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
       }
    }
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points : state.points
      }
    }
    case 'nextQuestion': {
      return { ...state, index: state.index + 1, answer: null }
    }
    case 'restartQuiz': {
      return { ...initialState, questions: state.questions, status: 'ready' }
    }
    case 'finished': {
      return { ...state, status: 'finished' }
    }
    case 'tick': {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished'
          : state.status
      }
    }
    default:
      throw new Error('Action unknown');
  }
}



function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(function () {
    dispatch({ type: 'loading' })
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'error' }))
  }, [])

  return (
    <div className="app">
      <Header />

      <main className="main">
        <Main>

          {state.status === 'loading' && <Loader />}
          {state.status === 'error' && <Error />}
          {state.status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}

          {state.status === 'active' &&
            <>
              <ProgressBar index={state.index}
                numQuestions={numQuestions}
                points={state.points}
                maxPoints={maxPoints}
                answer={state.answer}
              />

              <Question
                dispatch={dispatch}
                question={state.questions[state.index]}
                answer={state.answer}
              />


              <Footer>
                <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining} />
                <NextButton
                  dispatch={dispatch}
                  answer={state.answer}
                  index={state.index}
                  numQuestions={numQuestions}
                />
              </Footer>

            </>
          }

          {state.status === 'finished' && <FinishScreen
            points={state.points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />}

        </Main>
      </main>
    </div>
  );
}

export default App;
