/**
 * 연희 (25세) - 이장의 딸, 밝고 책임감 강한 성격
 * 위치: 마을 회관
 * 호감도: V010 / 만남 스위치: S001
 */
export const DIALOGUE_YEONHEE = {
  nodes: [
    // ── 첫 만남 ──
    {
      id: 'intro',
      priority: 1,
      conditions: [
        { type: 'switch', id: 'S001', value: false }
      ],
      lines: [
        { speaker: '연희', text: '어머, 안녕하세요! 도시에서 오셨다고 들었어요.' },
        { speaker: '연희', text: '달빛 마을에 오신 걸 환영해요. 저는 연희라고 해요, 이 마을 이장의 딸이에요.' },
        { speaker: '연희', text: '뭐든 궁금한 게 있으면 편하게 물어보세요. 제가 다 알려드릴게요!' }
      ],
      choices: [
        {
          text: '반갑습니다! 마을이 정말 예쁘네요.',
          effects: [
            { type: 'set_switch', id: 'S001', value: true },
            { type: 'add_variable', id: 'V010', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'intro_warm'
        },
        {
          text: '네, 안녕하세요. 조용히 쉬러 왔어요.',
          effects: [
            { type: 'set_switch', id: 'S001', value: true },
            { type: 'add_variable', id: 'V010', value: 1 }
          ],
          next: 'intro_cool'
        }
      ]
    },
    {
      id: 'intro_warm',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '연희', text: '정말요? 감사해요! 작은 마을이지만 정이 넘치는 곳이에요.' },
        { speaker: '연희', text: '특히 해 질 무렵 언덕에서 보는 풍경이 정말 좋아요. 꼭 가보세요!' },
        { speaker: '연희', text: '아, 그리고 조만간 달빛 축제가 열려요. 기대해 주세요!' }
      ],
      choices: null
    },
    {
      id: 'intro_cool',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '연희', text: '아, 그렇군요. 도시 생활이 많이 힘드셨나 봐요.' },
        { speaker: '연희', text: '여긴 정말 조용한 곳이에요. 편히 쉬시다 가세요.' }
      ],
      choices: null
    },

    // ── 2일차: 가벼운 대화 ──
    {
      id: 'day2_chat',
      priority: 10,
      conditions: [
        { type: 'switch', id: 'S001', value: true },
        { type: 'day_gte', value: 2 },
        { type: 'variable_lte', id: 'V010', value: 14 }
      ],
      lines: [
        { speaker: '연희', text: '오늘도 마을 구경 다니시는 거예요?' },
        { speaker: '연희', text: '여기 사람들이 좀 무뚝뚝해 보여도 다 속이 따뜻한 분들이에요.' },
        { speaker: '연희', text: '장터에 가면 달수 아저씨가 있을 거예요. 좀 퉁명스러운데 물건은 좋아요.' }
      ],
      choices: [
        {
          text: '마을 사람들 이야기 더 해주세요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 3 }
          ],
          next: 'day2_villagers'
        },
        {
          text: '연희 씨는 여기서 뭐 하세요?',
          effects: [
            { type: 'add_variable', id: 'V010', value: 2 }
          ],
          next: 'day2_about_yeonhee'
        }
      ]
    },
    {
      id: 'day2_villagers',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '연희', text: '개울가에 가면 해미 언니가 그림 그리고 있을 거예요. 도시에서 오신 분인데, 정말 그림을 잘 그려요.' },
        { speaker: '연희', text: '그리고 당산나무 쪽에는 장군 할아버지가 계세요. 좀 무서워 보이지만... 마을을 누구보다 아끼시는 분이에요.' },
        { speaker: '연희', text: '아, 민박집에서 보미가 도시 이야기 궁금해할 거예요. 여기서 유일한 학생이거든요.' }
      ],
      choices: null
    },
    {
      id: 'day2_about_yeonhee',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '연희', text: '저요? 저는... 마을 일 돕고 있어요. 아버지가 이장이시니까.' },
        { speaker: '연희', text: '사실 서울에서 대학 다녔었거든요. 근데 아버지 건강이 안 좋으셔서 돌아왔어요.' },
        { speaker: '연희', text: '...가끔 복잡한 마음이 들긴 하지만, 후회는 없어요.' }
      ],
      choices: null
    },

    // ── 3일차: 축제 이야기 ──
    {
      id: 'day3_festival',
      priority: 5,
      conditions: [
        { type: 'switch', id: 'S001', value: true },
        { type: 'switch', id: 'S012', value: false },
        { type: 'day_gte', value: 3 }
      ],
      lines: [
        { speaker: '연희', text: '아, 잘 오셨어요! 사실 부탁드릴 게 있어서요.' },
        { speaker: '연희', text: '9일째에 달빛 축제가 열리거든요. 마을의 가장 큰 행사인데...' },
        { speaker: '연희', text: '올해는 준비할 사람이 너무 부족해요. 혹시 조금만 도와주실 수 있을까요?' }
      ],
      choices: [
        {
          text: '물론이죠! 뭘 도와드리면 될까요?',
          effects: [
            { type: 'set_switch', id: 'S012', value: true },
            { type: 'add_variable', id: 'V010', value: 8 },
            { type: 'add_trust', value: 3 },
            { type: 'add_story', value: 1 }
          ],
          next: 'day3_festival_accept'
        },
        {
          text: '글쎄요... 저는 쉬러 온 거라서요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 1 }
          ],
          next: 'day3_festival_decline'
        }
      ]
    },
    {
      id: 'day3_festival_accept',
      priority: 5,
      conditions: [],
      lines: [
        { speaker: '연희', text: '정말요?! 감사해요, 정말!' },
        { speaker: '연희', text: '등 만들기랑 장식 준비를 좀 도와주시면 돼요.' },
        { speaker: '연희', text: '해미 언니가 축제용 벽화도 그리고 있거든요. 나중에 같이 가봐요!' }
      ],
      choices: null
    },
    {
      id: 'day3_festival_decline',
      priority: 5,
      conditions: [],
      lines: [
        { speaker: '연희', text: '아... 그렇죠. 쉬러 오신 건데 제가 무리한 부탁을 했네요.' },
        { speaker: '연희', text: '혹시 마음이 바뀌시면 언제든 말씀해 주세요.' }
      ],
      choices: null
    },

    // ── 축제 준비 감사 ──
    {
      id: 'festival_prep',
      priority: 8,
      conditions: [
        { type: 'switch', id: 'S012', value: true },
        { type: 'day_gte', value: 4 }
      ],
      lines: [
        { speaker: '연희', text: '도와주셔서 축제 준비가 훨씬 빨라졌어요.' },
        { speaker: '연희', text: '마을 사람들도 도시에서 온 분이 이렇게까지 해주시냐고 놀라고 있어요.' },
        { speaker: '연희', text: '...사실 이 축제가 마을에 특별한 의미가 있거든요. 20년 전 힘든 일이 있었는데, 그 뒤로 시작된 거예요.' }
      ],
      choices: [
        {
          text: '20년 전에 무슨 일이 있었는데요?',
          effects: [
            { type: 'add_variable', id: 'V010', value: 3 },
            { type: 'add_story', value: 1 }
          ],
          next: 'festival_prep_hint'
        },
        {
          text: '마을 분들이 좋아하시니 저도 기뻐요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 2 },
            { type: 'add_trust', value: 1 }
          ],
          next: null
        }
      ]
    },
    {
      id: 'festival_prep_hint',
      priority: 8,
      conditions: [],
      lines: [
        { speaker: '연희', text: '...학교에 불이 났었어요. 아이들이 다치기도 했고...' },
        { speaker: '연희', text: '그 뒤로 마을이 많이 갈라졌대요. 지금도 그 상처가 남아 있고요.' },
        { speaker: '연희', text: '저는 이 축제가 사람들을 다시 하나로 모을 수 있다고 믿어요.' }
      ],
      choices: null
    },

    // ── 5일차: 아버지 걱정 ──
    {
      id: 'day5_worry',
      priority: 3,
      conditions: [
        { type: 'day_gte', value: 5 },
        { type: 'variable_gte', id: 'V010', value: 20 }
      ],
      lines: [
        { speaker: '연희', text: '...아, 오셨어요. 죄송해요, 멍하니 있었네요.' },
        { speaker: '연희', text: '사실... 아버지 건강이 많이 안 좋으세요. 서울 병원에 가셔야 하는데 본인은 마을을 비울 수 없다고 하세요.' },
        { speaker: '연희', text: '축제 끝나면 설득해 볼 생각인데... 그때까지 괜찮으실지 모르겠어요.' }
      ],
      choices: [
        {
          text: '많이 걱정되시겠어요. 제가 도울 일이 있으면 말씀하세요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'day5_worry_comfort'
        },
        {
          text: '건강이 제일 중요하죠. 빨리 병원에 가셔야 해요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 3 }
          ],
          next: 'day5_worry_direct'
        }
      ]
    },
    {
      id: 'day5_worry_comfort',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '연희', text: '...감사해요. 이런 이야기 할 사람이 없었는데.' },
        { speaker: '연희', text: '마을에서는 제가 항상 밝아야 하니까요. 이장 딸이잖아요.' },
        { speaker: '연희', text: '가끔은... 저도 누군가한테 기대고 싶을 때가 있어요.' }
      ],
      choices: null
    },
    {
      id: 'day5_worry_direct',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '연희', text: '맞아요. 아는데... 아버지가 워낙 고집이 세셔서.' },
        { speaker: '연희', text: '축제만 끝나면 반드시 모시고 갈 거예요.' }
      ],
      choices: null
    },

    // ── 7일차: 부탁 ──
    {
      id: 'day7_request',
      priority: 2,
      conditions: [
        { type: 'day_eq', value: 7 },
        { type: 'variable_gte', id: 'V010', value: 25 }
      ],
      lines: [
        { speaker: '연희', text: '저기... 큰 부탁 하나만 드려도 될까요?' },
        { speaker: '연희', text: '이 편지를 장군 할아버지께 전해주실 수 있으세요?' },
        { speaker: '연희', text: '아버지가 쓰신 건데... 20년 전 일에 대한 내용이에요. 제가 직접 드리면 할아버지가 안 받으실 것 같아서요.' },
        { speaker: '연희', text: '이 마을에 아직 풀리지 않은 매듭이 있어요. 이 편지가 실마리가 될 수 있을 것 같아요.' }
      ],
      choices: [
        {
          text: '알겠어요, 제가 전해드릴게요.',
          effects: [
            { type: 'set_switch', id: 'S016', value: true },
            { type: 'set_switch', id: 'S011', value: true },
            { type: 'add_variable', id: 'V010', value: 8 },
            { type: 'add_trust', value: 3 },
            { type: 'add_story', value: 2 }
          ],
          next: 'day7_request_accept'
        },
        {
          text: '남의 일에 끼어드는 게 좀 부담스럽네요...',
          effects: [
            { type: 'add_variable', id: 'V010', value: -2 }
          ],
          next: 'day7_request_decline'
        }
      ]
    },
    {
      id: 'day7_request_accept',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '연희', text: '정말... 정말 감사해요.' },
        { speaker: '연희', text: '이 편지 속에 그날 밤의 진실이 담겨 있어요. 아버지가 평생 품고 계셨던 말들이요.' },
        { speaker: '연희', text: '당산나무에 가시면 장군 할아버지를 만날 수 있을 거예요.' }
      ],
      choices: null
    },
    {
      id: 'day7_request_decline',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '연희', text: '...그렇죠. 외지인한테 이런 부탁을 하다니 제가 무리했어요.' },
        { speaker: '연희', text: '신경 쓰지 마세요. 다른 방법을 찾아볼게요.' }
      ],
      choices: null
    },

    // ── 높은 호감도 ──
    {
      id: 'high_affinity',
      priority: 15,
      conditions: [
        { type: 'switch', id: 'S001', value: true },
        { type: 'variable_gte', id: 'V010', value: 40 }
      ],
      lines: [
        { speaker: '연희', text: '저 있잖아요... 서울에서 도시 계획 공부했었거든요.' },
        { speaker: '연희', text: '원래 꿈은 작은 마을들이 사라지지 않도록 돕는 일이었어요.' },
        { speaker: '연희', text: '근데 막상 제 마을이 사라져가는 걸 보면서... 공부만으로는 안 되는 게 있더라고요.' },
        { speaker: '연희', text: '사람이 있어야 해요. 서로를 기억하고, 마음을 나누는 사람들이.' }
      ],
      choices: [
        {
          text: '연희 씨가 이 마을의 미래예요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'high_affinity_hope'
        },
        {
          text: '꿈을 포기한 건 아니잖아요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 3 }
          ],
          next: 'high_affinity_dream'
        }
      ]
    },
    {
      id: 'high_affinity_hope',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '연희', text: '...그런 말 들으니까 울컥하네요.' },
        { speaker: '연희', text: '고마워요. 정말로. 당신이 이 마을에 온 게 우연이 아닌 것 같아요.' }
      ],
      choices: null
    },
    {
      id: 'high_affinity_dream',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '연희', text: '맞아요... 형태가 좀 달라졌을 뿐이죠.' },
        { speaker: '연희', text: '이 마을에서부터 시작하는 거예요. 여기가 제 첫 번째 프로젝트인 셈이에요.' }
      ],
      choices: null
    },

    // ── 기본 대화 (폴백) ──
    {
      id: 'default',
      priority: 99,
      conditions: [
        { type: 'switch', id: 'S001', value: true }
      ],
      lines: [
        { speaker: '연희', text: '오늘도 마을 구경 잘 하고 계세요?' },
        { speaker: '연희', text: '날씨가 참 좋네요. 이런 날엔 언덕 위에서 마을 전체가 보여요.' },
        { speaker: '연희', text: '혹시 필요한 거 있으면 언제든 말씀하세요!' }
      ],
      choices: [
        {
          text: '마을이 정말 평화롭네요.',
          effects: [
            { type: 'add_variable', id: 'V010', value: 1 }
          ],
          next: null
        },
        {
          text: '오늘은 좀 쉴게요.',
          effects: [],
          next: null
        }
      ]
    }
  ]
};
