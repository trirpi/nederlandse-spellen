import curatedBeginnerWords from '../data/beginner-wordlist.json'

const commonEnglishWords = new Set([
  'always', 'answer', 'apple', 'car', 'evening', 'dinner', 'job', 'baby', 'banana', 'bank',
  'bed', 'beer', 'beach', 'farm', 'desk', 'forest', 'bread', 'letter', 'tree', 'book', 'message',
  'boss', 'bridge', 'brother', 'cafe', 'camera', 'cat', 'cellar', 'center', 'church', 'city',
  'circle', 'class', 'coat', 'code', 'coffee', 'college', 'computer', 'concert', 'cooking',
  'corner', 'cow', 'cream', 'crowd', 'culture', 'cup', 'customer', 'dance', 'dark', 'daughter',
  'day', 'doctor', 'dog', 'dollar', 'door', 'dream', 'dress', 'drink', 'ear', 'earth', 'egg',
  'elevator', 'energy', 'engine', 'engineer', 'example', 'eye', 'family', 'father', 'field',
  'film', 'finger', 'fire', 'fish', 'flight', 'floor', 'flower', 'food', 'friend', 'fruit',
  'garden', 'girl', 'glass', 'goal', 'gold', 'grandfather', 'grandmother', 'grass', 'ground',
  'group', 'hair', 'hand', 'hat', 'head', 'heart', 'hill', 'history', 'holiday', 'home',
  'hospital', 'hotel', 'hour', 'house', 'idea', 'island', 'juice', 'kitchen', 'lake',
  'language', 'law', 'leaf', 'leg', 'library', 'light', 'line', 'list', 'love', 'lunch',
  'machine', 'map', 'market', 'meal', 'milk', 'minute', 'mirror', 'money', 'month', 'morning',
  'mother', 'mountain', 'movie', 'music', 'name', 'neck', 'night', 'nose', 'note', 'number',
  'office', 'oil', 'order', 'page', 'park', 'party', 'path', 'peace', 'pen', 'people', 'person',
  'phone', 'photo', 'picture', 'place', 'plane', 'plant', 'plate', 'police', 'pool', 'power',
  'price', 'problem', 'queen', 'question', 'rain', 'river', 'road', 'room', 'rose', 'salt',
  'sand', 'school', 'sea', 'season', 'secret', 'service', 'sheep', 'ship', 'shirt', 'shoe',
  'shop', 'sister', 'sky', 'sleep', 'snow', 'song', 'soup', 'space', 'sport', 'spring', 'square',
  'stairs', 'station', 'stone', 'store', 'street', 'student', 'sugar', 'summer', 'sun', 'table',
  'teacher', 'team', 'tea', 'ticket', 'time', 'town', 'train', 'truck', 'uncle', 'village',
  'voice', 'walk', 'wall', 'water', 'way', 'weather', 'week', 'window', 'wine', 'winter',
  'woman', 'word', 'work', 'world', 'writer', 'year', 'yesterday', 'zoo', 'butter', 'cheese',
  'meat', 'orange', 'pepper', 'breakfast', 'lunch', 'meal', 'drink', 'bus', 'bike', 'bicycle',
  'boat', 'wheel', 'moon', 'star', 'cloud', 'wind', 'today', 'tomorrow', 'fire', 'grass', 'park',
  'bird', 'horse', 'duck', 'happy', 'good', 'bad', 'small', 'big', 'little', 'new', 'old', 'young',
  'cold', 'warm', 'hot', 'clean', 'dirty', 'easy', 'hard', 'right', 'left', 'true', 'false',
  'black', 'white', 'red', 'blue', 'green', 'yellow', 'brown', 'pink', 'grey', 'first', 'last',
  'close', 'open', 'fast', 'slow', 'early', 'late', 'near', 'far', 'again', 'never', 'maybe',
  'please', 'sorry', 'yes', 'no', 'hello', 'goodbye', 'help', 'stop', 'start', 'play', 'run',
  'walk', 'sit', 'stand', 'sleep', 'eat', 'cook', 'read', 'write', 'speak', 'talk', 'listen',
  'hear', 'see', 'look', 'watch', 'call', 'come', 'go', 'give', 'take', 'find', 'make', 'buy',
  'sell', 'pay', 'wait', 'need', 'want', 'like', 'love', 'know', 'think', 'feel', 'live', 'stay',
  'learn'
])

export function getBeginnerWordList(words) {
  if (curatedBeginnerWords?.length) {
    return curatedBeginnerWords
  }

  const beginnerWords = (words || []).filter(({ dutch, english }) => {
    if (!dutch || !english) return false

    const normalizedEnglish = english.toLowerCase()
    const isShortWord = dutch.length <= 8 && normalizedEnglish.length <= 10
    const hasMultipleTranslations = normalizedEnglish.includes('/') || normalizedEnglish.includes(',')
    const hasSpaces = normalizedEnglish.includes(' ')

    const isCommonEnglishWord = commonEnglishWords.has(normalizedEnglish)

    return isShortWord && !hasMultipleTranslations && !hasSpaces && isCommonEnglishWord
  })

  return beginnerWords.length ? beginnerWords : words
}
