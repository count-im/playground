/**
 * 보미 (17세) - 민박집 주인 손녀, 호기심 많고 활발한 성격
 * 위치: 민박집
 * 호감도: V014 / 만남 스위치: S005
 */
export const DIALOGUE_BOMI = {
  nodes: [
    // ── 첫 만남 (1일차) ──
    {
      id: 'intro',
      priority: 1,
      conditions: [
        { type: 'day_eq', value: 1 },
        { type: 'switch', id: 'S005', value: false }
      ],
      lines: [
        { speaker: '보미', text: '우와, 손님이다! 진짜 도시에서 온 거예요?!' },
        { speaker: '보미', text: '저는 보미예요! 이 민박집 할머니 손녀! 여기서 제일 어린 사람이에요, 아마.' },
        { speaker: '보미', text: '도시는 어때요? 건물이 진짜 높아요? 지하철은 진짜 빨라요? 사람이 진짜 많아요?' }
      ],
      choices: [
        {
          text: '(웃으며) 하하, 질문이 엄청 많구나. 하나씩 대답해줄게.',
          effects: [
            { type: 'set_switch', id: 'S005', value: true },
            { type: 'add_variable', id: 'V014', value: 5 }
          ],
          next: 'intro_friendly'
        },
        {
          text: '안녕, 보미. 오늘은 좀 피곤해서 내일 얘기하자.',
          effects: [
            { type: 'set_switch', id: 'S005', value: true },
            { type: 'add_variable', id: 'V014', value: 2 }
          ],
          next: 'intro_tired'
        }
      ]
    },
    {
      id: 'intro_friendly',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '보미', text: '진짜요?! 대박!' },
        { speaker: '보미', text: '저 도시에 한 번도 안 가봤거든요. 인터넷으로만 봤어요.' },
        { speaker: '보미', text: '아, 방은 2층 끝방이에요! 창문에서 달빛이 제일 잘 보이는 방이에요!' },
        { speaker: '보미', text: '할머니가 저녁 준비하셨을 거예요. 여기 밥은 진짜 맛있어요, 기대하세요!' }
      ],
      choices: null
    },
    {
      id: 'intro_tired',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '보미', text: '아... 맞다, 먼 길 오셨겠다. 죄송해요, 제가 너무 시끄러웠죠?' },
        { speaker: '보미', text: '방은 2층 끝방이에요! 푹 쉬세요. 내일 진짜 많이 물어볼 거예요!' }
      ],
      choices: null
    },

    // ── 1일차 이후 첫 만남 (1일 이후에 만나는 경우) ──
    {
      id: 'intro_late',
      priority: 2,
      conditions: [
        { type: 'switch', id: 'S005', value: false },
        { type: 'day_gte', value: 2 }
      ],
      lines: [
        { speaker: '보미', text: '어, 손님! 그동안 어디 계셨어요? 저 계속 기다렸는데!' },
        { speaker: '보미', text: '저는 보미! 이 민박집 할머니 손녀예요.' },
        { speaker: '보미', text: '도시 이야기 진짜진짜 궁금한데, 나중에 시간 되면 알려주세요!' }
      ],
      choices: [
        {
          text: '미안, 여기저기 다니느라. 이제부터 자주 볼게!',
          effects: [
            { type: 'set_switch', id: 'S005', value: true },
            { type: 'add_variable', id: 'V014', value: 3 }
          ],
          next: null
        },
        {
          text: '안녕, 보미. 반가워.',
          effects: [
            { type: 'set_switch', id: 'S005', value: true },
            { type: 'add_variable', id: 'V014', value: 1 }
          ],
          next: null
        }
      ]
    },

    // ── 2일차: 도시 질문 ──
    {
      id: 'day2_questions',
      priority: 10,
      conditions: [
        { type: 'switch', id: 'S005', value: true },
        { type: 'day_gte', value: 2 }
      ],
      lines: [
        { speaker: '보미', text: '아 맞다! 어제 물어보려던 건데요!' },
        { speaker: '보미', text: '도시에서는 밤에도 밝아요? 여기는 밤이면 진짜 캄캄하거든요.' },
        { speaker: '보미', text: '그리고 편의점이 24시간이라는 게 진짜예요? 새벽 3시에도 삼각김밥 사 먹을 수 있어요?' }
      ],
      choices: [
        {
          text: '응, 진짜야. 근데 너무 밝아서 별이 안 보여.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 3 }
          ],
          next: 'day2_stars'
        },
        {
          text: '편의점 삼각김밥은 진짜 맛있어, 특히 참치마요.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 3 }
          ],
          next: 'day2_food'
        }
      ]
    },
    {
      id: 'day2_stars',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '보미', text: '별이 안 보여요?! 말도 안 돼!' },
        { speaker: '보미', text: '여기선 날마다 은하수가 보이는데... 그건 좀 슬프다.' },
        { speaker: '보미', text: '그래도 도시 가보고 싶어요. 별 안 보이는 게 어떤 느낌인지 직접 느껴보고 싶거든요.' }
      ],
      choices: null
    },
    {
      id: 'day2_food',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '보미', text: '참치마요! 인터넷에서 봤어요! 먹어보고 싶어 죽겠어요!' },
        { speaker: '보미', text: '여기는 가장 가까운 편의점이 버스 타고 40분이에요. 40분!' },
        { speaker: '보미', text: '할머니는 집밥이 최고라고 하시지만... 가끔 다른 것도 먹어보고 싶단 말이에요.' }
      ],
      choices: null
    },

    // ── 4일차: 지도 ──
    {
      id: 'day4_map',
      priority: 5,
      conditions: [
        { type: 'day_eq', value: 4 },
        { type: 'switch', id: 'S005', value: true }
      ],
      lines: [
        { speaker: '보미', text: '잠깐만요, 이거 드릴 거예요!' },
        { speaker: '보미', text: '짜잔! 제가 직접 그린 달빛 마을 지도예요!' },
        { speaker: '보미', text: '여기 별표 친 데가 제가 좋아하는 장소들이에요. 개울가 비밀 장소도 있고, 해 질 때 예쁜 언덕도 있어요.' },
        { speaker: '보미', text: '아, 그리고 여기 느낌표 친 데는 장군 할아버지 영역이니까 조심하세요. 좀 무서워요.' }
      ],
      choices: [
        {
          text: '우와, 정성스럽다! 고마워, 보미.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 5 },
            { type: 'add_trust', value: 1 }
          ],
          next: 'day4_map_thanks'
        },
        {
          text: '그림 실력이 좋은데? 유용하게 쓸게.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 3 }
          ],
          next: 'day4_map_compliment'
        }
      ]
    },
    {
      id: 'day4_map_thanks',
      priority: 5,
      conditions: [],
      lines: [
        { speaker: '보미', text: '헤헤, 사실 어제 밤에 새로 그린 거예요. 이전 버전은 좀 별로여서...' },
        { speaker: '보미', text: '마을 구석구석 다 다녀보세요! 숨겨진 장소가 진짜 많아요!' }
      ],
      choices: null
    },
    {
      id: 'day4_map_compliment',
      priority: 5,
      conditions: [],
      lines: [
        { speaker: '보미', text: '그림은 해미 언니한테 좀 배웠어요. 언니가 색 쓰는 거 알려줬거든요.' },
        { speaker: '보미', text: '나중에 마을 안내 책자 같은 거 만들고 싶어요. 관광객이 오면 좋겠는데...' }
      ],
      choices: null
    },

    // ── 6일차: 일지 ──
    {
      id: 'day6_journal',
      priority: 8,
      conditions: [
        { type: 'switch', id: 'S005', value: true },
        { type: 'day_gte', value: 6 }
      ],
      lines: [
        { speaker: '보미', text: '저기... 이거 아무한테도 안 보여줬는데...' },
        { speaker: '보미', text: '제가 쓰고 있는 마을 역사 일지예요. 할머니한테 듣고, 마을 어른들한테 듣고, 이것저것 모은 거.' },
        { speaker: '보미', text: '여기 보세요, 20년 전 화재 이야기도 있어요. 근데 사람마다 기억이 다 달라서...' },
        { speaker: '보미', text: '진실이 뭔지 잘 모르겠어요. 달수 아저씨랑 장군 할아버지는 서로 다른 이야기를 하거든요.' }
      ],
      choices: [
        {
          text: '대단하다, 보미. 이건 정말 소중한 기록이야.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 5 },
            { type: 'add_trust', value: 2 },
            { type: 'add_story', value: 1 }
          ],
          next: 'day6_journal_praise'
        },
        {
          text: '화재 이야기... 좀 더 자세히 볼 수 있을까?',
          effects: [
            { type: 'add_variable', id: 'V014', value: 3 },
            { type: 'add_story', value: 1 }
          ],
          next: 'day6_journal_fire'
        }
      ]
    },
    {
      id: 'day6_journal_praise',
      priority: 8,
      conditions: [],
      lines: [
        { speaker: '보미', text: '진짜요?! 할머니는 쓸데없는 거 한다고 하시는데...' },
        { speaker: '보미', text: '저는 이 마을 이야기가 사라지면 안 된다고 생각해요.' },
        { speaker: '보미', text: '여기 사는 사람들은 당연하다고 느끼는 것들이, 사실은 특별한 거잖아요.' }
      ],
      choices: null
    },
    {
      id: 'day6_journal_fire',
      priority: 8,
      conditions: [],
      lines: [
        { speaker: '보미', text: '여기요. 할머니가 말해준 거, 연희 언니한테 들은 거 다 적어놨어요.' },
        { speaker: '보미', text: '학교에 불이 나서 아이들이 다쳤고, 그 뒤로 마을이 갈라졌대요.' },
        { speaker: '보미', text: '달수 아저씨 아버지가 관련됐다는 것까지는 알겠는데... 장군 할아버지 쪽은 아무도 안 알려줘요.' },
        { speaker: '보미', text: '뭔가 숨기는 게 있는 것 같은데, 어른들이 말을 안 해요.' }
      ],
      choices: null
    },

    // ── 8일차: 고백 ──
    {
      id: 'day8_confession',
      priority: 2,
      conditions: [
        { type: 'day_gte', value: 8 },
        { type: 'variable_gte', id: 'V014', value: 30 }
      ],
      lines: [
        { speaker: '보미', text: '...저기, 잠깐 이야기해도 돼요?' },
        { speaker: '보미', text: '저... 사실 무서워요.' },
        { speaker: '보미', text: '이 마을이 점점 사라지고 있잖아요. 젊은 사람이 저밖에 없고, 학교도 없어졌고.' },
        { speaker: '보미', text: '10년 뒤에는 이 민박집도 없을 수 있어요. 할머니도 나이가 많으시고...' },
        { speaker: '보미', text: '저도 고등학교 졸업하면 나가야 해요. 여기는 대학도 일자리도 없으니까.' },
        { speaker: '보미', text: '근데 제가 떠나면... 이 마을을 기억하는 마지막 젊은 사람이 사라지는 거잖아요.' }
      ],
      choices: [
        {
          text: '보미가 쓰고 있는 일지가 있잖아. 그게 마을을 기억하는 방법이야.',
          effects: [
            { type: 'set_switch', id: 'S015', value: true },
            { type: 'add_variable', id: 'V014', value: 8 },
            { type: 'add_trust', value: 3 }
          ],
          next: 'day8_confession_journal'
        },
        {
          text: '나도 이 마을을 기억할게. 약속해.',
          effects: [
            { type: 'set_switch', id: 'S015', value: true },
            { type: 'add_variable', id: 'V014', value: 10 },
            { type: 'add_trust', value: 3 }
          ],
          next: 'day8_confession_promise'
        }
      ]
    },
    {
      id: 'day8_confession_journal',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '보미', text: '...맞아요. 그래서 쓰고 있는 거예요.' },
        { speaker: '보미', text: '누군가 이 일지를 읽고 달빛 마을이 어떤 곳이었는지 알아주면...' },
        { speaker: '보미', text: '그러면 이 마을은 완전히 사라지는 게 아니잖아요.' },
        { speaker: '보미', text: '(눈물을 닦으며) ...감사해요. 제 일지가 의미 있다고 해줘서.' }
      ],
      choices: null
    },
    {
      id: 'day8_confession_promise',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '보미', text: '...진짜요?' },
        { speaker: '보미', text: '도시로 돌아가도 이 마을 생각해줄 거예요? 당산나무도, 개울도, 이 민박집도?' },
        { speaker: '보미', text: '(울먹이며) ...약속이에요. 절대 잊으면 안 돼요.' },
        { speaker: '보미', text: '저도 어디에 가든 이 마을 이야기를 할 거예요. 여기가 제 고향이니까.' }
      ],
      choices: null
    },

    // ── 높은 호감도 ──
    {
      id: 'high_affinity',
      priority: 15,
      conditions: [
        { type: 'switch', id: 'S005', value: true },
        { type: 'variable_gte', id: 'V014', value: 40 }
      ],
      lines: [
        { speaker: '보미', text: '있잖아요, 저 가끔 생각해요.' },
        { speaker: '보미', text: '도시에 가면 저도 언젠가 이 마을이 "시골"이라서 부끄러워질까?' },
        { speaker: '보미', text: '인터넷에서 보면 시골 출신이라고 놀리는 사람도 있잖아요.' },
        { speaker: '보미', text: '근데 또 생각하면... 은하수가 보이는 곳에서 자란 게 부끄러울 이유가 없잖아요, 그죠?' }
      ],
      choices: [
        {
          text: '전혀 부끄러울 것 없어. 오히려 자랑스러워해.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'high_affinity_proud'
        },
        {
          text: '도시 사람들이 오히려 이런 곳을 부러워해.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 3 }
          ],
          next: 'high_affinity_envy'
        }
      ]
    },
    {
      id: 'high_affinity_proud',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '보미', text: '자랑스러워하라고요? ...헤헤.' },
        { speaker: '보미', text: '맞아요! 저는 달빛 마을의 보미예요! 은하수 보고 자란 보미!' },
        { speaker: '보미', text: '도시에서도 그렇게 말할 거예요. 우리 마을 완전 예쁘다고!' }
      ],
      choices: null
    },
    {
      id: 'high_affinity_envy',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '보미', text: '정말요? 도시 사람들이?' },
        { speaker: '보미', text: '그러면 다들 여기 놀러 오면 되는데! 민박집 장사도 잘 될 텐데!' },
        { speaker: '보미', text: '...아, 근데 너무 많이 오면 조용한 게 없어지려나. 딱 적당히만 오면 좋겠다.' }
      ],
      choices: null
    },

    // ── 기본 대화 (폴백) ──
    {
      id: 'default',
      priority: 99,
      conditions: [
        { type: 'switch', id: 'S005', value: true }
      ],
      lines: [
        { speaker: '보미', text: '오늘도 마을 다녀오셨어요? 재밌는 거 발견했어요?' },
        { speaker: '보미', text: '저는 오늘 할머니 밭일 도우다가 개구리 잡았어요! 이만~한 거!' },
        { speaker: '보미', text: '아, 참! 저녁에 할머니가 감자전 해주신대요. 기대하세요!' }
      ],
      choices: [
        {
          text: '감자전! 기대된다!',
          effects: [
            { type: 'add_variable', id: 'V014', value: 2 }
          ],
          next: null
        },
        {
          text: '오늘도 에너지가 넘치는구나, 보미.',
          effects: [
            { type: 'add_variable', id: 'V014', value: 1 }
          ],
          next: null
        }
      ]
    }
  ]
};
