export const EVENTS = [
  // ======= Day 1 =======
  {
    id: 'EVT_DAY1_ARRIVAL',
    day: 1,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '산길을 따라 한참을 걸었다.',
        '작은 마을이 보인다. 달빛 마을.',
        '산으로 둘러싸인 평화로운 곳...',
        '10일간의 휴가. 여기서 쉬기로 했다.'
      ]}
    ]
  },

  // ======= Day 2 =======
  {
    id: 'EVT_DAY2_MORNING',
    day: 2,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '이틀째 아침.',
        '새소리가 들린다. 도시에서는 들을 수 없던 소리.',
        '마을을 좀 더 둘러봐야겠다.'
      ]}
    ]
  },

  // ======= Day 3 =======
  {
    id: 'EVT_DAY3_FESTIVAL_MENTION',
    day: 3,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '마을 곳곳에 장식이 보이기 시작한다.',
        '무슨 행사를 준비하는 것 같다...'
      ]}
    ]
  },

  // ======= Day 4 =======
  {
    id: 'EVT_DAY4_MORNING',
    day: 4,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '벌써 나흘째.',
        '마을 사람들의 얼굴이 조금씩 익숙해진다.',
        '이곳의 시간은 도시와 다르게 흐르는 것 같다.'
      ]}
    ]
  },

  // ======= Day 5 =======
  {
    id: 'EVT_DAY5_ARGUMENT',
    day: 5,
    trigger: 'day_start',
    conditions: [
      { type: 'switch', id: 'S002', value: true },
      { type: 'switch', id: 'S004', value: true }
    ],
    commands: [
      { type: 'set_switch', id: 'S013', value: true },
      { type: 'narration', lines: [
        '아침부터 마을 광장에서 큰 소리가 들린다.',
        '달수와 장군이 서로 언성을 높이고 있다.',
        '"이 땅은 원래 우리 가족 것이었어!" 달수가 소리친다.',
        '"그 일과 이건 상관없소!" 장군이 받아친다.',
        '마을 사람들이 불안한 눈으로 지켜보고 있다...'
      ]}
    ]
  },
  {
    id: 'EVT_DAY5_NO_ARGUMENT',
    day: 5,
    trigger: 'day_start',
    conditions: [
      { type: 'switch', id: 'S013', value: false }
    ],
    commands: [
      { type: 'narration', lines: [
        '다섯째 날.',
        '마을에 미묘한 긴장감이 감돈다.',
        '무슨 일이 있는 걸까...'
      ]}
    ]
  },

  // ======= Day 6 =======
  {
    id: 'EVT_DAY6_MORNING',
    day: 6,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '엿새째.',
        '휴가의 절반이 지났다.',
        '이 마을에 대해 아직 모르는 것이 많은 것 같다.'
      ]}
    ]
  },

  // ======= Day 7 =======
  {
    id: 'EVT_DAY7_TURNING',
    day: 7,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '일곱째 날.',
        '축제가 이틀 앞으로 다가왔다.',
        '마을의 분위기가 달라지고 있다.'
      ]}
    ]
  },

  // ======= Day 8 =======
  {
    id: 'EVT_DAY8_BEFORE_FESTIVAL',
    day: 8,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '여덟째 날. 축제 전날.',
        '마을 전체가 축제 준비로 분주하다.',
        '내일이면 달빛 축제가 열린다.'
      ]}
    ]
  },

  // ======= Day 9 - Festival =======
  {
    id: 'EVT_DAY9_FESTIVAL',
    day: 9,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '── 달빛 축제 ──',
        '',
        '마을 광장에 등불이 켜졌다.',
        '당산나무 아래로 마을 사람들이 모여든다.'
      ]},
      { type: 'check_festival' }
    ]
  },

  // ======= Day 10 - Farewell =======
  {
    id: 'EVT_DAY10_FAREWELL',
    day: 10,
    trigger: 'day_start',
    conditions: [],
    commands: [
      { type: 'narration', lines: [
        '열흘째. 마지막 날.',
        '짐을 꾸려야 한다.',
        '떠나기 전에 인사를 하러 가자.'
      ]}
    ]
  }
];
