import React, { useState } from 'react';

interface JsonEditorProps {
  json: string;
  onChange: (newJson: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="json-editor-container">
      <textarea
        value={json}
        onChange={handleChange}
        placeholder="Enter your JSON schema here"
        className="json-input"
      />
    </div>
  );
};
