import '../styles/Score.css'

const Score = ({score, selectedQuiz, color, icon, quizData, setPageState, setScore, setSelectedQuiz}) => {

    const resetQuiz = () => {
        setPageState('opening');
        setScore(0);
        setSelectedQuiz('');
    }
    return (
        <>
            <div className="quiz-title">
                <div className="img-icon-wrapper" style={{backgroundColor: color}}><img src={icon} alt={selectedQuiz.title} /></div>
                <h1>{selectedQuiz}</h1>
            </div>
            <div className="score-panel">
                <div className="score-title">
                    Test Tamamlandı<span>Puanınız...</span>
                </div>
                <div className="display-panel">
                    <div className="display-score">
                        <div className="display-icon">
                            <div className="img-icon-wrapper" style={{backgroundColor: color}}><img src={icon} alt={selectedQuiz.title} /></div>
                            <h1>{selectedQuiz}</h1>
                        </div>
                        <div className="out-of-score">
                            {score} <span>üzerinden {quizData.length}</span>
                        </div>
                    </div>
                    <button className="play-again" onClick={resetQuiz}>Yeniden Oyna</button>
                </div>
            </div>
        </>
    );
};

export default Score;