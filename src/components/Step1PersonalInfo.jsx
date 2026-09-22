import React from 'react';
import { useFormContext } from 'react-hook-form';
import { User, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

export default function Step1PersonalInfo({ onNext }) {
  const {
    register,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext();

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const dob = watch('dob');

  const isStep1Valid =
    Boolean(firstName && firstName.trim().length >= 2) &&
    Boolean(lastName && lastName.trim().length >= 2) &&
    Boolean(dob) &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.dob;

  const handleNextClick = async (e) => {
    e.preventDefault();
    const isValid = await trigger(['firstName', 'lastName', 'dob']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="step-card animate-fade-in">
      <div className="step-header">
        <h3 className="step-card-title">Personal Information</h3>
        <p className="step-card-desc">Please enter your official details to begin setup.</p>
      </div>

      <div className="form-grid">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input
              id="firstName"
              type="text"
              placeholder="e.g. Rahul"
              className={`form-input ${errors.firstName ? 'input-error' : ''}`}
              {...register('firstName', {
                onChange: () => trigger('firstName'),
              })}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
          </div>
          {errors.firstName && (
            <p id="firstName-error" className="error-text">
              <AlertCircle className="error-icon" />
              <span>{errors.firstName.message}</span>
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input
              id="lastName"
              type="text"
              placeholder="e.g. Sharma"
              className={`form-input ${errors.lastName ? 'input-error' : ''}`}
              {...register('lastName', {
                onChange: () => trigger('lastName'),
              })}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
          </div>
          {errors.lastName && (
            <p id="lastName-error" className="error-text">
              <AlertCircle className="error-icon" />
              <span>{errors.lastName.message}</span>
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group col-span-full">
          <label htmlFor="dob" className="form-label">
            Date of Birth <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <Calendar className="input-icon" />
            <input
              id="dob"
              type="date"
              className={`form-input ${errors.dob ? 'input-error' : ''}`}
              {...register('dob', {
                onChange: () => trigger('dob'),
              })}
              aria-invalid={Boolean(errors.dob)}
              aria-describedby={errors.dob ? 'dob-error' : undefined}
            />
          </div>
          {errors.dob && (
            <p id="dob-error" className="error-text">
              <AlertCircle className="error-icon" />
              <span>{errors.dob.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Button Action Bar */}
      <div className="btn-group-footer justify-end">
        <button
          type="button"
          disabled={!isStep1Valid}
          onClick={handleNextClick}
          className={`btn-primary ${!isStep1Valid ? 'btn-disabled' : ''}`}
        >
          <span>Next Step</span>
          <ArrowRight className="btn-action-icon ml-gap" />
        </button>
      </div>
    </div>
  );
}
