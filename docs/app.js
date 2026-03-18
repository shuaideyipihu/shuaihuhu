const state = {
  currentView: 'home',
  currentLessonId: localStorage.getItem('quantCourse.currentLessonId') || 'day-1',
  completedLessons: JSON.parse(localStorage.getItem('quantCourse.completedLessons') || '[]'),
  completedExercises: JSON.parse(localStorage.getItem('quantCourse.completedExercises') || '[]'),
};

const courseData = {
  title: '量化金融学习站',
  subtitle: '从零开始，面向个人投资 / 交易者的长期量化学习系统',
  goal: '逐步达到能够独立做基础量化研究、构建和评估策略、并尝试小规模实操。',
  roadmap: [
    {
      stage: '第 1 周：建立量化语言',
      weeks: 'Day 1–7',
      focus: '理解量化投资是什么，建立收益率、复利、风险收益的基本语言。',
      outcomes: ['知道量化不是自动赚钱机器', '能区分价格与收益率', '开始形成风险收益一起看的习惯'],
    },
    {
      stage: '第 2 周：统计与风险入门',
      weeks: 'Day 8–14',
      focus: '重新激活均值、方差、波动率、相关性、Sharpe、回撤等基础工具。',
      outcomes: ['能解释波动率和最大回撤', '会比较两只资产的风险收益', '能用滚动窗口看市场变化'],
    },
    {
      stage: '第 3 周：时间序列与策略雏形',
      weeks: 'Day 15–21',
      focus: '建立趋势、均值回归、动量、信号与持仓之间的联系。',
      outcomes: ['理解三类经典策略雏形', '能写出最简单的规则策略', '知道信号不等于收益'],
    },
    {
      stage: '第 4 周：回测与陷阱入门',
      weeks: 'Day 22–30',
      focus: '把策略放进回测框架，并理解交易成本、未来函数、过拟合等陷阱。',
      outcomes: ['知道回测到底在测什么', '能看懂几个基础策略指标', '不会轻易被漂亮历史曲线骗到'],
    },
  ],
  lessons: [
    {
      id: 'day-1',
      day: 1,
      title: '量化投资到底在做什么',
      phase: '第 1 周：建立量化语言',
      objective: '理解量化投资不是自动赚钱机器，而是规则化研究框架。',
      intuitiveBlocks: [
        '很多人第一次听到量化投资，会以为它就是“写程序自动买股票”。这个理解只对了一小部分。更准确地说，量化投资是把市场中的想法写成可以验证的规则，再用数据去检查这些规则到底有没有价值。',
        '比如一句主观判断：“最近 AI 板块很强，后面可能还会涨。”量化不会停在这种模糊表达上，而是会继续追问：什么叫“很强”？用过去 20 日涨幅定义吗？后面是 5 天涨，还是 20 天涨？历史上这种情况出现后，胜率是多少？回撤多大？',
        '所以量化投资的核心，不是先预测，而是先定义；不是先相信感觉，而是先把规则讲清楚，再让数据说话。'
      ],
      math: '这一课先不强调公式，先强调流程：想法 → 假设 → 数据 → 规则 → 回测 → 风控 → 迭代。以后学到的统计、回归、因子、回测，都是在为这个流程服务。',
      python: `import pandas as pd\n\nprices = pd.Series([100, 102, 101, 105])\nreturns = prices.pct_change()\n\nprint('prices:')\nprint(prices)\nprint('returns:')\nprint(returns)`,
      explanation: '这段代码做的第一件事，不是赚钱，而是训练你把“价格变化”变成“可分析的数据对象”。量化学习的第一步不是策略，而是学会读懂数据。',
      mistakes: [
        '把量化误解成“自动赚钱机器”',
        '一上来就找圣杯策略，而不是先建立研究流程',
        '只看收益，不看风险、回撤和执行难度',
      ],
      summary: [
        '量化投资的核心是规则化研究，而不是情绪化判断。',
        '想法本身不值钱，能否被清晰定义、被历史检验，才有意义。',
        '以后所有课程都会反复回到一个问题：这个结论能不能被数据支持。',
      ],
      nextLessonId: 'day-2',
      exercises: [
        {
          id: 'ex-1-1',
          title: '概念题',
          prompt: '请用你自己的话区分“主观交易”和“量化研究”最大的不同。',
          hint: '想想：一个更依赖感觉，一个更依赖规则。',
          answer: '参考答案：主观交易常常依赖临场判断、经验和情绪；量化研究更强调把条件写清楚，并用历史数据去验证和迭代。',
        },
        {
          id: 'ex-1-2',
          title: 'Python 题',
          prompt: '把示例价格改成你自己的一组 5 天价格，并运行 `pct_change()` 看输出。',
          hint: '比如 [10, 10.3, 10.1, 10.5, 10.8]。',
          answer: '你应该能看到：价格是一串水平值，而收益率是一串变化比例。量化分析通常更喜欢后者。',
        },
      ],
    },
    {
      id: 'day-2',
      day: 2,
      title: '价格、收益率、对数收益率',
      phase: '第 1 周：建立量化语言',
      objective: '理解为什么量化里更常分析收益率，而不是只盯价格。',
      intuitiveBlocks: [
        '如果一只 10 元的股票涨到 11 元，和一只 100 元的股票涨到 101 元，看起来都涨了 1 元，但意义完全不同。前者涨了 10%，后者只涨了 1%。',
        '量化里之所以更喜欢研究收益率，是因为收益率能把不同价格水平的资产拉回到同一个可比较尺度。',
        '对数收益率你现在不用害怕，本质上也是在描述涨跌，只是数学形式更方便，特别适合多期累计和连续时间分析。'
      ],
      math: '简单收益率 = (Pt - Pt-1) / Pt-1。对数收益率 = ln(Pt / Pt-1)。入门阶段先掌握简单收益率，知道对数收益率是进阶工具就够了。',
      python: `import pandas as pd\nimport numpy as np\n\nprices = pd.Series([10, 10.5, 10.2, 10.8, 10.6])\nsimple_returns = prices.pct_change()\nlog_returns = np.log(prices / prices.shift(1))\n\nprint(simple_returns)\nprint(log_returns)`,
      explanation: '这段代码会让你看到：当日涨跌不大时，简单收益率和对数收益率会很接近，但概念上仍然有区别。',
      mistakes: [
        '把“涨了 1 元”当作统一尺度',
        '以为涨 50% 再跌 50% 会回到原点',
        '不知道收益率是复利过程而不是简单加减',
      ],
      summary: [
        '价格描述水平，收益率描述变化。',
        '不同价格区间的资产，只有放到收益率尺度上才公平。',
        '未来做波动率、相关性、策略收益分析，几乎都要从收益率开始。',
      ],
      nextLessonId: 'day-3',
      exercises: [
        {
          id: 'ex-2-1',
          title: '手算题',
          prompt: '一只股票昨天 50，今天 52，简单收益率是多少？',
          hint: '先算变化，再除以昨天价格。',
          answer: '答案： (52 - 50) / 50 = 4%。',
        },
      ],
    },
    {
      id: 'day-3',
      day: 3,
      title: '复利、累计收益与回撤直觉',
      phase: '第 1 周：建立量化语言',
      objective: '理解复利、累计净值和回撤为什么是交易者必须具备的直觉。',
      intuitiveBlocks: [
        '很多人知道“涨跌幅”，但没有真正理解“路径”这件事。100 涨 50% 变成 150，再跌 50% 不是回到 100，而是跌到 75。',
        '这说明交易结果不是简单加减，而是乘法结构。路径不同，终点就不同。',
        '回撤的本质就是：在你已经赚到一部分之后，后来又回吐了多少。它非常贴近真实投资体验。'
      ],
      math: '累计净值通常按 (1+r1)(1+r2)...(1+rn) 连乘得到。回撤 = (当前净值 - 历史最高净值) / 历史最高净值。',
      python: `import pandas as pd\n\nreturns = pd.Series([0.1, -0.05, 0.08, -0.12])\nnav = (1 + returns).cumprod()\nrunning_max = nav.cummax()\ndrawdown = (nav - running_max) / running_max\n\nprint(nav)\nprint(drawdown)`,
      explanation: '这个例子会让你看到：同样是“赚过”，但如果之后回吐很大，你的体验会非常糟糕，所以不能只盯最终收益。',
      mistakes: ['只看最终收益，不看途中最大回撤', '忽视复利路径的影响', '把净值曲线想得过于平滑'],
      summary: ['复利是乘法，不是加法。', '累计收益和回撤必须一起看。', '回撤是以后所有风控课程的核心语言之一。'],
      nextLessonId: 'day-4',
      exercises: [
        { id: 'ex-3-1', title: '理解题', prompt: '为什么涨 50% 再跌 50% 不会回本？', hint: '先代入 100 去算。', answer: '因为 100→150→75，第二次跌的基数已经不是 100，而是 150。' },
      ],
    },
    {
      id: 'day-4',
      day: 4,
      title: '市场基础——股票、指数、ETF、行业',
      phase: '第 1 周：建立量化语言',
      objective: '搞清楚量化里常见研究对象分别是什么，以及它们各自适合研究什么。',
      intuitiveBlocks: [
        '股票是单一公司，指数是一篮子股票的整体表现，ETF 是可以交易的基金壳，行业则是把相似业务公司放在一起看的分类方式。',
        '如果你研究一家公司，个股很重要；如果你研究市场风格，指数和行业更重要；如果你要做较稳的策略测试，ETF 常常是很好的入门对象。'
      ],
      math: '这一课数学最少，重点是对象分类和研究目的对应关系。',
      python: `watchlist = {\n    'stock': ['NVDA', 'AAPL'],\n    'etf': ['SPY', 'QQQ'],\n    'sector': ['SOXX', 'XLE']\n}\nprint(watchlist)`,
      explanation: '以后你做策略时，先想清楚你研究的是单个公司、一个主题篮子，还是整个市场。',
      mistakes: ['把 ETF 当成普通股票理解', '研究行业却只盯一只龙头票', '没区分个股波动和指数波动的不同'],
      summary: ['研究对象不同，策略设计也不同。', 'ETF 是很适合初学者练手的量化对象。'],
      nextLessonId: 'day-5',
      exercises: [
        { id: 'ex-4-1', title: '分类题', prompt: '请举出一个你常看的股票、一个指数、一个 ETF。', hint: '比如美股、A股都可以。', answer: '参考：NVDA（股票）、纳指100（指数）、QQQ（ETF）。' },
      ],
    },
    {
      id: 'day-5',
      day: 5,
      title: '收益率分布与市场噪声',
      phase: '第 1 周：建立量化语言',
      objective: '建立“市场很吵”的直觉，知道为什么不能把每一次涨跌都看成信号。',
      intuitiveBlocks: [
        '市场每天都在波动，但不是每一次波动都代表有意义的信息。很多波动只是噪声。',
        '量化之所以需要统计，是因为肉眼看图很容易把随机性误当成规律。'
      ],
      math: '收益率分布帮助我们理解常态波动、极端波动和尾部风险。',
      python: `import pandas as pd\nimport matplotlib.pyplot as plt\n\nreturns = pd.Series([0.01, -0.02, 0.015, 0.03, -0.01, 0.005, -0.04])\nreturns.hist(bins=10)\nplt.show()`,
      explanation: '不是要你今天就成为统计学家，而是要你知道：图像和情绪都可能骗人，分布思维能帮你冷静。',
      mistakes: ['把一两天的大涨大跌当成长久规律', '过度依赖肉眼看图', '忽视尾部风险'],
      summary: ['市场里有大量噪声。', '量化学习要培养分布思维，而不是故事思维。'],
      nextLessonId: 'day-6',
      exercises: [
        { id: 'ex-5-1', title: '观察题', prompt: '如果一个策略只有几次特别大的盈利，其余时候都很平庸，你会担心什么？', hint: '想想“运气”和“稳定性”。', answer: '要担心收益是不是过度依赖少数极端时刻，稳定性和可重复性可能不足。' },
      ],
    },
    {
      id: 'day-6',
      day: 6,
      title: '从看涨跌到看风险收益',
      phase: '第 1 周：建立量化语言',
      objective: '建立“收益和风险必须一起看”的习惯。',
      intuitiveBlocks: [
        '两只资产都涨了 20%，并不代表它们一样好。一个可能一路平稳上去，另一个可能中间先腰斩再拉回。',
        '真正的交易判断不是“赚没赚”，而是“冒了多大风险赚到这些收益”。'
      ],
      math: '这一课先建立直觉：平均收益、波动率、回撤要一起看。后面我们再系统讲 Sharpe。',
      python: `assets = {\n    'A': {'return': 0.20, 'vol': 0.10},\n    'B': {'return': 0.20, 'vol': 0.35}\n}\nprint(assets)`,
      explanation: '同样收益，不同风险，对交易者的意义完全不同。',
      mistakes: ['只盯涨跌幅排行榜', '忽略高波动带来的心理与资金压力'],
      summary: ['收益不是唯一指标。', '风险收益比才更接近专业视角。'],
      nextLessonId: 'day-7',
      exercises: [
        { id: 'ex-6-1', title: '比较题', prompt: '如果两只资产年化收益一样，一只最大回撤 8%，另一只 35%，你更愿意先研究哪一只？为什么？', hint: '别只看收益。', answer: '通常更愿意先研究回撤更小的，因为它的资金曲线和可执行性更友好。' },
      ],
    },
    {
      id: 'day-7',
      day: 7,
      title: '第 1 周复盘：把量化语言串起来',
      phase: '第 1 周：建立量化语言',
      objective: '把前 6 天学过的概念串成一套最基础的量化语言。',
      intuitiveBlocks: [
        '这一周你学的东西看起来分散：价格、收益率、复利、回撤、ETF、噪声、风险收益。但它们其实都在回答一个问题：怎样用更清楚、更可比较的方式看市场。',
        '如果你能用这套语言重新描述一只股票、一段走势、一个策略，那你就已经从纯直觉观察者，开始变成量化学习者了。'
      ],
      math: '这节课不加新公式，重点是把前 6 天的概念重新组织成自己的表述。',
      python: `topics = ['收益率', '复利', '回撤', 'ETF', '分布', '风险收益']\nfor t in topics:\n    print('本周关键词:', t)`,
      explanation: '你可以把这一周理解成“建立坐标系”的一周。',
      mistakes: ['急着往后学，而没有回头串联概念', '知道单点概念，但讲不出它们之间的关系'],
      summary: ['这一周的目标不是会写策略，而是先学会量化语言。', '只有语言坐标系稳了，后面统计和策略才不会漂。'],
      nextLessonId: null,
      exercises: [
        { id: 'ex-7-1', title: '复盘题', prompt: '用 5 句话总结“量化投资和普通看盘最大的区别”。', hint: '可以从规则、收益率、风险、数据、验证几个词展开。', answer: '参考方向：量化投资更强调把想法规则化、用收益率而不是价格比较、把风险和收益一起看、用数据而不是感觉验证、并持续迭代。' },
      ],
    },
  ],
  practiceGroups: [
    {
      title: '基础概念练习',
      items: ['收益率与价格区别', '复利与累计收益', '风险收益一起看'],
    },
    {
      title: 'Python 动手练习',
      items: ['使用 pandas 读取价格序列', '计算收益率', '画出收益率分布'],
    },
  ],
  glossary: [
    { term: '收益率', tag: '基础', front: '收益率', back: '衡量资产在一段时间内相对于初始价格的涨跌比例。量化里比直接看价格更重要。' },
    { term: '波动率', tag: '风险', front: '波动率', back: '通常用收益率的标准差来衡量，表示价格波动的剧烈程度，是最常见的风险语言之一。' },
    { term: '最大回撤', tag: '风险', front: '最大回撤', back: '从历史高点到后续低点的最大跌幅。它非常接近投资者真实体感中的“最痛亏损”。' },
    { term: 'Sharpe Ratio', tag: '评估', front: 'Sharpe Ratio', back: '风险调整后收益指标。不是只看赚了多少，而是看冒了多少风险才赚到这些收益。' },
    { term: '过拟合', tag: '回测', front: '过拟合', back: '策略参数被调到特别适配历史数据，但对未来没有泛化能力。看起来很漂亮，实盘常翻车。' },
    { term: '样本外', tag: '回测', front: '样本外', back: '没有参与策略开发或参数调优的数据，用来更真实地检验策略是否具备泛化能力。' },
  ],
};

const lessonMap = new Map(courseData.lessons.map((lesson, idx) => [lesson.id, { lesson, idx }]));

function setView(view) {
  state.currentView = view;
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  const titleMap = {
    home: '首页', roadmap: '课程地图', lesson: '今日课程', practice: '练习区', glossary: '术语卡片', progress: '学习进度',
  };
  document.getElementById('view-title').textContent = titleMap[view];
}

function persist() {
  localStorage.setItem('quantCourse.currentLessonId', state.currentLessonId);
  localStorage.setItem('quantCourse.completedLessons', JSON.stringify(state.completedLessons));
  localStorage.setItem('quantCourse.completedExercises', JSON.stringify(state.completedExercises));
}

function getCurrentLesson() {
  return lessonMap.get(state.currentLessonId)?.lesson || courseData.lessons[0];
}

function goToLesson(id) {
  if (!lessonMap.has(id)) return;
  state.currentLessonId = id;
  persist();
  renderAll();
  setView('lesson');
}

function toggleLessonCompletion() {
  const id = state.currentLessonId;
  if (state.completedLessons.includes(id)) {
    state.completedLessons = state.completedLessons.filter(x => x !== id);
  } else {
    state.completedLessons.push(id);
  }
  persist();
  renderAll();
}

function toggleExerciseCompletion(id) {
  if (state.completedExercises.includes(id)) {
    state.completedExercises = state.completedExercises.filter(x => x !== id);
  } else {
    state.completedExercises.push(id);
  }
  persist();
  renderPractice();
}

function renderHome() {
  const today = getCurrentLesson();
  const completedCount = state.completedLessons.length;
  document.getElementById('view-home').innerHTML = `
    <div class="hero-grid">
      <section class="hero">
        <p class="kicker">长期项目</p>
        <h3>${courseData.title}</h3>
        <p>${courseData.subtitle}</p>
        <p><strong>目标：</strong>${courseData.goal}</p>
        <div class="stats-grid">
          <div class="stat-card"><h3>当前主线</h3><strong>股票量化</strong><span class="muted">先打基础，再扩展 ETF / 期货 / 期权</span></div>
          <div class="stat-card"><h3>日学习时长</h3><strong>1–1.5h</strong><span class="muted">每天一课，配 Python 与练习</span></div>
          <div class="stat-card"><h3>已完成</h3><strong>${completedCount}</strong><span class="muted">按课推进，不求快，求稳</span></div>
        </div>
      </section>
      <section class="panel">
        <p class="kicker">当前课程</p>
        <h3>Day ${today.day} · ${today.title}</h3>
        <p class="muted">${today.objective}</p>
        <span class="badge">${today.phase}</span>
        <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="small-btn" onclick="goToLesson('${today.id}')">进入课程</button>
          <button class="small-btn" onclick="setView('practice')">查看练习</button>
          <button class="small-btn" onclick="setView('roadmap')">看课程地图</button>
        </div>
      </section>
    </div>

    <section class="card-grid">
      <article class="panel">
        <p class="kicker">课程理念</p>
        <h3>先建立研究框架，再追求策略</h3>
        <p class="muted">我们不把量化包装成“短期暴富工具”，而是把它当作一种更严谨的市场研究与交易决策方法。</p>
      </article>
      <article class="panel">
        <p class="kicker">学习方式</p>
        <h3>通俗 + 严谨 + Python + 练习</h3>
        <p class="muted">每一课尽量同时讲清楚：直觉、数学、代码、交易意义。这样不容易学成只会背概念的“纸面量化”。</p>
      </article>
      <article class="panel">
        <p class="kicker">第一阶段成果</p>
        <h3>第 1 周先学会什么</h3>
        <p class="muted">先学会用收益率、复利、回撤、风险收益这些语言重新描述市场，而不是只看热闹和故事。</p>
      </article>
    </section>
  `;
}

function renderRoadmap() {
  document.getElementById('view-roadmap').innerHTML = `
    <div class="timeline">
      ${courseData.roadmap.map(stage => `
        <article class="timeline-item">
          <p class="kicker">${stage.weeks}</p>
          <h4>${stage.stage}</h4>
          <p class="muted">${stage.focus}</p>
          <ul>${stage.outcomes.map(item => `<li>${item}</li>`).join('')}</ul>
        </article>
      `).join('')}
      <article class="timeline-item">
        <p class="kicker">当前状态</p>
        <h4>第一周正文已接入</h4>
        <p class="muted">现在已经能顺着 Day 1 → Day 7 连续学习，不再只有一个空壳页面。后续会继续把第 2–4 周补齐。</p>
      </article>
    </div>
  `;
}

function renderLesson() {
  const lesson = getCurrentLesson();
  const current = lessonMap.get(lesson.id);
  const prevLesson = current.idx > 0 ? courseData.lessons[current.idx - 1] : null;
  const nextLesson = lesson.nextLessonId ? lessonMap.get(lesson.nextLessonId)?.lesson : null;
  document.getElementById('view-lesson').innerHTML = `
    <div class="lesson-layout">
      <article class="lesson-card">
        <p class="kicker">${lesson.phase}</p>
        <h3>Day ${lesson.day} · ${lesson.title}</h3>
        <div class="section-block">
          <h4>本课目标</h4>
          <p>${lesson.objective}</p>
        </div>
        <div class="section-block">
          <h4>通俗讲解</h4>
          ${lesson.intuitiveBlocks.map(block => `<p>${block}</p>`).join('')}
        </div>
        <div class="section-block">
          <h4>数学 / 方法框架</h4>
          <p>${lesson.math}</p>
        </div>
        <div class="section-block">
          <h4>Python 示例</h4>
          <button class="copy-btn" data-copy="lesson-code">复制代码</button>
          <pre><code id="lesson-code">${lesson.python}</code></pre>
          <p>${lesson.explanation}</p>
        </div>
        <div class="section-block">
          <h4>常见误区</h4>
          <ul>${lesson.mistakes.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="section-block">
          <h4>本课总结</h4>
          <ul>${lesson.summary.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </article>

      <aside class="panel">
        <p class="kicker">课程导航</p>
        <h3>这一周已经可以连续看了</h3>
        <p class="muted">你现在可以直接在课程页里前后切换，不需要每次退回首页。</p>
        <div style="display:grid; gap:10px; margin-top:14px;">
          <button class="small-btn" ${prevLesson ? `onclick="goToLesson('${prevLesson.id}')"` : 'disabled'}>${prevLesson ? `上一课：Day ${prevLesson.day}` : '已经是第一课'}</button>
          <button class="small-btn" ${nextLesson ? `onclick="goToLesson('${nextLesson.id}')"` : 'disabled'}>${nextLesson ? `下一课：Day ${nextLesson.day}` : '第一周已结束'}</button>
          <button class="small-btn" onclick="setView('practice')">去做本课练习</button>
        </div>
        <div class="notice" style="margin-top:14px;">后续我会继续补齐第 2–4 周正文，不会让课程地图和课程内容脱节。</div>
      </aside>
    </div>
  `;
}

function renderPractice() {
  const lesson = getCurrentLesson();
  document.getElementById('view-practice').innerHTML = `
    <div class="card-grid">
      ${lesson.exercises.map((exercise, idx) => {
        const done = state.completedExercises.includes(exercise.id);
        return `
          <article class="exercise-card">
            <p class="kicker">练习 ${idx + 1}</p>
            <h3>${exercise.title}</h3>
            <p>${exercise.prompt}</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
              <button class="toggle-btn" data-toggle="hint-${exercise.id}">显示提示</button>
              <button class="toggle-btn" data-toggle="answer-${exercise.id}">显示答案</button>
              <button class="small-btn mark-ex-done" data-ex="${exercise.id}">${done ? '取消完成' : '标记完成'}</button>
            </div>
            <div class="exercise-answer" id="hint-${exercise.id}">
              <p><strong>提示：</strong>${exercise.hint}</p>
            </div>
            <div class="exercise-answer" id="answer-${exercise.id}">
              <p><strong>答案 / 思路：</strong>${exercise.answer}</p>
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <section class="panel" style="margin-top:18px;">
      <p class="kicker">后续规划</p>
      <h3>练习区会继续长成什么样</h3>
      <ul>
        ${courseData.practiceGroups.map(group => `<li><strong>${group.title}</strong>：${group.items.join('、')}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderGlossary() {
  const container = document.getElementById('view-glossary');
  container.innerHTML = `
    <div class="search-row">
      <input id="glossary-search" placeholder="搜索术语，比如：收益率 / 波动率 / Sharpe" />
    </div>
    <div class="term-grid" id="term-grid"></div>
  `;
  const grid = container.querySelector('#term-grid');
  const paint = (items) => {
    grid.innerHTML = items.map(item => `
      <article class="term-card" data-term="${item.term}">
        <div class="term-inner">
          <div class="term-face front">
            <p class="kicker">${item.tag}</p>
            <h3>${item.front}</h3>
            <p class="muted">点击翻卡</p>
          </div>
          <div class="term-face back">
            <p class="kicker">解释</p>
            <p>${item.back}</p>
          </div>
        </div>
      </article>
    `).join('');
    grid.querySelectorAll('.term-card').forEach(card => card.addEventListener('click', () => card.classList.toggle('flipped')));
  };
  paint(courseData.glossary);
  container.querySelector('#glossary-search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = courseData.glossary.filter(item => `${item.term} ${item.back} ${item.tag}`.toLowerCase().includes(q));
    paint(filtered);
  });
}

function renderProgress() {
  const totalLessons = courseData.lessons.length;
  const completed = state.completedLessons.length;
  const ratio = totalLessons ? Math.round((completed / totalLessons) * 100) : 0;
  const lesson = getCurrentLesson();
  document.getElementById('view-progress').innerHTML = `
    <section class="panel">
      <p class="kicker">学习进度</p>
      <h3>第一周现在已经可以完整推进</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${ratio}%"></div></div>
      <p class="muted" style="margin-top:12px;">已完成 ${completed} / ${totalLessons} 节课</p>
    </section>

    <section class="card-grid" style="margin-top:18px;">
      <article class="stat-card"><h3>当前课程</h3><strong>Day ${lesson.day}</strong><span class="muted">${lesson.title}</span></article>
      <article class="stat-card"><h3>本课状态</h3><strong>${state.completedLessons.includes(lesson.id) ? '完成' : '未完成'}</strong><span class="muted">右上角按钮可切换</span></article>
      <article class="stat-card"><h3>已完成练习</h3><strong>${state.completedExercises.length}</strong><span class="muted">练习支持完成 / 取消完成</span></article>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll('.nav-link').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
  document.getElementById('mark-today-complete').onclick = toggleLessonCompletion;
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      const codeId = copyBtn.dataset.copy;
      const text = document.getElementById(codeId).textContent;
      navigator.clipboard.writeText(text);
      copyBtn.textContent = '已复制';
      setTimeout(() => copyBtn.textContent = '复制代码', 1200);
    }
    const toggleBtn = e.target.closest('.toggle-btn');
    if (toggleBtn) {
      const id = toggleBtn.dataset.toggle;
      document.getElementById(id).classList.toggle('open');
    }
    const exBtn = e.target.closest('.mark-ex-done');
    if (exBtn) {
      toggleExerciseCompletion(exBtn.dataset.ex);
    }
  });
}

function renderAll() {
  renderHome();
  renderRoadmap();
  renderLesson();
  renderPractice();
  renderGlossary();
  renderProgress();
  setView(state.currentView);
}

window.setView = setView;
window.goToLesson = goToLesson;
renderAll();
bindEvents();
