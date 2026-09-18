import React from 'react';
import { User, ShieldCheck, FileCheck, Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Info', subtitle: 'Basic identity details', icon: User },
  { id: 2, title: 'Account Details', subtitle: 'Credentials & security', icon: ShieldCheck },
  { id: 3, title: 'Review & Submit', subtitle: 'Confirm registration', icon: FileCheck },
];

export default function ProgressBar({ currentStep, onStepClick }) {
  const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <nav aria-label="Registration Progress" className="w-full mb-8">
      {/* Step Info Header */}
      <div className="progress-header">
        <div>
          <span className="step-badge">Step {currentStep} of {steps.length}</span>
          <h2 className="step-heading">
            {steps[currentStep - 1]?.title}
          </h2>
        </div>
        <div className="progress-percentage-text">
          {Math.round((currentStep / steps.length) * 100)}% Completed
        </div>
      </div>

      {/* Progress Track & Fill Bar */}
      <div className="progress-track-wrapper" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Visual Step Nodes */}
        <div className="step-nodes-container">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isClickable = step.id < currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`step-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                title={isClickable ? `Jump back to ${step.title}` : step.title}
              >
                <div className="step-node-icon-box">
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <div className="step-node-label">
                  <span className="step-node-title">{step.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
