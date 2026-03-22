const state = {
  currentView: 'home',
  currentLessonId: localStorage.getItem('quantCourse.currentLessonId') || 'day-1',
  completedLessons: JSON.parse(localStorage.getItem('quantCourse.completedLessons') || '[]'),
  completedExercises: JSON.parse(localStorage.getItem('quantCourse.completedExercises') || '[]'),
};

const courseData = {
  title: 'Quant Finance Study System',
  subtitle: '以美股为主舞台，用教材骨架 + 研究训练重建量化金融入门前 8 周。',
  goal: '在 8 周内建立金融语言、统计框架、时间序列直觉、数据工程习惯与基础回测纪律，为后续策略研究打下硬地基。',
  promise: '这不是指标拼盘或“量化致富故事”，而是一套从投资学、统计学和研究流程出发的系统课程。',
  roadmap: [
    {
      stage: '模块 1：金融对象、收益率与组合语言',
      weeks: '第 1–2 周',
      focus: '用 Investments 的骨架建立收益率、复利、风险、组合、基准与因子语言，先学“研究什么”，再学“如何计算”。',
      outcomes: ['能正确使用价格、收益率、净值、回撤、超额收益这些概念', '理解分散化、协方差、风险预算与基准思维', '能把个股、ETF、指数和因子暴露区分开来'],
    },
    {
      stage: '模块 2：统计推断、回归与时间序列',
      weeks: '第 3–4 周',
      focus: '把市场数据从故事变成样本，把回归、估计误差、非平稳性、波动簇集和因子检验接到同一条方法链上。',
      outcomes: ['会解释估计误差、置信区间、显著性和多重检验风险', '能读懂 OLS 输出并理解回归残差意味着什么', '理解 AR / MA / ACF / PACF / 波动聚集等时间序列语言'],
    },
    {
      stage: '模块 3：数据工程、研究日志与回测管线',
      weeks: '第 5–6 周',
      focus: '学习美股数据对象、复权、存活偏差、点时数据、特征构造、样本切分与信号到 PnL 的完整研究管线。',
      outcomes: ['知道 OHLCV、adj close、corporate actions 和 universe 定义的区别', '会把信号、仓位、收益、交易成本放到同一张研究表里', '能写出最小可复现回测与研究日志'],
    },
    {
      stage: '模块 4：策略家族、组合构建与风险控制',
      weeks: '第 7–8 周',
      focus: '在前面地基上进入动量、均值回归、横截面排序、组合构建、风险预算和执行现实。',
      outcomes: ['能区分时间序列动量、横截面动量和均值回归', '会做基础的组合权重、波动目标和风险归因', '知道样本外失效、交易摩擦和执行风险如何摧毁纸面 alpha'],
    },
  ],
  coreModules: [
    {
      title: 'Investments backbone',
      description: '以 Bodie / Kane / Marcus 为主脉络，建立收益率、风险收益权衡、基准、分散化、组合与因子语言。',
      anchors: ['Bodie / Kane / Marcus', 'Portfolio intuition', 'Benchmark and factor language'],
    },
    {
      title: 'Statistics and time series backbone',
      description: '以统计推断、回归与 Tsay 式金融时间序列为主线，训练从样本到模型的基本判断能力。',
      anchors: ['Tsay', 'OLS and inference', 'Financial time series'],
    },
    {
      title: 'Research engineering backbone',
      description: '以数据工程、点时数据、特征构造、样本切分、回测与研究日志为核心，建立可复现研究习惯。',
      anchors: ['Chan', 'Research artifacts', 'Backtest pipeline'],
    },
    {
      title: 'Strategy and risk backbone',
      description: '以策略家族、组合构建、风险预算、交易成本与执行现实为核心，防止把纸面信号误当成可交易策略。',
      anchors: ['Chan', 'Portfolio construction', 'Execution realism'],
    },
  ],
};

const weekSpecs = [
  {
    week: 1,
    phase: '第 1 周：收益率、复利与市场对象',
    overview: '先学市场研究对象、收益率语言、复利路径和风险度量，建立量化研究最基础的金融坐标系。',
    lessons: [
      {
        title: '研究对象：个股、指数、ETF 与可交易宇宙',
        objective: '明确美股量化研究中的基本对象，知道研究个股、ETF、指数时数据和问题为何不同。',
        whyItMatters: '如果研究对象不清楚，后面的收益率、回归和回测都会建在错的经济对象上。',
        conceptBridge: '量化研究先问“我到底在研究什么资产”，然后才问“我如何建模与交易它”。',
        math: '本课重点不是公式，而是对象边界：单一证券、可交易基金、市场指数和研究样本池对应不同问题。',
        python: `universe = {\n    "single_names": ["AAPL", "MSFT", "NVDA"],\n    "broad_index_proxy": ["SPY", "QQQ"],\n    "sector_proxy": ["XLF", "XLK", "XLE"]\n}\n\nfor kind, tickers in universe.items():\n    print(kind, tickers)`,
        codeWalkthrough: [
          { line: 'universe = {...}', meaning: '先把研究对象按经济含义分层，而不是一开始就随意抓 ticker。' },
          { line: 'single_names', meaning: '个股研究更容易受到财报、事件与 idiosyncratic shock 影响。' },
          { line: 'broad_index_proxy / sector_proxy', meaning: 'ETF 常被用来表达市场或板块暴露，研究逻辑更接近组合对象。' },
          { line: 'for kind, tickers in universe.items()', meaning: '输出只是表面动作，真正训练的是先定义研究宇宙。' },
        ],
        interpretation: ['研究个股不等于研究市场；研究 ETF 不等于研究公司。', '样本池的定义本身就是模型假设的一部分。', '后续所有数据清洗、回测和风控都依赖这个起点。'],
        mistakes: ['把 ETF 和指数混成一个概念', '用个股思路解释市场指数', '在没定义 universe 时直接开始回测'],
        summary: ['研究对象先行。', '资产容器不同，数据与风险结构也不同。', '研究宇宙定义是量化流程的第一步。'],
      },
      {
        title: '价格、简单收益率与对数收益率',
        objective: '掌握价格与收益率的区别，并建立简单收益率与对数收益率的使用边界。',
        whyItMatters: '不理解收益率，你后面的波动率、回归、累计收益与回测都没有统一语言。',
        conceptBridge: '价格描述水平，收益率描述变化；量化研究大多围绕“变化”而不是“价格水平”展开。',
        math: '简单收益率 r_t=(P_t-P_{t-1})/P_{t-1}；对数收益率 g_t=ln(P_t/P_{t-1})，小幅变化时两者接近。',
        python: `import pandas as pd\nimport numpy as np\n\nprices = pd.Series([100, 102, 101, 105, 108])\nsimple_r = prices.pct_change()\nlog_r = np.log(prices / prices.shift(1))\nprint(simple_r)\nprint(log_r)`,
        codeWalkthrough: [
          { line: 'prices = pd.Series([...])', meaning: '用时间序列容器表达价格路径，而不是孤立的价格点。' },
          { line: 'simple_r = prices.pct_change()', meaning: '计算最常见的单期简单收益率。' },
          { line: 'log_r = np.log(prices / prices.shift(1))', meaning: '对数收益率更适合做时间累加和部分模型推导。' },
          { line: 'print(...)', meaning: '并排比较，训练你对两种表达的数值直觉。' },
        ],
        interpretation: ['收益率比价格更适合跨资产比较。', '对数收益率不是更“高级”，而是更适合某些问题。', '研究时先说明用哪种收益率语言。'],
        mistakes: ['把涨了 1 美元当成统一尺度', '混淆简单收益率与对数收益率', '不知道第一期会出现 NaN'],
        summary: ['价格与收益率是不同层级的对象。', '收益率是后续统计和回测的主语言。', '对数收益率要会读，但不要滥用。'],
      },
      {
        title: '复利、累计净值与回撤路径',
        objective: '理解投资结果是乘法路径，掌握累计净值和回撤的基本计算与解释。',
        whyItMatters: '策略是否能拿住，往往取决于回撤路径，而不是终点收益本身。',
        conceptBridge: '收益率序列决定净值路径，净值路径决定回撤体验；这三者必须一起看。',
        math: '累计净值 NAV_t=Π(1+r_t)；回撤 DD_t=(NAV_t-MaxNAV_t)/MaxNAV_t。',
        python: `import pandas as pd\n\nreturns = pd.Series([0.02, -0.01, 0.015, -0.03, 0.01])\nnav = (1 + returns).cumprod()\npeak = nav.cummax()\ndrawdown = (nav - peak) / peak\nprint(nav)\nprint(drawdown)`,
        codeWalkthrough: [
          { line: 'returns = pd.Series([...])', meaning: '把单期收益率作为策略路径的原始输入。' },
          { line: 'nav = (1 + returns).cumprod()', meaning: '复利是连乘结构，不是简单加总。' },
          { line: 'peak = nav.cummax()', meaning: '回撤需要先知道历史峰值。' },
          { line: 'drawdown = ...', meaning: '把“跌了多少”放在历史高点背景下衡量。' },
        ],
        interpretation: ['高收益策略也可能因为高回撤而不可持有。', '路径风险是专业研究必须先面对的现实。', '净值曲线和回撤曲线要一起读。'],
        mistakes: ['只看累计收益不看回撤', '把复利当成加法', '忽略路径依赖'],
        summary: ['复利是乘法。', '回撤是风险体验的核心语言。', '净值、峰值和回撤必须联立理解。'],
      },
      {
        title: '风险、波动率与风险调整后收益',
        objective: '把“谁赚得多”升级成“谁的单位风险收益更高”的专业评估视角。',
        whyItMatters: '量化研究不能只比较收益，要比较收益是以什么风险代价换来的。',
        conceptBridge: '风险语言把收益从故事变成可比较对象，波动率与 Sharpe 是最基础的一步。',
        math: '样本均值、样本标准差、年化收益与年化波动率，Sharpe≈(年化收益-无风险收益)/年化波动率。',
        python: `import pandas as pd\n\nreturns = pd.Series([0.01, -0.005, 0.012, 0.004, -0.003])\nmean_daily = returns.mean()\nvol_daily = returns.std(ddof=1)\nann_return = mean_daily * 252\nann_vol = vol_daily * (252 ** 0.5)\nsharpe = ann_return / ann_vol\nprint(ann_return, ann_vol, sharpe)`,
        codeWalkthrough: [
          { line: 'returns.mean()', meaning: '先估计日均收益，但要记住这是样本估计量。' },
          { line: 'returns.std(ddof=1)', meaning: '样本标准差衡量波动率，是基础风险 proxy。' },
          { line: 'ann_return / ann_vol', meaning: '风险调整后收益让比较更公平，但不能把 Sharpe 神化。' },
          { line: 'print(...)', meaning: '输出的不是答案终点，而是继续追问估计误差的起点。' },
        ],
        interpretation: ['同等收益下，低波动策略更有吸引力。', '高 Sharpe 需要先核实样本长度和交易摩擦。', '风险调整后指标比绝对收益更接近专业语言。'],
        mistakes: ['只看收益率排名', '忽视样本长度导致的估计误差', '把 Sharpe 当作唯一标准'],
        summary: ['风险必须和收益一起读。', '波动率是第一层风险度量。', '风险调整后收益是专业比较的起点。'],
      },
      {
        title: '周总结：把金融语言连成研究框架',
        objective: '把第 1 周的对象、收益率、复利和风险语言组织成后续课程的共同底层。',
        whyItMatters: '如果底层词汇还散着，后面学统计和回测时就会像在背新名词。',
        conceptBridge: '这周的任务不是多学一个指标，而是把“研究对象—收益率—净值—风险”串成同一条逻辑链。',
        math: '本课没有新公式，重点是回顾第 1 周各公式分别刻画什么经济对象。',
        python: `lesson_map = {\n    "research_object": "what is traded",\n    "return_series": "how change is measured",\n    "nav_path": "how wealth evolves",\n    "risk_metrics": "how pain is measured"\n}\n\nfor k, v in lesson_map.items():\n    print(k, '->', v)`,
        codeWalkthrough: [
          { line: 'lesson_map = {...}', meaning: '用结构化字典把一周概念重新组织，而不是继续增加碎片。' },
          { line: 'research_object', meaning: '先定义对象。' },
          { line: 'return_series / nav_path / risk_metrics', meaning: '后续统计与回测都在这些对象之上展开。' },
          { line: 'for k, v in ...', meaning: '输出动作很简单，但它训练的是课程结构意识。' },
        ],
        interpretation: ['课程系统性来自对象之间的关系，而不是单独概念数量。', '第一周学的是金融语法。', '后面统计课会把这些对象变成样本。'],
        mistakes: ['把一周内容当作互不相关的知识点', '记了公式却不知道研究对象', '以为“量化”就是后面才开始'],
        summary: ['第一周建立了金融语言。', '后续所有统计和回测都建立在这套语言上。', '系统性比继续堆概念更重要。'],
      },
    ],
  },
  {
    week: 2,
    phase: '第 2 周：组合、基准与因子语言',
    overview: '继续用 Investments 骨架，建立协方差、组合收益、分散化、基准、超额收益与因子暴露语言。',
    lessons: [
      { title: '协方差、相关性与分散化直觉', objective: '理解组合收益不是简单平均，风险也不是简单相加。', whyItMatters: '如果不知道协方差，组合构建和风险预算都只是口号。', conceptBridge: '分散化之所以成立，不是因为持有更多资产，而是因为共同波动结构不完全一样。', math: '组合方差包含单资产方差项和协方差项；协方差结构决定分散化收益。', python: `import pandas as pd\n\nr = pd.DataFrame({\n    "A": [0.01, 0.02, -0.01, 0.015],\n    "B": [0.008, -0.003, 0.004, 0.006]\n})\nprint(r.cov())\nprint(r.corr())`, codeWalkthrough: [{ line: 'pd.DataFrame({...})', meaning: '把多资产收益序列放进同一张表，组合问题从单序列变成矩阵问题。' }, { line: 'r.cov()', meaning: '协方差矩阵刻画共同波动结构。' }, { line: 'r.corr()', meaning: '相关系数把协方差标准化，便于比较。' }, { line: 'print(...)', meaning: '先学读矩阵，再学优化和配置。' }], interpretation: ['分散化收益来自低相关而非持仓数量本身。', '组合问题天然是矩阵问题。', '风险不是资产风险的简单平均。'], mistakes: ['把分散化理解成“买得越多越安全”', '忽略相关性会在危机中上升', '只看单资产波动不看组合协方差'], summary: ['协方差是组合理论核心。', '相关性影响分散化质量。', '组合风险必须用矩阵语言描述。'] },
      { title: '组合收益、权重与再平衡', objective: '学会把资产收益序列映射成组合收益序列，理解权重和再平衡的经济含义。', whyItMatters: '后续无论是 ETF 组合、因子组合还是策略组合，都要先会写组合收益。', conceptBridge: '单资产研究回答“这个标的如何动”，组合研究回答“我的资本如何配置”。', math: '组合收益近似为权重向量与收益向量的内积；再平衡频率会改变路径与交易成本。', python: `import pandas as pd\n\nreturns = pd.DataFrame({\n    "SPY": [0.01, -0.004, 0.006],\n    "TLT": [0.002, 0.003, -0.001]\n})\nweights = pd.Series({"SPY": 0.6, "TLT": 0.4})\nportfolio_r = returns.mul(weights, axis=1).sum(axis=1)\nprint(portfolio_r)`, codeWalkthrough: [{ line: 'returns = pd.DataFrame({...})', meaning: '组合收益从多列资产收益表开始。' }, { line: 'weights = pd.Series(...)', meaning: '权重表达资本配置，而不是抽象偏好。' }, { line: 'returns.mul(weights, axis=1).sum(axis=1)', meaning: '把资产收益按权重加总，得到组合收益序列。' }, { line: 'print(portfolio_r)', meaning: '输出的序列就是后续净值与风险分析的输入。' }], interpretation: ['组合不是观点相加，而是资本约束下的配置结果。', '再平衡改变持仓路径和换手。', '权重设计就是风险表达。'], mistakes: ['只关心选股不关心配重', '忘记再平衡意味着重新交易', '把资金权重和名义权重混淆'], summary: ['组合收益是多资产研究的基本对象。', '权重是资本配置的语言。', '再平衡会改变结果与成本。'] },
      { title: '基准、超额收益与主动管理问题', objective: '学会用 benchmark 视角重写收益评价，而不是只盯绝对收益。', whyItMatters: '量化策略如果没有基准，就很难回答自己到底创造了什么。', conceptBridge: '专业研究几乎总是在问“相对谁更好”，而不是“绝对看起来不错”。', math: '超额收益=组合收益-基准收益；主动收益、跟踪误差和信息比率构成主动管理语言。', python: `import pandas as pd\n\nstrategy = pd.Series([0.008, 0.004, -0.003, 0.01])\nbenchmark = pd.Series([0.006, 0.002, -0.004, 0.009])\nactive = strategy - benchmark\nprint(active.mean(), active.std(ddof=1))`, codeWalkthrough: [{ line: 'strategy / benchmark', meaning: '先把策略和基准放到同一频率和同一尺度。' }, { line: 'active = strategy - benchmark', meaning: '主动收益是相对基准的净贡献。' }, { line: 'active.mean()', meaning: '均值描述平均超额表现。' }, { line: 'active.std(ddof=1)', meaning: '超额收益的波动就是跟踪误差的基础。' }], interpretation: ['没有基准，收益评价会失真。', '超额收益比绝对收益更能刻画主动管理价值。', '基准选择本身也是研究设计的一部分。'], mistakes: ['把涨了很多就当成策略有效', '用不匹配的基准夸大战果', '忽略跟踪误差'], summary: ['基准是评价框架的一部分。', '超额收益回答相对价值。', '主动管理必须在 benchmark 之上讨论。'] },
      { title: 'CAPM 与因子语言：把回报分成系统性与特异性', objective: '理解 CAPM / beta / alpha 的语言功能，并把它当作描述框架而不是终极真理。', whyItMatters: '后续做因子回归、风险归因和策略解释时，这套语言几乎无处不在。', conceptBridge: '因子模型不是说市场只由一个因素驱动，而是在问“这份收益里有多少只是市场暴露”。', math: 'r_i-r_f = alpha + beta(r_m-r_f)+epsilon；alpha 表示模型未解释部分，beta 表示市场暴露。', python: `import statsmodels.api as sm\nimport pandas as pd\n\nasset = pd.Series([0.012, 0.005, -0.004, 0.011, 0.003])\nmarket = pd.Series([0.01, 0.004, -0.006, 0.009, 0.002])\nX = sm.add_constant(market)\nmodel = sm.OLS(asset, X).fit()\nprint(model.params)`, codeWalkthrough: [{ line: 'sm.add_constant(market)', meaning: '回归里加常数项，常被解释为 alpha 项。' }, { line: 'sm.OLS(asset, X).fit()', meaning: '用线性回归估计资产对市场的暴露。' }, { line: 'model.params', meaning: '输出常数项与 beta。' }, { line: 'print(...)', meaning: '这里读到的是因子语言，不是财富密码。' }], interpretation: ['alpha 必须在模型假设下解释。', 'beta 高不代表差，只代表市场暴露大。', '因子模型首先是描述工具。'], mistakes: ['把回归 alpha 当成真实可交易 alpha', '忘记模型设定会改变解释', '把 CAPM 当成世界真理'], summary: ['CAPM 提供了最基础的风险分解语言。', 'alpha 和 beta 是条件性概念。', '因子回归是后续研究的重要接口。'] },
      { title: '周总结：金融语言到组合语言的升级', objective: '把第 2 周的协方差、组合收益、基准与因子语言整理成一套组合研究框架。', whyItMatters: '如果第二周没把“资产收益”升级成“组合与基准收益”，后面会一直停在个股叙事层。', conceptBridge: '组合理论让研究从单一资产视角走向资本配置视角。', math: '本课回顾组合收益、组合方差、超额收益与因子分解之间的关系。', python: `concepts = ["covariance", "portfolio_return", "benchmark", "factor_exposure"]\nfor c in concepts:\n    print("week2 core:", c)`, codeWalkthrough: [{ line: 'concepts = [...]', meaning: '把第二周最关键的四个概念抽出来形成骨架。' }, { line: 'portfolio_return', meaning: '组合是资金配置对象。' }, { line: 'benchmark / factor_exposure', meaning: '评价和解释都开始依赖相对框架。' }, { line: 'for c in concepts', meaning: '复盘的重点是概念之间的结构，而不是加新内容。' }], interpretation: ['第二周完成了从单资产到组合研究的升级。', '后面统计与回归会直接作用在这些对象上。', '系统化学习必须定期收束结构。'], mistakes: ['只记住公式没记住用途', '把基准和因子当成旁枝', '忘记组合视角才是投资学主线'], summary: ['第二周建立了组合研究语言。', '组合、基准和因子是后续回归与风险分析的入口。', '从这一周开始，研究对象不再只是单资产。'] },
    ],
  },
  {
    week: 3,
    phase: '第 3 周：统计推断与回归基础',
    overview: '把金融对象变成统计样本，学习估计误差、抽样分布、假设检验、OLS 和残差诊断。',
    lessons: [
      { title: '样本、总体与估计误差', objective: '理解金融数据分析里的样本均值、样本方差和估计误差。', whyItMatters: '没有估计误差概念，就会把样本中的好运气误读成稳定规律。', conceptBridge: '量化研究用样本推断总体，但样本本身带噪声，因此任何结论都应该附带不确定性。', math: '样本均值和样本标准差是估计量；估计量本身也有抽样分布。', python: `import pandas as pd\n\nreturns = pd.Series([0.01, -0.003, 0.012, 0.004, 0.006, -0.002])\nprint(returns.mean())\nprint(returns.std(ddof=1))`, codeWalkthrough: [{ line: 'returns = pd.Series(...)', meaning: '先把有限观测看作一个样本，而不是世界全部。' }, { line: 'returns.mean()', meaning: '样本均值不是“真均值”，而是对总体均值的估计。' }, { line: 'returns.std(ddof=1)', meaning: '样本方差同样带估计误差。' }, { line: 'print(...)', meaning: '每次估计都应该带着误差意识。' }], interpretation: ['样本结果不等于总体真相。', '估计误差是量化研究的常态，不是例外。', '后面置信区间和检验都建立在这里。'], mistakes: ['把样本均值当成稳定收益率', '忽视样本长度的影响', '只看点估计不看不确定性'], summary: ['统计分析从样本和总体区别开始。', '估计量也有误差。', '不确定性必须进入研究语言。'] },
      { title: '置信区间、t 统计量与显著性直觉', objective: '建立统计显著性直觉，知道为什么“看起来有效”并不等于可信。', whyItMatters: '没有显著性概念，量化研究会很容易沦为挑故事和挑样本。', conceptBridge: '统计检验在问：这份样本结果如果只是随机噪声，出现的概率大不大？', math: '均值的 t 统计量≈样本均值 / (样本标准差 / √n)；置信区间描述估计量可能落在哪些范围。', python: `import numpy as np\nimport pandas as pd\n\nreturns = pd.Series([0.011, 0.004, -0.002, 0.013, 0.006, -0.001, 0.003])\nt_stat = returns.mean() / (returns.std(ddof=1) / np.sqrt(len(returns)))\nprint(t_stat)`, codeWalkthrough: [{ line: 'len(returns)', meaning: '样本量直接影响标准误。' }, { line: 'returns.std(ddof=1) / np.sqrt(len(returns))', meaning: '标准误把波动和样本量同时考虑进去。' }, { line: 'returns.mean() / ...', meaning: 't 统计量衡量均值离零有多“远”。' }, { line: 'print(t_stat)', meaning: '数值本身不是结论，还要结合问题背景和检验假设。' }], interpretation: ['“有正收益”不等于“统计上可信”。', '样本越短，偶然性越大。', '显著性不能替代经济意义。'], mistakes: ['看见正均值就兴奋', '把 p 值当作真理按钮', '忽略经济量级'], summary: ['显著性评估样本结果的可信度。', 't 统计量依赖样本量和波动率。', '统计显著不代表经济上重要。'] },
      { title: '线性回归：把关系写成可检验模型', objective: '掌握 OLS 的基本角色，理解回归并不是神秘机器，而是结构化比较工具。', whyItMatters: '后续因子回归、预测建模和风险归因都以回归作为基础接口。', conceptBridge: '回归把“X 和 Y 似乎有关”变成可以检验的参数关系。', math: 'OLS 通过最小化残差平方和估计线性关系；系数可解释为边际变化。', python: `import statsmodels.api as sm\nimport pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5])\ny = pd.Series([1.2, 1.9, 3.1, 4.2, 4.8])\nX = sm.add_constant(x)\nresult = sm.OLS(y, X).fit()\nprint(result.params)`, codeWalkthrough: [{ line: 'sm.add_constant(x)', meaning: '为回归加入截距项。' }, { line: 'sm.OLS(y, X).fit()', meaning: '拟合最小二乘回归。' }, { line: 'result.params', meaning: '读取截距和斜率参数。' }, { line: 'print(...)', meaning: '回归输出让“关系”转化为参数对象。' }], interpretation: ['回归是结构化比较工具。', '系数解释要依赖模型设定。', '回归不是因果证明器。'], mistakes: ['把相关关系误当因果关系', '忽略变量定义和量纲', '只看 R² 不看残差'], summary: ['OLS 是经验金融的基础工具。', '回归把关系变成参数。', '解释系数前先检查设定。'] },
      { title: '残差、异方差与模型诊断', objective: '理解回归诊断为什么必要，知道模型结果不只是系数表。', whyItMatters: '如果不做诊断，就可能在坏模型上读出很漂亮但不可靠的结论。', conceptBridge: '模型输出之所以可信，不只因为估计了参数，还因为残差行为没有明显违背基本假设。', math: '残差是实际值减拟合值；异方差、序列相关和异常点都会扭曲推断。', python: `import statsmodels.api as sm\nimport pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5])\ny = pd.Series([1.0, 2.1, 2.8, 4.5, 5.2])\nX = sm.add_constant(x)\nfit = sm.OLS(y, X).fit()\nprint(fit.resid)`, codeWalkthrough: [{ line: 'fit = sm.OLS(...).fit()', meaning: '先得到回归模型对象。' }, { line: 'fit.resid', meaning: '残差是诊断模型的重要窗口。' }, { line: 'print(fit.resid)', meaning: '先看残差形状，再谈模型质量。' }, { line: '...', meaning: '专业研究从不只盯回归系数。' }], interpretation: ['模型结果要连同残差一起读。', '异方差会影响标准误和显著性。', '经验金融里诊断不是可选项。'], mistakes: ['只看系数显著性', '忽略异常值和残差结构', '把回归输出当最终答案'], summary: ['残差诊断是回归工作流的一部分。', '坏模型也能给出漂亮系数。', '统计推断依赖模型诊断。'] },
      { title: '周总结：从金融对象到统计对象', objective: '把前 3 周的内容连起来，完成从投资对象到统计样本的转换。', whyItMatters: '如果这一步没有打通，后面的时间序列和回测会像在不同课程里切换。', conceptBridge: '金融对象提供经济含义，统计工具提供检验框架；量化研究必须同时拥有两者。', math: '回顾收益率、协方差、超额收益、样本均值、t 统计与回归系数之间的逻辑位置。', python: `pipeline = ["asset", "return", "sample", "estimate", "test"]\nfor step in pipeline:\n    print(step)`, codeWalkthrough: [{ line: 'pipeline = [...]', meaning: '把课程主线写成一条管线。' }, { line: 'asset -> return', meaning: '先有经济对象，再有统计对象。' }, { line: 'estimate -> test', meaning: '经验研究从估计走向检验。' }, { line: 'print(step)', meaning: '复盘时强调的是流程，而非新知识点。' }], interpretation: ['统计不是脱离金融对象的空中楼阁。', '量化课程的系统性来自研究流程。', '前三周已经从市场语言推进到统计语言。'], mistakes: ['把统计当成独立数学课', '忘记每个估计量对应的经济问题', '只背工具不看流程'], summary: ['前三周完成了从金融对象到统计对象的过渡。', '后续时间序列会继续深化样本结构问题。', '研究流程开始成形。'] },
    ],
  },
  {
    week: 4,
    phase: '第 4 周：金融时间序列入门',
    overview: '正式进入 Tsay 脉络：平稳性、自相关、AR / MA 直觉、波动聚集和因子时间序列。',
    lessons: [
      { title: '平稳性与非平稳性：为什么价格常常不能直接建模', objective: '理解价格序列和收益率序列在统计性质上的关键差别。', whyItMatters: '很多时间序列模型默认稳定结构，如果你拿非平稳序列直接上模型，结果经常会失真。', conceptBridge: '价格往往带趋势和单位根问题，收益率更接近平稳对象，因此经验金融通常优先建模收益率。', math: '平稳性关注均值、方差和协方差结构是否随时间稳定。', python: `import pandas as pd\n\nprices = pd.Series([100, 101, 102, 104, 103, 105])\nreturns = prices.pct_change().dropna()\nprint(prices)\nprint(returns)`, codeWalkthrough: [{ line: 'prices = pd.Series(...)', meaning: '价格序列常带趋势和水平变化。' }, { line: 'prices.pct_change().dropna()', meaning: '收益率常被视为更适合建模的对象。' }, { line: 'print(prices)', meaning: '先观察水平序列。' }, { line: 'print(returns)', meaning: '再观察变化序列。' }], interpretation: ['价格与收益率不是同一统计对象。', '金融时间序列建模通常从收益率开始。', '平稳性问题决定模型能否合理使用。'], mistakes: ['直接对价格做回归预测', '不知道为何要转收益率', '把趋势错当预测力'], summary: ['平稳性是时间序列建模前提。', '价格常非平稳，收益率更接近平稳对象。', '模型对象要先选对。'] },
      { title: '自相关、ACF 与 PACF 直觉', objective: '理解时间序列中的滞后相关结构，以及 ACF / PACF 图想回答什么。', whyItMatters: '不理解滞后结构，就很难区分动量、均值回归和噪声。', conceptBridge: 'ACF 看总体滞后相关，PACF 看剔除中间滞后后的直接关系。', math: '自相关衡量序列与其滞后值的相关性；PACF 可帮助识别 AR 结构。', python: `import pandas as pd\nfrom statsmodels.tsa.stattools import acf, pacf\n\nreturns = pd.Series([0.01, 0.005, -0.002, 0.004, 0.006, -0.001, 0.003, 0.002])\nprint(acf(returns, nlags=3))\nprint(pacf(returns, nlags=3))`, codeWalkthrough: [{ line: 'acf(returns, nlags=3)', meaning: '看总体滞后相关结构。' }, { line: 'pacf(returns, nlags=3)', meaning: '看在控制中间滞后后剩下的直接相关。' }, { line: 'nlags=3', meaning: '这里只演示短滞后，核心是建立直觉。' }, { line: 'print(...)', meaning: '先读数值，再逐步过渡到图形和识别。' }], interpretation: ['时间序列结构来自时间依赖，而不是横截面差异。', 'ACF / PACF 是识别 AR / MA 的经验入口。', '看到相关不代表可交易。'], mistakes: ['把少数样本相关当成强信号', '不知道 ACF 与 PACF 区别', '忽略样本长度不足'], summary: ['滞后结构是时间序列分析的核心。', 'ACF 与 PACF 是结构识别工具。', '可交易性判断还要更严格。'] },
      { title: 'AR / MA / ARIMA 的直觉边界', objective: '建立 AR、MA 和 ARIMA 的基本直觉，知道它们各自试图描述什么。', whyItMatters: '很多人会背模型名，但并不知道模型结构对应的经济含义和数据条件。', conceptBridge: 'AR 强调序列自己的滞后，MA 强调冲击残差的延续，ARIMA 处理差分后的结构。', math: 'AR(p) 用过去 p 期值解释当前值；MA(q) 用过去 q 期误差解释当前值。', python: `from statsmodels.tsa.arima.model import ARIMA\nimport pandas as pd\n\nreturns = pd.Series([0.01, 0.002, -0.004, 0.006, 0.003, -0.001, 0.002, 0.004])\nmodel = ARIMA(returns, order=(1, 0, 0)).fit()\nprint(model.params)`, codeWalkthrough: [{ line: 'ARIMA(returns, order=(1, 0, 0))', meaning: '这里用最简单的 AR(1) 演示建模入口。' }, { line: 'fit()', meaning: '拟合模型得到参数。' }, { line: 'model.params', meaning: '读取模型估计结果。' }, { line: 'print(...)', meaning: '参数本身并不代表有稳定 alpha。' }], interpretation: ['ARIMA 是描述序列结构的工具，不是自动预测神器。', '模型有效性高度依赖对象是否适合。', '金融收益率常难出现稳定可利用的线性结构。'], mistakes: ['把模型拟合等同于可交易预测', '忽略模型稳定性', '不检查样本外表现'], summary: ['AR / MA / ARIMA 提供了基础的时间序列结构语言。', '模型选择依赖数据性质。', '金融数据上的预测力通常有限且脆弱。'] },
      { title: '波动聚集与条件异方差直觉', objective: '理解为什么收益率均值难预测，但波动率结构往往更有持续性。', whyItMatters: '风险管理和仓位控制高度依赖对波动状态的理解。', conceptBridge: '金融市场常表现为“方向难猜，但风险状态会成团出现”，这就是波动聚集。', math: '条件异方差意味着方差不是常数；GARCH 系列模型正是用来描述这种现象。', python: `import pandas as pd\n\nreturns = pd.Series([0.01, -0.012, 0.009, 0.002, -0.025, 0.018, -0.017, 0.004])\nrealized_proxy = returns.pow(2)\nprint(realized_proxy)`, codeWalkthrough: [{ line: 'returns.pow(2)', meaning: '平方收益率是最简单的波动 proxy 之一。' }, { line: 'realized_proxy', meaning: '这里不预测方向，而是观察波动强弱。' }, { line: 'print(realized_proxy)', meaning: '大波动往往成簇出现。' }, { line: '...', meaning: '后续风险模型会在此基础上扩展。' }], interpretation: ['市场波动状态常比均值更有持续性。', '风险管理问题和方向预测问题不同。', '波动建模是仓位控制的重要基础。'], mistakes: ['把波动问题和收益预测混为一谈', '只关心方向不关心风险状态', '忽略高波动 regime'], summary: ['波动聚集是金融时间序列的重要事实。', '方向和风险状态是两类不同问题。', '波动结构直接影响仓位和风控。'] },
      { title: '周总结：时间序列语言接入研究流程', objective: '把第四周的平稳性、滞后结构和波动聚集接到前面的金融与统计框架上。', whyItMatters: '时间序列课如果不接回研究流程，就会变成公式游览。', conceptBridge: '第四周的价值不在于掌握多少模型，而在于知道什么时候该质疑数据结构本身。', math: '回顾平稳性、自相关、AR 结构和条件异方差在研究流程中的位置。', python: `week4 = ["stationarity", "acf_pacf", "ARIMA intuition", "volatility clustering"]\nfor item in week4:\n    print(item)`, codeWalkthrough: [{ line: 'week4 = [...]', meaning: '把本周模型与概念压缩成一条主线。' }, { line: 'stationarity', meaning: '先问对象是否适合建模。' }, { line: 'acf_pacf / ARIMA', meaning: '再问结构长什么样。' }, { line: 'volatility clustering', meaning: '最后识别风险状态的持续性。' }], interpretation: ['时间序列分析先看结构，再谈预测。', '第四周让研究流程更接近金融数据本身的性质。', '模型识别力比模型名字更重要。'], mistakes: ['沉迷模型名词', '忽略数据结构前提', '把时间序列技术和经济问题脱节'], summary: ['第四周建立了基础时间序列语言。', '后面数据工程和回测会直接用到这些判断。', '建模前先问序列是否适合建模。'] },
    ],
  },
  {
    week: 5,
    phase: '第 5 周：数据工程与研究对象清洗',
    overview: '进入研究工程层：OHLCV、adj close、corporate actions、survivorship bias、universe 和 point-in-time 数据。',
    lessons: [
      { title: '美股数据对象：OHLCV、Adj Close 与企业行为', objective: '分清原始价格、调整价格、成交量与企业行为对研究结果的影响。', whyItMatters: '如果价格对象选错，累计收益和回测结果会系统性失真。', conceptBridge: '数据工程不是后勤工作，而是研究结论可信度的第一道防线。', math: '复权的核心在于把分红和拆股等企业行为正确映射到总回报序列。', python: `columns = ["open", "high", "low", "close", "adj_close", "volume"]\nfor c in columns:\n    print(c)`, codeWalkthrough: [{ line: 'columns = [...]', meaning: '美股行情数据至少要知道这些列各代表什么。' }, { line: 'adj_close', meaning: '调整收盘价通常更接近总回报分析对象。' }, { line: 'volume', meaning: '成交量连接到流动性、换手和交易能力。' }, { line: 'for c in columns', meaning: '先学清数据对象，再做策略。' }], interpretation: ['close 与 adj_close 的混用会污染研究。', 'corporate actions 会改变历史路径。', '行情列本身就包含研究假设。'], mistakes: ['直接拿 close 做长期总回报分析', '忽略拆股和分红', '不知道 volume 也有研究用途'], summary: ['数据列不是装饰。', '调整价格对象关系到收益真实性。', '数据工程从理解字段开始。'] },
      { title: '存活偏差、样本选择与 point-in-time 思维', objective: '理解 survivorship bias 与 point-in-time 数据为什么是量化研究的硬约束。', whyItMatters: '忽略退市和样本时点，会把很多策略回测变成幸存者童话。', conceptBridge: '研究样本不是今天看起来存在的样本，而是历史当时真实可见的样本。', math: '偏差的核心不是公式，而是“数据在当时是否可得”这一因果顺序。', python: `universe_today = ["AAPL", "MSFT", "NVDA"]\nuniverse_then = ["AAPL", "MSFT", "INTC", "CSCO"]\nprint(universe_today)\nprint(universe_then)`, codeWalkthrough: [{ line: 'universe_today / universe_then', meaning: '今天看到的成分股并不等于历史当时的可交易宇宙。' }, { line: 'print(...)', meaning: '用最简单的列表差异提醒你样本会随时间变化。' }, { line: '...', meaning: '这正是 survivorship bias 的入口。' }, { line: '...', meaning: 'point-in-time 思维要求数据严格按时间可得性使用。' }], interpretation: ['存活偏差会系统性夸大战略表现。', '历史研究必须站在当时视角。', '样本定义错误比模型错误更致命。'], mistakes: ['拿今天的成分股回测十年前', '忘记退市样本', '用未来可见信息定义过去样本'], summary: ['survivorship bias 是量化研究经典陷阱。', 'point-in-time 是研究纪律。', '样本定义必须尊重时间顺序。'] },
      { title: '特征工程：滞后、窗口与避免未来函数', objective: '学习如何构造 rolling features，同时避免 look-ahead bias。', whyItMatters: '很多初学者不是策略逻辑错，而是特征构造时偷看了未来。', conceptBridge: '研究特征必须严格从历史信息集合生成，不能越过时间边界。', math: '滚动均值、滚动波动率和动量信号都是基于窗口统计的特征。', python: `import pandas as pd\n\nprices = pd.Series([100, 101, 103, 102, 104, 106])\nreturns = prices.pct_change()\nmomentum_3 = prices / prices.shift(3) - 1\nvol_3 = returns.rolling(3).std()\nprint(momentum_3)\nprint(vol_3)`, codeWalkthrough: [{ line: 'prices.pct_change()', meaning: '先得到变化序列，作为后续 rolling 风险特征输入。' }, { line: 'prices / prices.shift(3) - 1', meaning: '这是简单的 3 期动量特征，只使用过去信息。' }, { line: 'returns.rolling(3).std()', meaning: '滚动波动率是基础风险特征。' }, { line: 'print(...)', meaning: '检查特征是否天然带有滞后边界。' }], interpretation: ['特征构造本身就是策略定义。', 'look-ahead bias 往往发生在滚动窗口边界处理上。', '研究工程要先保证时间顺序正确。'], mistakes: ['用未来价格构造当前信号', '没有 shift 导致偷看未来', '不检查特征对齐问题'], summary: ['特征工程必须尊重信息时序。', 'rolling 特征是基础研究部件。', '未来函数会直接毁掉回测可信度。'] },
      { title: '研究日志、notebook hygiene 与可复现性', objective: '建立研究留痕习惯，让实验结果能被复查和复做。', whyItMatters: '不能复现的策略结果通常也不值得信。', conceptBridge: '研究日志把“我试过很多东西”变成可审核的实验轨迹。', math: '本课重点不是数学，而是研究过程控制：输入、参数、版本、结果都要可追溯。', python: `research_log = {\n    "question": "Does 20-day momentum predict 5-day forward return?",\n    "sample": "US liquid equities 2015-2024",\n    "cost_model": "10 bps round-trip",\n    "result": "pending"\n}\nprint(research_log)`, codeWalkthrough: [{ line: 'research_log = {...}', meaning: '把研究问题、样本、成本假设和状态明确写下来。' }, { line: 'question', meaning: '每次实验必须有清楚问题。' }, { line: 'cost_model', meaning: '交易摩擦假设要显式写出。' }, { line: 'print(research_log)', meaning: '研究记录本身就是产出物。' }], interpretation: ['研究日志是对抗自我欺骗的工具。', 'Notebook 不只是展示图表，也要记录实验条件。', '可复现性是研究质量门槛。'], mistakes: ['只保留“最好看的结果”', '不记录样本和参数', '多次试验后忘记原始问题'], summary: ['可复现性是研究纪律。', '日志让实验结果可审计。', '研究工程和策略逻辑同等重要。'] },
      { title: '周总结：从数据对象到研究资产', objective: '把第五周的数据对象、偏差控制、特征工程和日志规范整合成研究工程基础。', whyItMatters: '工程纪律不到位，再好的统计和策略都站不住。', conceptBridge: '第五周把“金融对象”进一步加工成“可被严谨研究的数据资产”。', math: '回顾调整价格、点时数据、滚动特征和实验留痕在研究流程中的位置。', python: `engineering_chain = ["raw data", "clean object", "feature", "research log"]\nfor item in engineering_chain:\n    print(item)`, codeWalkthrough: [{ line: 'engineering_chain = [...]', meaning: '研究工程是从原始数据到实验资产的转换链。' }, { line: 'raw data -> clean object', meaning: '先保证对象正确。' }, { line: 'feature -> research log', meaning: '再保证实验可追踪。' }, { line: 'print(item)', meaning: '复盘时强调工程链，而不是分散技巧。' }], interpretation: ['第五周让研究更接近真实量化工作流。', '数据偏差问题必须早于回测讨论。', '好的研究工程会显著降低自我欺骗。'], mistakes: ['把工程问题视为小事', '先做策略再想数据是否正确', '没有实验记录'], summary: ['第五周建立了研究工程基础。', '干净数据与可复现性是量化工作的底层能力。', '下周开始把这些对象接入最小回测。'] },
    ],
  },
  {
    week: 6,
    phase: '第 6 周：最小回测系统与研究管线',
    overview: '把前面的金融、统计和工程对象接成最小可运行回测：信号、持仓、PnL、成本、样本切分与结果诊断。',
    lessons: [
      { title: '从信号到持仓：研究对象变成交易规则', objective: '把特征和规则连接起来，知道 signal、position、return 三者如何对应。', whyItMatters: '没有 signal→position→PnL 管线，前面的特征只是分析对象，还不是策略。', conceptBridge: '策略不是某个指标，而是“何时持有什么仓位”的规则系统。', math: '基础策略收益常写作 position_{t-1} × asset_return_t，强调信号与实现收益要错位。', python: `import pandas as pd\n\nsignal = pd.Series([1, 1, 0, -1, -1])\nasset_r = pd.Series([0.01, -0.004, 0.003, -0.008, 0.002])\nposition = signal.shift(1).fillna(0)\nstrategy_r = position * asset_r\nprint(strategy_r)`, codeWalkthrough: [{ line: 'signal = pd.Series(...)', meaning: '信号表达你的方向性判断。' }, { line: 'position = signal.shift(1).fillna(0)', meaning: '持仓必须滞后于信号，避免未来函数。' }, { line: 'strategy_r = position * asset_r', meaning: '仓位与资产收益相乘得到策略收益。' }, { line: 'print(strategy_r)', meaning: '这就是最小策略收益管线。' }], interpretation: ['信号不是收益，持仓才与收益相连。', 'shift 是回测中防止偷看未来的关键操作。', '策略必须写成可执行仓位规则。'], mistakes: ['用当期信号乘当期收益', '把信号和持仓混成一个对象', '不区分预测和执行'], summary: ['最小回测从 signal→position→return 开始。', '执行时序必须严格。', '仓位规则比指标名更重要。'] },
      { title: '交易成本、换手率与纸面 alpha 折损', objective: '把交易成本接入回测，理解 turnover 为什么能摧毁漂亮信号。', whyItMatters: '很多纸面 alpha 在考虑成本后会迅速蒸发。', conceptBridge: '策略真实收益 = 理论收益 - 交易摩擦；摩擦不是附属项，而是策略定义的一部分。', math: '净策略收益≈毛收益-成本率×换手；换手常由仓位变动绝对值近似。', python: `import pandas as pd\n\nposition = pd.Series([0, 1, 1, -1, 0])\ngross_r = pd.Series([0.0, 0.01, -0.003, 0.012, -0.001])\nturnover = position.diff().abs().fillna(position.abs())\ncost = turnover * 0.001\nnet_r = gross_r - cost\nprint(net_r)`, codeWalkthrough: [{ line: 'position.diff().abs()', meaning: '仓位变化可近似表示换手。' }, { line: 'cost = turnover * 0.001', meaning: '用简单成本模型先建立直觉。' }, { line: 'net_r = gross_r - cost', meaning: '净收益才更接近真实结果。' }, { line: 'print(net_r)', meaning: '比较净毛收益差异。' }], interpretation: ['高换手策略特别脆弱。', '成本模型粗糙也比完全忽略好。', '策略研究必须从毛收益走向净收益。'], mistakes: ['完全不计成本', '低估换手对净值的侵蚀', '看 gross pnl 就宣布策略有效'], summary: ['交易成本是策略定义的一部分。', '换手率连接到交易摩擦。', '净收益比毛收益更接近真实能力。'] },
      { title: '样本内、验证集与样本外测试', objective: '理解为什么要切分样本，以及为什么“全部历史都拿来调参数”是危险的。', whyItMatters: '没有样本切分，过拟合几乎是默认结局。', conceptBridge: '样本内用于建模，验证集用于筛选，样本外用于检验泛化；三者职责不能混。', math: '本课重点在实验设计而非新公式：训练 / validation / test 是反过拟合基本流程。', python: `import pandas as pd\n\nreturns = pd.Series(range(12))\ntrain = returns.iloc[:6]\nvalid = returns.iloc[6:9]\ntest = returns.iloc[9:]\nprint(len(train), len(valid), len(test))`, codeWalkthrough: [{ line: 'iloc[:6] / [6:9] / [9:]', meaning: '按时间顺序切分样本，不要随机打散金融时间序列。' }, { line: 'train / valid / test', meaning: '每段样本有不同任务。' }, { line: 'print(len(...))', meaning: '先理解结构，再讨论更复杂的 walk-forward。' }, { line: '...', meaning: '切分方式本身就是研究设计。' }], interpretation: ['金融时间序列切分必须尊重时间顺序。', '验证集和测试集不能混用。', '样本外表现才更接近真实能力。'], mistakes: ['在全部历史上调完参数再回测', '随机切分时间序列', '把测试集也拿来调模型'], summary: ['样本切分是反过拟合的基本纪律。', '金融数据切分要按时间。', '样本外结果比样本内结果更重要。'] },
      { title: '回测评价：收益、回撤、胜率、t 统计与稳定性', objective: '建立更完整的回测阅读框架，避免只盯一个指标。', whyItMatters: '策略评价是多维问题：收益、风险、稳定性、样本可信度和执行可行性缺一不可。', conceptBridge: '好的回测不是单点最大化，而是多维约束下的整体质量评估。', math: '评价至少包括年化收益、年化波动、Sharpe、最大回撤、换手率、样本长度和简单显著性。', python: `metrics = {\n    "ann_return": 0.12,\n    "ann_vol": 0.15,\n    "max_drawdown": -0.09,\n    "turnover": 1.8,\n    "t_stat": 2.1\n}\nprint(metrics)`, codeWalkthrough: [{ line: 'metrics = {...}', meaning: '把回测评价写成结构化对象。' }, { line: 'ann_return / ann_vol', meaning: '收益与风险必须同时存在。' }, { line: 'max_drawdown / turnover', meaning: '路径痛感和执行摩擦同样重要。' }, { line: 't_stat', meaning: '简单统计可信度也要纳入。' }], interpretation: ['回测阅读是多维问题。', '高收益但高换手或高回撤未必值得做。', '指标之间常常存在 trade-off。'], mistakes: ['只看 CAGR 或累计收益', '忽略样本长度与稳定性', '把一个高 Sharpe 当成绝对胜利'], summary: ['回测评价必须多维。', '统计可信度和执行现实要一起看。', '最好的策略往往是约束下的平衡解。'] },
      { title: '周总结：研究管线第一次闭环', objective: '把数据工程、信号、持仓、成本、样本切分和评价连成第一条完整研究管线。', whyItMatters: '这一周标志着课程第一次从“讲概念”走到“能做一个最小研究闭环”。', conceptBridge: '量化研究不是一个指标或模型，而是一条从数据到决策再到审计的流程。', math: '回顾 position×return、cost-adjusted pnl、样本切分和多维评价在回测管线中的位置。', python: `pipeline = ["feature", "signal", "position", "pnl", "cost", "evaluation"]\nfor step in pipeline:\n    print(step)`, codeWalkthrough: [{ line: 'pipeline = [...]', meaning: '用流程图方式回顾本周。' }, { line: 'feature -> signal -> position', meaning: '先从研究对象生成规则。' }, { line: 'pnl -> cost -> evaluation', meaning: '再进入真实收益与评价。' }, { line: 'print(step)', meaning: '闭环思维比增加新模型更重要。' }], interpretation: ['第六周是前 6 周知识第一次工程化闭环。', '从这里开始，策略研究有了最小执行框架。', '后面进入策略家族会更有落点。'], mistakes: ['把回测当作单个函数', '忽略流程中任何一个环节', '没有把评价和设计闭环'], summary: ['第六周完成了最小回测闭环。', '研究开始具备工程属性。', '后续策略家族会在这条管线上展开。'] },
    ],
  },
  {
    week: 7,
    phase: '第 7 周：策略家族入门',
    overview: '在已有回测管线上进入三类核心策略：时间序列动量、横截面排序和均值回归。',
    lessons: [
      { title: '时间序列动量：趋势跟随的最小表达', objective: '理解时间序列动量在经济与统计上的最小定义，并实现简单信号。', whyItMatters: '动量是最常见也最容易被误解的策略家族之一。', conceptBridge: '时间序列动量关注单个资产自己的过去趋势是否延续，不是与别人比较。', math: '最简单形式可写为过去 L 期收益的符号决定未来持仓方向。', python: `import pandas as pd\n\nprices = pd.Series([100, 102, 103, 105, 107, 106, 108])\nsignal = (prices / prices.shift(3) - 1).apply(lambda x: 1 if x > 0 else -1)\nprint(signal)`, codeWalkthrough: [{ line: 'prices / prices.shift(3) - 1', meaning: '用过去 3 期收益作为最简单趋势 proxy。' }, { line: 'apply(lambda x: ...)', meaning: '把连续信号离散成方向仓位。' }, { line: 'print(signal)', meaning: '这里只构造信号，还没进入成本和持仓层。' }, { line: '...', meaning: '后续会把它接回完整回测。' }], interpretation: ['时间序列动量是单资产时间维度的问题。', '趋势信号不一定稳定，必须样本外检验。', '持有周期和形成窗口是关键设计参数。'], mistakes: ['把所有涨得多的东西都叫动量', '混淆时间序列动量和横截面动量', '只看某一段趋势行情'], summary: ['时间序列动量先比较资产自己与自己的过去。', '窗口和持有期决定策略形态。', '趋势策略需要严格样本外检验。'] },
      { title: '横截面动量与排序组合', objective: '理解横截面排序策略如何在资产之间做相对强弱比较。', whyItMatters: '很多实务中的风格轮动、行业排序和因子投资都带横截面排序结构。', conceptBridge: '横截面动量不是问“它自己是否在涨”，而是问“它是否比同组资产更强”。', math: '排序策略常按过去 L 期收益打分，再构建 long-short 或 top bucket 组合。', python: `import pandas as pd\n\nscores = pd.Series({"AAPL": 0.12, "MSFT": 0.08, "NVDA": 0.16, "AMZN": 0.05})\nranked = scores.sort_values(ascending=False)\nprint(ranked)`, codeWalkthrough: [{ line: 'scores = pd.Series({...})', meaning: '先用横截面分数表示同一时点不同资产的相对强弱。' }, { line: 'sort_values(ascending=False)', meaning: '排序是横截面策略的基本操作。' }, { line: 'ranked', meaning: '排名结果可进一步映射成 top/bottom 组合。' }, { line: 'print(ranked)', meaning: '先建立横截面思维，再进入组合构建。' }], interpretation: ['横截面策略天然需要 universe 定义。', '排序与分组决定组合形态。', '行业中性或市值中性等约束会进一步改变结果。'], mistakes: ['把横截面排序和单资产趋势混淆', '忽略 universe 变化对分位数的影响', '只看 top names 不看组合约束'], summary: ['横截面策略是“资产之间”的比较。', '排序和分组是它的核心动作。', '组合约束会显著改变结果。'] },
      { title: '均值回归：什么时候偏离会回到中心', objective: '建立均值回归的统计直觉，知道它依赖什么前提。', whyItMatters: '均值回归比趋势策略更依赖对象特征与交易摩擦控制。', conceptBridge: '均值回归不是“跌多了就会涨”，而是“相对某个稳定中心的偏离会被纠正”。', math: '最简单表达可用 z-score 或偏离均值程度刻画；关键是“中心”是否稳定。', python: `import pandas as pd\n\nspread = pd.Series([0.2, 0.1, -0.1, -0.3, 0.0, 0.15])\nz = (spread - spread.mean()) / spread.std(ddof=1)\nprint(z)`, codeWalkthrough: [{ line: 'spread = pd.Series(...)', meaning: '均值回归通常从某种价差或偏离序列开始。' }, { line: '(spread - spread.mean()) / spread.std(ddof=1)', meaning: 'z-score 衡量偏离中心有多远。' }, { line: 'print(z)', meaning: '极端 z 值常被用作反转触发候选。' }, { line: '...', meaning: '但中心稳定性和交易成本同样关键。' }], interpretation: ['均值回归依赖稳定中心假设。', '高换手会严重伤害这类策略。', '对象选错时“回归”可能根本不存在。'], mistakes: ['把超跌反弹口号当成均值回归', '不验证中心是否稳定', '忽略高频换手成本'], summary: ['均值回归先要求有稳定中心。', 'z-score 只是起点，不是完整策略。', '均值回归策略对对象和成本很敏感。'] },
      { title: '因子排序、行业中性与风险暴露控制', objective: '理解为什么排序策略常需要做中性化与风险暴露约束。', whyItMatters: '不做约束时，你以为自己在做 alpha，实际可能只是在押行业或 beta。', conceptBridge: '排序信号只是候选观点，组合约束才决定你到底暴露了什么风险。', math: '中性化的本质是控制组合对某些系统性因子的净暴露接近零。', python: `raw_scores = {"AAPL": 0.9, "MSFT": 0.7, "XOM": -0.2, "CVX": -0.1}\nfor name, score in raw_scores.items():\n    print(name, score)`, codeWalkthrough: [{ line: 'raw_scores = {...}', meaning: '原始分数只是排序起点。' }, { line: 'AAPL / MSFT / XOM / CVX', meaning: '跨行业资产混在一起时，分数可能隐含行业押注。' }, { line: 'for name, score...', meaning: '先看分数分布，再思考中性化。' }, { line: '...', meaning: '后续行业中性和 beta 中性会让组合更可解释。' }], interpretation: ['排序信号不等于纯 alpha。', '行业中性和 beta 中性能减少意外暴露。', '组合约束是风险解释的一部分。'], mistakes: ['把原始排序直接当成可交易组合', '不知道自己押了什么风险因子', '只看收益不看暴露'], summary: ['约束让策略更可解释。', '因子分数要和风险暴露控制一起看。', 'alpha 研究离不开暴露分解。'] },
      { title: '周总结：三类策略放进同一研究坐标系', objective: '比较趋势、横截面排序和均值回归的对象、统计前提与交易现实。', whyItMatters: '如果只是逐个记住策略名字，而不比较它们的结构差异，就无法形成研究判断力。', conceptBridge: '策略家族差异体现在研究对象、持有周期、换手特征和风险来源上。', math: '回顾 signal 定义、持仓生成、换手特征与风险暴露如何因策略家族而异。', python: `families = ["time-series momentum", "cross-sectional ranking", "mean reversion"]\nfor f in families:\n    print(f)`, codeWalkthrough: [{ line: 'families = [...]', meaning: '把本周三类策略并列放在一起对比。' }, { line: 'time-series momentum', meaning: '单资产时间维度。' }, { line: 'cross-sectional ranking / mean reversion', meaning: '前者更偏相对比较，后者更偏偏离纠正。' }, { line: 'print(f)', meaning: '复盘关键是结构差异。' }], interpretation: ['不同策略家族对应不同研究对象。', '它们的成本、换手和风险暴露也不同。', '研究判断力来自横向比较而不是单独背诵。'], mistakes: ['把不同策略家族混为一谈', '只比较历史收益不比较结构', '没有把策略放回研究管线'], summary: ['第七周建立了策略家族地图。', '不同策略家族对应不同统计前提与交易现实。', '后续需要进入组合构建与风险控制。'] },
    ],
  },
  {
    week: 8,
    phase: '第 8 周：组合构建、风险预算与执行现实',
    overview: '把策略信号推进到组合和执行层：权重、波动目标、风险预算、容量、滑点和研究后评估。',
    lessons: [
      { title: '从信号分数到组合权重', objective: '学习如何把分数或观点映射成可执行权重，而不是停留在“看多/看空”。', whyItMatters: '没有权重映射，策略研究无法进入真正的资本配置问题。', conceptBridge: '权重是资本分配规则，它把抽象信号转成真实风险承担。', math: '最简单权重可来自等权、分数归一化或波动逆权；不同权重会改变暴露和换手。', python: `import pandas as pd\n\nscores = pd.Series({"AAPL": 0.8, "MSFT": 0.6, "NVDA": 1.2})\nweights = scores / scores.abs().sum()\nprint(weights)`, codeWalkthrough: [{ line: 'scores = pd.Series(...)', meaning: '先有连续分数，而不只是方向。' }, { line: 'scores / scores.abs().sum()', meaning: '把分数归一化成可解释权重。' }, { line: 'weights', meaning: '权重之和受到资本约束。' }, { line: 'print(weights)', meaning: '不同映射方式会产生不同组合。' }], interpretation: ['同一信号在不同权重规则下会变成不同策略。', '权重设计就是资本分配设计。', '组合问题不能只停留在分数层面。'], mistakes: ['把排序结果直接当成组合', '不知道权重映射也是模型假设', '忽略权重与风险的关系'], summary: ['权重映射是从信号到组合的关键一步。', '资本约束进入了模型。', '组合构建与信号设计同等重要。'] },
      { title: '波动目标与风险预算', objective: '理解为什么很多策略用目标波动率或风险预算来控制组合行为。', whyItMatters: '不控制风险强度，信号再好也可能在高波动环境中失控。', conceptBridge: '资本配置不是只看预期收益，还要控制承担风险的速度和规模。', math: '目标波动思想是按估计波动率缩放仓位；风险预算则按资产风险贡献分配资本。', python: `import pandas as pd\n\nvol = pd.Series({"AAPL": 0.28, "MSFT": 0.22, "TLT": 0.11})\ninv_vol = 1 / vol\nweights = inv_vol / inv_vol.sum()\nprint(weights)`, codeWalkthrough: [{ line: 'vol = pd.Series(...)', meaning: '先估计各资产风险强度。' }, { line: 'inv_vol = 1 / vol', meaning: '逆波动权重是基础风险平价直觉。' }, { line: 'weights = inv_vol / inv_vol.sum()', meaning: '把风险缩放映射成组合权重。' }, { line: 'print(weights)', meaning: '风险预算开始明确写进组合。' }], interpretation: ['目标波动是控制风险强度的实用方法。', '风险预算常比简单等权更稳定。', '风险控制不是策略之后才考虑的补丁。'], mistakes: ['先满仓做策略再事后讨论风控', '不知道波动调整会改变仓位', '把风险预算误解成收益预测'], summary: ['风险预算是组合设计的一部分。', '目标波动让仓位更可控。', '风控必须前置到权重层。'] },
      { title: '容量、流动性与滑点：纸面组合为什么落不了地', objective: '理解容量和流动性约束如何限制真实可交易规模。', whyItMatters: '很多回测在小资金下好看，大资金下会被冲击成本和流动性彻底改变。', conceptBridge: '可交易性不是二元问题，而是随资金规模、成交量和换手逐渐恶化。', math: '本课重点是数量级判断：成交量、ADV、仓位规模和冲击成本之间的约束关系。', python: `portfolio_dollar = 5_000_000\nadv = 80_000_000\nparticipation = portfolio_dollar / adv\nprint(participation)`, codeWalkthrough: [{ line: 'portfolio_dollar = ...', meaning: '先把策略规模显式写出来。' }, { line: 'adv = 80_000_000', meaning: '日均成交额是容量判断常用参考。' }, { line: 'portfolio_dollar / adv', meaning: '参与率越高，冲击成本压力通常越大。' }, { line: 'print(participation)', meaning: '容量是数量级问题，不是抽象口号。' }], interpretation: ['容量约束会随着资金规模迅速显性化。', '高换手策略比低换手策略更受流动性约束。', '滑点和冲击成本必须进入策略讨论。'], mistakes: ['完全不谈容量', '以为成交量大就一定能无成本交易', '忽略组合规模和持仓换手的交互'], summary: ['可交易性受流动性和容量约束。', '容量问题会改变策略经济价值。', '纸面回测必须接入执行现实。'] },
      { title: '研究 post-mortem：样本外失效时如何复盘', objective: '建立研究失败后的复盘框架，而不是盲目继续调参。', whyItMatters: '真正的研究能力很大一部分体现在策略失效后的诊断，而不是成功故事。', conceptBridge: 'post-mortem 不是承认失败，而是把失效拆成数据、模型、成本、暴露和 regime 五类问题。', math: '本课无新增公式，重点是失败归因框架：样本、设定、执行、风险暴露、市场环境。', python: `post_mortem = {\n    "sample_shift": False,\n    "cost_underestimated": True,\n    "factor_crowding": "possible",\n    "regime_change": "needs review"\n}\nprint(post_mortem)`, codeWalkthrough: [{ line: 'post_mortem = {...}', meaning: '把失败复盘写成结构化检查表。' }, { line: 'sample_shift / cost_underestimated', meaning: '先问是样本和摩擦问题还是模型问题。' }, { line: 'factor_crowding / regime_change', meaning: '再问是否存在暴露拥挤或市场环境切换。' }, { line: 'print(post_mortem)', meaning: '结构化复盘比情绪化否定更专业。' }], interpretation: ['失败复盘是研究工作流一部分。', '样本外失效不意味着前面都白学。', '系统性诊断比继续调参更重要。'], mistakes: ['一失效就疯狂调参数', '不记录失败原因', '把样本外失效全归咎于市场随机性'], summary: ['post-mortem 是研究成熟度标志。', '失效诊断应结构化。', '研究能力体现在失败后的处理方式。'] },
      { title: '阶段总结：前 8 周课程地图与研究产出', objective: '回顾前 8 周主干，明确已经掌握什么、下一阶段应该研究什么。', whyItMatters: '系统课程必须在阶段末把知识图谱、研究产出和下一阶段入口重新钉牢。', conceptBridge: '前 8 周不是为了产出“圣杯策略”，而是为了训练成为能独立做基础研究的人。', math: '回顾收益率、组合、推断、时间序列、数据工程、最小回测、策略家族与风险控制的主线连接。', python: `deliverables = [\n    "return notebook",\n    "risk summary",\n    "regression exercise",\n    "time-series notes",\n    "clean data pipeline",\n    "minimal backtest",\n    "strategy comparison memo",\n    "post-mortem template"\n]\nfor d in deliverables:\n    print(d)`, codeWalkthrough: [{ line: 'deliverables = [...]', meaning: '把前 8 周应该留下的研究产出物写清楚。' }, { line: 'return notebook / risk summary', meaning: '前两周产出金融与风险基础 notebook。' }, { line: 'minimal backtest / strategy comparison memo', meaning: '后几周产出工程化研究记录。' }, { line: 'for d in deliverables', meaning: '阶段总结的重点是可验证产出。' }], interpretation: ['前 8 周完成的是研究底座，而不是策略终局。', '真正的学习成果应当体现为 notebook、备忘录和最小回测。', '下一阶段才能更严肃地进入因子研究和组合优化。'], mistakes: ['把阶段总结写成鸡汤', '只记得概念，不知道产出物', '以为课程结束就该直接实盘'], summary: ['前 8 周建立了量化研究底座。', '课程成果应体现为一组可审计研究产出。', '下一阶段才适合进入更复杂的因子和组合优化。'] },
    ],
  },
];

function buildLesson(weekSpec, lessonDef, idx, totalDays) {
  const day = idx + 1;
  const id = `day-${day}`;
  const prevId = day > 1 ? `day-${day - 1}` : null;
  const nextId = day < totalDays ? `day-${day + 1}` : null;
  const base = {
    id,
    day,
    title: lessonDef.title,
    phase: weekSpec.phase,
    duration: '建议 75–110 分钟',
    objective: lessonDef.objective,
    whyItMatters: lessonDef.whyItMatters,
    prerequisites: day === 1
      ? ['高中代数与基础 Python 足够开始', '愿意把市场问题写成结构化研究问题']
      : [`已完成前 ${day - 1} 课的核心概念`, '能阅读基础 pandas / numpy 代码', '愿意把概念接回研究流程'],
    studyFlow: [
      `先理解本课的经济对象：${lessonDef.title}到底在研究什么。`,
      '再用最小数学框架和 Python 示例把概念落到数据对象上。',
      '最后把本课内容接回“研究设计—回测—风险—解释”主线。',
    ],
    intuitiveBlocks: [
      weekSpec.overview,
      lessonDef.whyItMatters,
      '本课的目标不是把术语讲得像科普文章，而是让你把这个概念放到教材骨架和研究流程里。',
    ],
    conceptBridge: lessonDef.conceptBridge,
    math: lessonDef.math,
    codeContext: `这段 Python 不是为了“展示一下代码”，而是为了把“${lessonDef.title}”变成一个可计算、可检验、可接入研究管线的数据对象。`,
    python: lessonDef.python,
    codeWalkthrough: lessonDef.codeWalkthrough,
    explanation: `本课代码和正文是一体的：你要同时看懂经济对象、统计对象和工程对象如何在“${lessonDef.title}”这里汇合。`,
    interpretation: lessonDef.interpretation,
    rigorNotes: `严谨性要求：本课必须同时回答三个问题——研究对象是什么、统计上如何刻画、工程上如何避免自我欺骗。对于“${lessonDef.title}”，如果只停留在直觉比喻而没有把它接回样本、回测或风险约束，就还没有真正学会。`,
    mistakes: lessonDef.mistakes,
    checkpoints: [
      `我能否用自己的话解释“${lessonDef.title}”在整个 8 周课程中的位置？`,
      '我能否指出这节课最容易出现的数据偏差、统计误读或执行幻觉？',
      '我能否把本课代码修改成自己的小实验，而不只是复制运行？',
    ],
    referenceTrack: [
      `教材主线：${weekSpec.phase}对应的核心脉络已经接入本课。`,
      'Investments / Tsay / Chan 三条线索在这里分别对应经济含义、统计结构和研究工程。',
      '复习时不要只背结论，要把它放回“对象—样本—信号—组合—风险”流程。',
    ],
    summary: lessonDef.summary,
    exercises: [
      {
        id: `${id}-ex-1`,
        title: '概念解释题',
        prompt: `请不用大白话复述，而是用“研究对象 / 统计对象 / 风险含义”三层结构解释：${lessonDef.title}。`,
        hint: '至少分别回答：它研究什么、怎么量化、为什么会误用。',
        answer: `参考答案应包含：${lessonDef.title}的研究对象、对应的数据或统计表示、以及至少一个常见误区。`,
      },
      {
        id: `${id}-ex-2`,
        title: '代码改写题',
        prompt: '修改本课代码中的参数、窗口、样本或资产集合，并观察结果如何变化。写下你的变化解释。',
        hint: '不要只改数字，要说清为什么结果会变。',
        answer: '合格答案应描述：修改了什么、结果如何变化、变化背后对应的金融或统计原因是什么。',
      },
      {
        id: `${id}-ex-3`,
        title: '研究日志题',
        prompt: `把“${lessonDef.title}”写成一条研究日志：问题、样本、方法、主要风险、下一步验证。`,
        hint: '练习把课程内容转成研究产出物。',
        answer: '合格答案应该包含清楚的问题定义、数据样本、方法选择、潜在偏差或风险，以及下一步验证计划。',
      },
    ],
    nextLessonId: nextId,
  };
  return base;
}

const flatLessons = weekSpecs.flatMap(w => w.lessons.map(l => ({ weekSpec: w, lessonDef: l })));
courseData.lessons = flatLessons.map((item, idx) => buildLesson(item.weekSpec, item.lessonDef, idx, flatLessons.length));

courseData.practiceGroups = [
  {
    title: '金融语言与组合基础',
    items: ['收益率与对数收益率手算', '净值与回撤 notebook', '基准与超额收益辨析', '组合收益矩阵练习'],
  },
  {
    title: '统计、回归与时间序列',
    items: ['t 统计量与显著性小实验', 'OLS 回归结果解读', 'ACF / PACF 识别练习', '波动聚集观察日志'],
  },
  {
    title: '数据工程与回测',
    items: ['复权与样本偏差检查', 'rolling 特征对齐练习', '最小 signal-position-pnl 回测', '交易成本敏感性分析'],
  },
  {
    title: '策略与风险控制',
    items: ['动量 vs 均值回归比较 memo', '横截面排序组合构建', '逆波动权重练习', 'post-mortem 复盘模板'],
  },
];

courseData.glossary = [
  { term: 'return', tag: '金融对象', front: '收益率', back: '描述资产在两个时点之间变化比例的核心对象，是量化研究的基础语言。' },
  { term: 'log return', tag: '金融对象', front: '对数收益率', back: 'ln(P_t/P_{t-1})，在多期累加和部分模型中更方便，但需要明确使用边界。' },
  { term: 'drawdown', tag: '风险语言', front: '回撤', back: '当前净值相对历史峰值的跌幅，最能体现策略路径痛感。' },
  { term: 'benchmark', tag: '组合语言', front: '基准', back: '评价组合或策略表现的参照对象，没有基准就很难讨论主动价值。' },
  { term: 'alpha', tag: '因子语言', front: 'Alpha', back: '在给定模型假设下无法被既定风险因子解释的收益部分，不等于天然可交易利润。' },
  { term: 'beta', tag: '因子语言', front: 'Beta', back: '资产或组合对某个系统性因子的暴露强度，最常见的是市场 beta。' },
  { term: 'stationarity', tag: '时间序列', front: '平稳性', back: '时间序列的均值、方差和协方差结构在时间上相对稳定，是很多模型的前提。' },
  { term: 'acf', tag: '时间序列', front: 'ACF', back: '自相关函数，用来观察序列与其滞后值之间的整体相关结构。' },
  { term: 'pacf', tag: '时间序列', front: 'PACF', back: '偏自相关函数，用于观察剔除中间滞后影响后的直接相关结构。' },
  { term: 'survivorship bias', tag: '数据工程', front: '存活偏差', back: '只使用今天仍然存在的样本回看历史，导致历史结果被系统性美化。' },
  { term: 'look-ahead bias', tag: '数据工程', front: '未来函数偏差', back: '在信号构造或回测中使用了当时并不可见的未来信息。' },
  { term: 'turnover', tag: '执行现实', front: '换手率', back: '仓位变化强度的近似度量，直接连接到交易成本和执行压力。' },
];

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
  const total = courseData.lessons.length;
  const ratio = total ? Math.round((completedCount / total) * 100) : 0;
  document.getElementById('view-home').innerHTML = `
    <div class="hero-grid">
      <section class="hero">
        <p class="kicker">8-Week Core Rebuild</p>
        <h3>${courseData.title}</h3>
        <p>${courseData.subtitle}</p>
        <p><strong>目标：</strong>${courseData.goal}</p>
        <p><strong>课程定位：</strong>${courseData.promise}</p>
        <div class="stats-grid">
          <div class="stat-card"><h3>教学主舞台</h3><strong>美股</strong><span class="muted">统一案例、数据环境与文献语境</span></div>
          <div class="stat-card"><h3>课程深度</h3><strong>教材 + 研究</strong><span class="muted">不是科普导览，而是可积累的研究底座</span></div>
          <div class="stat-card"><h3>当前进度</h3><strong>${completedCount}/${total}</strong><span class="muted">已学课数 · ${ratio}%</span></div>
        </div>
      </section>
      <section class="panel">
        <p class="kicker">当前课程</p>
        <h3>Day ${today.day} · ${today.title}</h3>
        <p>${today.objective}</p>
        <div class="info-stack">
          <div class="info-chip">${today.phase}</div>
          <div class="info-chip">${today.duration}</div>
          <div class="info-chip">${state.completedLessons.includes(today.id) ? '已完成' : '进行中'}</div>
        </div>
        <p class="muted" style="margin-top:14px;">${today.whyItMatters}</p>
        <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="small-btn" onclick="goToLesson('${today.id}')">进入课程正文</button>
          <button class="small-btn" onclick="setView('practice')">研究练习</button>
          <button class="small-btn" onclick="setView('roadmap')">查看 8 周地图</button>
        </div>
      </section>
    </div>

    <section class="card-grid">
      <article class="panel">
        <p class="kicker">课程结构</p>
        <h3>先金融，再统计；先数据，再回测；最后才谈策略</h3>
        <p class="muted">这版课程把量化学习重新锚定在 Investments、统计推断、时间序列、数据工程和回测纪律上，而不是从“找策略”开始。</p>
      </article>
      <article class="panel">
        <p class="kicker">学习产出</p>
        <h3>每周都要留下研究痕迹</h3>
        <p class="muted">不是只看课程正文。每一周都应该沉淀 notebook、研究日志、回测表、误差解释和 post-mortem 模板。</p>
      </article>
      <article class="panel">
        <p class="kicker">课程标准</p>
        <h3>专业化，不搞大白话堆砌</h3>
        <p class="muted">每节课都要求你同时理解研究对象、统计对象、代码对象，以及它们在策略研究流程中的位置。</p>
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
        <p class="kicker">学习原则</p>
        <h4>研究流程比知识点数量更重要</h4>
        <p class="muted">这 8 周不是为了收集术语，而是为了建立一条能落地的研究流程：定义对象、构造样本、做估计、写回测、控制偏差、解释结果、复盘失效。</p>
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
          <h4>为什么它在课程主线上不可跳过</h4>
          <p>${lesson.whyItMatters}</p>
        </div>

        <div class="section-block">
          <h4>前置知识</h4>
          <ul>${lesson.prerequisites.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>建议学习流程</h4>
          <ol>${lesson.studyFlow.map(item => `<li>${item}</li>`).join('')}</ol>
        </div>

        <div class="section-block">
          <h4>课程讲解</h4>
          ${lesson.intuitiveBlocks.map(block => `<p>${block}</p>`).join('')}
        </div>

        <div class="section-block">
          <h4>概念桥接</h4>
          <p>${lesson.conceptBridge}</p>
        </div>

        <div class="section-block">
          <h4>数学 / 方法框架</h4>
          <p>${lesson.math}</p>
        </div>

        <div class="section-block code-context">
          <h4>这段 Python 在研究流程里的作用</h4>
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
          <h4>你应该从这节课读出什么</h4>
          <ul>${lesson.interpretation.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>严谨性要求</h4>
          <p>${lesson.rigorNotes}</p>
        </div>

        <div class="section-block">
          <h4>本课自检</h4>
          <ul>${lesson.checkpoints.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>

        <div class="section-block">
          <h4>参考脉络</h4>
          <div class="reference-grid">
            ${lesson.referenceTrack.map(item => `<article class="reference-card"><p>${item}</p></article>`).join('')}
          </div>
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

      <aside class="lesson-sidebar">
        <section class="panel sticky-panel">
          <p class="kicker">课程导航</p>
          <h3>8 周 / 40 课主干目录</h3>
          <div class="lesson-list compact">
            ${renderLessonCards()}
          </div>
          <div style="display:grid; gap:10px; margin-top:14px;">
            <button class="small-btn" ${prevLesson ? `onclick="goToLesson('${prevLesson.id}')"` : 'disabled'}>${prevLesson ? `上一课：Day ${prevLesson.day}` : '已经是第一课'}</button>
            <button class="small-btn" ${nextLesson ? `onclick="goToLesson('${nextLesson.id}')"` : 'disabled'}>${nextLesson ? `下一课：Day ${nextLesson.day}` : '已经到第 8 周结尾'}</button>
            <button class="small-btn" onclick="setView('practice')">切到研究练习</button>
          </div>
        </section>

        <section class="panel" style="margin-top:18px;">
          <p class="kicker">学习提醒</p>
          <h3>把每节课转成研究产出</h3>
          <p class="muted">至少留下三样东西：一个可运行的小实验、一个简短研究日志、一个“这节课最容易骗到我的地方”的偏差提醒。</p>
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
      <p class="muted">练习区不再只是复述概念，而是要求你把本课内容写成研究解释、代码改写和研究日志。</p>
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
      <p class="kicker">阶段练习组</p>
      <h3>8 周训练包</h3>
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
      <h3>前 8 周主干课程推进情况</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${ratio}%"></div></div>
      <p class="muted" style="margin-top:12px;">已完成 ${completed} / ${totalLessons} 节课 · ${ratio}%</p>
    </section>

    <section class="card-grid" style="margin-top:18px;">
      <article class="stat-card"><h3>当前课程</h3><strong>Day ${lesson.day}</strong><span class="muted">${lesson.title}</span></article>
      <article class="stat-card"><h3>所在模块</h3><strong>${lesson.phase.replace('第 ', '').replace(' 周：', '周 · ')}</strong><span class="muted">${lesson.duration}</span></article>
      <article class="stat-card"><h3>已完成练习</h3><strong>${state.completedExercises.length}</strong><span class="muted">研究练习可单独标记</span></article>
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
