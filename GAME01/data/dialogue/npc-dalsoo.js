/**
 * 달수 (40세) - 장터 상인, 무뚝뚝하지만 속 깊은 성격
 * 위치: 장터
 * 호감도: V011 / 만남 스위치: S002
 */
export const DIALOGUE_DALSOO = {
  nodes: [
    // ── 첫 만남 ──
    {
      id: 'intro',
      priority: 1,
      conditions: [
        { type: 'switch', id: 'S002', value: false }
      ],
      lines: [
        { speaker: '달수', text: '...뭐야, 처음 보는 얼굴이네.' },
        { speaker: '달수', text: '도시에서 왔다고? 여긴 구경할 것도 없는데 뭐하러...' },
        { speaker: '달수', text: '어쨌든 장터에 온 거면 구경이라도 해. 뭐 필요한 거 있어?' }
      ],
      choices: [
        {
          text: '이 꿀이 맛있어 보이네요. 하나 살게요.',
          effects: [
            { type: 'set_switch', id: 'S002', value: true },
            { type: 'add_variable', id: 'V011', value: 3 },
            { type: 'add_trust', value: 1 }
          ],
          next: 'intro_buy'
        },
        {
          text: '그냥 둘러보는 중이에요.',
          effects: [
            { type: 'set_switch', id: 'S002', value: true },
            { type: 'add_variable', id: 'V011', value: 1 }
          ],
          next: 'intro_browse'
        }
      ]
    },
    {
      id: 'intro_buy',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '달수', text: '오, 눈이 있네. 이거 우리 마을 뒷산에서 딴 야생 꿀이야.' },
        { speaker: '달수', text: '도시에서 파는 거랑은 차원이 다르지. 맛 한번 보면 알 거야.' },
        { speaker: '달수', text: '...고마워. 요즘 장사가 통 안 돼서 말이야.' }
      ],
      choices: null
    },
    {
      id: 'intro_browse',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '달수', text: '그래, 맘대로 봐. 만지기만 하고 안 사도 뭐라 안 해.' },
        { speaker: '달수', text: '...근데 진짜 안 살 거야?' }
      ],
      choices: null
    },

    // ── 3일차: 장사 이야기 ──
    {
      id: 'day3_business',
      priority: 10,
      conditions: [
        { type: 'switch', id: 'S002', value: true },
        { type: 'day_gte', value: 3 }
      ],
      lines: [
        { speaker: '달수', text: '...오늘도 손님이 너 하나야.' },
        { speaker: '달수', text: '예전엔 이 장터에 사람들이 바글바글했는데. 젊은 사람들이 다 떠나니까...' },
        { speaker: '달수', text: '나도 이 장사 접을까 백 번은 생각했어. 근데 이것밖에 할 줄 아는 게 없어서 말이야.' }
      ],
      choices: [
        {
          text: '온라인 판매는 생각해 보셨어요?',
          effects: [
            { type: 'add_variable', id: 'V011', value: 3 }
          ],
          next: 'day3_online'
        },
        {
          text: '마을에 축제가 열리면 장사가 좀 되지 않을까요?',
          effects: [
            { type: 'add_variable', id: 'V011', value: 2 },
            { type: 'add_trust', value: 1 }
          ],
          next: 'day3_festival'
        }
      ]
    },
    {
      id: 'day3_online',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '달수', text: '온라인? 나보고 컴퓨터를 하라고?' },
        { speaker: '달수', text: '...근데 요즘 그런 거 하는 데가 많긴 하지. 연희가 도와줄 수 있으려나.' },
        { speaker: '달수', text: '흠, 생각은 해볼게.' }
      ],
      choices: null
    },
    {
      id: 'day3_festival',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '달수', text: '축제... 그래, 그때는 좀 나아지긴 해.' },
        { speaker: '달수', text: '근데 축제 준비하려면 마을 사람들이 힘을 합쳐야 하는데... 쉽지가 않아.' },
        { speaker: '달수', text: '특히 그 꼬장꼬장한 영감탱이하고는 말이야...' }
      ],
      choices: null
    },

    // ── 5일차: 장군과의 다툼 ──
    {
      id: 'day5_argument',
      priority: 2,
      conditions: [
        { type: 'day_eq', value: 5 },
        { type: 'switch', id: 'S002', value: true },
        { type: 'switch', id: 'S004', value: true }
      ],
      lines: [
        { speaker: '달수', text: '그 영감탱이가 또 나한테 뭐라 한 거 들었지?' },
        { speaker: '달수', text: '당산나무 앞 땅이 원래 우리 아버지 거였어! 그 화재 나고 나서 슬쩍 가져간 거라고!' },
        { speaker: '달수', text: '20년이 지났어도 난 절대 잊지 않아. 그 사람이 뻔뻔하게 거기 지키고 앉아 있는 꼴을 보면...' }
      ],
      choices: [
        {
          text: '달수 씨 말이 맞아요. 억울하셨겠네요.',
          effects: [
            { type: 'set_switch', id: 'S013', value: true },
            { type: 'add_variable', id: 'V011', value: 8 },
            { type: 'add_variable', id: 'V013', value: -3 }
          ],
          next: 'day5_side_dalsoo'
        },
        {
          text: '양쪽 이야기를 다 들어봐야 하지 않을까요?',
          effects: [
            { type: 'set_switch', id: 'S013', value: true },
            { type: 'add_variable', id: 'V011', value: 2 }
          ],
          next: 'day5_neutral'
        },
        {
          text: '장군 할아버지한테도 사정이 있지 않았을까요?',
          effects: [
            { type: 'set_switch', id: 'S013', value: true },
            { type: 'add_variable', id: 'V011', value: -5 },
            { type: 'add_variable', id: 'V013', value: 3 }
          ],
          next: 'day5_defend_janggun'
        }
      ]
    },
    {
      id: 'day5_side_dalsoo',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '달수', text: '그래, 네가 좀 통하는 사람이야.' },
        { speaker: '달수', text: '우리 아버지가 그 화재 때문에 얼마나 고생하셨는데... 장사도 망하고, 결국 병으로 돌아가셨어.' },
        { speaker: '달수', text: '...고마워, 내 편 들어줘서.' }
      ],
      choices: null
    },
    {
      id: 'day5_neutral',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '달수', text: '...뭐, 그렇긴 하지.' },
        { speaker: '달수', text: '근데 20년을 참았는데 이제 와서 뭘 더 들어. 나도 내가 원망스러워.' }
      ],
      choices: null
    },
    {
      id: 'day5_defend_janggun',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '달수', text: '뭐? 그 영감탱이 편을 드는 거야?' },
        { speaker: '달수', text: '...됐어. 모르는 사람한테 뭘 기대한 내가 바보지.' },
        { speaker: '달수', text: '오늘은 그만 가. 장사 해야 하니까.' }
      ],
      choices: null
    },

    // ── 다툼 이후 ──
    {
      id: 'post_argument',
      priority: 8,
      conditions: [
        { type: 'switch', id: 'S013', value: true },
        { type: 'day_gte', value: 6 }
      ],
      lines: [
        { speaker: '달수', text: '...그날 좀 흥분했어. 보기 안 좋았지?' },
        { speaker: '달수', text: '사실 나도 알아. 이렇게 미워하는 게 나한테도 독이라는 거.' },
        { speaker: '달수', text: '근데 아버지 생각하면... 그냥 넘어갈 수가 없어.' }
      ],
      choices: [
        {
          text: '진실을 알면 마음이 좀 풀리지 않을까요?',
          effects: [
            { type: 'add_variable', id: 'V011', value: 3 },
            { type: 'add_story', value: 1 }
          ],
          next: 'post_argument_truth'
        },
        {
          text: '시간이 해결해 줄 거예요.',
          effects: [
            { type: 'add_variable', id: 'V011', value: 1 }
          ],
          next: null
        }
      ]
    },
    {
      id: 'post_argument_truth',
      priority: 8,
      conditions: [],
      lines: [
        { speaker: '달수', text: '진실? 그 화재의 진실 말이야?' },
        { speaker: '달수', text: '...솔직히 나도 정확히 뭐가 어떻게 된 건지 모르겠어. 그때 나는 꼬마였으니까.' },
        { speaker: '달수', text: '누군가가 진짜 어떻게 된 건지 알려줄 수 있다면... 글쎄, 모르겠다.' }
      ],
      choices: null
    },

    // ── 8일차: 화해 ──
    {
      id: 'day8_reconcile',
      priority: 3,
      conditions: [
        { type: 'day_gte', value: 8 },
        { type: 'switch', id: 'S013', value: true },
        { type: 'switch', id: 'S010', value: true },
        { type: 'variable_gte', id: 'V011', value: 25 }
      ],
      lines: [
        { speaker: '달수', text: '...야, 너한테 들었어. 그 화재 말이야.' },
        { speaker: '달수', text: '사고였다고? 아무도 일부러 그런 게 아니었다고?' },
        { speaker: '달수', text: '장군 그 영감이... 아이들을 구하려고 뛰어들었다고...?' },
        { speaker: '달수', text: '...20년 동안 뭘 미워한 거야, 나는.' }
      ],
      choices: [
        {
          text: '이제라도 알게 됐잖아요. 늦지 않았어요.',
          effects: [
            { type: 'add_variable', id: 'V011', value: 5 },
            { type: 'add_trust', value: 3 },
            { type: 'add_story', value: 2 }
          ],
          next: 'day8_reconcile_hope'
        },
        {
          text: '장군 할아버지한테 가보시는 게 어때요?',
          effects: [
            { type: 'add_variable', id: 'V011', value: 3 },
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_trust', value: 2 },
            { type: 'add_story', value: 2 }
          ],
          next: 'day8_reconcile_go'
        }
      ]
    },
    {
      id: 'day8_reconcile_hope',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '달수', text: '...그래. 늦지 않았겠지.' },
        { speaker: '달수', text: '축제 때... 그 영감한테 가볼까. 20년 만에 제대로 얼굴 보고 이야기하는 거지.' },
        { speaker: '달수', text: '...고맙다, 진심으로.' }
      ],
      choices: null
    },
    {
      id: 'day8_reconcile_go',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '달수', text: '직접 가라고? ...그래야겠지.' },
        { speaker: '달수', text: '사과할 게 산더미야. 20년치.' },
        { speaker: '달수', text: '...가기 전에 뭐 좀 싸가야겠다. 그 영감이 좋아하는 약과가 있거든.' }
      ],
      choices: null
    },

    // ── 높은 호감도: 화재 비밀 ──
    {
      id: 'high_affinity',
      priority: 20,
      conditions: [
        { type: 'switch', id: 'S002', value: true },
        { type: 'variable_gte', id: 'V011', value: 35 }
      ],
      lines: [
        { speaker: '달수', text: '...너한테는 말해줘도 되겠지.' },
        { speaker: '달수', text: '20년 전 그 화재 말이야. 우리 아버지가 학교 근처에서 밭을 태우고 있었어.' },
        { speaker: '달수', text: '바람이 갑자기 바뀌면서 불이 학교 쪽으로 번진 거야. 아버지는 평생 그 죄책감에 시달리셨어.' },
        { speaker: '달수', text: '그런데 장군 그 영감이 아버지를 공개적으로 비난했어. 마을 사람들 앞에서.' },
        { speaker: '달수', text: '...아버지는 그 뒤로 사람들 눈을 못 마주치셨어. 그게 내가 그 영감을 용서 못하는 이유야.' }
      ],
      choices: [
        {
          text: '두 분 다 고통받으신 거네요...',
          effects: [
            { type: 'add_variable', id: 'V011', value: 3 },
            { type: 'add_story', value: 1 }
          ],
          next: null
        },
        {
          text: '그 진실을 마을 사람들이 알아야 하지 않을까요?',
          effects: [
            { type: 'add_variable', id: 'V011', value: 2 },
            { type: 'add_trust', value: 1 }
          ],
          next: null
        }
      ]
    },

    // ── 기본 대화 (폴백) ──
    {
      id: 'default',
      priority: 99,
      conditions: [
        { type: 'switch', id: 'S002', value: true }
      ],
      lines: [
        { speaker: '달수', text: '왔어? 오늘은 뭐 살 거야?' },
        { speaker: '달수', text: '이 말린 약초 좀 봐. 산에서 직접 캔 거야. 도시에서는 비싸게 팔릴 거야.' },
        { speaker: '달수', text: '...아 맞다, 뒷산 감이 익었더라. 시간 있으면 따 오든가.' }
      ],
      choices: [
        {
          text: '약초 하나 주세요.',
          effects: [
            { type: 'add_variable', id: 'V011', value: 2 }
          ],
          next: null
        },
        {
          text: '오늘은 그냥 인사하러 왔어요.',
          effects: [
            { type: 'add_variable', id: 'V011', value: 1 }
          ],
          next: null
        }
      ]
    }
  ]
};
