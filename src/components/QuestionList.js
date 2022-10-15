import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
const [questions, setQuestions] = useState([])
  // GET
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [])

  const questionList = questions.map(question => (
    <QuestionItem 
      question={question}
      onDeleteQuestion={handleDeleteQuestion}
      onUpdateQuestion={handleUpdateQuestion}
      key={question.id}
    />
    ))

    function handleDeleteQuestion(deletedQuestion){
      const updatedQuestions = questions.filter(question => question.id  !== deletedQuestion.id)
      setQuestions(updatedQuestions)
    }

    function handleUpdateQuestion(updatedQuestion){
      const updatedQuestions = questions.map(question => {
        if(question.id === updatedQuestion.id){
          return updatedQuestion
        }else{
          return question
        }
      })
      setQuestions(updatedQuestions)
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
