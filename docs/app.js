const state = {
  currentView: 'home',
  todayLessonId: 'day-1',
  completedLessons: JSON.parse(localStorage.getItem('quantCourse.completedLessons') || '[]'),
  completedExercises: JSON.parse(localStorage.getItem('quantCourse.completedExercises') || '[]'),
};

const courseData = {
  title: '量化金融学习站',
  subtitle: '从零开始，面向个人投资 / 交易者的长期量化学习系统',
  goal: '逐步达到能够独立做基础量化研究、构建和评估策略、并尝试小规模实操。',
  roadmap: [
    {
      stage: '阶段 1：量化入门与市场语言',
      weeks: '4–6 周',
      focus: '收益率、复利、回撤、波动率、风险收益语言、基础 Python 数据处理',
      outcomes: ['会读基础市场数据', '理解收益与风险的核心概念', '开始用量化语言描述市场'],
    },
    {
      stage: '阶段 2：统计基础与策略原型',
      weeks: '6–10 周',
      focus: '相关性、时间序列直觉、趋势/动量/均值回归、回测雏形',
      outcomes: ['能写出简单策略', '能做基础回测', '能识别明显策略陷阱'],
    },
    {
      stage: '阶段 3：组合、风控与研究框架',
      weeks: '8–12 周',
      focus: '组合管理、风险预算、交易成本、样本内外验证、实操框架',
      outcomes: ['能搭研究工作流', '能组织策略评估', '能开始小规模测试'],
    },
  ],
  lessons: [
    {
      id: 'day-1',
      day: 1,
      title: '量化投资到底在做什么',
      phase: '第 1 周：建立量化语言',
      objective: '理解量化投资不是自动赚钱机器，而是规则化研究框架。',
      intuitive: '量化投资不是“神奇公式预测涨跌”，而是把市场想法变成明确规则，再用数据去检验这些规则到底有没有一点真实价值。它更像一个研究和决策系统，而不是一个按钮式印钞机。',
      math: '第 1 课暂不强调公式，先强调框架：想法 → 假设 → 数据 → 规则 → 回测 → 风控 → 迭代。后面所有数学工具，都是为这个流程服务。',
      python: `import pandas as pd\n\nprices = pd.Series([100, 102, 101, 105])\nprint(prices)\nprint(prices.pct_change())`,
      explanation: '这段代码的意义不是“开始赚钱”，而是让你第一次用数据而不是感觉去看市场变化。',
      mistakes: [
        '把量化误解成“自动赚钱机器”',
        '一上来就找策略，而不先建立研究流程',
        '只看收益，不看风险和可执行性',
      ],
      summary: [
        '量化投资的核心是规则化研究',
        '先建立方法论，再建立策略',
        '以后所有知识都会回到“能否检验、能否执行”',
      ],
      next: 'Day 2：价格、收益率、对数收益率',
      exercises: [
        {
          id: 'ex-1-1',
          title: '概念题',
          prompt: '请用你自己的话区分“主观交易”和“量化研究”最大的不同。',
          hint: '想想：一个更依赖感觉，一个更依赖规则。',
          answer: '可参考方向：主观交易常常依赖临场判断和经验；量化研究会尽量把条件写清楚，并用历史数据做检验。',
        },
        {
          id: 'ex-1-2',
          title: 'Python 题',
          prompt: '把示例价格改成你自己的一组 5 天价格，并运行 `pct_change()` 看输出。',
          hint: '比如 [10, 10.3, 10.1, 10.5, 10.8]。',
          answer: '重点不是数值本身，而是观察：价格变化与收益率变化是两种不同表达。',
        },
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
  localStorage.setItem('quantCourse.completedLessons', JSON.stringify(state.completedLessons));
  localStorage.setItem('quantCourse.completedExercises', JSON.stringify(state.completedExercises));
}

function renderHome() {
  const today = courseData.lessons[0];
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
        <p class="kicker">今日课程</p>
        <h3>Day ${today.day} · ${today.title}</h3>
        <p class="muted">${today.objective}</p>
        <span class="badge">${today.phase}</span>
        <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="small-btn" onclick="setView('lesson')">进入课程</button>
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
        <h3>30 天后要做到什么</h3>
        <p class="muted">理解收益率、波动率、相关性、回撤、Sharpe，能写简单策略雏形，能看懂基础回测，不被漂亮历史曲线轻易骗到。</p>
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
        <h4>已经完成：总纲 / 30 天骨架 / 网站骨架</h4>
        <p class="muted">下一步是继续把 Day 1–Day 7 的正文课程接入站点，并补更多交互与进度记录。</p>
      </article>
    </div>
  `;
}

function renderLesson() {
  const lesson = courseData.lessons.find(l => l.id === state.todayLessonId);
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
          <p>${lesson.intuitive}</p>
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
        <p class="kicker">下一课</p>
        <h3>${lesson.next}</h3>
        <p class="muted">后续我会把课程页逐步扩展成完整的一天一课内容模板，包括图表、更多代码例子和题解。</p>
        <div class="notice">提示：当前网站是第一版骨架，重点先搭结构和交互，不追求一开始就全量内容。</div>
      </aside>
    </div>
  `;
}

function renderPractice() {
  const lesson = courseData.lessons.find(l => l.id === state.todayLessonId);
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
              <button class="toggle-btn" data-toggle="${exercise.id}">显示提示 / 思路</button>
              <button class="small-btn mark-ex-done" data-ex="${exercise.id}">${done ? '已完成 ✓' : '标记完成'}</button>
            </div>
            <div class="exercise-answer" id="${exercise.id}">
              <p><strong>提示：</strong>${exercise.hint}</p>
              <p><strong>参考思路：</strong>${exercise.answer}</p>
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
  document.getElementById('view-progress').innerHTML = `
    <section class="panel">
      <p class="kicker">学习进度</p>
      <h3>第一版先用本地浏览器存进度</h3>
      <div class="progress-bar"><div class="progress-fill" style="width:${ratio}%"></div></div>
      <p class="muted" style="margin-top:12px;">已完成 ${completed} / ${totalLessons} 节课（当前只是首节示例，后面会逐步扩充）</p>
    </section>

    <section class="card-grid" style="margin-top:18px;">
      <article class="stat-card"><h3>今日课程</h3><strong>${state.completedLessons.includes(state.todayLessonId) ? '完成' : '未完成'}</strong><span class="muted">可点击右上角标记已学完</span></article>
      <article class="stat-card"><h3>已完成练习</h3><strong>${state.completedExercises.length}</strong><span class="muted">当前按浏览器本地存储记录</span></article>
      <article class="stat-card"><h3>下一步</h3><strong>Day 2–7</strong><span class="muted">接入更多正文、题解、术语与进度统计</span></article>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll('.nav-link').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
  document.getElementById('mark-today-complete').addEventListener('click', () => {
    if (!state.completedLessons.includes(state.todayLessonId)) state.completedLessons.push(state.todayLessonId);
    persist();
    renderAll();
  });
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
      const id = exBtn.dataset.ex;
      if (!state.completedExercises.includes(id)) state.completedExercises.push(id);
      persist();
      renderPractice();
      bindEvents();
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
renderAll();
bindEvents();
