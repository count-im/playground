export const LOCATIONS = {
  'town-hall': {
    id: 'town-hall',
    name: '마을 회관',
    icon: '🏛️',
    cssClass: 'loc-town-hall',
    gridPosition: { row: 0, col: 1 },
    npcsPerDay: {
      default: ['yeonhee'],
      5: ['yeonhee', 'janggun'],
      9: ['yeonhee', 'dalsoo', 'janggun'],
      10: ['yeonhee']
    }
  },
  'river': {
    id: 'river',
    name: '개울가',
    icon: '🌊',
    cssClass: 'loc-river',
    gridPosition: { row: 1, col: 2 },
    npcsPerDay: {
      default: ['haemi'],
      7: ['haemi', 'bomi'],
      10: ['haemi']
    }
  },
  'market': {
    id: 'market',
    name: '장터',
    icon: '🏪',
    cssClass: 'loc-market',
    gridPosition: { row: 1, col: 0 },
    npcsPerDay: {
      default: ['dalsoo'],
      8: ['dalsoo', 'janggun'],
      10: ['dalsoo']
    }
  },
  'shrine': {
    id: 'shrine',
    name: '당산나무',
    icon: '🌳',
    cssClass: 'loc-shrine',
    gridPosition: { row: 0, col: 2 },
    npcsPerDay: {
      default: ['janggun'],
      3: ['janggun', 'bomi'],
      10: ['janggun']
    }
  },
  'inn': {
    id: 'inn',
    name: '민박집',
    icon: '🏠',
    cssClass: 'loc-inn',
    gridPosition: { row: 0, col: 0 },
    npcsPerDay: {
      default: ['bomi'],
      1: ['bomi'],
      10: ['bomi']
    }
  }
};
