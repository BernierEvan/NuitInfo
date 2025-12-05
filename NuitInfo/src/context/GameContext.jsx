import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const characterLines = [
    { text: "What the fuck was that ?", duration: 3000 },
    { text: "NIRD... The Resistance?", duration: 4000 },
    { text: "Well... Guess I should look into that", duration: 4000 },
    { text: "Who in the bloody world are you", duration: 4000 },
    { text: "What if...", duration: 4000 },
    { text: "yeah you already said that", duration: 4000 },
    { text: "Ada Lovelace, the first computer programmer, you look just like NIRD, curious...", duration: 4000 },
    { text: "Grace Hopper", duration: 4000 },
    { text: "Margaret Hamilton", duration: 4000 },
    { text: "Katherine Johnson", duration: 4000 },
    { text: "Hedy Lamarr", duration: 4000 },
    { text: "Radia Perlman, guess you were important after all", duration: 4000 },
    { text: "Carol Shaw, I don't even know who you are", duration: 4000 },
    { text: "Roberta Williams...", duration: 4000 },
];

export const AILines = [
    { text: "I'm NIRD, your AI assistant", duration: 3000 },
    { text: "Don't hesitate to ask me anything", duration: 4000 },
    { text: "I can help you with anything", duration: 4000 },
    { text: "What would you like to know?", duration: 4000 },
    { text: "You discovered my secret.. Have Fun !", duration: 4000 },
];

export const GameProvider = ({ children }) => {
    const [isAssessmentComplete, setIsAssessmentComplete] = useState(() => {
        return localStorage.getItem('isAssessmentComplete') === 'true';
    });
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : null;
    });
    const [showCinematic, setShowCinematic] = useState(false);
    const [cinematicContent, setCinematicContent] = useState(null);

    const completeAssessment = (profile) => {
        setUserProfile(profile);
        setIsAssessmentComplete(true);
        localStorage.setItem('userProfile', JSON.stringify(profile));
        localStorage.setItem('isAssessmentComplete', 'true');
    };

    const triggerCinematic = (content) => {
        setCinematicContent(content);
        setShowCinematic(true);
    };

    const closeCinematic = () => {
        setShowCinematic(false);
        setCinematicContent(null);
    };

    return (
        <GameContext.Provider
            value={{
                isAssessmentComplete,
                userProfile,
                completeAssessment,
                showCinematic,
                triggerCinematic,
                closeCinematic,
                cinematicContent,
                characterLines,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
