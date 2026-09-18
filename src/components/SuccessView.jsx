import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Terminal, RefreshCw, UserCheck } from 'lucide-react';

export default function SuccessView({ payload, onReset }) {
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#3b82f6', '#f59e0b'],
      });
    } catch (e) {
      // Fallback if canvas confetti isn't available
    }
  }, []);

  return (
    <div className="step-card success-card animate-scale-up">
      <div className="success-icon-wrapper">
        <div className="success-icon-bg">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 stroke-[2.5]" />
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="success-badge">
          <UserCheck className="w-3.5 h-3.5 mr-1 inline" /> Onboarding Complete
        </span>
        <h2 className="success-title">🎉 Registration Successful!</h2>
        <p className="success-desc">
          Your onboarding data payload has been compiled and logged cleanly to the browser console.
        </p>
      </div>

      {/* Form Data Console Output Display */}
      <div className="payload-box">
        <div className="payload-box-header">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Console Payload Output (JSON)</span>
        </div>
        <pre className="payload-code">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onReset}
          className="btn-primary inline-flex justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span>Register Another User</span>
        </button>
      </div>
    </div>
  );
}
