import React, { useState } from 'react';

interface DynamicFormProps {
  json: string;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ json }) => {
  let schema;
  try {
    schema = JSON.parse(json);
  } catch (error) {
    return <div className="error-message">Invalid JSON schema</div>;
  }

  // State to handle form submission success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission and log form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object from form
    const formData = new FormData(e.target as HTMLFormElement);
    const data: { [key: string]: any } = {};
    
    // Collect each form field and its value
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Log the form data to the console
    console.log('Form submitted with data:', data);

    // Set success message after form submission
    setSuccessMessage('Form submitted successfully!');

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="dynamic-form">
        {schema?.fields?.map((field: any, index: number) => {
          switch (field.type) {
            case 'text':
            case 'email':
              return (
                <div key={index} className="form-field">
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="form-input"
                  />
                </div>
              );
            case 'select':
              return (
                <div key={index} className="form-field">
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <select id={field.id} name={field.id} required={field.required} className="form-input">
                    {field.options.map((option: any, idx: number) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case 'radio':
              return (
                <div key={index} className="form-field">
                  <label className="form-label">{field.label}</label>
                  {field.options.map((option: any, idx: number) => (
                    <div key={idx} className="radio-option">
                      <input
                        type="radio"
                        id={option.value}
                        name={field.id}
                        value={option.value}
                        required={field.required}
                        className="radio-input"
                      />
                      <label htmlFor={option.value} className="radio-label">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              );
            case 'textarea':
              return (
                <div key={index} className="form-field">
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <textarea
                    id={field.id}
                    name={field.id}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="form-textarea"
                  />
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Display success message after submission */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};
