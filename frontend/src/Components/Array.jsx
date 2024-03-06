import React, { useState } from 'react';

const Array = () => {
  // Array containing 5 questions
  const questions = [
    "Why Speaking English is important in today's world? ",
    "What are the Pros and Cons of social media in people's life? ",
    "Tell me about your daily routine",
    "What do you like to do in free time?",
    "Talk about your goal and ambition in your life.",
    "Tell me about the place you visited recently.",
    "Share your opinion on Junk Food and its effect.",
    "Describe what do you do if you receive a very large amount of money.",
    "What would be the world without Internet?",
    "Describe the problems in your country.",
  ];

  // State to hold the randomly selected question
  const [randomQuestion, setRandomQuestion] = useState('');

  // Function to select a random question from the array of questions
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  // Set the random question when the component mounts
  useState(() => {
    setRandomQuestion(getRandomQuestion());
  }, []);

  return (
    <div>
      <p>{randomQuestion}</p>
    </div>
  );
};

export default Array;
