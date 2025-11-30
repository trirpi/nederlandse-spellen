const fs = require('fs');
const path = require('path');

// Read the CSV file
// Try different possible locations
const possiblePaths = [
  path.join(__dirname, '../../Downloads/nl_en_wordlist.csv'),
  path.join(__dirname, '../nl_en_wordlist.csv'),
  '/Users/trirpi/Downloads/nl_en_wordlist.csv'
];

let csvPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    csvPath = p;
    break;
  }
}

if (!csvPath) {
  console.error('❌ Could not find nl_en_wordlist.csv');
  console.error('Please ensure the CSV file is in one of these locations:');
  possiblePaths.forEach(p => console.error(`  - ${p}`));
  process.exit(1);
}
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.trim().split('\n');
const header = lines[0]; // Skip header: "Dutch,English"

const words = [];

// Process each line
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Split by comma, but handle commas in quotes or multi-word translations
  // Simple approach: split on first comma only
  const commaIndex = line.indexOf(',');
  if (commaIndex === -1) continue;

  let dutch = line.substring(0, commaIndex).trim();
  let english = line.substring(commaIndex + 1).trim();

  // Remove quotes if present
  dutch = dutch.replace(/^"|"$/g, '');
  english = english.replace(/^"|"$/g, '');
  
  // Remove parenthetical notes from English (e.g., "(math)", "(male)", "(female)")
  english = english.replace(/\s*\([^)]*\)/g, '').trim();

  // Extract article from Dutch word
  // Dutch words typically start with "de ", "het ", or sometimes just the word
  let article = null;
  let dutchWord = dutch;

  if (dutch.startsWith('de ')) {
    article = 'de';
    dutchWord = dutch.substring(3).trim();
  } else if (dutch.startsWith('het ')) {
    article = 'het';
    dutchWord = dutch.substring(4).trim();
  } else if (dutch.startsWith('een ')) {
    // "een" is an indefinite article, we'll use "de" as default or skip
    article = 'de'; // Default fallback
    dutchWord = dutch.substring(4).trim();
  }

  // Skip if we couldn't parse properly
  if (!dutchWord || !english) continue;

  // Detect if this is a verb (English translation starts with "to " or contains " to ")
  const isVerb = english.toLowerCase().startsWith('to ') || 
                 english.toLowerCase().includes(' to ') ||
                 english.toLowerCase().startsWith('to-');

  // Create word object - omit article for verbs
  if (isVerb) {
    words.push({
      dutch: dutchWord,
      english: english
    });
  } else {
    words.push({
      dutch: dutchWord,
      english: english,
      article: article || 'de' // Default to 'de' if no article found
    });
  }
}

// Sort alphabetically by Dutch word for consistency
words.sort((a, b) => a.dutch.localeCompare(b.dutch));

// Write to wordlist.json
const outputPath = path.join(__dirname, '../src/data/wordlist.json');
fs.writeFileSync(outputPath, JSON.stringify(words, null, 2), 'utf-8');

console.log(`✅ Converted ${words.length} words from CSV to JSON`);
console.log(`📝 Output written to: ${outputPath}`);
console.log(`\nSample entries:`);
console.log(JSON.stringify(words.slice(0, 5), null, 2));

