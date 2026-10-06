import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { questions } from '../data/mockData'
import { useLanguage } from '../i18n'
import '../assets/style/pages/QuizPage.scss'

export function QuizPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState('')
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const isLast = index === questions.length - 1
  const progress = useMemo(() => ((index + (finished ? 1 : 0)) / questions.length) * 100, [finished, index])

  const handleAnswer = (option) => {
    if (selected) return

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

  const handlePrevious = () => {
    if (index === 0) return
    setIndex((value) => value - 1)
    setSelected('')
  }

  const resetQuiz = () => {
    setIndex(0)
    setScore(0)
    setSelected('')
    setFinished(false)
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100)

    return (
      <>
        <header className="top-bar">
          <div className="top-left">
            <button className="icon-button" type="button" aria-label={t('common.openMenu')}>
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="brand-wrap">
              <div className="brand-badge">RML</div>
              <span className="brand-name">{t('dashboard.title')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LanguageSwitcher />
            <div className="avatar-wrap">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt="Studio portrait"
                className="avatar"
              />
              <span className="avatar-status" />
            </div>
          </div>
        </header>

        <main className="content quiz-page">
          <section className="quiz-hero">
            <div className="quiz-status">
              <span className="pulse-dot" />
              <span>{t('quiz.status')}</span>
            </div>
            <h1>{t('quiz.title')}</h1>
          </section>

          <div className="module-card quiz-result">
            <div className="quiz-result-top">
              <span className="quiz-badge">{t('quiz.score')}</span>
              <span className="result-pill">{percent}%</span>
            </div>

            <h2>{score} / {questions.length} correct</h2>
            <p>
              {percent >= 75 ? 'Excellent work. You command the core React patterns with confidence.' : 'Solid effort. Review the concept and run it again to sharpen the flow.'}
            </p>

            <div className="quiz-result-score">
              <div className="quiz-stat">
                <small>{t('quiz.accuracy')}</small>
                <strong>{percent}%</strong>
              </div>
              <div className="quiz-stat">
                <small>{t('quiz.avgSpeed')}</small>
                <strong>14.2s</strong>
              </div>
            </div>

            <button type="button" className="primary-action" onClick={resetQuiz}>{t('quiz.restart')}</button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button className="icon-button" type="button" aria-label={t('common.openMenu')}>
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="brand-wrap">
            <div className="brand-badge">RML</div>
            <span className="brand-name">{t('dashboard.title')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LanguageSwitcher />
          <div className="avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Studio portrait"
              className="avatar"
            />
            <span className="avatar-status" />
          </div>
        </div>
      </header>

      <main className="content quiz-page">
        <section className="quiz-hero">
          <div className="quiz-status">
            <span className="pulse-dot" />
            <span>{t('quiz.status')}</span>
          </div>
          <h1>{t('quiz.title')}</h1>
        </section>

        <div className="module-card quiz-surface">
          <div className="quiz-header-row">
            <div className="quiz-badges">
              <span className="quiz-badge">React</span>
              <span className="quiz-badge">JavaScript</span>
              <span className="quiz-badge">HTML / CSS</span>
            </div>
            <span className="quiz-score-tag">{t('quiz.score')}: {score}/{questions.length}</span>
          </div>

          <div className="quiz-progress" aria-label="Question progress">
            <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-meta-row">
            <span>{t('quiz.questionOf')} {index + 1} {t('quiz.of')} {questions.length}</span>
            <span>{current.category}</span>
          </div>

          <h2>{current.prompt}</h2>

          <div className="ctn-quiz-options">
            {current.options.map((option) => {
              const isSelected = selected === option
              const isCorrect = option === current.answer
              const isWrong = selected && isSelected && !isCorrect

              return (
                <button
                  key={option}
                  type="button"
                  className={[
                    'quiz-option',
                    isSelected ? 'is-selected' : '',
                    selected && isCorrect ? 'is-correct' : '',
                    isWrong ? 'is-wrong' : '',
                  ].join(' ')}
                  onClick={() => handleAnswer(option)}
                  disabled={Boolean(selected)}
                >
                  <span className="quiz-option--key">{String.fromCharCode(65 + current.options.indexOf(option))}</span>
                  <span>{option}</span>
                </button>
              )
            })}
          </div>

          <div className="quiz-actions">
            <button type="button" className="quiz-action-button" onClick={handlePrevious} disabled={index === 0}>
              {t('quiz.previous')}
            </button>
            <button type="button" className="quiz-action-button primary" onClick={handleNext} disabled={!selected}>
              {isLast ? t('quiz.seeResults') : t('quiz.next')}
            </button>
          </div>
        </div>

        <div className="module-card quiz-telemetry">
          <div className="quiz-telemetry-header">
            <h3>{t('quiz.sessionTelemetry')}</h3>
            <span className="quiz-live">{t('quiz.live')}</span>
          </div>

          <div className="quiz-stats-grid">
            <div className="quiz-stat">
              <small>{t('quiz.accuracy')}</small>
              <strong>100%</strong>
            </div>
            <div className="quiz-stat">
              <small>{t('quiz.avgSpeed')}</small>
              <strong>14.2s</strong>
            </div>
            <div className="quiz-stat">
              <small>{t('quiz.answered')}</small>
              <strong>{Math.min(index + 1, questions.length)}/{questions.length}</strong>
            </div>
          </div>

          <div className="quiz-topic-tags">
            <span className="quiz-topic-tag">useState</span>
            <span className="quiz-topic-tag">useEffect</span>
            <span className="quiz-topic-tag">useContext</span>
            <span className="quiz-topic-tag">useMemo</span>
          </div>
        </div>
      </main>
    </>
  )
}
