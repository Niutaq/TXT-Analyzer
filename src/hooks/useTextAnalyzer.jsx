import { useState } from 'preact/hooks';
import { analyzeText } from '../core/analyzer.js';

export const useTextAnalyzer = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    const data = analyzeText(text);
    setResults(data);
  };

  const clear = () => {
    setText('');
    setResults(null);
  }

  return {
    text,
    setText,
    results,
    handleAnalyze,
    clear,
  };
};
