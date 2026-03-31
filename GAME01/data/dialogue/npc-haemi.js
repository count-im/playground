/**
 * 해미 (30세) - 화가, 조용하고 관찰력이 뛰어남
 * 위치: 개울가
 * 호감도: V012 / 만남 스위치: S003
 */
export const DIALOGUE_HAEMI = {
  nodes: [
    // ── 첫 만남 ──
    {
      id: 'intro',
      priority: 1,
      conditions: [
        { type: 'switch', id: 'S003', value: false }
      ],
      lines: [
        { speaker: '해미', text: '...' },
        { speaker: '해미', text: '아, 죄송해요. 그림에 집중하느라 못 봤네요.' },
        { speaker: '해미', text: '저는 해미예요. 여기서 그림 그리고 있어요. 개울 빛이 참 예뻐서요.' }
      ],
      choices: [
        {
          text: '와, 그림이 정말 아름답네요. 어떤 그림이에요?',
          effects: [
            { type: 'set_switch', id: 'S003', value: true },
            { type: 'add_variable', id: 'V012', value: 5 }
          ],
          next: 'intro_art'
        },
        {
          text: '안녕하세요. 산책하다가 지나가는 길이에요.',
          effects: [
            { type: 'set_switch', id: 'S003', value: true },
            { type: 'add_variable', id: 'V012', value: 2 }
          ],
          next: 'intro_casual'
        }
      ]
    },
    {
      id: 'intro_art',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '해미', text: '봐주셔서 감사해요. 이건 개울 위로 빛이 퍼지는 순간을 그리는 거예요.' },
        { speaker: '해미', text: '도시에서는 이런 빛을 볼 수 없거든요. 여기 와서 처음 알았어요, 빛에도 색이 이렇게 많다는 걸.' },
        { speaker: '해미', text: '그림에 관심 있으시면 언제든 놀러 오세요. 여기 항상 있을 거예요.' }
      ],
      choices: null
    },
    {
      id: 'intro_casual',
      priority: 1,
      conditions: [],
      lines: [
        { speaker: '해미', text: '산책하기 좋은 길이죠. 저도 처음엔 산책하다가 이 자리를 발견했어요.' },
        { speaker: '해미', text: '3년 전에 이 마을에 왔는데... 여기 앉아 있으면 마음이 편해져요.' }
      ],
      choices: null
    },

    // ── 4일차: 그림 이야기 ──
    {
      id: 'day4_painting',
      priority: 10,
      conditions: [
        { type: 'switch', id: 'S003', value: true },
        { type: 'day_gte', value: 4 }
      ],
      lines: [
        { speaker: '해미', text: '요즘 축제 벽화 작업 중이에요. 마을 역사를 담은 그림이에요.' },
        { speaker: '해미', text: '근데 마지막 장면을 어떻게 그려야 할지 모르겠어요.' },
        { speaker: '해미', text: '마을의 과거와 현재를 이어주는 그림이 되었으면 하는데...' }
      ],
      choices: [
        {
          text: '어떤 장면들이 있는지 볼 수 있을까요?',
          effects: [
            { type: 'add_variable', id: 'V012', value: 3 }
          ],
          next: 'day4_painting_look'
        },
        {
          text: '마을 사람들한테 물어보면 영감을 얻을 수 있지 않을까요?',
          effects: [
            { type: 'add_variable', id: 'V012', value: 2 },
            { type: 'add_trust', value: 1 }
          ],
          next: 'day4_painting_ask'
        }
      ]
    },
    {
      id: 'day4_painting_look',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '해미', text: '이쪽이 마을이 처음 생겼을 때, 이건 당산나무 심는 장면...' },
        { speaker: '해미', text: '그리고 여기가... 20년 전이에요. 학교 화재.' },
        { speaker: '해미', text: '이 부분을 그릴 때 손이 떨렸어요. ...개인적인 이유가 있어서요.' }
      ],
      choices: null
    },
    {
      id: 'day4_painting_ask',
      priority: 10,
      conditions: [],
      lines: [
        { speaker: '해미', text: '마을 사람들에게... 그렇죠. 그래야 하는데.' },
        { speaker: '해미', text: '사실 이 마을에서 아직 저를 경계하는 분들이 있어요. 외지인이니까.' },
        { speaker: '해미', text: '당신도 도시에서 오셨으니까 아마 느끼실 거예요, 그 보이지 않는 벽.' }
      ],
      choices: null
    },

    // ── 6일차: 벽화 ──
    {
      id: 'day6_mural',
      priority: 3,
      conditions: [
        { type: 'day_eq', value: 6 },
        { type: 'switch', id: 'S003', value: true },
        { type: 'variable_gte', id: 'V012', value: 15 }
      ],
      lines: [
        { speaker: '해미', text: '와주셨네요. 벽화 좀 봐주실래요?' },
        { speaker: '해미', text: '여기까지 그렸어요. 마을의 봄, 여름, 가을, 겨울... 그리고 화재 이후의 재건.' },
        { speaker: '해미', text: '마지막 패널이 비어 있어요. 마을의 미래를 뭘로 채워야 할지...' }
      ],
      choices: [
        {
          text: '축제 장면은 어때요? 사람들이 함께 웃고 있는.',
          effects: [
            { type: 'add_variable', id: 'V012', value: 8 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'day6_mural_encourage'
        },
        {
          text: '글쎄요, 저는 그림은 잘 몰라서...',
          effects: [
            { type: 'add_variable', id: 'V012', value: 1 }
          ],
          next: 'day6_mural_indifferent'
        }
      ]
    },
    {
      id: 'day6_mural_encourage',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '해미', text: '...축제.' },
        { speaker: '해미', text: '맞아요. 이 벽화의 끝은 슬픔이 아니라 다시 모이는 사람들이어야 해요.' },
        { speaker: '해미', text: '감사해요. 뭔가 막혀있던 게 뚫린 기분이에요.' },
        { speaker: '해미', text: '당신은... 이 마을에 필요한 바람 같은 사람이에요.' }
      ],
      choices: null
    },
    {
      id: 'day6_mural_indifferent',
      priority: 3,
      conditions: [],
      lines: [
        { speaker: '해미', text: '아뇨, 그림을 모르셔도 괜찮아요. 느낌을 말해주시는 것만으로도 도움이 돼요.' },
        { speaker: '해미', text: '...혼자 고민해 볼게요. 와주신 것만으로도 감사해요.' }
      ],
      choices: null
    },

    // ── 7일차: 비밀 ──
    {
      id: 'day7_secret',
      priority: 2,
      conditions: [
        { type: 'day_gte', value: 7 },
        { type: 'variable_gte', id: 'V012', value: 25 }
      ],
      lines: [
        { speaker: '해미', text: '...제가 왜 이 마을에 왔는지 말씀드릴게요.' },
        { speaker: '해미', text: '20년 전 학교 화재 때... 제 삼촌이 그 학교 선생님이었어요.' },
        { speaker: '해미', text: '삼촌은 아이들을 구하다가 큰 화상을 입으셨어요. 지금도 흉터가 남아 있고요.' },
        { speaker: '해미', text: '삼촌이 돌아가시기 전에 말씀하셨어요. 그 화재는 아무도 원한 게 아니었다고.' },
        { speaker: '해미', text: '저는 삼촌의 마지막 말을 확인하러 여기 온 거예요.' }
      ],
      choices: [
        {
          text: '그래서... 진실을 알게 되셨나요?',
          effects: [
            { type: 'set_switch', id: 'S014', value: true },
            { type: 'add_variable', id: 'V012', value: 5 },
            { type: 'add_story', value: 2 }
          ],
          next: 'day7_secret_truth'
        },
        {
          text: '힘든 이야기를 해주셔서 감사해요.',
          effects: [
            { type: 'set_switch', id: 'S014', value: true },
            { type: 'add_variable', id: 'V012', value: 3 }
          ],
          next: 'day7_secret_thanks'
        }
      ]
    },
    {
      id: 'day7_secret_truth',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '해미', text: '3년 동안 조금씩 알게 됐어요. 조각조각.' },
        { speaker: '해미', text: '달수 씨 아버지, 장군 할아버지... 그분들 모두 각자의 죄책감을 안고 살아왔어요.' },
        { speaker: '해미', text: '진실은 생각보다 단순해요. 하지만 그걸 받아들이는 건...' }
      ],
      choices: null
    },
    {
      id: 'day7_secret_thanks',
      priority: 2,
      conditions: [],
      lines: [
        { speaker: '해미', text: '아뇨, 저야말로... 누군가한테 말할 수 있어서 다행이에요.' },
        { speaker: '해미', text: '이 마을에서 저는 항상 "외지인 화가"일 뿐이었거든요.' },
        { speaker: '해미', text: '당신한테는 진짜 제 모습을 보여줄 수 있는 것 같아요.' }
      ],
      choices: null
    },

    // ── 마을 비밀 전체 ──
    {
      id: 'village_secret',
      priority: 4,
      conditions: [
        { type: 'variable_gte', id: 'V012', value: 30 },
        { type: 'switch', id: 'S014', value: true }
      ],
      lines: [
        { speaker: '해미', text: '이제 다 말씀드릴게요. 그날 밤 무슨 일이 있었는지.' },
        { speaker: '해미', text: '달수 씨 아버지가 밭을 태우고 있었어요. 갑자기 바람이 바뀌면서 불이 학교로 번졌고요.' },
        { speaker: '해미', text: '장군 할아버지는 학교 근처에 있다가 불을 보고 뛰어 들어가셨어요. 아이 셋을 구했지만... 한 아이는 구하지 못했어요.' },
        { speaker: '해미', text: '달수 씨 아버지는 죄책감에 무너졌고, 장군 할아버지는 분노에 휩싸였어요.' },
        { speaker: '해미', text: '하지만 진실은... 아무도 나쁜 사람이 아니었어요. 바람이었고, 불운이었고, 그저 사고였어요.' },
        { speaker: '해미', text: '이 마을은 20년 동안 아무도의 잘못이 아닌 일로 갈라져 있었던 거예요.' }
      ],
      choices: [
        {
          text: '이 이야기를 달수 씨와 장군 할아버지가 알아야 해요.',
          effects: [
            { type: 'set_switch', id: 'S010', value: true },
            { type: 'add_variable', id: 'V012', value: 5 },
            { type: 'add_trust', value: 3 },
            { type: 'add_story', value: 3 }
          ],
          next: 'village_secret_share'
        },
        {
          text: '알려주셔서 감사해요. 어떻게 해야 할지 생각해 볼게요.',
          effects: [
            { type: 'set_switch', id: 'S010', value: true },
            { type: 'add_variable', id: 'V012', value: 3 },
            { type: 'add_story', value: 3 }
          ],
          next: 'village_secret_think'
        }
      ]
    },
    {
      id: 'village_secret_share',
      priority: 4,
      conditions: [],
      lines: [
        { speaker: '해미', text: '네. 맞아요. 이제 더 이상 숨기면 안 돼요.' },
        { speaker: '해미', text: '저 혼자서는 못했을 거예요. 외지인이 나서면 오히려 반발이 있을 테니까.' },
        { speaker: '해미', text: '하지만 당신이라면... 이 마을에서 누구 편도 아닌 사람이라면 전할 수 있을 거예요.' }
      ],
      choices: null
    },
    {
      id: 'village_secret_think',
      priority: 4,
      conditions: [],
      lines: [
        { speaker: '해미', text: '천천히 생각하세요. 서두를 필요 없어요.' },
        { speaker: '해미', text: '20년이나 걸린 일이니까... 며칠 더 걸려도 괜찮아요.' },
        { speaker: '해미', text: '중요한 건 진실이 묻히지 않는 거예요.' }
      ],
      choices: null
    },

    // ── 높은 호감도 ──
    {
      id: 'high_affinity',
      priority: 15,
      conditions: [
        { type: 'switch', id: 'S003', value: true },
        { type: 'variable_gte', id: 'V012', value: 40 }
      ],
      lines: [
        { speaker: '해미', text: '있잖아요, 저는 도시에서 도망쳐 온 거예요.' },
        { speaker: '해미', text: '매일 마감에 쫓기고, 남의 그림을 따라 그리고, 제가 누구인지 잊어가고 있었어요.' },
        { speaker: '해미', text: '여기 와서야 처음으로 제 그림을 그렸어요. 제가 보고 싶은 것, 느끼는 것.' },
        { speaker: '해미', text: '당신도 도시에서 쉬러 온 거잖아요. 혹시... 당신도 뭔가에서 도망쳐 온 건 아니에요?' }
      ],
      choices: [
        {
          text: '솔직히 말하면... 좀 지쳐 있었어요.',
          effects: [
            { type: 'add_variable', id: 'V012', value: 5 },
            { type: 'add_trust', value: 2 }
          ],
          next: 'high_affinity_honest'
        },
        {
          text: '도망이라기보다 새로운 걸 찾고 싶었어요.',
          effects: [
            { type: 'add_variable', id: 'V012', value: 3 }
          ],
          next: 'high_affinity_search'
        }
      ]
    },
    {
      id: 'high_affinity_honest',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '해미', text: '...그렇죠. 지치셨죠.' },
        { speaker: '해미', text: '괜찮아요. 여기서는 아무것도 안 해도 괜찮은 사람이 될 수 있어요.' },
        { speaker: '해미', text: '개울 소리 들으면서 그냥 앉아 있어도 되고, 하늘 봐도 되고.' },
        { speaker: '해미', text: '...저랑 같이 그림 그려도 되고요.' }
      ],
      choices: null
    },
    {
      id: 'high_affinity_search',
      priority: 15,
      conditions: [],
      lines: [
        { speaker: '해미', text: '새로운 것... 찾으셨어요?' },
        { speaker: '해미', text: '여기서 발견한 게 있다면, 그건 아마 원래 당신 안에 있던 거예요.' },
        { speaker: '해미', text: '이 마을은 그런 곳이에요. 잃어버린 것들이 다시 보이는 곳.' }
      ],
      choices: null
    },

    // ── 기본 대화 (폴백) ──
    {
      id: 'default',
      priority: 99,
      conditions: [
        { type: 'switch', id: 'S003', value: true }
      ],
      lines: [
        { speaker: '해미', text: '오늘 바람이 좀 다르네요. 개울 색도 어제랑 달라요.' },
        { speaker: '해미', text: '똑같은 풍경인데 매일 다르게 보여요. 신기하죠?' },
        { speaker: '해미', text: '...당신도 매일 좀 다른 표정이에요. 오늘은 좀 편해 보여요.' }
      ],
      choices: [
        {
          text: '해미 씨는 관찰력이 좋으시네요.',
          effects: [
            { type: 'add_variable', id: 'V012', value: 2 }
          ],
          next: null
        },
        {
          text: '그림 잘 되고 있어요?',
          effects: [
            { type: 'add_variable', id: 'V012', value: 1 }
          ],
          next: null
        }
      ]
    }
  ]
};
