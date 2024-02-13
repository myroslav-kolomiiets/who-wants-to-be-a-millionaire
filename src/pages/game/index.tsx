import * as React from 'react';
import Control, {
  controlThemes,
  controlStates
} from '@/components/Control/Control';
import Steps from '@/components/Steps/Steps';
import useSWR from 'swr';
import { useRouter } from 'next/router';
interface Option {
  marker: string;
  content: string;
  isCorrect: boolean;
}
interface Question {
  question: string;
  options: Option[];
  cost: number;
}
interface StaticData {
  nextStepDelay: number;
  questions: Question[];
}
const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
const Home: React.FC = () => {
  const [step, setStep] = React.useState<number>(0);
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
    return <div>Loading game configuration</div>;
  }
  const handleOnClick = (option: Option) => {
    setSelectedOption(option);
    if (option.isCorrect && step < data.questions.length - 1) {
      setFeedbackClass(controlStates.isCorrect);
      setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
        setEarned(data.questions[step].cost);
      }, data.nextStepDelay);
    } else {
      setFeedbackClass(controlStates.isWrong);

      setTimeout(() => {
        setStep(0);
        setEarned(0);
        router.push(`/final?earned=${earned}`);
      }, data.nextStepDelay);
    }
  };

  return (
    <main className="container">
      <div className="game-main-block">
        <h2 className="game-main-block__h2">{data.questions[step].question}</h2>
        <div className="game-main-block__answers">
          {data.questions[step].options.map((option) => {
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
      <Steps questions={data.questions} step={step} />
    </main>
  );
};

export default Home;
