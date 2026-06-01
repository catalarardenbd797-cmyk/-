import { CarouselItem, CatBreed, GalleryImage, CareTip, UserComment } from '../types';

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: 'https://cdn.phototourl.com/member/2026-06-01-55cfb9dd-f77c-41e6-9a6e-95f029d9a59b.jpg',
    title: '遇见温暖，治愈身心',
    subtitle: '在猫咪的温柔陪伴中，找寻生活里的一抹宁静与舒适黄昏。',
    tagline: '— Warm & Healing Haven —',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=85&w=1600&h=900&fit=crop&auto=format',
    title: '温馨光影，给它真挚的爱',
    subtitle: '用严谨的态度与温润的守护，陪伴每一个毛孩子健康成长。',
    tagline: '— Smart Pet Caring Guide —',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=85&w=1600&h=900&fit=crop&auto=format',
    title: '慢享时光，倾听灵魂互语',
    subtitle: '细数各种可爱品种，从仙女布偶到灵动暹罗，总有一款静静守护你。',
    tagline: '— Discover Cat Breeds —',
  }
];

export const catBreeds: CatBreed[] = [
  {
    id: 'ragdoll',
    name: '布偶猫',
    engName: 'Ragdoll',
    origin: '美国',
    character: '异常温柔、黏人、温顺、包容心强',
    physical: '体型大、身躯长、毛发浓密丰厚，蓝宝石般的明亮大眼',
    lifeSpan: '12 - 15 年',
    priceRange: '¥5,000 - ¥18,000',
    image: 'https://cdn.phototourl.com/free/2026-05-26-9629ddc7-52b4-43d5-9918-524674637ee6.webp',
    description: '布偶猫是猫界中体型最大、最重的猫之一。它们性格极佳，像个软绵绵的布娃娃，抱起来时十分温顺，非常适合有小孩或老人的家庭饲养，极具观赏 and 陪伴价值。',
    tags: ['仙女猫', '温柔巨无霸', '绝美蓝眼'],
    ratings: {
      affection: 5,
      energy: 2,
      grooming: 4,
      intelligence: 4
    }
  },
  {
    id: 'british-shorthair',
    name: '英国短毛猫',
    engName: 'British Shorthair',
    origin: '英国',
    character: '老实、温和、安静但不孤僻、适应力极强',
    physical: '矮胖粗短、头圆脸大且饱满、眼睛圆大、五短身材',
    lifeSpan: '13 - 15 年',
    priceRange: '¥2,000 - ¥8,000',
    image: 'https://cdn.phototourl.com/free/2026-06-01-e9311a6a-2311-4d11-bddd-a085bcdd9223.jpg',
    description: '历史悠久的英国短毛猫极易胖，大脸盘和胖乎乎的腮帮子非常讨喜。它们性格宁静，很少大叫，通常默默陪伴在主人身边，适合大部分快节奏的上班族。',
    tags: ['经典蓝猫', '大脸盘子', '随和沉稳'],
    ratings: {
      affection: 4,
      energy: 3,
      grooming: 2,
      intelligence: 4
    }
  },
  {
    id: 'norwegian-forest',
    name: '挪威森林猫',
    engName: 'Norwegian Forest Cat',
    origin: '挪威',
    character: '坚毅勇敢、聪明独立、极擅攀爬与户外、温和自信',
    physical: '体型巨大壮实，具有防风防水的双层浓密皮毛、精灵般的灵动耳毛',
    lifeSpan: '12 - 16 年',
    priceRange: '¥6,000 - ¥15,000',
    image: 'https://cdn.phototourl.com/free/2026-05-26-163aa0e6-bafd-4411-90dc-9c1b2e973082.jpg',
    description: '北欧神话中为雷神索尔拉战车的传说神兽。它们拥有极强的耐寒体格与华丽如围脖的长颈毛。挪威森林猫不畏霜雪，性格自强勇敢，对家庭成员非常忠诚温和。',
    tags: ['北欧森林精灵', '爬高小能手', '双层防水毛'],
    ratings: {
      affection: 4,
      energy: 4,
      grooming: 5,
      intelligence: 5
    }
  },
  {
    id: 'maine-coon',
    name: '缅因猫',
    engName: 'Maine Coon',
    origin: '美国',
    character: '外冷内热、极其体贴温柔、忠诚、聪明机警',
    physical: '体型巨大、耳朵大且有耳毛、尾巴粗长如羽毛、背毛浓密',
    lifeSpan: '12 - 15 年',
    priceRange: '¥7,000 - ¥20,000',
    image: 'https://cdn.phototourl.com/free/2026-05-27-35da7e96-85a2-4c57-ab4c-fbf05994858f.jpg',
    description: '拥有霸气外表而内心柔软如棉花的“温柔巨人”。缅因猫带有极富野性的外观，但叫声却非常轻柔好听。它们极为聪明，甚至可以进行简单的飞盘拾回训练。',
    tags: ['温柔巨人', '霸气大耳朵', '森林小猎手'],
    ratings: {
      affection: 5,
      energy: 4,
      grooming: 5,
      intelligence: 5
    }
  },
  {
    id: 'sphynx',
    name: '法国/加拿大无毛猫',
    engName: 'Sphynx Cat',
    origin: '加拿大/法国',
    character: '心思细腻、极其依恋主人、好奇心重、乐群友好',
    physical: '全身覆极软胎毛、皱褶明显、骨肉分明、双耳耳廓极大',
    lifeSpan: '12 - 15 年',
    priceRange: '¥4,000 - ¥12,000',
    image: 'https://cdn.phototourl.com/free/2026-05-26-46b26982-7111-4320-9941-8f5b5575fa5f.jpg',
    description: '因基因突变繁育 of 无毛异彩品种。它们好动且极其聪慧，甚至能感知主人的忧喜。由于无毛，它们怕冷怕热，摸起像个极柔软温热的袋子，是猫毛敏感群体的超级福音。',
    tags: ['温度计猫', '外星小精灵', '猫粉福音'],
    ratings: {
      affection: 5,
      energy: 4,
      grooming: 3,
      intelligence: 5
    }
  },
  {
    id: 'siamese',
    name: '暹罗猫',
    engName: 'Siamese',
    origin: '泰国',
    character: '精力旺盛、好奇心极强、极度话痨、忠于主人',
    physical: '体型细长、肌肉发达、面部及四肢有重点色、蓝眼呈杏仁状',
    lifeSpan: '15 - 20 年',
    priceRange: '¥1,500 - ¥4,500',
    image: 'https://cdn.phototourl.com/free/2026-05-26-9328695f-5e7c-494e-a8d5-2a32a795eb6b.jpg',
    description: '暹罗猫是猫界中的“话痨”和“小狗猫”。它们情绪敏感，渴望得到主人大量的互动和拥抱，随着天气变冷，它们身上的毛色会变得更深像个“挖煤工”，非常神奇。',
    tags: ['猫中之犬', '挖煤工', '话痨大师'],
    ratings: {
      affection: 5,
      energy: 5,
      grooming: 1,
      intelligence: 5
    }
  },
  {
    id: 'abyssinian',
    name: '阿比西尼亚猫',
    engName: 'Abyssinian',
    origin: '埃塞俄比亚',
    character: '高度活跃、充满激情、乐于探索、对人深情且聪明',
    physical: '身躯精妙颀长、步态优雅，拥有标志性的渐变刺刺古铜被毛',
    lifeSpan: '12 - 15 年',
    priceRange: '¥6,000 - ¥15,000',
    image: 'https://cdn.phototourl.com/free/2026-05-27-d6a3be36-ed7e-4331-a64d-53cc0750716b.jpg',
    description: '古埃及法老神庙画作中极其神仙的古典纯种。酷似微型野生美洲狮，攀高潜跳本领无人能及，浑身散发尊贵而古老的东方色彩，是渴望高难度互动的家庭神选伴侣。',
    tags: ['法老侍神', '极速攀爬者', '古铜渐变衣'],
    ratings: {
      affection: 4,
      energy: 5,
      grooming: 1,
      intelligence: 5
    }
  },
  {
    id: 'american-shorthair',
    name: '美国短毛猫',
    engName: 'American Shorthair',
    origin: '美国',
    character: '活泼开朗、大胆、好奇心重、富有耐心',
    physical: '肌肉结实、骨骼强壮、面颊丰满、经典的川字银虎斑纹',
    lifeSpan: '15 - 20 年',
    priceRange: '¥1,500 - ¥6,000',
    image: 'https://cdn.phototourl.com/free/2026-06-01-3600c6ab-b95e-431d-bc72-f29b016a63b9.jpg',
    description: '美国短毛猫极具活力与捕猎本能，骨骼肌理非常完美。著名的“银虎斑”是最具代表性的花色。它们情绪稳定、皮实省心，是深受千万铲屎官喜爱的初代国民萌宠。',
    tags: ['经典银虎斑', '精力充沛', '坚毅皮实'],
    ratings: {
      affection: 4,
      energy: 4,
      grooming: 2,
      intelligence: 4
    }
  },
  {
    id: 'russian-blue',
    name: '俄罗斯蓝猫',
    engName: 'Russian Blue',
    origin: '俄罗斯',
    character: '文静优雅、保守、极其专注、对主人温情依恋',
    physical: '银蓝色闪耀双层厚短毛、祖母绿深邃瞳孔、迷人微笑线嘴巴',
    lifeSpan: '13 - 18 年',
    priceRange: '¥3,000 - ¥9,000',
    image: 'https://cdn.phototourl.com/free/2026-05-27-939e851d-40f6-4acd-9770-7505d34d2bbd.jpg',
    description: '发源于严寒阿坎港的传奇贵族。由于双层短毛极为厚实挺立，轻抚手感犹如天鹅绒般细腻。它们安静温顺，不爱吵闹，具有修养尊贵的处世作风。',
    tags: ['银蓝天鹅绒', '祖母绿星眸', '文雅不拆家'],
    ratings: {
      affection: 4,
      energy: 3,
      grooming: 2,
      intelligence: 4
    }
  },
  {
    id: 'bengal',
    name: '孟加拉豹猫',
    engName: 'Bengal Cat',
    origin: '美国',
    character: '惊人运动力、自信、亲人友善、热爱游泳玩水',
    physical: '迷人野性豹纹斑或云斑纹、骨架庞大肌肉紧实、毛皮闪烁金沙质感',
    lifeSpan: '12 - 16 年',
    priceRange: '¥8,000 - ¥25,000',
    image: 'https://cdn.phototourl.com/free/2026-05-26-e6c35b69-b883-4a43-be61-33382dd1ea95.jpg',
    description: '豹猫与家猫杂交的绝妙成果。具有令人惊叹的捕猎体能，精力极其充沛。它们在保证野性外观的同时，内心极其忠心服从主人，极其喜欢洗澡和水上游戏。',
    tags: ['迷你巡林豹', '牵引绳散步', '玩水爱好者'],
    ratings: {
      affection: 4,
      energy: 5,
      grooming: 1,
      intelligence: 5
    }
  },
  {
    id: 'chinese-lihua',
    name: '中华田园狸花猫',
    engName: 'Dragon Li / Lihua Cat',
    origin: '中国',
    character: '独立勇敢、警觉度极高、生存适应力天下无双、感情深沉内敛',
    physical: '肌肉极为粗壮、三角耳朵立挺、额头有威严的M字斑纹、黑黄相间野性斑',
    lifeSpan: '15 - 20 年',
    priceRange: '领养为主 / ¥0 - ¥200',
    image: 'https://cdn.phototourl.com/free/2026-05-27-7e3f9632-75e7-4ca0-ac81-ebeeee5a58b7.jpg',
    description: '中国本土历经长达数千年自然选择孕育出的杰出品种（也是CFA认可品种）。抗病能力和智商在猫界拔得头筹。它们情感含蓄，不张扬吵闹，认主后极其深情 and 护家。',
    tags: ['国宝狸花', '捉鼠冠军', '铁皮铜骨'],
    ratings: {
      affection: 3,
      energy: 4,
      grooming: 1,
      intelligence: 5
    }
  },
  {
    id: 'persian',
    name: '波斯猫',
    engName: 'Persian',
    origin: '阿富汗/伊朗地区',
    character: '高贵孤傲却又极温柔、安详懒散、极少叫唤',
    physical: '扁脸、塌鼻、圆眼、毛发极长软而如丝，四肢扁平肥短',
    lifeSpan: '12 - 15 年',
    priceRange: '¥4,000 - ¥12,000',
    image: 'https://cdn.phototourl.com/free/2026-05-26-95facab7-f8a4-46bd-831d-51d50e168c47.jpg',
    description: '素有“猫中皇后”之美誉，波斯猫举止轻盈优雅。它们极其喜爱安静、不爱跳跃，终日优雅地卧在软垫上。因为扁平的五官，呼吸道与泪腺需要日常精细呵护。',
    tags: ['猫中皇后', '高贵优雅', '蓬松长毛'],
    ratings: {
      affection: 3,
      energy: 1,
      grooming: 5,
      intelligence: 3
    }
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'img1',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop',
    title: '橘影绰约的清晨',
    breed: '中华田园橘猫',
    category: 'cute',
    description: '在金色阳光中，小橘猫正偏着小脑袋，瞪大充满好奇的绿色大眼凝望着你。',
    likes: 1240,
    saves: 456,
  },
  {
    id: 'img2',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop',
    title: '潮流大佬出街',
    breed: '英国短毛猫',
    category: 'funny',
    description: '戴上复古彩色墨镜后，这只胖嘟嘟的蓝猫立刻散发出不可言喻的时尚潮猫气息。',
    likes: 2450,
    saves: 980,
  },
  {
    id: 'img3',
    url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=800&auto=format&fit=crop',
    title: '午后甜蜜美梦',
    breed: '混血小橘猫',
    category: 'sleeping',
    description: '在温暖的地板上，身体蜷缩成完美的猫爪形状，惬意呼呼大睡中。',
    likes: 980,
    saves: 340,
  },
  {
    id: 'img4',
    url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800&auto=format&fit=crop',
    title: '你是我的新玩具吗',
    breed: '苏格兰折耳猫',
    category: 'kitten',
    description: '刚满两个月的小白猫探出可爱的小脑袋，小爪子轻轻扒在相机前面试探。',
    likes: 3120,
    saves: 1210,
  },
  {
    id: 'img5',
    url: 'https://cdn.phototourl.com/free/2026-06-01-ee4f8b19-eac5-4527-8784-52d3006b132a.jpg',
    title: '完美逆光剪影',
    breed: '布偶猫',
    category: 'cute',
    description: '阳光勾勒出她茂密蓬松的绝美银白色毛发，像坠入凡间的白雪公主。',
    likes: 1890,
    saves: 750,
  },
  {
    id: 'img6',
    url: 'https://cdn.phototourl.com/free/2026-06-01-3d1019a6-c4c7-4ebe-95b7-fb88b07f47a4.jpg',
    title: '裹上我心爱的小围巾',
    breed: '美国短毛猫',
    category: 'sleeping',
    description: '冬天最舒服的事，莫过于戴上心爱的小围巾，感受暖和和的治愈瞬间。',
    likes: 1420,
    saves: 530,
  },
  {
    id: 'img7',
    url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=800&auto=format&fit=crop',
    title: '暗中观察.jpg',
    breed: '中华田园狸花猫',
    category: 'funny',
    description: '藏在茂密绿叶背后的一对金灿灿猫眼，今天也要好好监督人类。',
    likes: 2150,
    saves: 680,
  },
  {
    id: 'img8',
    url: 'https://cdn.phototourl.com/free/2026-06-01-a9140b16-9721-4c1c-b799-d3ada2a627f8.jpg',
    title: '两小无猜时光',
    breed: '混血小奶猫',
    category: 'kitten',
    description: '两只小小奶猫缩在篮子中，眼神中充满了对未知的探索与黏腻的友爱。',
    likes: 3560,
    saves: 1890,
  }
];

export const careTips: CareTip[] = [
  {
    id: 'tip1',
    category: 'diet',
    title: '科学猫咪饮食指南：如何精准配比水分与蛋白质？',
    summary: '猫是天生的纯肉食动物且对渴觉不敏感。了解猫干粮、湿罐头与生肉的黄金配比，可以让主子远离泌尿道结石问题。',
    content: [
      '1. 优质纯肉基底：挑选猫粮第一步是看配料表，前三位必须是明确的动物生肉（如鸡肉、火鸡肉、牛肉），绝对要避免低劣的“畜禽副产品”及大米、小麦等高致敏谷物。对于野生纯肉食动物，蛋白质含量最好维持在38%-45%之间，粗脂肪在16%-22%之间最佳。',
      '2. 破解缺水危机：因猫祖先来自干燥的非洲荒漠，天生水分感知弱，容易引发难以察觉的水分摄入不足。猫建议每日摄水量：50ml - 60ml / 每公斤体重。可以通过定期喂食含水量高达80%的优质猫湿罐头、熟蒸鸡胸肉添加温水来温和补水。',
      '3. 流动水源魔法：推荐购置多孔陶瓷循环流动饮水机。猫极其钟爱流动的活水，这能激发它们的猎奇天性。放置在远离猫砂盆和食盆的地方更符合它们的卫生本能。',
      '4. 严格杜绝的危险：绝对禁止给予猫咪摄入：洋葱及大蒜（造成溶血性贫血）、巧克力与可可（含有致致命剧毒的可可碱）、葡萄与葡萄干（引发急性肾衰竭）、以及禽类尖锐骨头（极易刺穿消化道）。'
    ],
    author: '林喵喵（资深宠物营养师）',
    readTime: '4 分钟',
    views: 4520
  },
  {
    id: 'tip2',
    category: 'health',
    title: '猫咪换季易生病？详解免疫力提升与三大常见病毒预案',
    summary: '春秋季节过渡是猫咪呼吸道 and 消化系统问题的高发期。教你读懂危险信号，做好疫苗防御和温差管理。',
    content: [
      '1. 精准温控保暖：春秋换季伴随剧烈昼夜温差。当室内温差超过6℃时，极易因免疫低下诱发“猫鼻支”（疱疹病毒）。在清晨及深夜应闭合北面大风口，在猫咪常睡位置增加毛绒垫，保障腹部不着凉。',
      '2. 妙用猫草与化毛膏：猫在换季期会历经疯狂的生理性换毛，舔入胃中的死毛无法消化会盘结成“毛球”。这会导致食欲减退、干呕干咳、便秘等呕吐反射。建议每周提前准备新鲜猫草，或适量喂食不添加矿物油、成分健康的天然膳食纤维化毛膏进行温和排毛。',
      '3. 规律疫苗与抗体监测：家养猫咪也须要完整免疫体系：基础猫三联疫苗能高效拦截猫瘟、猫杯状病毒与猫疱疹病毒。每次加强针前可以先做一次抗体浓度检测，避免过度注射或免疫失效。',
      '4. 紧急危险红色警告：若发现猫咪精神极度萎靡、甚至出现腹式呼吸（肚子起伏大）、高烧达39.5℃以上、或超过24小时绝水绝食，请切勿延误，这通常是身体严重器官受损信号，须立即就医治疗。'
    ],
    author: '张逸博（动物医学副教授）',
    readTime: '6 分钟',
    views: 3120
  },
  {
    id: 'tip3',
    category: 'behavior',
    title: '读懂猫的10个无声姿态：耳朵和尾巴究竟想告诉你什么？',
    summary: '猫真的跟你不熟吗？只是你不懂它细微奇妙的身心语言。全景解析多声部猫语与复杂的生理表现。',
    content: [
      '1. 高傲而爱你的“尾巴天线”：当猫竖直尾巴如高耸的天线、且尾尖微微勾起一个小问号向你走来，这是猫界最高级别的“我信任你而且非常开心”的安全信号；如果尾巴低垂夹在双腿间，往往代表恐惧、警惕或极度的顺从。',
      '2. “飞机耳”与瞳孔巨变：当耳朵像飞机机翼一样向两侧极度压扁，并伴有瞳孔缩成一条尖锐的竖线或极度放大，这是猫咪进入防御型攻击状态或高度恐慌的危险极限。此时应立即停止一切强制互动，给它安静、单独的冥想空间。',
      '3. “呼噜呼噜”的多重迷思：我们常认为猫咪发出深沉的鼻咽部共鸣呼噜声是愉悦，其实这是一种安抚。当猫咪极度满足时，会边呼噜边踩奶；但在极度受伤、病危或待产分娩时，它们也会呼噜，以释放内源性多肽达到安慰自己缓解疼痛的神奇效果。',
      '4. 缓慢眨眼——深情吻落：两猫对视或猫盯着人用极慢的速度闭合眼帘，随后移开。这是猫咪对你表达“我爱你”、“对你毫无敌意”的温柔秋波。建议接收到信号后用同样缓慢的速度闭眼回礼，它们会非常受用！'
    ],
    author: '王纯（国际金牌猫咪行为学家）',
    readTime: '5 分钟',
    views: 6180
  },
  {
    id: 'tip4',
    category: 'daily',
    title: '打造猫咪梦想乐园：室内环境丰容的四大维度',
    summary: '室内圈养猫咪容易陷入缺乏活力的忧郁情绪。通过合理的水平与垂直空间拓展、气味与视听刺激丰容，点燃它的野生猎手天性。',
    content: [
      '1. 强力拓展垂直领地：猫咪是天生的树栖动物，相比于局促平坦的地板面积，高处开阔无阻的领地会让其获得百分之百的掌控底气。多级跳台、高耸的实木通顶猫爬架、在牢固墙角铺设防滑猫步道，能使其充分享受高空俯瞰的尊贵快乐。',
      '2. 营造舒适的安全堡垒：猫是伏击猎手，也是极容易紧绷的隐秘生物。家里至少在不同采光维度准备3个以上不被轻易打扰的“暗室堡垒”：如半封闭纸箱、软蓬榻榻米内侧、或是床底，以便它们在环境陌生或家里来客时可以随时神隐藏身。',
      '3. 阳光猫咪专属景观台：在安全的双层钢丝纱窗封网前提下，于暖和向阳的玻璃窗前固定一个猫吸盘吊床。窗外的飞鸟、摇曳的树影和和煦的紫外线阳光，能为它们提供长达几小时的“天然猫系大片影剧院”，极大安抚圈养无聊。',
      '4. 玩玩具的捕猎五部曲：不要扔下老鼠玩具就不管！主人要用逗猫棒模拟昆虫：先试探性地制造草丛嗦嗦声 -> 隐蔽在垫子边缘微颤 -> 瞬间闪现空中 -> 让猫极速飞扑 -> 最终必让其至少按倒咬住5次以上，才能完整拼合其“寻找、追踪、扑咬、蹂躏、进食”的健康捕猎欲望循环。'
    ],
    author: '陈露露（猫派空间环境顾问）',
    readTime: '5 分钟',
    views: 2890
  }
];

export const userComments: UserComment[] = [
  {
    id: 'c1',
    username: '甜甜大魔王',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    content: '这个网站的视觉图太好看了吧，太治愈了！暖橘色的氛围简直戳中了我这只布偶妈妈的全部心巴！里面的科普也非常专业，收藏了。',
    time: '2026-05-24 10:25',
    likes: 88
  },
  {
    id: 'c2',
    username: '铲屎官欧阳',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    content: '终于有人说出折耳猫的痛了，科学养育真的很关键。顺便表扬一下墨镜蓝猫那张，已经保存当头像了哈哈哈，真的太逗了。',
    time: '2026-05-24 16:40',
    likes: 104
  },
  {
    id: 'c3',
    username: '猫咪散步日记',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    content: '垂直领地丰容干货太赞了！我立刻量了量家里客厅的墙壁，准备也给我的美短猫装一套猫咪墙壁木质吊桥！谢谢分享！',
    time: '2026-05-25 00:15',
    likes: 42
  }
];
