export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);


// Banned Words List
const BANNED_WORDS = ["kurde", "cholera", "idiota", "bla"];

// 1. Sanitize
const sanitizeText = (text) =>
    text.toLowerCase().replace(/[^\w\spląśżźćńóę]/g, "").trim();

// 2. Tokenize
const tokenize = (text) =>
    text.split(/\s+/).filter(word => word.length > 0);

// 3. Count
const countOccurrences = (words) =>
    words.reduce((acc, word) => ({ ...acc, [word]: (acc[word] || 0) + 1 }), {});

// 4. Sort
const sortStats = (statsObj) =>
    Object.entries(statsObj).sort(([, countA], [, countB]) => countB - countA);

// 5. Banned Words
const findBannedWords = (words) =>
    words.filter(word => BANNED_WORDS.includes(word));

// 6. Stats
const calculateGeneralStats = (words) => ({
    totalWords: words.length,
    uniqueWords: new Set(words).size,
    avgLength: words.length > 0
        ? (words.reduce((sum, w) => sum + w.length, 0) / words.length).toFixed(2)
        : "0.00"
});

export const analyzeText = (rawText) => {
    if (!rawText || rawText.trim() === '') return null;

    const cleanWords = pipe(sanitizeText, tokenize)(rawText);
    const bannedFound = findBannedWords(cleanWords);

    return {
        general: calculateGeneralStats(cleanWords),
        frequency: sortStats(countOccurrences(cleanWords)).slice(0, 10),
        banned: [...new Set(bannedFound)]
    };
};
