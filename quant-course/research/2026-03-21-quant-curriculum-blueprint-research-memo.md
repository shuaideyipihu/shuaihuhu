# Quant Finance Self-Study Curriculum Blueprint — Research Memo

Date: 2026-03-21  
Scope: beginner → intermediate self-study website for rigorous quant finance education  
Goal: recommend a curriculum that is intellectually honest, practically useful, and anchored in standard finance + statistics + coding rather than "get-rich-quick quant" content.

## Executive summary

- The cleanest backbone is **Finance first, then statistics/time series, then backtesting and portfolio construction, then instruments and execution**. Most weak quant curricula reverse this and start with strategy gimmicks.
- For a beginner-to-intermediate audience, the best architecture is a **three-layer stack**: **(1) market/asset-pricing literacy**, **(2) empirical/data workflow**, **(3) research-to-deployment discipline**.
- The strongest source line is a blended canon: **Bodie/Kane/Marcus (investments + portfolio thinking)**, **Tsay (time series and empirical market data behavior)**, **Chan (strategy research workflow and trading implementation realism)**, **Hull (derivatives/risk language)**, plus **Python for Finance / Financial Risk Forecasting in Python** for computation.
- A good website should teach students to produce artifacts: **notebooks, research logs, backtests, diagnostics, and post-mortems**. If learners only consume lessons, they will mistake familiarity for competence.
- The biggest design risk is fluff: overemphasis on alpha stories, AI buzzwords, indicator collections, and unearned confidence before students understand **data quality, transaction costs, overfitting, regime change, and risk sizing**.

---

## 1) Recommended curriculum architecture

## Layer A — Financial foundations (must come first)
Purpose: teach the language of markets before “quant tricks.”

### Module A1. Markets, returns, and compounding
- Prices vs returns
- Arithmetic vs log returns
- Compounding, drawdowns, path dependency
- Benchmarking and excess returns
- Basic market microstructure intuition: bid/ask, spread, liquidity, turnover

### Module A2. Investments and portfolio intuition
Primary anchor: **Bodie, Kane, Marcus — Investments**
- Risk/return tradeoff
- Diversification and covariance
- Portfolio mean/variance intuition
- CAPM as a language model, not as revealed truth
- Factor intuition: market, size, value, momentum, quality, low vol

### Module A3. Fixed income and the term structure
- Time value of money
- Bond math, duration, convexity
- Yield curves and macro sensitivity
- Why bond thinking matters even for equity quants

### Module A4. Derivatives literacy
Primary anchor: **Hull — Options, Futures, and Other Derivatives**
- Forwards/futures/options/swaps at a conceptual level
- Payoff diagrams and replication intuition
- Greeks and hedging language
- Why derivatives are necessary for understanding volatility, leverage, and risk transfer

**Why this layer first:** students who skip this tend to write code without knowing what economic object they are measuring.

---

## Layer B — Quantitative foundations
Purpose: build the minimum mathematics/statistics stack needed for serious market analysis.

### Module B1. Probability and statistical inference for markets
- Random variables, moments, conditional expectation
- Sampling error and estimation uncertainty
- Confidence intervals, hypothesis tests, multiple testing caution
- Heavy tails, skew, kurtosis, outliers

### Module B2. Linear algebra and optimization essentials
- Vectors, matrices, covariance matrices
- Eigen intuition (only as needed)
- Regression as projection
- Constrained optimization basics for portfolios

### Module B3. Econometrics and regression workflow
- OLS intuition and assumptions
- Residual diagnostics
- Multicollinearity, heteroskedasticity, autocorrelation
- Cross-sectional vs time-series regression
- Factor regression and performance attribution

### Module B4. Time series analysis
Primary anchor: **Ruey S. Tsay — Analysis of Financial Time Series**
- Stationarity vs non-stationarity
- Autocorrelation and partial autocorrelation
- AR, MA, ARIMA intuition
- Volatility clustering; GARCH intuition
- Cointegration and mean reversion
- Regime dependence and model instability

**Why this layer here:** this is the point where learners stop treating charts as stories and start treating them as data-generating processes.

---

## Layer C — Data, research, and implementation
Purpose: turn theory into reproducible quant work.

### Module C1. Python research stack
Primary anchor: **Yves Hilpisch — Python for Finance**
Supplement: **Jon Danielsson — Financial Risk Forecasting (Python resources)**
- Python/Jupyter workflow
- NumPy, pandas, plotting
- Reproducibility and notebook hygiene
- Vectorization vs event-driven logic
- Data acquisition, cleaning, corporate actions, survivorship

### Module C2. Market data engineering for self-study quants
- OHLCV vs adjusted close
- Splits/dividends and total-return series
- Point-in-time vs revised/final data
- Universe definition and delistings
- Missing data, timestamp alignment, timezone issues

### Module C3. Backtesting methodology
Primary anchor: **Ernie Chan — Quantitative Trading / Algorithmic Trading / Machine Trading line**
- Signal → position → PnL pipeline
- Transaction costs, slippage, borrow costs, funding costs
- In-sample / validation / out-of-sample splits
- Walk-forward testing
- Turnover, capacity, liquidity constraints
- Benchmarking, t-stats, hit rate vs expectancy

### Module C4. Strategy families (starter set only)
- Trend following / momentum
- Mean reversion
- Cross-sectional ranking
- Simple factor investing
- Pairs / spread concepts only after cointegration prerequisites

### Module C5. Portfolio construction and risk
- Vol targeting
- Position sizing
- Risk budgets
- Correlation breakdowns
- Drawdown control
- Scenario and stress thinking

### Module C6. Execution and live-trading realism
- Market vs limit order intuition
- Fill uncertainty
- Partial fills and latency
- Paper trading vs real trading gap
- Logging, monitoring, and kill-switch mentality

**Why this layer last:** learners should earn the right to backtest by first understanding what can go wrong statistically and economically.

---

## 2) Prerequisite graph

```text
Arithmetic/Algebra
    ├─> Python basics
    ├─> Probability basics
    └─> Time value of money

Probability basics
    ├─> Statistical inference
    ├─> Regression
    └─> Time series

Linear algebra basics
    ├─> Portfolio math
    ├─> Regression
    └─> Optimization

Time value of money
    ├─> Fixed income
    └─> Derivatives basics

Markets/returns/compounding
    ├─> Portfolio theory
    ├─> Performance measurement
    └─> Backtesting metrics

Statistical inference + Regression + Time series
    ├─> Factor research
    ├─> Mean reversion / momentum testing
    ├─> Volatility modeling
    └─> Risk model diagnostics

Python basics + Data engineering
    ├─> Reproducible notebooks
    ├─> Backtest implementation
    └─> Strategy diagnostics

Portfolio theory + Backtesting + Risk
    └─> Portfolio construction
            └─> Paper trading / small-scale deployment
```

### Minimum gateway prerequisites by module
- **Before Bodie/Kane/Marcus:** high-school algebra + basic spreadsheet literacy is enough.
- **Before Tsay:** probability/statistics + regression basics + comfort with returns data.
- **Before Chan:** students should already understand backtest metrics, market data issues, and simple strategy logic.
- **Before Hull:** time value of money + probability + basic calculus comfort helps a lot.
- **Before full portfolio construction:** learners need covariance/regression/factor intuition, not just indicator knowledge.

---

## 3) Recommended module sequence with rationale

## Phase 0. Prep bootcamp (2–3 weeks)
- Python, Jupyter, pandas, plotting, git/versioning, research logs
- Goal: remove tooling friction early

**Rationale:** if students cannot load data cleanly and save reproducible work, every later lesson becomes fake understanding.

## Phase 1. Market and investment foundations (4–6 weeks)
- Returns, compounding, drawdowns
- Diversification, portfolio intuition
- CAPM/factor language
- Intro fixed income and derivatives vocabulary

**Rationale:** this creates economic context. Students learn what they are trying to explain, rank, hedge, or optimize.

## Phase 2. Statistical reasoning for financial data (4–6 weeks)
- Estimation error
- Regression
- Time series structure
- Volatility clustering and non-normality

**Rationale:** this is where "quant" becomes a discipline instead of chart interpretation.

## Phase 3. Data engineering + backtesting discipline (4–6 weeks)
- Data cleaning
- Corporate actions
- Universe design
- Backtest engine logic
- Cost modeling and out-of-sample testing

**Rationale:** many learners prematurely jump to strategies; they should first learn why most naive backtests lie.

## Phase 4. Core strategy families (6–8 weeks)
- Trend, momentum, mean reversion, factor ranking
- Each strategy must be tied to an explicit economic/statistical rationale

**Rationale:** strategy exposure should come after students know how to reject bad evidence.

## Phase 5. Portfolio construction and risk (4–6 weeks)
- Vol targeting, correlation, exposure control, concentration, drawdown management

**Rationale:** strategy edges matter less than portfolio construction once multiple signals interact.

## Phase 6. Instruments and extensions (ongoing)
- Futures, options, volatility products, crypto microstructure differences
- More advanced time series / ML only after baseline competence

**Rationale:** derivatives and ML are force multipliers; they amplify mistakes if introduced too early.

---

## 4) Daily lesson template elements

A rigorous self-study lesson should be short enough to complete in one sitting but structured enough to build research habits.

## Recommended lesson template
1. **Lesson objective (1–3 bullets)**
   - What the learner should be able to explain or compute after the lesson.
2. **Why this matters in quant practice**
   - One paragraph linking concept → research workflow.
3. **Core concept explanation**
   - Intuition first, formalism second.
4. **Minimal math section**
   - Only the equations needed; define all symbols.
5. **Worked market example**
   - Use a small real or realistic dataset.
6. **Python implementation**
   - Clean, runnable notebook cell sequence.
7. **Diagnostic interpretation**
   - What should the learner look for in outputs/plots?
8. **Common failure modes / misconceptions**
   - Example: confusing correlation with predictability.
9. **Checkpoint questions**
   - 3–5 concept checks.
10. **Practice task**
   - One coding task, one interpretation task.
11. **Research habit artifact**
   - Require a short note: hypothesis, assumptions, result, caveat.
12. **Next-link preview**
   - How today’s lesson feeds tomorrow’s lesson.

## Required recurring artifacts
- A **lesson notebook**
- A **1-paragraph research log entry**
- A **glossary card** for new terms
- A **mistake checklist** updated when the student gets fooled by data or code

## Suggested pacing rule
- 60–90 minutes total per daily lesson
- 20% concept, 30% coding, 20% interpretation, 20% exercises, 10% logging/recap

---

## 5) Textbook / video / source mapping

Below is the recommended source map by role, not by “read cover to cover in order.”

| Topic | Primary source | Role in curriculum | How to use it |
|---|---|---|---|
| Investments, portfolios, market language | **Bodie, Kane, Marcus — Investments** | Foundation text | Core reading in early phases; select chapters on returns, risk, portfolio theory, market efficiency, factor intuition |
| Time series and empirical finance | **Tsay — Analysis of Financial Time Series** | Main intermediate quant/statistics text | Use after basic stats/regression; not for day 1; mine for ARIMA/GARCH/cointegration/diagnostics |
| Trading strategy workflow and practical realism | **Ernie Chan book line + blog** | Bridge from research to implementation | Use for strategy examples, backtest realism, execution caveats; do not use as first finance text |
| Derivatives and risk transfer | **Hull — Options, Futures, and Other Derivatives** | Standard derivatives reference | Use selected chapters for vocabulary, arbitrage logic, options/futures structure, Greeks |
| Python computational workflow | **Yves Hilpisch — Python for Finance (2e)** | Coding implementation text | Use for notebooks, analytics patterns, Monte Carlo / valuation exposure, Pythonic finance workflow |
| Market risk forecasting | **Jon Danielsson — Financial Risk Forecasting** + Python resources | Risk-focused implementation supplement | Use for VaR/ES, volatility/risk workflows, code-backed exercises |
| Structured university finance context | **MIT OCW 15.401 Finance Theory I (Andrew Lo)** | Syllabus-level sequencing benchmark | Use to validate that early curriculum emphasizes capital markets, valuation, diversification, fixed income, and financial economics |

## Suggested website source policy
- **One primary text per module**
- **One implementation source**
- **One optional lecture/video source**
- Avoid assigning 5+ overlapping texts for the same week.

## Practical mapping by phase

### Phase 1
- Bodie/Kane/Marcus chapters as anchor
- MIT OCW finance lectures/notes for pacing and structure

### Phase 2
- Intro stats/econometrics notes, then Tsay selections
- Use short custom notes before assigning full Tsay sections; Tsay is rigorous but not beginner-friendly enough as a first exposure

### Phase 3
- Python for Finance + custom data-cleaning lessons
- Danielsson Python resources for risk-oriented coding examples

### Phase 4
- Chan for strategy examples and implementation discipline
- Pair each strategy lesson with a “why this might fail” companion note

### Phase 5
- Bodie/Kane/Marcus portfolio sections + Danielsson risk modules + custom portfolio construction notebooks

### Phase 6
- Hull selections for derivatives
- Optional advanced branches into volatility, futures curve structure, and portfolio overlays

---

## 6) Pitfalls to avoid in “fluffy” quant education

## The common failure patterns

### 1. Starting with strategies instead of foundations
Bad version:
- Day 1 RSI
- Day 2 MACD
- Day 3 ChatGPT stock bot

Why this fails:
- Learners never build an economic/statistical filter for nonsense.

### 2. Treating backtests as evidence instead of as noisy experiments
Bad version:
- Show one equity curve and infer edge.

Correct stance:
- A backtest is an **argument under assumptions**, not proof.

### 3. Ignoring data construction
Bad version:
- Use adjusted close without explaining it.
- Rank stocks with a universe containing future survivors only.

Correct stance:
- The data pipeline is part of the model.

### 4. Overusing machine learning too early
Bad version:
- Introduce LSTMs, transformers, or RL before learners can explain OLS, autocorrelation, or overfitting.

Correct stance:
- Classical baselines first. If a student cannot beat or interpret a simple baseline, ML adds theater, not skill.

### 5. Confusing indicator familiarity with research ability
Bad version:
- Learners memorize 20 indicators.

Correct stance:
- They should learn to formulate hypotheses, define signals precisely, and falsify weak ideas.

### 6. Hiding risk and implementation friction
Bad version:
- No slippage, no commissions, no borrow fees, no liquidity constraints.

Correct stance:
- Every live strategy lesson should mention what can break between notebook and market.

### 7. Promising profitability
Bad version:
- “Complete this course and build a profitable bot.”

Correct stance:
- Promise competence in research workflow, not alpha.

### 8. Making the curriculum too mathematically decorative
Bad version:
- Dense formulas that do not connect to actual research decisions.

Correct stance:
- Every formula should answer: what decision does this improve?

### 9. Teaching Sharpe ratio as the only scoreboard
Corrective principle:
- Include drawdown, turnover, capacity, path quality, exposure concentration, and regime sensitivity.

### 10. No error journal / no post-mortems
Corrective principle:
- Learners should systematically document bad assumptions, code bugs, and broken hypotheses.

---

## Strong curriculum design principles for this website

- **Finance is not optional.** Quant is applied finance with data and code.
- **Empirics before bravado.** Teach measurement and error bars before prediction stories.
- **Artifacts over vibes.** Every module should produce notebooks, diagnostics, and written conclusions.
- **Reality over elegance.** Simple strategies with realistic cost modeling beat sophisticated fantasy.
- **Sequence matters.** Bodie/Kane/Marcus before Chan; basic stats before Tsay; foundations before Hull-heavy details.

---

## Recommended final curriculum skeleton for the website

1. Setup and research workflow  
2. Market language, returns, compounding  
3. Risk, diversification, portfolio basics  
4. Fixed income essentials  
5. Derivatives vocabulary and payoff logic  
6. Probability and inference for markets  
7. Regression and empirical finance basics  
8. Time series foundations  
9. Python market-data workflow  
10. Backtesting methodology  
11. Core strategy families  
12. Portfolio construction and risk budgeting  
13. Execution realism and live-trading gap  
14. Advanced branches: futures/options/volatility/ML (optional)  
15. Capstone: end-to-end research project  

This order is conservative on purpose. It lowers false confidence and raises the probability that students can eventually do real independent work.

---

## Notes on source quality and confidence

### High-confidence anchors
- **MIT OCW 15.401 Finance Theory I**: confirms that a serious introductory finance sequence emphasizes capital markets, investments, valuation, fixed income, and diversification before “quant tricks.”
- **O’Reilly page for Python for Finance (2e)**: confirms book scope and practical Python orientation.
- **Jon Danielsson’s Financial Risk Forecasting site**: confirms active Python-supported risk resources, slides, code, and seminar structure.
- **Ernie Chan’s blog**: confirms his positioning is practical trading/asset-management oriented, and notably warns against fantasy uses of GenAI.

### Medium-confidence / canonical references used as standard domain anchors
- **Bodie/Kane/Marcus, Tsay, Hull** are standard canonical texts in investments, financial time series, and derivatives respectively; even where official product pages were noisy/unreliable via fetch, their curricular role is stable and widely accepted.

---

## Verified source links consulted
- MIT OCW — Finance Theory I: https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/
- O’Reilly — Python for Finance, 2nd Edition: https://www.oreilly.com/library/view/python-for-finance/9781492024323/
- Jon Danielsson — Financial Risk Forecasting: https://financialriskforecasting.com/
- Ernie Chan blog: https://epchan.blogspot.com/

## Recommended next research step
If the site owner wants the next layer of specificity, the next useful artifact would be a **12-week syllabus table** mapping each week to:
- lesson objectives,
- assigned reading sections,
- notebook exercises,
- terminology cards,
- one “pitfall of the week,”
- and one capstone milestone.
