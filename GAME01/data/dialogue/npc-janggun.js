/**
 * 장군 (60세) - 당산나무 지킴이, 엄격하고 죄책감을 안고 사는 노인
 * 위치: 당산나무
 * 호감도: V013 / 만남 스위치: S004
 */
export const DIALOGUE_JANGGUN = {
  nodes: [
    // ── 첫 만남 ──
    {
      id: 'intro',
      priority: 1,
      conditions: [
        { type: 'switch', id: 'S004', value: false }
      ],
      lines: [
        { speaker: '장군', text: '...뭔 일이야. 여긴 관광지가 아닌데.' },
        { speaker: '장군', text: '이 나무는 달빛 마을의 당산나무야. 200년 넘게 이 마을을 지켜온 나무지.' },
        { speaker: '장군', text: '함부로 만지거나 하지 마. 신성한 곳이니까.' }
      ],
      choices: [
        {
          text: '(고개를 숙이며) 멋진 나무네요. 오래 지켜오셨군요.',
          effects: [
            { type: 'set_switch', id: 'S004', value: true },
            { type: 'add_variable', id: 'V013', value: 3 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'intro_respect'
        },
        {
          text: '그냥 지나가다 들렀어요. 큰 나무가 있길래.',
          effects: [
            { type: 'set_switch', id: 'S004', value: true },
            { type: 'add_variable', id: 'V013', value: 1 }
          ],
          next: 'intro_casual'
        }
      ]
    },
    {
      id: 'intro_respect',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '장군', text: '...흠. 요즘 젊은 것들 치고는 예의가 있구만.' },
        { speaker: '장군', text: '이 나무 아래서 마을 사람들이 소원을 빌었어. 아이가 아프면, 농사가 안 되면.' },
        { speaker: '장군', text: '나는 20년째 이 나무를 돌보고 있어. 마을이 없어져도 이 나무만큼은 지킬 거야.' }
      ],
      choices: null
    },
    {
      id: 'intro_casual',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '장군', text: '큰 나무가 있길래? 그게 다야?' },
        { speaker: '장군', text: '...됐어. 구경했으면 가봐. 여기서 떠들면 나무가 싫어해.' }
      ],
      choices: null
    },

    // ── 3일차: 당산나무 이야기 ──
    {
      id: 'day3_shrine',
      priority: 10,
      conditions: [
        { type: 'switch', id: 'S004', value: true },
        { type: 'day_gte', value: 3 }
      ],
      lines: [
        { speaker: '장군', text: '또 왔어? ...뭐, 올 거면 와.' },
        { speaker: '장군', text: '이 당산나무 밑에 돌탑이 보이지? 마을 사람들이 하나씩 쌓은 거야.' },
        { speaker: '장군', text: '축제 때마다 새 돌을 하나 올려. 마을의 안녕을 비는 거지.' },
        { speaker: '장군', text: '...근데 요즘은 돌을 올리러 오는 사람이 거의 없어. 젊은 사람은 다 떠났으니까.' }
      ],
      choices: [
        {
          text: '저도 돌 하나 올려도 될까요?',
          effects: [
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'day3_shrine_stone'
        },
        {
          text: '마을 전통이 많이 사라졌나 봐요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 2 }
          ],
          next: 'day3_shrine_tradition'
        }
      ]
    },
    {
      id: 'day3_shrine_stone',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '장군', text: '...뭐?' },
        { speaker: '장군', text: '...그래, 올려. 여기 이 자리에.' },
        { speaker: '장군', text: '마음속으로 소원을 빌어. 큰소리로 말하면 안 돼.' },
        { speaker: '장군', text: '...흠, 외지인이 돌을 올리는 건 오랜만이네.' }
      ],
      choices: null
    },
    {
      id: 'day3_shrine_tradition',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '장군', text: '사라진 게 아니야. 잊혀진 거지.' },
        { speaker: '장군', text: '기억하는 사람이 있는 한 전통은 살아 있어. 그래서 내가 여기 있는 거야.' },
        { speaker: '장군', text: '...그리고 내가 지켜야 할 것은 전통만이 아니야.' }
      ],
      choices: null
    },

    // ── 5일차: 다툼 후 ──
    {
      id: 'day5_confrontation',
      priority: 3,
      conditions: [
        { type: 'day_eq', value: 5 },
        { type: 'switch', id: 'S013', value: true }
      ],
      lines: [
        { speaker: '장군', text: '...그 녀석 이야기 들었겠지. 달수 말이야.' },
        { speaker: '장군', text: '내가 땅을 빼앗았다고 하던? 어이가 없어.' },
        { speaker: '장군', text: '그 땅은 화재 이후에 마을에서 공동 관리하기로 한 거야. 내가 가져간 게 아니라고.' },
        { speaker: '장군', text: '...그 녀석은 아버지한테 들은 것만 믿어. 진실은 그게 아닌데.' }
      ],
      choices: [
        {
          text: '할아버지 쪽 이야기도 듣고 싶어요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_story', value: 1 }
          ],
          next: 'day5_janggun_side'
        },
        {
          text: '두 분 사이가 많이 안 좋으시네요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 1 }
          ],
          next: null
        }
      ]
    },
    {
      id: 'day5_janggun_side',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '장군', text: '...그래, 들어.' },
        { speaker: '장군', text: '화재 때 나는 학교에 가장 먼저 뛰어들어 간 사람이야. 아이 셋을 안고 나왔어.' },
        { speaker: '장군', text: '근데... 한 아이를 못 구했어. 연기가 너무 심해서...' },
        { speaker: '장군', text: '달수네 아버지가 밭을 태운 게 원인이었어. 나는 화가 났어. 그래서... 사람들 앞에서 그 사람을 비난했지.' },
        { speaker: '장군', text: '그게 옳았는지는... 지금도 모르겠어.' }
      ],
      choices: null
    },

    // ── 7일차: 연희의 편지 ──
    {
      id: 'day7_message',
      priority: 2,
      conditions: [
        { type: 'day_gte', value: 7 },
        { type: 'switch', id: 'S016', value: true }
      ],
      lines: [
        { speaker: '장군', text: '뭐야... 이게 뭐야. 연희가 보낸 거라고?' },
        { speaker: '(장군이 편지를 천천히 읽는다)', text: '...' },
        { speaker: '장군', text: '...이장이 이런 생각을 하고 있었어?' },
        { speaker: '장군', text: '"그날 밤, 당신이 아이들을 구한 것을 우리 모두 알고 있습니다. 달수 아버지도, 떠나기 전에 그 말을 전해달라고 했습니다."' },
        { speaker: '장군', text: '...이 편지를... 왜 이제야...' }
      ],
      choices: [
        {
          text: '아마 전할 기회가 없으셨을 거예요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_trust', value: 2 },
            { type: 'add_story', value: 2 }
          ],
          next: 'day7_message_comfort'
        },
        {
          text: '연희 씨가 용기를 내서 부탁한 거예요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 3 },
            { type: 'add_variable', id: 'V010', value: 2 },
            { type: 'add_story', value: 1 }
          ],
          next: 'day7_message_yeonhee'
        }
      ]
    },
    {
      id: 'day7_message_comfort',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '장군', text: '...그래. 그렇겠지.' },
        { speaker: '장군', text: '달수 아버지가... 나를 원망하지 않았다니...' },
        { speaker: '장군', text: '내가 그 사람을 비난하지 않았더라면, 그 사람이 그렇게까지 망가지지 않았을 텐데.' },
        { speaker: '장군', text: '...고맙다. 이걸 가져다줘서.' }
      ],
      choices: null
    },
    {
      id: 'day7_message_yeonhee',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '장군', text: '연희가... 그 아이는 아버지를 닮아서 마음이 따뜻해.' },
        { speaker: '장군', text: '이장한테 직접 가봐야겠어. 하고 싶은 말이 있으니까.' }
      ],
      choices: null
    },

    // ── 8일차: 진실 ──
    {
      id: 'day8_truth',
      priority: 2,
      conditions: [
        { type: 'day_eq', value: 8 },
        { type: 'switch', id: 'S010', value: true },
        { type: 'switch', id: 'S011', value: true },
        { type: 'variable_gte', id: 'V013', value: 20 }
      ],
      lines: [
        { speaker: '장군', text: '...너, 진실을 알게 된 모양이지.' },
        { speaker: '장군', text: '그래. 그날 밤을 처음부터 끝까지 말해줄게.' },
        { speaker: '장군', text: '불이 학교로 번졌을 때 나는 마침 당산나무에 있었어. 연기를 보고 달려갔지.' },
        { speaker: '장군', text: '1학년 교실에 아이 넷이 있었어. 셋은 안고 나왔어.' },
        { speaker: '장군', text: '다시 들어가려고 했는데 천장이 무너졌어. 사람들이 나를 말렸고...' },
        { speaker: '장군', text: '그 아이 이름은 수진이었어. 여섯 살. 웃는 게 예뻤어.' },
        { speaker: '장군', text: '...20년이 지나도 그 아이 얼굴을 잊을 수가 없어.' }
      ],
      choices: [
        {
          text: '할아버지 잘못이 아니에요. 셋을 구하셨잖아요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 8 },
            { type: 'add_trust', value: 3 },
            { type: 'add_story', value: 3 }
          ],
          next: 'day8_truth_comfort'
        },
        {
          text: '...오래 고통받으셨네요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_trust', value: 2 },
            { type: 'add_story', value: 3 }
          ],
          next: 'day8_truth_empathy'
        }
      ]
    },
    {
      id: 'day8_truth_comfort',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '장군', text: '...셋을 구했어도, 하나를 놓쳤으면 그건 실패야.' },
        { speaker: '장군', text: '적어도 나한테는 그래.' },
        { speaker: '장군', text: '...근데, 고맙다. 그렇게 말해주는 사람은 네가 처음이야.' },
        { speaker: '장군', text: '나는 벌을 받아야 한다고만 생각했거든. 20년 동안.' }
      ],
      choices: null
    },
    {
      id: 'day8_truth_empathy',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '장군', text: '그래... 오래 아팠어.' },
        { speaker: '장군', text: '달수한테 화를 낸 것도 사실은 내 자신한테 화가 난 거였어. 왜 더 빨리 못 갔을까, 왜 더 힘을 못 썼을까.' },
        { speaker: '장군', text: '그 화를 달수네 아버지한테 쏟은 거야. 평생 후회하고 살았어.' }
      ],
      choices: null
    },

    // ── 화해 의지 ──
    {
      id: 'reconciliation',
      priority: 5,
      conditions: [
        { type: 'day_gte', value: 8 },
        { type: 'switch', id: 'S010', value: true },
        { type: 'variable_gte', id: 'V011', value: 25 }
      ],
      lines: [
        { speaker: '장군', text: '...달수한테 가봐야겠어.' },
        { speaker: '장군', text: '20년이나 미뤘으니 쉽지는 않겠지만.' },
        { speaker: '장군', text: '축제 전에 한 번 만나보려고. 수진이 몫까지... 이 마을이 앞으로 나가야 하니까.' }
      ],
      choices: [
        {
          text: '달수 씨도 마음의 준비가 되어 있을 거예요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 3 },
            { type: 'add_variable', id: 'V011', value: 2 },
            { type: 'add_trust', value: 2 }
          ],
          next: null
        },
        {
          text: '용기 있는 결정이에요, 할아버지.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 3 },
            { type: 'add_trust', value: 1 }
          ],
          next: null
        }
      ]
    },

    // ── 높은 호감도 ──
    {
      id: 'high_affinity',
      priority: 15,
      conditions: [
        { type: 'switch', id: 'S004', value: true },
        { type: 'variable_gte', id: 'V013', value: 35 }
      ],
      lines: [
        { speaker: '장군', text: '너한테 하나 물어보고 싶은 게 있어.' },
        { speaker: '장군', text: '용서란 건... 상대를 위한 거야, 나를 위한 거야?' },
        { speaker: '장군', text: '20년 동안 나 자신을 용서 못 하고 살았거든. 그게 벌이라고 생각했어.' },
        { speaker: '장군', text: '근데 요즘 생각이 좀 달라졌어. 벌이 아니라 도망이었을 수도 있다고.' }
      ],
      choices: [
        {
          text: '용서는 앞으로 가기 위한 거 아닐까요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'high_affinity_forward'
        },
        {
          text: '자신을 용서하는 게 가장 어려운 법이에요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 3 }
          ],
          next: 'high_affinity_self'
        }
      ]
    },
    {
      id: 'high_affinity_forward',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '장군', text: '앞으로... 그래.' },
        { speaker: '장군', text: '수진이도 그걸 원했을 거야. 내가 여기서 영원히 멈춰 있는 게 아니라.' },
        { speaker: '장군', text: '...고마워. 늙은이한테 좋은 말 해줘서.' }
      ],
      choices: null
    },
    {
      id: 'high_affinity_self',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '장군', text: '가장 어렵다... 맞아. 남을 용서하는 건 오히려 쉬워.' },
        { speaker: '장군', text: '내가 나한테 너무 가혹했는지도 모르겠어. 20년이면 충분한 벌이겠지.' },
        { speaker: '장군', text: '...이 나무도 폭풍에 가지가 부러져도 다시 자라거든. 나도 그럴 수 있을까.' }
      ],
      choices: null
    },

    // ── 기본 대화 (폴백) ──
    {
      id: 'default',
      priority: 99,
      conditions: [
        { type: 'switch', id: 'S004', value: true }
      ],
      lines: [
        { speaker: '장군', text: '...또 왔어.' },
        { speaker: '장군', text: '오늘 바람이 서쪽에서 불어. 내일은 맑을 거야.' },
        { speaker: '장군', text: '이 나무를 오래 보고 있으면 바람의 뜻을 알 수 있어. ...뭐, 네가 알아들을지는 모르겠지만.' }
      ],
      choices: [
        {
          text: '할아버지, 오늘도 나무가 건강해 보여요.',
          effects: [
            { type: 'add_variable', id: 'V013', value: 2 }
          ],
          next: null
        },
        {
          text: '(조용히 나무를 바라본다)',
          effects: [
            { type: 'add_variable', id: 'V013', value: 1 }
          ],
          next: null
        }
      ]
    }
  ]
};
