import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/mockData'

export function QuizPage() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState('')
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const isLast = index === questions.length - 1

  const handleAnswer = (option) => {
    setSelected(option)
    if (option === current.answer) {
      setScore((value) => value + 1)
    }
  }

  const handleNext = () => {
    if (!selected) return
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((value) => value + 1)
    setSelected('')
  }

  const resetQuiz = () => {
    setIndex(0)
    setScore(0)
    setSelected('')
    setFinished(false)
  }

  if (finished) {
    return (
      <>
        <header className="top-bar">
          <div className="top-left">
            <button className="icon-button" type="button" aria-label="Open Navigation Menu">
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="brand-wrap">
              <div className="brand-badge">RML</div>
              <span className="brand-name">Quiz App</span>
            </div>
          </div>

          <div className="avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Studio portrait"
              className="avatar"
            />
            <span className="avatar-status" />
          </div>
        </header>

        <main className="content">
          <section className="hero-block">
            <div className="status-chip">
              <span className="pulse-dot" />
              <span>Assessment</span>
            </div>
            <h1>Quiz App</h1>
            <p>Test your React knowledge and challenge your recall.</p>
          </section>

          <div className="module-card result-card">
            <h3>Score: {score}/{questions.length}</h3>
            <p>{score >= 3 ? 'Great job! You know your React basics.' : 'Nice try. Review the topics and try again.'}</p>
            <button type="button" className="primary-action" onClick={resetQuiz}>Restart</button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label="Open Navigation Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">Quiz App</span>
          </div>
        </div>

        <div className="avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            alt="Studio portrait"
            className="avatar"
          />
          <span className="avatar-status" />
        </div>
      </header>

      <main className="content">
        <section className="hero-block">
          <div className="status-chip">
            <span className="pulse-dot" />
            <span>Assessment</span>
          </div>
          <h1>Quiz App</h1>
          <p>Test your React knowledge and challenge your recall.</p>
        </section>

        <div className="module-card quiz-card">
          <div className="quiz-topline">
            <span>Question {index + 1}</span>
            <span>{score} pts</span>
          </div>
          <h3>{current.prompt}</h3>

          <div className="quiz-options">
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                className={`quiz-choice ${selected === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button type="button" className="primary-action" onClick={handleNext} disabled={!selected}>Next</button>
        </div>
      </main>
    </>
  )
}
