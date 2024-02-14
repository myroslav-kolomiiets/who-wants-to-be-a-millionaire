import * as React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Control, {
  controlStates,
  controlThemes
} from '../../components/Control/Control';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import { fetcher } from '../../utils/fetcher';
import Steps from '../../components/Steps/Steps';

interface Option {
  marker: string;
  content: string;
  isCorrect: boolean;
}
interface Question {
  length: number;
  question: string;
  options: Array<Option>;
  cost: number;
}
interface StaticData {
  nextStepDelay: number;
  questions: Array<Question>;
}
const Game: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [earned, setEarned] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
  );
  const [feedbackClass, setFeedbackClass] = React.useState<string>('');
  const router = useRouter();
  const { data, error } = useSWR<StaticData>('/api/staticData', fetcher);

  if (error) {
    throw error;
  }

  if (!data) {
    return <StatusMessage />;
  }

  const { nextStepDelay, questions } = data;
  const costs = questions.map((question: Question) => {
    return question.cost;
  });

  const stepForward = () => {
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setEarned(questions[currentStep].cost);
    }, nextStepDelay);
  };

  const finalizationScore = (earned: number) => {
    setTimeout(() => {
      setCurrentStep(0);
      setEarned(0);
      router.push(`/final?earned=${earned}`);
    }, nextStepDelay);
  };

  const handleOnClick = (option: Option) => {
    const isFinalStep = currentStep === questions.length - 1;
    const isNotFinalStep = currentStep < questions.length - 1;
    const isAnswerCorrect = option.isCorrect;
    const currentStepCost = questions[currentStep].cost;

    setSelectedOption(option);

    if (isAnswerCorrect) {
      setFeedbackClass(controlStates.isCorrect);

      if (isNotFinalStep) {
        stepForward();
      }

      if (isFinalStep) {
        finalizationScore(currentStepCost);
      }
    } else {
      setFeedbackClass(controlStates.isWrong);
      finalizationScore(earned);
    }
  };

  return (
    <main className="container">
      <div className="game-main-block">
        <h2 className="game-main-block__h2">
          {questions[currentStep].question}
        </h2>
        <div className="game-main-block__answers">
          {questions[currentStep].options.map((option: Option) => {
            return (
              <Control
                key={option.content}
                theme={controlThemes.hexagonal}
                isCorrect={
                  selectedOption !== null &&
                  selectedOption.content === option.content &&
                  feedbackClass === controlStates.isCorrect
                }
                isWrong={
                  selectedOption !== null &&
                  selectedOption.content === option.content &&
                  feedbackClass === controlStates.isWrong
                }
                marker={option.marker}
                text={option.content}
                onClick={() => handleOnClick(option)}
              />
            );
          })}
        </div>
      </div>
      <Steps costs={costs} step={currentStep} />
    </main>
  );
};

export default Game;
