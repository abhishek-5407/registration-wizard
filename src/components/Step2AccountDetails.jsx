import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function Step2AccountDetails({ onNext, onBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const email = watch('email') || '';
  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // Calculate password strength score (0 to 3)
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass) || pass.length >= 12) score += 1;

    if (score === 1) return { score: 1, label: 'Weak', class: 'strength-weak' };
    if (score === 2) return { score: 2, label: 'Medium', class: 'strength-medium' };
    if (score === 3) return { score: 3, label: 'Strong', class: 'strength-strong' };
    return { score: 1, label: 'Weak', class: 'strength-weak' };
  };

  const strength = getPasswordStrength(password);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;
  const isConfirmValid = confirmPassword.length > 0 && confirmPassword === password;

  const isStep2Valid =
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  const handleNextClick = async (e) => {
    e.preventDefault();
    const isValid = await trigger(['email', 'password', 'confirmPassword']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="step-card animate-fade-in">
      <div className="step-header">
        <h3 className="step-card-title">Account Security</h3>
        <p className="step-card-desc">Set up your credentials for secure authentication.</p>
      </div>

      <div className="form-grid">
        {/* Email Field */}
        <div className="form-group col-span-full">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Mail className="input-icon" />
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className={`form-input ${errors.email || (!isEmailValid && email) ? 'input-error' : ''}`}
              {...register('email', {
                onChange: () => trigger('email'),
              })}
              aria-invalid={Boolean(errors.email || (!isEmailValid && email))}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email ? (
            <p id="email-error" className="error-text">
              <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
              {errors.email.message}
            </p>
          ) : !isEmailValid && email ? (
            <p className="error-text">
              <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
              Please enter a valid email address (must include '@' and domain).
            </p>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="form-group col-span-full">
          <label htmlFor="password" className="form-label">
            Password <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              className={`form-input pr-12 ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                onChange: () => {
                  trigger('password');
                  if (confirmPassword) trigger('confirmPassword');
                },
              })}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {/* Show / Hide Toggle Button */}
            <button
              type="button"
              className="toggle-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Dynamic Password Strength Indicator */}
          {password && (
            <div className="strength-meter-container">
              <div className="strength-bar-track">
                <div
                  className={`strength-bar-fill ${strength.class}`}
                  style={{ width: `${(strength.score / 3) * 100}%` }}
                />
              </div>
              <span className={`strength-label ${strength.class}`}>
                Strength: {strength.label}
              </span>
            </div>
          )}

          {errors.password && (
            <p id="password-error" className="error-text">
              <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group col-span-full">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              className={`form-input pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
              {...register('confirmPassword', {
                onChange: () => trigger('confirmPassword'),
              })}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            <button
              type="button"
              className="toggle-eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {errors.confirmPassword ? (
            <p id="confirmPassword-error" className="error-text">
              <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
              {errors.confirmPassword.message}
            </p>
          ) : !isConfirmValid && confirmPassword ? (
            <p className="error-text">
              <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
              Passwords do not match.
            </p>
          ) : null}
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
          disabled={!isStep2Valid}
          onClick={handleNextClick}
          className={`btn-primary ${!isStep2Valid ? 'btn-disabled' : ''}`}
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
