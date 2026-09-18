import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullRegistrationSchema } from './schemas/registrationSchema';
import ProgressBar from './components/ProgressBar';
import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2AccountDetails from './components/Step2AccountDetails';
import Step3Review from './components/Step3Review';
import SuccessView from './components/SuccessView';
import { Sparkles, ShieldCheck } from 'lucide-react';
import './App.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [finalPayload, setFinalPayload] = useState(null);

  // Initialize React Hook Form at the parent master level for state lifting & zero data loss
  const methods = useForm({
    resolver: zodResolver(fullRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleJumpToStep = (targetStep) => {
    setStep(targetStep);
  };

  // Final submit handler on Step 3
  const onSubmitFinal = (data) => {
    console.log('====================================');
    console.log('🚀 FINAL REGISTRATION PAYLOAD SUBMITTED:');
    console.log(data);
    console.log('====================================');

    setFinalPayload(data);
    setStep('success');
  };

  const handleResetForm = () => {
    methods.reset();
    setFinalPayload(null);
    setStep(1);
  };

  return (
    <div className="app-viewport">
      {/* Background Subtle Gradient Blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />

      <main className="app-container">
        {/* Header Header Brand Section */}
        <header className="brand-header">
          <div className="brand-logo-pill">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Registration Wizard Module</span>
          </div>
          <h1 className="main-title">
            Enterprise Onboarding Portal
          </h1>
          <p className="main-subtitle">
            Seamless multi-step client data acquisition with real-time validation & persistent state.
          </p>
        </header>

        {/* Wizard Form Container */}
        <div className="wizard-card-wrapper">
          {step !== 'success' && (
            <ProgressBar currentStep={step} onStepClick={handleJumpToStep} />
          )}

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitFinal)} noValidate>
              {step === 1 && (
                <Step1PersonalInfo onNext={handleNext} />
              )}

              {step === 2 && (
                <Step2AccountDetails onNext={handleNext} onBack={handleBack} />
              )}

              {step === 3 && (
                <Step3Review
                  onBack={handleBack}
                  onJumpToStep={handleJumpToStep}
                  onSubmit={methods.handleSubmit(onSubmitFinal)}
                />
              )}

              {step === 'success' && (
                <SuccessView payload={finalPayload} onReset={handleResetForm} />
              )}
            </form>
          </FormProvider>
        </div>

        {/* Footer info */}
        <footer className="app-footer">
          <div className="footer-flex">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline" /> 256-Bit SSL Encrypted Client State
            </span>
            <span>Sprint 07 • Core Engineering</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
