const fs = require('fs');
const path = require('path');

// Read the wordlist
const wordlistPath = path.join(__dirname, '../src/data/wordlist.json');
const words = JSON.parse(fs.readFileSync(wordlistPath, 'utf-8'));

console.log(`Starting with ${words.length} words`);

// Define criteria for "difficult" words
const isDifficult = (word) => {
  const dutch = word.dutch.toLowerCase();
  const english = word.english.toLowerCase();

  // 1. More aggressive length limits (Dutch > 15 chars or English > 20 chars)
  if (word.dutch.length > 15 || word.english.length > 20) {
    return true;
  }

  // 2. Technical/legal/philosophical terms (expanded patterns)
  const technicalPatterns = [
    // Legal terms
    /\b(law|recht|jurisprudence|juridisch|contract|overeenkomst|liability|aansprakelijkheid|arbitration|arbitrage|litigation|procesvoering|court|rechtbank|statute|wet|regulation|regelgeving|procedure|proces|verdict|vonnis|sanction|sanctie)\b/,
    // Philosophy terms
    /\b(philosophy|filosofie|epistem|metaphys|ontolog|hermeneut|phenomenolog|structuralism|postmodern|existential|rationalism|empiricism|determinism|relativism|humanism|analytisch|analytical)\b/,
    // Mathematics/technical
    /\b(mathematics|wiskunde|calculus|algebra|quantum|derivative|integral|theorem|theory|theorie|hypothesis|hypothese|vector|matrix|tensor|topology|topologie|differential|differentiaal|probability|waarschijnlijkheid|statistics|statistiek|regression|regressie|correlation|correlatie|function|functie|activation|activatiefunctie)\b/,
    // Financial/economic terms (more comprehensive)
    /\b(portfolio|portefeuille|investment|belegging|securities|effecten|derivative|derivaat|futures|termijn|options|optie|hedge|arbitrage|volatility|volatiliteit|liquidity|liquiditeit|solvency|solvabiliteit|leverage|hefboom|insolvency|insolventie|bankruptcy|faillissement|restructuring|herstructurering|acquisition|overname|merger|fusie|dividend|bond|obligatie|equity|debt|schuld|credit|krediet|loan|lening|mortgage|hypotheek|collateral|onderpand|insurance|verzekering|tax|belasting|fiscal|fiscaal|budget|begroting|share|aandeel|stock|markt|market|beurs|capital|kapitaal|financial|financieel|projection|projectie|report|verslag|schedule|schema|repayment|aflossing)\b/,
    // Business/economic terms
    /\b(business|bedrijf|economy|economie|economic|economisch|revenue|omzet|profit|winst|loss|verlies|income|inkomen|salary|salaris|wage|loon|pension|pensioen|employment|werkgelegenheid|unemployment|werkloosheid|labor|arbeid|workforce|arbeidskracht|union|vakbond|strike|staking|collective|collectief|agreement|overeenkomst|negotiation|onderhandeling|mediation|bemiddeling|dispute|geschil|conflict|resolution|oplossing|settlement|schikking|balance sheet|balans)\b/,
    // Mathematical/scientific terms
    /\b(banach|barometer|barok|baroque|basis.*math|mathematical|scientific|wetenschappelijk)\b/,
    // Academic/scientific patterns
    /-isme$/,  // Words ending in -ism
    /-logie$/,  // Words ending in -logy
    /-theorie$/, // Words ending in -theory
    /-analyse$/, // Words ending in -analysis
    /-filosofie$/, // Words ending in -philosophy
    /-recht$/,  // Words ending in -recht (law)
    /-wet$/,    // Words ending in -wet (law)
    /-kunde$/,  // Words ending in -kunde (science)
    /-centrisme$/, // Words ending in -centrism
    /-procedure$/, // Words ending in -procedure
    /-schema$/, // Words ending in -schema
    /-programma$/, // Words ending in -programma
    /-overschot$/, // Words ending in -overschot (surplus)
    /-uitgifte$/, // Words ending in -uitgifte (issuance)
    /-overdracht$/, // Words ending in -overdracht (transfer)
    /-inkoop$/, // Words ending in -inkoop (buyback)
    /-voorwaarden$/, // Words ending in -voorwaarden (conditions)
    /-beweging$/, // Words ending in -beweging (movement)
    /-realisme$/, // Words ending in -realism
    /-generatie$/, // Words ending in -generation (when technical)
    /^alpha-/, // alpha- prefix (financial/technical)
    /^anti-/, // anti- prefix (philosophical)
    /\banachronisme/, // anachronism
    /\bamendment/, // amendment (legal)
    /\bamendment/, // amendering (legal)
    /\banalysis/, // analysis (technical)
    /\banalyse/, // analyse (technical)
  ];
  
  for (const pattern of technicalPatterns) {
    if (pattern.test(dutch) || pattern.test(english)) {
      return true;
    }
  }

  // 3. More aggressive compound word filtering (more than 2 parts)
  const dutchParts = dutch.split(/[\s-]+/).length;
  const englishParts = english.split(/[\s-/]+/).length;
  if (dutchParts > 2 || englishParts > 3) {
    return true;
  }

  // 4. Filter out words with complex prefixes
  const complexPrefixes = [
    /^abstract/, // abstract-
    /^analytisch/, // analytisch-
    /^antropo/, // anthropo-
    /^antivirus/, // antivirus-
    /^arbeids/, // arbeids- (labor-related compounds)
    /^aandelen/, // aandelen- (shares-related compounds)
    /^afstands/, // afstands- (remote-)
    /^adoptie/, // adoptie- (adoption-)
    /^alpha-/, // alpha- (financial/technical)
    /^anti-/, // anti- (philosophical)
    /^ambtenaar/, // ambtenaar (civil servant - bureaucratic)
  ];
  
  for (const pattern of complexPrefixes) {
    if (pattern.test(dutch)) {
      return true;
    }
  }

  // 5. Filter specific difficult words that slipped through
  const difficultWords = [
    'anachronisme', 'anachronism',
    'amendering', 'amendment',
    'analyse', 'analysis',
    'antirealisme', 'anti-realism',
    'ambtenaar', 'civil servant',
    'ambassadeur', 'ambassador',
    'analist', 'analyst',
    'banachruimte', 'banach space',
    'barokstijl', 'baroque style',
  ];
  
  if (difficultWords.includes(dutch) || difficultWords.includes(english)) {
    return true;
  }

  // 6. Filter words with mathematical/technical context in English
  if (english.includes('(math)') || english.includes('(technical)') || english.includes('space') && dutch.includes('ruimte')) {
    return true;
  }

  return false;
};

// Filter out difficult words
const easyWords = words.filter(word => !isDifficult(word));

console.log(`Removed ${words.length - easyWords.length} difficult words`);
console.log(`Remaining: ${easyWords.length} words`);

// Write filtered wordlist
fs.writeFileSync(wordlistPath, JSON.stringify(easyWords, null, 2), 'utf-8');

console.log(`✅ Filtered wordlist written to: ${wordlistPath}`);
console.log(`\nSample remaining words:`);
console.log(JSON.stringify(easyWords.slice(0, 10), null, 2));
