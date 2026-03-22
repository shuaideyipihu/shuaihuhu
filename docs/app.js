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
  promise: '不是把量化包装成“自动赚钱机器”，而是把你训练成能用数据、规则和风险视角看市场的人。',
  roadmap: [
    {
      stage: '模块 1：金融与投资语言',
      weeks: '第 1–2 周',
      focus: '先建立资产、收益率、复利、风险收益、组合与基准的金融语言，而不是一上来就讲策略。',
      outcomes: ['能区分价格、收益率、累计净值与回撤', '理解风险收益权衡和基准的意义', '知道量化研究先是金融问题，再是代码问题'],
    },
    {
      stage: '模块 2：统计、回归与时间序列',
      weeks: '第 3–5 周',
      focus: '从分布、估计误差、回归、波动率、相关性走向金融时间序列，理解市场数据不是普通静态表格。',
      outcomes: ['会用均值、方差、相关性描述资产', '理解回归是解释和检验工具', '知道非平稳、波动簇集、均值回归等时间序列特征'],
    },
    {
      stage: '模块 3：数据工程与回测纪律',
      weeks: '第 6–8 周',
      focus: '建立数据清洗、复权、样本内外划分、交易成本与研究留痕的纪律，避免“看上去有效”的伪量化。',
      outcomes: ['知道 point-in-time 数据的重要性', '会把信号变成仓位和 PnL', '能识别过拟合、未来函数和忽略成本的假策略'],
    },
    {
      stage: '模块 4：策略、组合与风险控制',
      weeks: '第 9–12 周',
      focus: '在前面基础上，再进入动量、均值回归、因子、组合优化、波动控制与执行现实。',
      outcomes: ['理解策略家族的差异', '会用组合和仓位控制表达观点', '知道实盘和回测之间最大的裂缝在哪里'],
    },
  ],
  coreModules: [
    {
      title: '金融基础模块',
      description: '资产、收益率、复利、回撤、基准、风险收益权衡。先学金融对象和度量语言，再谈量化方法。',
      anchors: ['Bodie / Kane / Marcus', '收益率与组合理论', '风险收益框架'],
    },
    {
      title: '统计与时间序列模块',
      description: '概率、分布、估计误差、回归、相关性、波动率、AR/MA/ARIMA、均值回归、波动簇集。',
      anchors: ['Tsay', 'Regression & inference', 'Financial time series'],
    },
    {
      title: '数据与回测模块',
      description: '数据清洗、复权、样本内外、交易成本、容量、滑点、研究日志和复现实验。',
      anchors: ['Chan', 'Backtesting discipline', 'Research artifacts'],
    },
    {
      title: '策略与风险模块',
      description: '动量、均值回归、横截面排序、因子、组合构建、风险预算、执行与监控。',
      anchors: ['Chan', 'Portfolio construction', 'Risk control'],
    },
  ],
  lessons: [
    {
      id: 'day-1',
      day: 1,
      title: '量化投资到底在做什么',
      phase: '第 1 周：建立量化语言',
      duration: '建议 60–80 分钟',
      objective: '理解量化投资不是自动赚钱机器，而是把想法写成规则、再用数据验证的研究框架。',
      whyItMatters: '如果这一步理解错了，后面学再多指标、回测和代码，都容易变成“拿技术给幻觉加滤镜”。量化最先训练的不是编程，而是“把模糊观点变成可检验问题”的习惯。',
      studyFlow: [
        '先理解量化研究流程：想法 → 规则 → 数据 → 检验。',
        '再看为什么价格序列必须被转成“可运算的数据对象”。',
        '最后理解：代码不是装饰，而是把研究流程落地的语言。',
      ],
      intuitiveBlocks: [
        '很多人第一次听到量化投资，会以为它就是“写程序自动买股票”。这只说对了一小部分。更准确地说，量化投资是：先提出一个市场想法，再把它翻译成明确规则，最后用历史数据去检验这个规则到底有没有价值。',
        '比如一句主观判断：“最近 AI 板块很强，后面可能还会涨。”量化不会停在这种说法上，而是继续追问：什么叫“很强”？是过去 20 日涨幅排前 10% 吗？后面是未来 5 日继续涨，还是未来 20 日更强？历史上这种情况出现后，胜率、平均收益、最大回撤分别是多少？',
        '所以量化的核心，不是先预测，而是先定义；不是先相信感觉，而是先把规则说清楚，再让数据说话。你以后学到的收益率、波动率、回测、因子、风控，本质上都是在为这个流程服务。',
      ],
      conceptBridge: '把主观判断翻译成量化问题，通常要经过三个动作：第一，把语言变清楚；第二，把清楚的条件写成规则；第三，把规则放进数据里验证。这就是从“我觉得”走向“我能证明到什么程度”的过程。',
      math: '这一课先不强调公式，先强调流程：想法 → 假设 → 数据 → 规则 → 回测 → 风控 → 迭代。以后学到的统计、回归、因子、回测，都是在为这个流程服务。',
      codeContext: '下面这段代码看起来只是打印价格和收益率，但它承担了一个关键训练：把市场变化从“肉眼看图”变成“机器可读、可计算的数据序列”。没有这个动作，后面所有量化分析都无从谈起。',
      python: `import pandas as pd\n\nprices = pd.Series([100, 102, 101, 105])\nreturns = prices.pct_change()\n\nprint('prices:')\nprint(prices)\nprint('returns:')\nprint(returns)`,
      codeWalkthrough: [
        { line: 'prices = pd.Series([100, 102, 101, 105])', meaning: '先把一串价格放进 pandas 的 Series 里。Series 是最基础的一维数据容器，后面几乎所有价格序列、收益率序列都会以类似形式出现。' },
        { line: 'returns = prices.pct_change()', meaning: '把价格序列转换成收益率序列。`pct_change()` 会计算相邻两个价格之间的百分比变化。量化里通常分析的是变化，而不是单纯的价格水平。' },
        { line: "print('prices:') / print(prices)", meaning: '先看原始数据。你要养成一个习惯：任何分析前都先确认你手里到底是什么数据。' },
        { line: "print('returns:') / print(returns)", meaning: '再看转换后的收益率。第一行通常是空值，因为第一天没有前一天作为比较基准。这个细节以后会频繁出现。' },
      ],
      explanation: '这段代码的课程意义非常直接：它把“资产价格每天在变”翻译成“资产每天变化了多少比例”。前者只是现象，后者才是可以继续做统计、风险分析和策略研究的对象。你不是在背代码，而是在学量化最底层的数据语言。',
      interpretation: [
        '看到价格序列时，你知道市场在怎么走；看到收益率序列时，你才开始能比较、聚合、统计。',
        '如果两只股票价格一个是 10 元、一个是 1000 元，直接比价格几乎没有意义；但比收益率就有了统一尺度。',
        '所以这段代码虽然短，却在搭建后面全部课程的地基。',
      ],
      mistakes: [
        '把量化误解成“自动赚钱机器”',
        '一上来就找圣杯策略，而不是先建立研究流程',
        '只看收益，不看风险、回撤和执行难度',
      ],
      summary: [
        '量化投资的核心是规则化研究，而不是情绪化判断。',
        '想法本身不值钱，能否被清晰定义、被历史检验，才有意义。',
        '代码不是课程装饰，而是把研究流程落地的工具。',
      ],
      nextLessonId: 'day-2',
      exercises: [
        {
          id: 'ex-1-1',
          title: '概念题',
          prompt: '请用你自己的话区分“主观交易”和“量化研究”最大的不同。',
          hint: '想想：一个更依赖感觉，一个更依赖规则。',
          answer: '参考答案：主观交易常依赖临场判断、经验和情绪；量化研究更强调把条件写清楚，并用历史数据去验证和迭代。',
        },
        {
          id: 'ex-1-2',
          title: '代码理解题',
          prompt: '为什么这节课不是直接讲策略，而是先让你把价格变成收益率？',
          hint: '想想量化后面要做的统计、比较和回测，依赖的到底是价格还是变化。',
          answer: '因为量化后续大多数分析都依赖“变化”而不是单纯价格水平。收益率更适合比较不同资产、计算波动率、累计净值和评估策略表现。',
        },
        {
          id: 'ex-1-3',
          title: 'Python 动手题',
          prompt: '把示例价格改成你自己的一组 5 天价格，并运行 `pct_change()` 看输出，再描述第一行为什么会是 NaN。',
          hint: '第一天没有“前一天”，所以没法算变化。',
          answer: '你应该能看到：第一行通常是 NaN，因为收益率需要和前一个时点比较；第一天没有前值，所以无法计算。',
        },
      ],
    },
    {
      id: 'day-2',
      day: 2,
      title: '价格、收益率、对数收益率',
      phase: '第 1 周：建立量化语言',
      duration: '建议 70–90 分钟',
      objective: '理解为什么量化里更常分析收益率，而不是只盯价格，并建立对数收益率的初步直觉。',
      whyItMatters: '如果你不知道为什么要用收益率，你之后学波动率、相关性、回测收益、风险指标时会一直觉得“公式很多但不知道在算什么”。这节课的任务，是把“价格”和“变化”分开。',
      studyFlow: [
        '先理解为什么同样涨 1 元，意义可能完全不同。',
        '再区分简单收益率与对数收益率。',
        '最后理解为什么量化模型喜欢用收益率做统一比较。',
      ],
      intuitiveBlocks: [
        '如果一只 10 元的股票涨到 11 元，和一只 100 元的股票涨到 101 元，看起来都涨了 1 元，但意义完全不同。前者涨了 10%，后者只涨了 1%。',
        '量化之所以更喜欢研究收益率，是因为收益率能把不同价格水平的资产拉回到同一个可比较尺度。这样你才能公平地比较不同标的、不同时间段。',
        '对数收益率现在先不用害怕。你可以把它理解成另一种记录涨跌的方法，优势在于多期累计更方便、数学处理更自然。入门时先掌握简单收益率，知道对数收益率是进阶工具就够了。',
      ],
      conceptBridge: '价格回答的是“现在贵不贵”；收益率回答的是“变化了多少”；对数收益率回答的是“如果我要更方便地做多期累加和连续时间分析，有没有更顺手的表达方式”。',
      math: '简单收益率 = (Pt - Pt-1) / Pt-1。对数收益率 = ln(Pt / Pt-1)。当单期涨跌幅不大时，两者数值往往很接近。',
      codeContext: '下面代码不是单纯展示两个公式，而是在训练你看到同一段价格数据时，能从不同“变化定义”得到不同但相关的分析对象。',
      python: `import pandas as pd\nimport numpy as np\n\nprices = pd.Series([10, 10.5, 10.2, 10.8, 10.6])\nsimple_returns = prices.pct_change()\nlog_returns = np.log(prices / prices.shift(1))\n\nprint(simple_returns)\nprint(log_returns)`,
      codeWalkthrough: [
        { line: 'prices = pd.Series([10, 10.5, 10.2, 10.8, 10.6])', meaning: '先准备一段价格路径。路径比单独某一天价格更重要，因为量化看的不是静态点，而是动态变化。' },
        { line: 'simple_returns = prices.pct_change()', meaning: '计算最常见的简单收益率。这是你后面大多数入门分析最常用的表示。' },
        { line: 'log_returns = np.log(prices / prices.shift(1))', meaning: '先把当天价格除以前一天价格，得到涨跌倍数，再取自然对数。这就是对数收益率。' },
        { line: 'print(simple_returns) / print(log_returns)', meaning: '把两种结果并排观察。你会发现很多时候它们很接近，但思维上不能把它们混成一回事。' },
      ],
      explanation: '课程上这段代码的意义在于：它迫使你把“价格变化”拆成不同的数学语言。以后你会发现，量化不是只有一个正确表达，而是要根据问题选择更合适的表达方式。',
      interpretation: [
        '简单收益率更直观，适合初学和大多数日常分析。',
        '对数收益率更适合做多期累加、统计建模和一些连续时间框架。',
        '真正关键的不是死记哪一个更“高级”，而是知道你为什么在这里选它。',
      ],
      mistakes: [
        '把“涨了 1 元”当成统一尺度',
        '以为涨 50% 再跌 50% 会回到原点',
        '不知道收益率是复利过程而不是简单加减',
      ],
      summary: [
        '价格描述水平，收益率描述变化。',
        '不同价格区间的资产，只有放到收益率尺度上才公平。',
        '对数收益率先建立直觉，不必急着深入。',
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
        {
          id: 'ex-2-2',
          title: '理解题',
          prompt: '为什么量化比较不同股票时通常更愿意看收益率而不是价格？',
          hint: '关键在“统一尺度”。',
          answer: '因为价格水平不同，直接比较没有统一标准；收益率把变化放到比例尺度上，更适合横向比较。',
        },
      ],
    },
    {
      id: 'day-3',
      day: 3,
      title: '复利、累计收益与回撤直觉',
      phase: '第 1 周：建立量化语言',
      duration: '建议 70–90 分钟',
      objective: '理解复利、累计净值和回撤为什么是交易者必须具备的直觉。',
      whyItMatters: '如果你只盯最终收益，而不理解路径、净值和回撤，你会很容易被“高收益故事”骗。真实交易体验里，回撤往往比平均收益更能决定你能不能拿得住策略。',
      studyFlow: [
        '先建立“投资结果是乘法结构”的直觉。',
        '再理解累计净值如何从收益率一步步长出来。',
        '最后理解回撤为什么更接近真实痛感。',
      ],
      intuitiveBlocks: [
        '很多人知道“涨跌幅”，但没有真正理解“路径”这件事。100 涨 50% 变成 150，再跌 50% 不是回到 100，而是跌到 75。',
        '这说明交易结果不是简单加减，而是乘法结构。路径不同，终点就不同。看似相同的平均收益，可能对应完全不同的资金曲线体验。',
        '回撤的本质就是：在你已经赚到一部分之后，后来又回吐了多少。它非常贴近真实投资体验，因为人往往不是被“最终收益不够高”击败，而是先被中途深跌吓跑。',
      ],
      conceptBridge: '收益率序列让你知道每一步怎么变；累计净值把这些变化连起来；回撤则告诉你这条路径中最痛的部分在哪里。三者一起，才接近真实的投资过程。',
      math: '累计净值通常按 (1+r1)(1+r2)...(1+rn) 连乘得到。回撤 = (当前净值 - 历史最高净值) / 历史最高净值。',
      codeContext: '下面这段代码第一次把“单期收益”往“资金曲线”推进。它让你看到：收益率不只是每天涨跌，而是会堆出一条净值路径，而回撤就是对这条路径的痛感刻画。',
      python: `import pandas as pd\n\nreturns = pd.Series([0.1, -0.05, 0.08, -0.12])\nnav = (1 + returns).cumprod()\nrunning_max = nav.cummax()\ndrawdown = (nav - running_max) / running_max\n\nprint(nav)\nprint(drawdown)`,
      codeWalkthrough: [
        { line: 'returns = pd.Series([0.1, -0.05, 0.08, -0.12])', meaning: '先设定几期收益率。你可以把它看成策略或资产在几天里的收益表现。' },
        { line: 'nav = (1 + returns).cumprod()', meaning: '把每期收益率变成增长倍数后连乘，得到累计净值曲线。这里的 `cumprod()` 是理解复利最关键的函数之一。' },
        { line: 'running_max = nav.cummax()', meaning: '记录每个时点之前出现过的历史最高净值。只有知道历史峰值，才能定义“从高点回落了多少”。' },
        { line: 'drawdown = (nav - running_max) / running_max', meaning: '用当前净值相对历史最高净值的跌幅，计算回撤。结果通常是负数，越小代表跌得越深。' },
      ],
      explanation: '这段代码和课程目标的关系很紧：它把“复利”“净值”“回撤”这三个本来容易抽象的概念放到同一条路径里。你不是在学三个分散名词，而是在学资金曲线是如何被构造和评估的。',
      interpretation: [
        '同样是“赚过钱”，但如果中间回吐很大，你的实际体验会非常差。',
        '回撤小的策略不一定收益最高，但往往更容易长期执行。',
        '以后看到任何漂亮收益图，都要反射性地问一句：它的最大回撤是多少？',
      ],
      mistakes: ['只看最终收益，不看途中最大回撤', '忽视复利路径的影响', '把净值曲线想得过于平滑'],
      summary: ['复利是乘法，不是加法。', '累计收益和回撤必须一起看。', '回撤是以后所有风控课程的核心语言之一。'],
      nextLessonId: 'day-4',
      exercises: [
        { id: 'ex-3-1', title: '理解题', prompt: '为什么涨 50% 再跌 50% 不会回本？', hint: '先代入 100 去算。', answer: '因为 100→150→75，第二次跌的基数已经不是 100，而是 150。' },
        { id: 'ex-3-2', title: '思考题', prompt: '一个策略年收益 20%，但最大回撤 45%；另一个年收益 15%，最大回撤 8%。为什么后者可能更值得研究？', hint: '把“赚多少”和“怎么赚到”一起看。', answer: '因为策略是否可执行，不只取决于收益，也取决于过程是否稳定、回撤是否可承受。较低回撤通常意味着更高的真实可持有性。' },
      ],
    },
    {
      id: 'day-4',
      day: 4,
      title: '市场基础——股票、指数、ETF、行业',
      phase: '第 1 周：建立量化语言',
      duration: '建议 50–70 分钟',
      objective: '搞清楚量化里常见研究对象分别是什么，以及它们各自适合研究什么。',
      whyItMatters: '研究对象一旦混乱，策略设计就容易从一开始就跑偏。研究单个公司、研究板块轮动、研究市场风格，数据特征和策略逻辑都不一样。',
      studyFlow: [
        '先区分股票、指数、ETF、行业这几类对象。',
        '再理解每类对象在量化里常见的研究用途。',
        '最后建立“先明确对象，再设计策略”的习惯。',
      ],
      intuitiveBlocks: [
        '股票是单一公司，指数是一篮子股票的整体表现，ETF 是可以交易的基金壳，行业则是把相似业务公司放在一起看的分类方式。',
        '如果你研究一家公司，个股很重要；如果你研究市场风格，指数和行业更重要；如果你要做较稳的策略测试，ETF 常常是很好的入门对象，因为数据更干净、个体暴雷风险也较低。',
        '这节课看起来像“常识课”，但它其实是在帮你建立研究对象的边界。很多量化初学者不是不会写代码，而是不知道自己到底在研究什么。',
      ],
      conceptBridge: '研究对象不同，会直接影响数据、噪声、波动结构和策略逻辑。你研究个股时要考虑公司事件风险；研究 ETF 时更强调篮子特征和市场因子；研究行业轮动时又会落到板块比较。',
      math: '这一课数学最少，重点是对象分类和研究目的对应关系。',
      codeContext: '这段代码虽然简单，但它在模拟最初级的“研究对象分层”。量化研究不是一股脑抓一堆 ticker，而是要先知道哪些属于个股、哪些属于 ETF、哪些属于行业代理。',
      python: `watchlist = {\n    'stock': ['NVDA', 'AAPL'],\n    'etf': ['SPY', 'QQQ'],\n    'sector': ['SOXX', 'XLE']\n}\n\nfor kind, symbols in watchlist.items():\n    print(kind, symbols)`,
      codeWalkthrough: [
        { line: "'stock': ['NVDA', 'AAPL']", meaning: '这是单公司标的，更容易受财报、管理层、产品周期等公司级事件影响。' },
        { line: "'etf': ['SPY', 'QQQ']", meaning: '这是篮子资产，更适合研究市场整体方向、风格暴露和较平滑的趋势。' },
        { line: "'sector': ['SOXX', 'XLE']", meaning: '用行业 ETF 代理板块，有助于研究主题轮动，而不是被单一龙头公司的特殊事件扰动。' },
        { line: 'for kind, symbols in watchlist.items()', meaning: '把对象按类别处理，是以后做批量回测和策略筛选的雏形。' },
      ],
      explanation: '这段代码的真正意义不是“会不会写字典”，而是训练你用结构化方式管理研究对象。量化研究里，研究对象的分层越清楚，后面策略设计越不容易混乱。',
      interpretation: [
        '初学者如果想尽快做出可解释的练习，ETF 往往比单个妖股更适合。',
        '如果你研究行业轮动，只盯一只龙头股很容易把公司特异性当成行业规律。',
        '明确对象，是从“看盘”走向“研究”的第一步。',
      ],
      mistakes: ['把 ETF 当成普通股票理解', '研究行业却只盯一只龙头票', '没区分个股波动和指数波动的不同'],
      summary: ['研究对象不同，策略设计也不同。', 'ETF 是很适合初学者练手的量化对象。', '先定义研究对象，再谈信号和回测。'],
      nextLessonId: 'day-5',
      exercises: [
        { id: 'ex-4-1', title: '分类题', prompt: '请举出一个你常看的股票、一个指数、一个 ETF。', hint: '比如美股、A股都可以。', answer: '参考：NVDA（股票）、纳指100（指数）、QQQ（ETF）。' },
        { id: 'ex-4-2', title: '研究设计题', prompt: '如果你想研究“AI 板块是否强于大盘”，你更应该先比较什么对象？', hint: '不要直接拿单只公司和整个市场比较。', answer: '更适合比较 AI/半导体相关行业或 ETF 与大盘指数/ETF，而不是直接拿某一只热门个股对比整个市场。' },
      ],
    },
    {
      id: 'day-5',
      day: 5,
      title: '收益率分布与市场噪声',
      phase: '第 1 周：建立量化语言',
      duration: '建议 60–80 分钟',
      objective: '建立“市场很吵”的直觉，知道为什么不能把每一次涨跌都看成信号。',
      whyItMatters: '很多错误策略不是因为数学太差，而是因为人脑太会讲故事。你看到几根大阳线，就开始相信一个叙事；你看到几次反转，就以为找到了规律。分布思维是对抗这种幻觉的第一层防线。',
      studyFlow: [
        '先理解市场里的大量波动并没有信息含量。',
        '再理解为什么“看起来有规律”常常只是噪声。',
        '最后用一个简单分布图，建立统计视角。',
      ],
      intuitiveBlocks: [
        '市场每天都在波动，但不是每一次波动都代表有意义的信息。很多波动只是噪声。',
        '量化之所以需要统计，是因为肉眼看图很容易把随机性误当成规律。只要样本短一点、行情热一点，人脑几乎一定会开始脑补故事。',
        '所以学量化的一个核心转变是：你不再问“这次涨是不是很厉害”，而开始问“这种波动在历史分布里算常见还是极端”。',
      ],
      conceptBridge: '从“事件思维”转向“分布思维”，意味着你开始把单次涨跌放回整个历史背景里看。单点现象不再自动等于信号，它必须在分布中显得异常，才更值得研究。',
      math: '收益率分布帮助我们理解常态波动、极端波动和尾部风险。后面讲波动率、偏度、峰度时，都会在这个基础上展开。',
      codeContext: '下面这段代码不是为了让你今天学会作图，而是让你第一次用可视化方式看收益率“散布成什么样”。这一步，是把“市场很吵”从一句感觉，变成一个可观察事实。',
      python: `import pandas as pd\nimport matplotlib.pyplot as plt\n\nreturns = pd.Series([0.01, -0.02, 0.015, 0.03, -0.01, 0.005, -0.04])\nreturns.hist(bins=10)\nplt.title('Return Distribution')\nplt.show()`,
      codeWalkthrough: [
        { line: 'returns = pd.Series([...])', meaning: '先准备一小段收益率序列。真实研究里通常会更长，但这里先用小样本建立直觉。' },
        { line: 'returns.hist(bins=10)', meaning: '把收益率画成直方图。不是按时间顺序看，而是看“不同区间的收益率出现得多不多”。' },
        { line: "plt.title('Return Distribution')", meaning: '给图加标题，帮助你把图像和研究问题绑定起来。以后图表不是装饰，而是表达结论的工具。' },
        { line: 'plt.show()', meaning: '把图真正显示出来。量化学习里，很多理解是要靠看图和算数配合建立的。' },
      ],
      explanation: '这段代码和本课目标的关系在于：它让你第一次从“路径视角”跳到“分布视角”。前几节课你在看序列怎么走，这节课你开始看这些变化总体长什么样。这个视角切换，对后面做风险判断非常关键。',
      interpretation: [
        '如果分布很散，说明波动大；如果尾部特别长，说明极端事件不罕见。',
        '少数极端收益如果决定了大部分结果，策略稳定性就值得警惕。',
        '看图的目的不是“好看”，而是帮助你识别：你面对的是普通波动，还是不寻常事件。',
      ],
      mistakes: ['把一两天的大涨大跌当成长久规律', '过度依赖肉眼看图', '忽视尾部风险'],
      summary: ['市场里有大量噪声。', '量化学习要培养分布思维，而不是故事思维。', '单次大涨跌只有放回历史分布中才有意义。'],
      nextLessonId: 'day-6',
      exercises: [
        { id: 'ex-5-1', title: '观察题', prompt: '如果一个策略只有几次特别大的盈利，其余时候都很平庸，你会担心什么？', hint: '想想“运气”和“稳定性”。', answer: '要担心收益是不是过度依赖少数极端时刻，稳定性和可重复性可能不足。' },
        { id: 'ex-5-2', title: '理解题', prompt: '为什么量化学习里需要“分布思维”？', hint: '想想单次事件和整体历史背景的区别。', answer: '因为单次涨跌容易让人误判，而分布思维能把现象放回总体背景里看，减少把噪声错当信号的风险。' },
      ],
    },
    {
      id: 'day-6',
      day: 6,
      title: '从看涨跌到看风险收益',
      phase: '第 1 周：建立量化语言',
      duration: '建议 60–75 分钟',
      objective: '建立“收益和风险必须一起看”的习惯。',
      whyItMatters: '市场里最常见的误判之一就是只看谁涨得多。专业视角和业余视角最大的差别，往往不在收益预测，而在风险衡量。',
      studyFlow: [
        '先认识“同收益，不同风险”的区别。',
        '再理解为什么波动与回撤会影响策略质量。',
        '最后建立“风险收益一起评估”的框架。',
      ],
      intuitiveBlocks: [
        '两只资产都涨了 20%，并不代表它们一样好。一个可能一路平稳上去，另一个可能中间先腰斩再拉回。',
        '真正的交易判断不是“赚没赚”，而是“冒了多大风险赚到这些收益”。这也是为什么专业投资报告几乎不会只写收益率，而会同时写波动率、回撤、Sharpe 等指标。',
        '如果一条曲线让你在中途无法坚持执行，那么它在真实世界里的价值就会大打折扣。',
      ],
      conceptBridge: '收益告诉你“拿到了什么”，风险告诉你“为此承受了什么”。只有把两者放在一起，策略评估才开始接近真实决策。',
      math: '这一课先建立直觉：平均收益、波动率、回撤要一起看。后面我们再系统讲 Sharpe。',
      codeContext: '下面代码故意把两个资产放在同样收益、不同波动的结构里，是为了让你先建立一个非常关键的判断框架：不是谁赚得多，而是谁更“划算”。',
      python: `assets = {\n    'A': {'return': 0.20, 'vol': 0.10, 'max_drawdown': 0.08},\n    'B': {'return': 0.20, 'vol': 0.35, 'max_drawdown': 0.30}\n}\n\nfor name, metrics in assets.items():\n    print(name, metrics)`,
      codeWalkthrough: [
        { line: "'return': 0.20", meaning: '两只资产年化收益假设都为 20%，先把收益控制成一样。' },
        { line: "'vol': 0.10 / 0.35", meaning: '波动率不同，意味着收益路径平稳程度不同。收益一样时，波动更低通常更有吸引力。' },
        { line: "'max_drawdown': 0.08 / 0.30", meaning: '最大回撤补充了另一种风险视角：中途最痛的时候有多痛。' },
        { line: 'for name, metrics in assets.items()', meaning: '循环输出各资产指标，模拟最基础的横向比较。以后你会把这种比较扩展到整个股票池或策略池。' },
      ],
      explanation: '代码在这里不是为了“展示数据结构”，而是为了训练你进行多指标比较。真实量化研究的很多决策，都源于这种简单但严格的比较框架。',
      interpretation: [
        '同收益时，更低的波动和回撤通常意味着更好的持有体验。',
        '高收益如果伴随极深回撤，未必是更优策略。',
        '这节课的重点不是记住某个公式，而是建立“收益必须带着风险标签一起看”的习惯。',
      ],
      mistakes: ['只盯涨跌幅排行榜', '忽略高波动带来的心理与资金压力', '把高收益默认等于高质量策略'],
      summary: ['收益不是唯一指标。', '风险收益比才更接近专业视角。', '以后看到任何收益，都要反问：风险代价是什么？'],
      nextLessonId: 'day-7',
      exercises: [
        { id: 'ex-6-1', title: '比较题', prompt: '如果两只资产年化收益一样，一只最大回撤 8%，另一只 35%，你更愿意先研究哪一只？为什么？', hint: '别只看收益。', answer: '通常更愿意先研究回撤更小的，因为它的资金曲线和可执行性更友好。' },
        { id: 'ex-6-2', title: '迁移题', prompt: '为什么“中途能不能拿得住”也是量化评估的一部分？', hint: '量化不是只看回测终点。', answer: '因为策略再好，如果路径波动和回撤超出人的承受能力，就很难真实执行，回测收益也难以兑现。' },
      ],
    },
    {
      id: 'day-7',
      day: 7,
      title: '第 1 周复盘：把量化语言串起来',
      phase: '第 1 周：建立量化语言',
      duration: '建议 45–60 分钟',
      objective: '把前 6 天学过的概念串成一套最基础的量化语言。',
      whyItMatters: '很多人学量化不是卡在某个单独概念，而是学了一堆词却串不成框架。这节课就是把前面的碎片，重新拼成一张地图。',
      studyFlow: [
        '先回顾前六天分别解决了什么问题。',
        '再把这些概念串成一个完整研究流程。',
        '最后确认你是否已经从“看热闹”切换到“会描述、会比较、会验证”的学习状态。',
      ],
      intuitiveBlocks: [
        '这一周你学的东西看起来分散：价格、收益率、复利、回撤、ETF、噪声、风险收益。但它们其实都在回答同一个问题：怎样用更清楚、更可比较的方式看市场。',
        '如果你能用这套语言重新描述一只股票、一段走势、一个策略，那你就已经从纯直觉观察者，开始变成量化学习者了。',
        '这周最重要的收获，不是你会了多少代码，而是你开始拥有一套更像研究者的思考骨架。',
      ],
      conceptBridge: '量化语言的核心链条是：先用收益率描述变化，再用复利和净值描述路径，用回撤和波动描述风险，用分布思维识别噪声，用研究对象分类明确你到底在分析什么。',
      math: '这节课不加新公式，重点是把前 6 天的概念重新组织成自己的表述。',
      codeContext: '这段代码不是为了技术难度，而是为了“结构化复盘”。你会看到，一周学习的关键词其实已经能组成一个最基础的研究词表。',
      python: `topics = ['收益率', '复利', '回撤', 'ETF', '分布', '风险收益']\n\nfor topic in topics:\n    print('本周关键词:', topic)`,
      codeWalkthrough: [
        { line: "topics = ['收益率', '复利', '回撤', 'ETF', '分布', '风险收益']", meaning: '把这周关键词列出来，提醒你它们不是散点，而是课程骨架。' },
        { line: 'for topic in topics:', meaning: '逐个输出关键词，像做提纲一样，把已学内容重新组织。' },
        { line: "print('本周关键词:', topic)", meaning: '最简单的输出背后，其实是在练“结构化回顾”的习惯。量化学习不只是吸收，更要不断重组。' },
      ],
      explanation: '这段代码之所以放在复盘课里，是为了强调：代码也可以服务于结构化思考，而不只是拿来做复杂计算。真正成熟的学习方式，是能把概念、公式和代码放到同一个框架里。',
      interpretation: [
        '如果你能看着这些关键词，讲出它们彼此的关系，这周就算学扎实了。',
        '如果你只能分别解释，却连不起来，说明你还需要再复盘一遍。',
        '量化学习最怕“概念收集癖”，最需要“框架组织力”。',
      ],
      mistakes: ['急着往后学，而没有回头串联概念', '知道单点概念，但讲不出它们之间的关系', '把代码和课程内容割裂开来'],
      summary: ['这一周的目标不是会写策略，而是先学会量化语言。', '只有语言坐标系稳了，后面统计和策略才不会漂。', '代码、概念和交易意义必须被一起理解。'],
      nextLessonId: null,
      exercises: [
        { id: 'ex-7-1', title: '复盘题', prompt: '用 5 句话总结“量化投资和普通看盘最大的区别”。', hint: '可以从规则、收益率、风险、数据、验证几个词展开。', answer: '参考方向：量化投资更强调把想法规则化、用收益率而不是价格比较、把风险和收益一起看、用数据而不是感觉验证、并持续迭代。' },
        { id: 'ex-7-2', title: '连接题', prompt: '请把“收益率、复利、回撤、风险收益”串成一段你自己的解释。', hint: '试着描述：先看变化，再看路径，再看痛感，再看是否值得。', answer: '参考：量化先用收益率描述资产变化，再用复利把变化连成净值路径，用回撤刻画中途最痛的下跌，最后把收益和风险放在一起判断策略是否值得持有。' },
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
    {
      title: '研究者思维练习',
      items: ['把模糊判断翻成规则', '先定义研究对象', '看到收益先问风险'],
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

courseData.referenceShelf = [
  {
    title: 'Ernest Chan · Quantitative Trading / Algorithmic Trading',
    role: '用于建立零售量化研究流程、策略原型、风险与执行的整体直觉。',
    why: '适合作为“先看全貌，再逐步深入”的入门主线。',
  },
  {
    title: 'Bodie / Kane / Marcus · Investments',
    role: '用于校正风险—收益、资产配置、投资分析等基础金融语言。',
    why: '帮助课程不滑向“只有代码，没有金融学骨架”。',
  },
  {
    title: 'Ruey S. Tsay · Analysis of Financial Time Series',
    role: '用于时间序列、波动、统计建模等更严谨的数量分析框架。',
    why: '帮助后续课程从“会算”升级到“知道为什么这样建模”。',
  },
  {
    title: 'QuantStart beginner reading path',
    role: '用于补充量化交易入门的主题划分和阅读顺序。',
    why: '适合把网站中的“下一步读什么”做得更清楚。',
  },
];

function buildRigorPack(lesson) {
  const base = {
    prerequisites: ['会读基础价格图', '知道股票/ETF是可交易资产', '具备最基础的 Python 阅读能力'],
    checkpoints: [
      '我能说清这节课要解决的核心问题。',
      '我能解释代码为什么出现在这一课，而不是把它当作装饰。',
      '我能把本课结论和真实交易/研究场景联系起来。',
    ],
    rigorNotes: '本课优先建立定义、边界和研究语言，不追求公式堆砌。重点是让概念、数据与代码形成同一套表达。',
    referenceTrack: ['Chan 路线：先建立量化研究流程，再补策略与执行细节。'],
  };

  const byDay = {
    1: {
      prerequisites: ['理解“主观判断”和“规则判断”有区别', '能接受用数据而不是感觉验证观点'],
      rigorNotes: '这一课的严谨性重点不在公式，而在把“模糊市场观点”改写成“可被检验的规则问题”。这是后续全部课程的方法论起点。',
      referenceTrack: [
        'Chan 路线：量化交易首先是研究流程，不是写机器人。',
        'QuantStart 路线：入门阶段先掌握全流程轮廓，再逐步深入细节。',
      ],
    },
    2: {
      prerequisites: ['能区分价格水平和价格变化', '知道百分比变化比绝对价差更可比'],
      rigorNotes: '本课开始统一使用“收益率”而不是“价格涨了多少”来描述变化，这是金融统计和资产比较的基础语言。',
      referenceTrack: [
        'Bodie / Kane / Marcus：投资分析以风险—收益刻画资产，而非只看价格水平。',
        'Tsay 路线：时间序列分析通常以收益率序列而非价格序列为基础对象。',
      ],
    },
    3: {
      prerequisites: ['知道收益率是逐期变化量', '能接受投资结果是复合而非简单加总'],
      rigorNotes: '这里开始把单期收益推进到路径视角：净值、峰值、回撤。回撤不是附加指标，而是资金曲线风险的核心表达。',
      referenceTrack: [
        'Bodie / Kane / Marcus：风险不能脱离路径和持有体验来理解。',
        'Chan 路线：策略评估必须同时看收益、回撤与可执行性。',
      ],
    },
    4: {
      prerequisites: ['知道市场里不只有个股', '理解不同资产容器会改变研究问题'],
      rigorNotes: '本课的严谨性重点在“先定义研究对象，再设计策略”。如果对象边界混乱，后续任何统计和回测都容易失真。',
      referenceTrack: [
        'Bodie / Kane / Marcus：资产类别与组合视角是投资分析的基本框架。',
        'Chan 路线：零售量化入门常从 ETF / 更稳定标的开始更有利于建立研究习惯。',
      ],
    },
    5: {
      prerequisites: ['已会看收益率序列', '愿意把单次涨跌放回整体分布里看'],
      rigorNotes: '本课引入“分布思维”，是为了对抗人脑对随机波动过度叙事的倾向。统计视角不是装饰，而是识别噪声与异常的基本工具。',
      referenceTrack: [
        'Tsay 路线：金融时间序列分析需要先理解收益分布与波动特征。',
        'QuantStart 路线：初学者应尽快从图形直觉走向样本分布与统计描述。',
      ],
    },
    6: {
      prerequisites: ['知道收益率可以比较资产表现', '知道回撤和波动都属于风险语言'],
      rigorNotes: '这一课把“谁涨得多”替换成“谁的风险调整后表现更好”的评估视角，是从散户看盘转向专业研究的重要分水岭。',
      referenceTrack: [
        'Bodie / Kane / Marcus：风险—收益权衡是投资学主轴。',
        'Chan 路线：任何策略结果都必须带着风险标签阅读。',
      ],
    },
    7: {
      prerequisites: ['已接触收益率、复利、回撤、噪声、风险收益这些关键词'],
      rigorNotes: '复盘课不新增花哨内容，而是检查这些概念能否被组织成一套研究语言。框架感比继续加概念更重要。',
      referenceTrack: [
        'QuantStart 路线：先建立稳定的知识框架，再推进更深的策略与工程模块。',
        'Tsay / Investments 路线：后续统计、时间序列与风险模型都以本周语言为前提。',
      ],
    },
  };

  return { ...base, ...(byDay[lesson.day] || {}) };
}

courseData.lessons = courseData.lessons.map(lesson => ({ ...lesson, ...buildRigorPack(lesson) }));

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
  renderProgress();
}

function renderLessonCards() {
  return courseData.lessons.map(lesson => {
    const done = state.completedLessons.includes(lesson.id);
    return `
      <button class="lesson-list-item ${lesson.id === state.currentLessonId ? 'active' : ''}" onclick="goToLesson('${lesson.id}')">
        <span class="lesson-list-day">Day ${lesson.day}</span>
        <strong>${lesson.title}</strong>
        <span class="lesson-list-meta">${lesson.duration} · ${done ? '已完成' : '未完成'}</span>
      </button>
    `;
  }).join('');
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
        <p><strong>课程定位：</strong>${courseData.promise}</p>
        <div class="stats-grid">
          <div class="stat-card"><h3>当前主线</h3><strong>股票量化</strong><span class="muted">先打基础，再扩展 ETF / 期货 / 期权</span></div>
          <div class="stat-card"><h3>日学习时长</h3><strong>1–1.5h</strong><span class="muted">每天一课，概念 + 代码 + 练习</span></div>
          <div class="stat-card"><h3>已完成</h3><strong>${completedCount}</strong><span class="muted">按课推进，不求快，求稳</span></div>
        </div>
      </section>
      <section class="panel">
        <p class="kicker">当前课程</p>
        <h3>Day ${today.day} · ${today.title}</h3>
        <p>${today.objective}</p>
        <div class="info-stack">
          <div class="info-chip">${today.phase}</div>
          <div class="info-chip">${today.duration}</div>
        </div>
        <p class="muted" style="margin-top:14px;">${today.whyItMatters}</p>
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
        <p class="kicker">本轮改版重点</p>
        <h3>每天课程不再只有一句话</h3>
        <p class="muted">现在每节课都包含：学习目标、课程意义、通俗讲解、方法框架、代码上下文、逐行解释、交易含义、误区与总结。</p>
      </article>
      <article class="panel">
        <p class="kicker">学习方式</p>
        <h3>概念、代码、交易意义绑在一起</h3>
        <p class="muted">你不会再看到“硬塞一段 Python”却不知道它和课程有什么关系；每段代码都要回答：它为什么出现在这一课里。</p>
      </article>
    </section>

    <section class="panel" style="margin-top:18px;">
      <p class="kicker">课程总结构</p>
      <h3>专业版课程从这四个模块展开</h3>
      <div class="reference-grid">
        ${courseData.coreModules.map(item => `
          <article class="reference-card">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <p class="muted"><strong>锚点：</strong>${item.anchors.join(' · ')}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="panel" style="margin-top:18px;">
      <p class="kicker">参考教材脉络</p>
      <h3>这套网站现在开始按经典教材路线校正</h3>
      <div class="reference-grid">
        ${courseData.referenceShelf.map(item => `
          <article class="reference-card">
            <h4>${item.title}</h4>
            <p><strong>用途：</strong>${item.role}</p>
            <p class="muted"><strong>为什么接进课程：</strong>${item.why}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="panel" style="margin-top:18px;">
      <p class="kicker">第一周全部课程</p>
      <h3>按顺序推进</h3>
      <div class="lesson-list">
        ${renderLessonCards()}
      </div>
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
        <h4>课程骨架已改成“先金融、再统计、再回测、后策略”</h4>
        <p class="muted">这轮重构的核心不是继续堆 Day 1 / Day 2 文案，而是先把整站课程顺序改正：先学金融对象与风险收益语言，再进统计与时间序列，再进数据与回测纪律，最后才进入策略、组合与风控。</p>
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
        <div class="info-stack" style="margin-bottom:18px;">
          <div class="info-chip">${lesson.duration}</div>
          <div class="info-chip">${state.completedLessons.includes(lesson.id) ? '已完成' : '未完成'}</div>
        </div>

        <div class="section-block">
          <h4>本课目标</h4>
          <p>${lesson.objective}</p>
        </div>

        <div class="section-block callout-block">
          <h4>这节课为什么重要</h4>
          <p>${lesson.whyItMatters}</p>
        </div>

        <div class="section-block">
          <h4>前置知识</h4>
          <ul>${lesson.prerequisites.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>推荐学习顺序</h4>
          <ol>${lesson.studyFlow.map(item => `<li>${item}</li>`).join('')}</ol>
        </div>

        <div class="section-block">
          <h4>通俗讲解</h4>
          ${lesson.intuitiveBlocks.map(block => `<p>${block}</p>`).join('')}
        </div>

        <div class="section-block">
          <h4>概念连接</h4>
          <p>${lesson.conceptBridge}</p>
        </div>

        <div class="section-block">
          <h4>数学 / 方法框架</h4>
          <p>${lesson.math}</p>
        </div>

        <div class="section-block code-context">
          <h4>这段 Python 为什么出现在这里</h4>
          <p>${lesson.codeContext}</p>
        </div>

        <div class="section-block">
          <div class="section-header-row">
            <h4>Python 示例</h4>
            <button class="copy-btn" data-copy="lesson-code">复制代码</button>
          </div>
          <pre><code id="lesson-code">${lesson.python}</code></pre>
        </div>

        <div class="section-block">
          <h4>逐行解释</h4>
          <div class="walkthrough-list">
            ${lesson.codeWalkthrough.map(item => `
              <article class="walkthrough-item">
                <pre><code>${item.line}</code></pre>
                <p>${item.meaning}</p>
              </article>
            `).join('')}
          </div>
        </div>

        <div class="section-block">
          <h4>代码和课程的关系</h4>
          <p>${lesson.explanation}</p>
        </div>

        <div class="section-block">
          <h4>你应该从这段代码读出什么</h4>
          <ul>${lesson.interpretation.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>严谨性说明</h4>
          <p>${lesson.rigorNotes}</p>
        </div>

        <div class="section-block">
          <h4>常见误区</h4>
          <ul>${lesson.mistakes.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>本课自检</h4>
          <ul>${lesson.checkpoints.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>参考脉络</h4>
          <ul>${lesson.referenceTrack.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>本课总结</h4>
          <ul>${lesson.summary.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </article>

      <aside class="lesson-sidebar">
        <section class="panel sticky-panel">
          <p class="kicker">课程导航</p>
          <h3>第一周课程目录</h3>
          <div class="lesson-list compact">
            ${renderLessonCards()}
          </div>
          <div style="display:grid; gap:10px; margin-top:14px;">
            <button class="small-btn" ${prevLesson ? `onclick="goToLesson('${prevLesson.id}')"` : 'disabled'}>${prevLesson ? `上一课：Day ${prevLesson.day}` : '已经是第一课'}</button>
            <button class="small-btn" ${nextLesson ? `onclick="goToLesson('${nextLesson.id}')"` : 'disabled'}>${nextLesson ? `下一课：Day ${nextLesson.day}` : '第一周已结束'}</button>
            <button class="small-btn" onclick="setView('practice')">去做本课练习</button>
          </div>
        </section>

        <section class="panel" style="margin-top:18px;">
          <p class="kicker">本课提醒</p>
          <h3>不要把代码当装饰</h3>
          <p class="muted">每段代码都应该回答三个问题：它在算什么？为什么这一课要出现它？它会在后面哪种研究动作里继续被使用？</p>
        </section>
      </aside>
    </div>
  `;
}

function renderPractice() {
  const lesson = getCurrentLesson();
  document.getElementById('view-practice').innerHTML = `
    <section class="panel" style="margin-bottom:18px;">
      <p class="kicker">当前练习</p>
      <h3>Day ${lesson.day} · ${lesson.title}</h3>
      <p class="muted">先自己想，再看提示，最后再看答案。练习不是为了“做对”，而是为了逼自己把概念说清楚。</p>
    </section>

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
      <p class="kicker">练习区规划</p>
      <h3>下一步会继续扩展</h3>
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
      <h3>第一周可按完整正文推进</h3>
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
