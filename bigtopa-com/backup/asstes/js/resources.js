const accordionContainer = document.querySelector("#accordionExample");
import questionsAndAnswers from '../../data/qa.js';
import accordionItem from '../../helperFunc/accordionItem.js';

const activeAccordionIndex = 0; // Stores the currently open accordion index

const renderQuestionsAndAnswers = () => {
  questionsAndAnswers.forEach((item, index) => {
    const { question, answer,id } = item;
    let html = accordionItem(question, answer,id,index === activeAccordionIndex,index);
    accordionContainer.innerHTML += html;
  });

  // Add event listeners to accordion buttons
//   const accordionButtons = accordionContainer.querySelectorAll('.accordion-button');
//   accordionButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//       const clickedIndex = parseInt(event.currentTarget.parentElement.dataset.index);

//       // Toggle active accordion
//       if (clickedIndex === activeAccordionIndex) {
//         // Close the currently open accordion (if clicked again)
//         toggleAccordion(clickedIndex, false);
//       } else {
//         // Open the clicked accordion and close any previously open one
//         toggleAccordion(activeAccordionIndex, false); // Close the previously open one
//         toggleAccordion(clickedIndex, true);
//       }

//       // Update activeAccordionIndex for future clicks
//       activeAccordionIndex = clickedIndex;
//     });
//   });
};

const toggleAccordion = (index, open) => {
  const accordionItem = accordionContainer.querySelector(`.accordion-item[data-index="${index}"]`);
  const collapseElement = accordionItem.querySelector('.collapse');

  if (open) {
    collapseElement.classList.add('show');
  } else {
    collapseElement.classList.remove('show');
  }
};




document.addEventListener("DOMContentLoaded", renderQuestionsAndAnswers);
    