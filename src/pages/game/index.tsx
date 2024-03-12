import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Control from '../../components/Control/Control';
import { ControlSizes, ControlStates, ControlThemes } from '../../components/Control/controlProps';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import { fetcher } from '../../utils/fetcher';
import Steps from '../../components/Steps/Steps';
import { IOption, IQuestion, IStaticData } from '../../types/gameDataTypes';

function Game() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [earned, setEarned] = useState<number>(0);
  const [fiftyFiftyUsedOnStep, setFiftyFiftyUsedOnStep] = useState<boolean>(false);
  const [disabledHelpOption, setDisabledHelpOption] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    null,
  );
  const [feedbackClass, setFeedbackClass] = useState<string>('');
  const router = useRouter();
  const { data, error } = useSWR<IStaticData>('/api/staticData', fetcher);

  if (error) {
    throw error;
  }

  if (!data) {
    return <StatusMessage />;
  }

  const { nextStepDelay, questions } = data;
  const costs = questions.map((question: IQuestion) => question.cost);

  const stepForward = () => {
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setEarned(questions[currentStep].cost);
      setFiftyFiftyUsedOnStep(false);
      setFeedbackClass('');
    }, nextStepDelay);
  };

  const finalizationScore = (totalEarned: number) => {
    setTimeout(() => {
      setCurrentStep(0);
      setEarned(0);
      router.push(`/?earned=${totalEarned}`);
    }, nextStepDelay);
  };

  const handleOnClick = (option: IOption) => {
    const isFinalStep = currentStep === questions.length - 1;
    const isNotFinalStep = currentStep < questions.length - 1;
    const isAnswerCorrect = option.isCorrect;
    const currentStepCost = questions[currentStep].cost;

    setSelectedOption(option);

    if (isAnswerCorrect) {
      setFeedbackClass(ControlStates.IsCorrect);

      if (isNotFinalStep) {
        stepForward();
      }

      if (isFinalStep) {
        finalizationScore(currentStepCost);
      }
    } else {
      setFeedbackClass(ControlStates.IsWrong);
      finalizationScore(earned);
    }
  };

  const handleOnClickFiftyFifty = () => {
    if (disabledHelpOption) {
      return;
    }
    setFiftyFiftyUsedOnStep(true);
    setDisabledHelpOption(true);
  };

  return (
    <main className="container">
      <div className="game-main-block">
        <h2 className="game-main-block__h2">
          {questions[currentStep].question}
        </h2>
        <div className="game-main-block__options">
          {questions[currentStep].options.map((option: IOption) => (
            <div className="game-main-block__options-item" key={option.content}>
              <Control
                theme={ControlThemes.Hexagonal}
                size={ControlSizes.Responsive}
                isCorrect={
                  selectedOption !== null
                  && selectedOption.content === option.content
                  && feedbackClass === ControlStates.IsCorrect
                }
                isWrong={
                  selectedOption !== null
                  && selectedOption.content === option.content
                  && feedbackClass === ControlStates.IsWrong
                }
                isDisabled={!!feedbackClass}
                isRemoved={fiftyFiftyUsedOnStep && option.isRemovable}
                marker={option.marker}
                text={option.content}
                onClick={() => handleOnClick(option)}
              />
            </div>
          ))}
        </div>
        <div className="game-main-block__help">
          <Control
            theme={ControlThemes.Rounded}
            size={ControlSizes.ExtraSmall}
            text="50:50"
            onClick={() => handleOnClickFiftyFifty()}
            isDisabled={disabledHelpOption}
            isHelpOption
          />
        </div>
      </div>
      <Steps costs={costs} step={currentStep} />
    </main>
  );
}

export default Game;
