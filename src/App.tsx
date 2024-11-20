import React, { useState } from 'react';
import { JsonEditor } from "./components/JsonEditor"
import { DynamicForm } from "./components/DynamicForm"
import './App.css';

const App = () => {
  const [json, setJson] = useState<string>('');

  const handleJsonChange = (newJson: string) => {
    setJson(newJson);
  };

  return (
    <div className="app-container">
      <div className="editor-container">
        <h2>JSON Schema Editor</h2>
        <JsonEditor json={json} onChange={handleJsonChange} />
      </div>

      <div className="form-preview-container">
        <h2>Form Preview</h2>
        <DynamicForm json={json} />
      </div>
    </div>
  );
};

export default App;
