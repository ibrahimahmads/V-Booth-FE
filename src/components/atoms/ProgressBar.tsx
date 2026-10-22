interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({currentStep,totalSteps}:ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-canvas-border h-1.5 rounded-full overflow-hidden">
      <div 
        className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};