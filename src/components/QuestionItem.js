import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    console.log('Delete btn got clicked!')
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE' 
    })
    .then(r => r.json())
    .then(() => onDeleteQuestion(question))
  }

  function handleUpdateQuestion(e){
    console.log(e)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        correctIndex: e.target.value
      })
    })
    .then(r => r.json())
    .then(updatedQuestion => {
      console.log(updatedQuestion)
      // update state
      onUpdateQuestion(updatedQuestion)
    })
  }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdateQuestion} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
