// src/app.jsx
import { useState } from 'preact/hooks';
import { analyzeText } from './core/analyzer';
import { translations } from './translations';
import './app.css';

export function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const [lang, setLang] = useState('pl');

  const t = translations[lang];

  const handleAnalyze = () => {
    const data = analyzeText(text);
    setResults(data);
  };

  return (
    <div class="container">
      {}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <button
            class="secondary"
            style={{ padding: '5px 10px', fontSize: '0.8rem' }}
            onClick={() => setLang(l => l === 'pl' ? 'en' : 'pl')}
        >
            {lang === 'pl' ? '🇬🇧 EN' : '🇵🇱 PL'}
        </button>
      </div>

      <header>
        <h1>{t.title}</h1>
        <p class="subtitle">{t.subtitle}</p>
      </header>

      <div class="card input-group">
        <textarea
          value={text}
          onInput={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          rows={8}
        />
        <div class="actions">
            <button onClick={handleAnalyze}>{t.analyzeBtn}</button>
            <button class="secondary" onClick={() => { setText(''); setResults(null); }}>{t.clearBtn}</button>
        </div>
      </div>

      {results && (
        <div class="results-grid">
        {}
        <div class="card stat-box">
            <h3>Liczba słów</h3>
            <div class="big-number">{results.general.totalWords}</div>
        </div>
        <div class="card stat-box">
            <h3>Unikalne</h3>
            <div class="big-number">{results.general.uniqueWords}</div>
        </div>
        <div class="card stat-box">
            <h3>Średnia dł.</h3>
            <div class="big-number">{results.general.avgLength}</div>
        </div>

        {}
        {results.banned.length > 0 && (
            <div class="card stat-box full-width" style={{background: '#fff5f5', border: '1px solid #ff8787'}}>
                <h3 style={{color: '#c92a2a'}}>⚠️ Wykryto słowa zakazane</h3>
                <div class="tags" style={{justifyContent: 'center'}}>
                    {results.banned.map(word => (
                        <span class="tag" style={{background: '#ffe3e3', color: '#c92a2a'}}>
                            {word}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {}
        <div class="card stat-box full-width">
            <h3>Najczęstsze słowa (Top 10)</h3>
            <div class="tags">
            {results.frequency.map(([word, count]) => (
                <span key={word} class="tag">
                {word} <span class="badge">{count}</span>
                </span>
            ))}
            </div>
        </div>
        </div>
      )}
    </div>
  );
}
