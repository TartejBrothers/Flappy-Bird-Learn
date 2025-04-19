import { Question } from '../types';

// Array of questions about Software Construction and Product Management
const questions: Question[] = [
  // Software Construction - Coding Standards
  {
    text: "Which of the following is NOT typically included in coding standards?",
    options: [
      "Naming conventions",
      "Hardware specifications",
      "Commenting guidelines",
      "Indentation rules"
    ],
    correctAnswer: "Hardware specifications",
    topic: "Software Construction"
  },
  {
    text: "Which programming practice helps in reducing code duplication?",
    options: [
      "Copy-pasting code",
      "Function abstraction",
      "Using more global variables",
      "Inline coding"
    ],
    correctAnswer: "Function abstraction",
    topic: "Software Construction"
  },
  
  // Software Construction - Code Reviews
  {
    text: "Which review technique involves a group of developers examining code line by line?",
    options: [
      "Walkthroughs",
      "Unit testing",
      "Code inspections",
      "Alpha testing"
    ],
    correctAnswer: "Code inspections",
    topic: "Software Construction"
  },
  {
    text: "What is a 'desk check' in software development?",
    options: [
      "A physical inspection of the developer's desk",
      "Manual review of code by the developer themselves",
      "Evaluation of ergonomics in the workspace",
      "Hardware verification process"
    ],
    correctAnswer: "Manual review of code by the developer themselves",
    topic: "Software Construction"
  },
  
  // Software Construction - Testing Strategies
  {
    text: "What type of testing focuses on testing individual components in isolation?",
    options: [
      "Integration testing",
      "System testing",
      "Unit testing",
      "Acceptance testing"
    ],
    correctAnswer: "Unit testing",
    topic: "Software Construction"
  },
  {
    text: "In black-box testing, what is the tester primarily concerned with?",
    options: [
      "Internal code structure",
      "Inputs and outputs",
      "Code coverage metrics",
      "Implementation details"
    ],
    correctAnswer: "Inputs and outputs",
    topic: "Software Construction"
  },
  {
    text: "Which testing approach tests the entire software system as a whole?",
    options: [
      "Unit testing",
      "Integration testing",
      "Module testing",
      "System testing"
    ],
    correctAnswer: "System testing",
    topic: "Software Construction"
  },
  
  // Product Management - Risk Management
  {
    text: "What does RMMM stand for in risk management?",
    options: [
      "Risk Monitoring and Mitigation Method",
      "Risk Mitigation, Monitoring, and Management",
      "Reactive Management of Major Mistakes",
      "Review, Monitor, Measure, Maintain"
    ],
    correctAnswer: "Risk Mitigation, Monitoring, and Management",
    topic: "Product Management"
  },
  {
    text: "Which approach to risk management attempts to anticipate risks before they occur?",
    options: [
      "Reactive risk strategy",
      "Proactive risk strategy",
      "Defensive risk strategy",
      "Offensive risk strategy"
    ],
    correctAnswer: "Proactive risk strategy",
    topic: "Product Management"
  },
  
  // Product Management - Release Management
  {
    text: "What is a key consideration in product release management?",
    options: [
      "Maximizing the number of features regardless of quality",
      "Balancing features, quality, and time-to-market",
      "Releasing only when all possible features are implemented",
      "Focusing exclusively on marketing aspects"
    ],
    correctAnswer: "Balancing features, quality, and time-to-market",
    topic: "Product Management"
  },
  
  // Software Construction - Coding Frameworks
  {
    text: "What is the primary benefit of using a coding framework?",
    options: [
      "It always makes code run faster",
      "It eliminates the need for testing",
      "It provides reusable structures and standard approaches",
      "It guarantees bug-free code"
    ],
    correctAnswer: "It provides reusable structures and standard approaches",
    topic: "Software Construction"
  },
  
  // Software Construction - Validation Testing
  {
    text: "What is the main focus of validation testing?",
    options: [
      "Ensuring the software meets user needs and expectations",
      "Testing individual code units",
      "Verifying the interaction between components",
      "Examining the software's response to invalid inputs"
    ],
    correctAnswer: "Ensuring the software meets user needs and expectations",
    topic: "Software Construction"
  },
  
  // Product Management - Maintenance
  {
    text: "Which type of maintenance involves modifying software to improve performance without changing functionality?",
    options: [
      "Corrective maintenance",
      "Adaptive maintenance",
      "Perfective maintenance",
      "Preventive maintenance"
    ],
    correctAnswer: "Perfective maintenance",
    topic: "Product Management"
  },
  
  // Product Management - Reengineering
  {
    text: "What is software reengineering primarily concerned with?",
    options: [
      "Creating entirely new software from scratch",
      "Examining and altering existing software to improve it",
      "Testing software in production environments",
      "Marketing existing software to new audiences"
    ],
    correctAnswer: "Examining and altering existing software to improve it",
    topic: "Product Management"
  },
  
  // Additional questions - Software Construction
  {
    text: "Which of the following is an example of white-box testing?",
    options: [
      "Testing a function with various inputs to see if it produces expected outputs",
      "Testing a user interface by clicking buttons without knowledge of the code",
      "Testing code paths and branches to ensure all statements are executed",
      "Testing software based only on its requirements document"
    ],
    correctAnswer: "Testing code paths and branches to ensure all statements are executed",
    topic: "Software Construction"
  },
  {
    text: "What is the primary purpose of code walkthroughs?",
    options: [
      "To exercise all possible paths through the code",
      "To find and fix defects in the code",
      "To measure code performance metrics",
      "To document the code structure"
    ],
    correctAnswer: "To find and fix defects in the code",
    topic: "Software Construction"
  },
  
  // Additional questions - Product Management
  {
    text: "In risk identification, what is a 'risk item checklist'?",
    options: [
      "A list of actual problems that have occurred",
      "A tool that helps identify potential risk factors based on past experiences",
      "A checklist for QA to verify before product release",
      "A document listing all bugs in the software"
    ],
    correctAnswer: "A tool that helps identify potential risk factors based on past experiences",
    topic: "Product Management"
  },
  {
    text: "What is risk refinement in the context of project management?",
    options: [
      "Eliminating all risks from a project",
      "Further analyzing risks to understand their characteristics and impacts",
      "Reducing the number of risks to a manageable level",
      "Communicating risks to stakeholders"
    ],
    correctAnswer: "Further analyzing risks to understand their characteristics and impacts",
    topic: "Product Management"
  },
  {
    text: "What is integration testing primarily concerned with?",
    options: [
      "Testing individual modules in isolation",
      "Testing the entire system from the user's perspective",
      "Testing interactions between modules or components",
      "Testing the system in the production environment"
    ],
    correctAnswer: "Testing interactions between modules or components",
    topic: "Software Construction"
  },
  {
    text: "Which debugging technique involves adding print statements to track the flow of execution?",
    options: [
      "Breakpoint debugging",
      "Static analysis",
      "Tracing",
      "Regression testing"
    ],
    correctAnswer: "Tracing",
    topic: "Software Construction"
  }
];

// Function to get a random question from the question bank
export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// Function to get a question from a specific topic
export const getQuestionByTopic = (topic: string): Question => {
  const topicQuestions = questions.filter(q => q.topic === topic);
  const randomIndex = Math.floor(Math.random() * topicQuestions.length);
  return topicQuestions[randomIndex];
};

export default questions;