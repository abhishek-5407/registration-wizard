import React from 'react';
import { useFormContext } from 'react-hook-form';
import { User, Mail, Calendar, Shield, Edit3, ArrowLeft, Send } from 'lucide-react';

export default function Step3Review({ onBack, onJumpToStep, onSubmit }) {
  const { getValues } = useFormContext();
  const data = getValues();

  const maskedPassword = data.password ? '•'.repeat(Math.min(data.password.length, 12)) : '••••••••';

  return (
    <div className="step-card animate-fade-in">
      <div className="step-header">
        <h3 className="step-card-title">Review & Confirm</h3>
        <p className="step-card-desc">Verify your captured data before final registration submission.</p>
      </div>

      <div className="summary-sections-grid">
        {/* Personal Details Summary Box */}
        <div className="summary-box">
          <div className="summary-box-header">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <h4 className="summary-box-title">Personal Information</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="btn-edit-link"
              title="Edit Personal Info"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="summary-fields-list">
            <div className="summary-field-row">
              <span className="field-label">Full Name</span>
              <span className="field-value">{data.firstName} {data.lastName}</span>
            </div>
            <div className="summary-field-row">
              <span className="field-label">Date of Birth</span>
              <span className="field-value flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {data.dob}
              </span>
            </div>
          </div>
        </div>

        {/* Account Details Summary Box */}
        <div className="summary-box">
          <div className="summary-box-header">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h4 className="summary-box-title">Account Credentials</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="btn-edit-link"
              title="Edit Account Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="summary-fields-list">
            <div className="summary-field-row">
              <span className="field-label">Email Address</span>
              <span className="field-value flex items-center gap-1.5 text-indigo-300 font-medium">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {data.email}
              </span>
            </div>
            <div className="summary-field-row">
              <span className="field-label">Password</span>
              <span className="field-value font-mono text-slate-400 tracking-widest">
                {maskedPassword}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Button Action Bar */}
      <div className="btn-group-footer justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="btn-submit"
        >
          <span>Submit Registration</span>
          <Send className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
