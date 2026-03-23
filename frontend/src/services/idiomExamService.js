import idiomExamData from "../../public/data/english/idiom_exam.json";

export const fetchIdiomExamQuestions = (start = 0, limit = 10) => {
  const filteredData = idiomExamData.slice(start, start + limit);
  return Promise.resolve({
    data: filteredData,
    total: idiomExamData.length
  });
};

export const fetchIdiomExamById = (id) => {
  const question = idiomExamData.find(item => item.id === id);
  if (question) {
    return Promise.resolve(question);
  }
  return Promise.reject(new Error('Question not found'));
};

export const shuffleIdiomOptions = (question) => {
  const options = [...question.options];
  const correctAnswerText = options[question.correctAnswer];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  // Find new correct answer index
  const newCorrectAnswer = options.indexOf(correctAnswerText);
  
  return {
    ...question,
    options,
    correctAnswer: newCorrectAnswer
  };
};
