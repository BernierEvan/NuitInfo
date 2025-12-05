import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Profile = () => {
    const { isAssessmentComplete, userProfile, triggerCinematic } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAssessmentComplete) {
            navigate('/assessment');
            return;
        }

        triggerCinematic({
            narration: "Your profile is complete. Study these protocols. Your survival may depend on this knowledge.",
            pioneer: { name: "Katherine Johnson", quote: "We will always have STEM with us. Some things will drop out of the public eye and will go away, but there will always be science, engineering, and technology." }
        });
    }, [isAssessmentComplete]);

    if (!isAssessmentComplete || !userProfile) {
        return null;
    }

    return (
        <div className="min-h-screen p-4 max-w-6xl mx-auto">
            <h1 className="text-4xl mb-8 glitch-text" data-text="SURVIVAL_PROTOCOL">SURVIVAL_PROTOCOL</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Training Exercises */}
                <div className="border border-cyan-400 p-6 bg-black/50">
                    <h2 className="text-2xl mb-4 border-b border-cyan-400 pb-2">RECOMMENDED_EXERCISES</h2>
                    <div className="space-y-4">
                        {userProfile.exercises.map((exercise, idx) => (
                            <div key={idx} className="border-l-2 border-cyan-400 pl-4">
                                <h3 className="text-xl font-bold text-cyan-300">{exercise.name}</h3>
                                <p className="text-sm opacity-80">{exercise.description}</p>
                                <p className="text-lg mt-1">Volume: {exercise.reps}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training Schedule */}
                <div className="border border-cyan-400 p-6 bg-black/50">
                    <h2 className="text-2xl mb-4 border-b border-cyan-400 pb-2">TRAINING_SCHEDULE</h2>
                    <div className="space-y-3">
                        {userProfile.schedule.map((session, idx) => (
                            <div key={idx} className="bg-blue-900/20 p-3 border border-cyan-400/30">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{session.day}</span>
                                    <span className="text-sm opacity-70">{session.duration}</span>
                                </div>
                                <p className="text-cyan-300 mt-1">{session.focus}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="border border-cyan-400 p-6 bg-black/50 md:col-span-2">
                    <h2 className="text-2xl mb-4 border-b border-cyan-400 pb-2">SUPPLY_RECOMMENDATIONS</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {userProfile.products.map((product, idx) => (
                            <div key={idx} className="border border-cyan-400 p-4 hover:bg-cyan-400/10 transition-colors">
                                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                <p className="text-cyan-300">Cost: {product.price}</p>
                                <button className="mt-3 w-full border border-cyan-400/50 py-1 text-sm hover:bg-cyan-400 hover:text-black transition-colors">
                                    REQUISITION
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Illustration Placeholder */}
                <div className="border border-cyan-400 p-6 bg-black/50 md:col-span-2">
                    <h2 className="text-2xl mb-4 border-b border-cyan-400 pb-2">EXERCISE_DIAGRAMS</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="aspect-square border border-cyan-400/30 bg-blue-900/10 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-2">💪</div>
                                    <p className="text-xs opacity-50">DIAGRAM_{num}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 border border-cyan-400 p-4 bg-blue-900/20">
                <p className="text-center italic">
                    "Stay strong, survivor. The resistance needs you at peak condition."
                </p>
            </div>
        </div>
    );
};

export default Profile;

