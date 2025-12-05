import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SportQCM = () => {
    const { triggerCinematic, completeAssessment } = useGame();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '',
        fitnessLevel: '',
        goal: '',
        environment: '',
        equipment: '',
        injuries: '',
    });

    useEffect(() => {
        triggerCinematic({
            narration: "Physical resilience is essential for survival. This assessment will determine your combat readiness in the new world.",
            pioneer: { name: "Hedy Lamarr", quote: "Any girl can be glamorous. All you have to do is stand still and look stupid." }
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateProfile = () => {
        const profile = {
            level: formData.fitnessLevel,
            goal: formData.goal,
            exercises: [],
            schedule: [],
            products: [],
        };

        // Logic based on fitness level
        if (formData.fitnessLevel === 'beginner') {
            profile.exercises = [
                { name: 'Bunker Push-ups', reps: '3x10', description: 'Basic upper body strength' },
                { name: 'Scavenger Squats', reps: '3x15', description: 'Leg strength for long journeys' },
                { name: 'Survivor Planks', reps: '3x30s', description: 'Core stability' },
            ];
        } else if (formData.fitnessLevel === 'intermediate') {
            profile.exercises = [
                { name: 'Ruin Climber Pulls', reps: '4x8', description: 'Upper body power' },
                { name: 'Radioactive Burpees', reps: '4x12', description: 'Full body explosive power' },
                { name: 'Bunker Sprints', reps: '5x30s', description: 'Speed and agility' },
            ];
        } else {
            profile.exercises = [
                { name: 'Apocalypse Muscle-ups', reps: '5x5', description: 'Advanced calisthenics' },
                { name: 'Vault Jumps', reps: '5x15', description: 'Explosive leg power' },
                { name: 'Survival Circuit', reps: '3 rounds', description: 'Complete endurance test' },
            ];
        }

        // Add schedule
        profile.schedule = [
            { day: 'Monday', focus: 'Strength Training', duration: '45 min' },
            { day: 'Wednesday', focus: 'Cardio & Agility', duration: '30 min' },
            { day: 'Friday', focus: 'Full Body Circuit', duration: '60 min' },
        ];

        // Add products
        profile.products = [
            { name: 'Resistance Bands (Salvaged)', price: '15 rations' },
            { name: 'Water Purification Tablets', price: '30 rations' },
            { name: 'Protein Supplements (Pre-war)', price: '50 rations' },
        ];

        return profile;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = calculateProfile();
        completeAssessment(profile);

        triggerCinematic({
            narration: "Assessment complete. Your survival profile has been generated. You are now cleared to access your personalized training protocol.",
            pioneer: { name: "Radia Perlman", quote: "I've made a lot of contributions to the field. But I don't consider myself a pioneer." }
        });

        setTimeout(() => {
            navigate('/profile');
        }, 5000);
    };

    return (
        <div className="min-h-screen p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl mb-8 glitch-text" data-text="SURVIVOR_ASSESSMENT">SURVIVOR_ASSESSMENT</h1>

            <form onSubmit={handleSubmit} className="space-y-6 border border-cyan-400 p-8 bg-black/50">
                <div>
                    <label className="block mb-2">AGE:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    />
                </div>

                <div>
                    <label className="block mb-2">CURRENT FITNESS LEVEL:</label>
                    <select
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    >
                        <option value="">Select...</option>
                        <option value="beginner">Beginner - New to physical training</option>
                        <option value="intermediate">Intermediate - Regular training</option>
                        <option value="advanced">Advanced - Veteran survivor</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">PRIMARY GOAL:</label>
                    <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    >
                        <option value="">Select...</option>
                        <option value="strength">Increase Strength</option>
                        <option value="endurance">Improve Endurance</option>
                        <option value="agility">Enhance Agility</option>
                        <option value="overall">Overall Fitness</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">AVAILABLE ENVIRONMENT:</label>
                    <select
                        name="environment"
                        value={formData.environment}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    >
                        <option value="">Select...</option>
                        <option value="bunker">Underground Bunker</option>
                        <option value="ruins">City Ruins</option>
                        <option value="wilderness">Wilderness</option>
                        <option value="mixed">Mixed Terrain</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">AVAILABLE EQUIPMENT:</label>
                    <select
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300"
                    >
                        <option value="">Select...</option>
                        <option value="none">No Equipment</option>
                        <option value="minimal">Minimal (resistance bands, water bottles)</option>
                        <option value="full">Full Gym Access (pre-war facility)</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2">INJURIES OR LIMITATIONS:</label>
                    <textarea
                        name="injuries"
                        value={formData.injuries}
                        onChange={handleChange}
                        placeholder="Describe any injuries or physical limitations..."
                        className="w-full bg-black border border-cyan-400 p-2 text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-300 h-24"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full border-2 border-cyan-400 p-4 hover:bg-cyan-400 hover:text-black transition-colors uppercase tracking-wider text-lg font-bold"
                >
                    [ GENERATE_SURVIVAL_PROFILE ]
                </button>
            </form>
        </div>
    );
};

export default SportQCM;

