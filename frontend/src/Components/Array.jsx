import React, { useState } from 'react';

const Array = () => {
  // Array containing 5 questions
  const questions = [
    "Discuss the role of AI in modern science.",
    "What are the benefits of machine learning?",
    "How does artificial intelligence impact daily life?",
    "Explain the concept of neural networks.",
    "Discuss the future of AI technology."
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
