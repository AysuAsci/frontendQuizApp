import { useEffect, useState } from 'react';
import ColorSwitcher from './components/ColorSwitcher';
import Opening from './components/Opening';
import Quiz from './components/Quiz';
import Score from "./components/Score";
import './styles/App.css';

// Resimleri import ettim 
import htmlIcon from './assets/icon-html.svg';
import cssIcon from './assets/icon-css.svg';
import jsIcon from './assets/icon-js.svg';
import accessibilityIcon from './assets/icon-accessibility.svg';

import backgroundIconDesktop from './assets/pattern-background-desktop-light.svg';
import backgroundIconMobile from './assets/pattern-background-mobile-light.svg';
import backgroundIconTablet  from './assets/pattern-background-tablet-light.svg';
import backgroundIconDesktopDark from './assets/pattern-background-desktop-dark.svg';
import backgroundIconMobileDark from './assets/pattern-background-mobile-dark.svg';
import backgroundIconTabletDark from './assets/pattern-background-tablet-dark.svg';

// Data kısmını import ettim
import HTMLData from './data/HTMLData.json';
import CSSData from './data/CSSData.json';
import jsData from './data/jsData.json';
import accessibilityData from './data/accessibilityData.json';

const quizes = [
  {
    title: 'HTML',
    icon: htmlIcon,  
    color: '#FFF1E9',
  },
  {
    title: 'CSS',
    icon: cssIcon,  
    color: '#E0FDEF',
  },
  {
    title: 'JavaScript',
    icon: jsIcon,  
    color: '#EBF0FF',
  },
  {
    title: 'Accessibility',
    icon: accessibilityIcon,  
    color: '#F6E7FF',
  }
];

function App() {
  const [pageState, setPageState] = useState('opening');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [quizData, setQuizData] = useState(HTMLData);
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState(null);
  const [score, setScore] = useState(0);
  const [backgroundIcon, setBackgroundIcon] = useState(backgroundIconDesktop);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateBackgroundIcon = () => {
      if(!isDarkMode) {
      if (window.innerWidth < 700) { 
        setBackgroundIcon(backgroundIconMobile);
      } else if(window.innerWidth < 1200) {
        setBackgroundIcon(backgroundIconTablet);
      } else {
        setBackgroundIcon(backgroundIconDesktop);
      }
    } else {
      if (window.innerWidth < 700) { 
        setBackgroundIcon(backgroundIconMobileDark);
      } else if(window.innerWidth < 1200) {
        setBackgroundIcon(backgroundIconTabletDark);
      } else {
        setBackgroundIcon(backgroundIconDesktopDark);
      }
    }
    };

    updateBackgroundIcon(); 
    window.addEventListener('resize', updateBackgroundIcon);
    
    return () => {
      window.removeEventListener('resize', updateBackgroundIcon);
    };
  }, [isDarkMode]);

  useEffect(() => {
    if(selectedQuiz) {
      setPageState('game');
    }

    if(selectedQuiz === 'HTML') {
      setQuizData(HTMLData);
      setIcon(htmlIcon);
      setColor(quizes[0].color);
    } else if(selectedQuiz === 'CSS') {
      setQuizData(CSSData);
      setIcon(cssIcon);
      setColor(quizes[1].color);
    }
    else if(selectedQuiz === 'JavaScript') {
      setQuizData(jsData);
      setIcon(jsIcon);
      setColor(quizes[2].color);
    }
    else if(selectedQuiz === 'Accessibility') {
      setQuizData(accessibilityData);
      setIcon(accessibilityIcon);
      setColor(quizes[3].color);
    }
    
  }
  , [selectedQuiz]);


  return (
    <div className="center">
      <img
        src={backgroundIcon}
        alt='background'
        className='background-icon'
      />
      <div className='wrapper'>
        <ColorSwitcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <div className="panel-wrapper">
          {pageState === 'opening' && <Opening quizes={quizes} setSelectedQuiz={setSelectedQuiz}/>}
          {pageState === 'game' && <Quiz selectedQuiz={selectedQuiz} quizData={quizData} icon={icon} color={color} setPageState={setPageState} setScore={setScore}/>}
          {pageState === 'score' && <Score score={score} selectedQuiz={selectedQuiz} quizData={quizData} icon={icon} color={color} setPageState={setPageState} setScore={setScore} setSelectedQuiz={setSelectedQuiz} />}
        </div>
      </div>
    </div>
  )
}
export default App