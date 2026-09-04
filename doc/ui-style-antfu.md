# antfu.me 风格拆解（用于 cloud-mail 主题改造）

参照源：`D:\dev\antfu-co1dsand`（antfu.me 的 fork）
目标：`D:\dev\cloud-mail\mail-vue`

## 技术栈差异（决定了哪些能直接搬）

| | 参照源 | cloud-mail |
|---|---|---|
| 样式方案 | UnoCSS（presetWind3 + Attributify + Icons） | 原生 CSS/SCSS + Element Plus 变量 |
| 组件库 | 无，全手写 | Element Plus 2.13 |
| 暗色 | `html.dark` + `useDark()` | `html.dark` + `store/ui.js` |
| 主题切换动画 | View Transition + circle clip-path | 已有同款实现（`style.css:174-212`） |
| 图标 | UnoCSS presetIcons，`i-ri-*` | `@iconify/vue`，多套混用 |

暗色开关机制和主题切换动画两边是一致的，改造不用动这层。真正要换的是颜色系统、
层级表达方式和动效语言这三块。

## 一、五条核心原则

1. **色彩靠透明度，不靠色板。** 全站主色调只有黑、白、一个中性灰 `#888`。所有层级
   差异用 opacity 和 alpha 通道叠出来，不是准备五档灰色变量。
2. **一个边框值走通明暗两套。** `border-base` = `border-[#8884]`，即
   `rgba(136,136,136,0.27)`。灰色在白底上偏深、在黑底上偏浅，同一个值天然成立，
   于是不需要 `--light-border` / `--dark-border` 两套值。
3. **不用卡片。** 没有容器边框、没有背景填充分层、没有阴影。内容直接落在页面背景上，
   靠留白和字号分区。阴影全站只出现在 tooltip / dropdown 上。
4. **入场动画是签名。** `slide-enter` 上移淡入 + 级联延迟，几乎每个列表和标题都挂。
5. **hover 只有两种反馈。** 透明度升到 100，或浮起一层 `#88888811` 的背景。没有位移、
   没有缩放、没有变色。

## 二、颜色系统

### 页面级（`src/styles/main.css`）

```css
:root {
  --c-bg: #fff;
  --c-scrollbar: #eee;
  --c-scrollbar-hover: #bbb;
  color-scheme: light dark;
}
html.dark {
  --c-bg: #050505;        /* 不是纯黑，抬起 5 点 */
  --c-scrollbar: #111;
  --c-scrollbar-hover: #222;
  color-scheme: dark;
}
::selection { background: #8884; }
```

正文颜色在 `<body>` 上给：`text-gray-700 dark:text-gray-200`，不是纯黑纯白。

### 内容级（`src/styles/markdown.css`）

四档前景色，靠 `--fg-*` 命名深浅，明暗两套镜像：

```css
.prose {
  --fg-light: #888;   /* 辅助信息 */
  --fg: #555;         /* 正文 */
  --fg-deep: #222;    /* 强调、加粗、h2 */
  --fg-deeper: #000;  /* h1、链接 */
}
html.dark .prose {
  --fg-light: #888;   /* 中性灰不翻转 */
  --fg: #bbb;
  --fg-deep: #ddd;
  --fg-deeper: #fff;
}
```

`--fg-light` 明暗同值，这是整套配色的支点：中性灰不需要翻转。

### 强调色

只在 hover 时出现，平时不占位。`btn-blue` 平时是 op50 + 灰边框，hover 才亮出蓝色文字
和 `bg-blue/10` 背景。品牌色不做主视觉，做交互反馈。

### 灰阶速查

| 值 | 用途 |
|---|---|
| `#8881` | 代码高亮行背景、极淡填充 |
| `#8882` | magic-link 背景、表格分隔线 |
| `#8883` | magic-link hover、按钮 hover 背景 |
| `#8884` | 通用边框、选中文字背景 |
| `#8885` | 高亮词边框 |
| `#88888811` | 卡片 hover 浮起 |
| `#888` | 中性灰基准、进度条 |

## 三、字体

```ts
presetWebFonts({
  fonts: {
    sans: 'Inter',              // 正文
    mono: 'DM Mono',            // 代码、装饰性 CLI 文本
    condensed: 'Roboto Condensed',  // magic-link 等紧凑标签
    wisper: 'Bad Script',       // 手写点缀
  },
  processors: createLocalFontProcessor(),  // 字体本地化，不打外部请求
})
```

代码块字体栈：`'DM Mono', 'Input Mono', 'Fira Code', monospace`。

排版规格（`prose.css`）：正文 `1rem / 1.75`，宽度上限 `65ch`。h1 `2.25em / 800`，
h2 `1.5em / 700`，h3 `1.25em / 600 + op70`，h6 大写 + `letter-spacing: 2px` + op50。

有个细节值得抄：`em` 被重定义成衬线体 + 加深色 + `1.05em`，斜体成了视觉重音而非单纯倾斜。

## 四、透明度层级表

这是整套设计里最该照搬的一张表。层级不靠颜色变量，靠固定的几档 opacity：

| 档位 | 语义 | 出现位置 |
|---|---|---|
| `op100` | 激活、hover 终态 | 当前导航项、hover 后 |
| `op75` | 次要但需可读 | 图标前缀、TOC 链接 |
| `op60` | 导航常态 | `.nav a`、`a.item` |
| `op50` | 元信息 | 日期、时长、footer、副标题、按钮常态 |
| `op40` | 更弱的元信息 | 平台名、地点 |
| `op35` / `op20` | 装饰文字 | 年份大字（明/暗） |
| `op30` → `op0` | 条件显隐 | 回顶按钮（滚动 300px 前后） |
| `op20` → `op50` | 未激活可点 | SubNav 非当前项及其 hover |
| `op10` | 极淡装饰 | 文章列表年份描边字 |

## 五、动效

### slide-enter：签名动画

```css
@keyframes slide-enter {
  0%  { translate: 0 10px; opacity: 0; }
  to  { translate: 0 0;    opacity: 1; }
}
```

上移 10px 淡入，`animation: slide-enter 1s both 1`。级联通过三个变量控制：

```css
--enter-stage: 0;      /* 第几个，由 JS 或 nth-child 给 */
--enter-step: 90ms;    /* 每级间隔，列表里常压到 60ms */
--enter-initial: 0ms;  /* 整体起始延迟 */
animation-delay: calc(var(--enter-initial) + var(--enter-stage) * var(--enter-step));
```

三种挂法：`slide-enter-content` 父容器自动给子元素编号（CSS 预置 1-20 档）；
`slide-enter` + 内联 `--enter-stage` 手动指定（列表用这种）；`slide-enter-50` 这类
UnoCSS 动态规则。整段包在 `@media (prefers-reduced-motion: no-preference)` 里，
并留了 `html.no-sliding` 全局逃生阀。

### 过渡时长

| 时长 | 场景 |
|---|---|
| 0.2s ease | 导航 opacity、fade、`a.item` |
| 0.3s | 链接下边框 |
| 400ms | 主题切换 clip-path、TOC 锚点 |
| 500ms | 代码高亮行背景 |
| 700ms | TOC 展开 |

## 六、组件模式

### shortcuts（`unocss.config.ts`）

```ts
shortcuts: [
  {
    'bg-base': 'bg-white dark:bg-black',
    'color-base': 'text-black dark:text-white',
    'border-base': 'border-[#8884]',
  },
  [/^btn-(\w+)$/, ([_, color]) =>
    `op50 px2.5 py1 transition-all duration-200 ease-out no-underline!
     hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
]
```

三个 base shortcut 是整套主题的原语。cloud-mail 应该建立对应的三个 CSS 变量。

### 导航

`.nav a` 常态 op60，hover op100，`color: inherit`，无下划线，`transition: opacity 0.2s ease`。
右侧用 `grid-auto-flow: column` + `grid-gap: 1.2rem`。窄屏文字换图标（`lt-md:hidden`
配 `md:hidden`），不做汉堡菜单。

### 链接

正文链接不用颜色区分，用 `border-bottom: 1px solid rgba(125,125,125,0.3)`，hover 时
边框变成 `var(--fg)`。列表项链接（`a.item`）反过来：强制去掉下边框，只用 op60→op100。

### 卡片（项目网格）

```css
.project-grid a.item {
  background: transparent;
  padding: 0.5rem 0.875rem 0.875rem;
  border-radius: 6px;
}
.project-grid a.item:hover { background: #88888811; }
```

无边框无阴影，只在 hover 浮起一层几乎看不见的灰。圆角 6px。

### 装饰性大字

分组标题（年份、分类名）用超大号描边空心字压在内容后面：

```html
<span text-8em color-transparent absolute left--3rem top--2rem
      font-bold text-stroke-2 text-stroke-hex-aaa op10>2026</span>
```

容器 `select-none pointer-events-none`，纯装饰不干扰交互。

### 滚动条

6px 宽，圆角 10px，track 用 `--c-bg` 融进背景，thumb 用 `--c-scrollbar`，hover 加深。
同时给 `scrollbar-color` 兼容 Firefox。

### 回顶按钮

`fixed right-3 bottom-3 w-10 h-10 rounded-full`，`hover-bg-hex-8883`，
滚动超 300px 才 `op30`，否则 `op0! pointer-events-none`。`print:hidden`。

### 浮层

全站唯一用阴影的地方：`box-shadow: 0 6px 30px #0000001a`，配
`bg-base color-base rounded border border-base`。

## 七、映射到 cloud-mail

现状：Element Plus 后台风格 —— 深蓝侧栏 `#001529`、Ant Design 主色 `#1890ff`、
八九个具名灰色变量、多处阴影（`--aside-right-border: 3px 0 5px rgba(0,21,41,.35)`）。
这和参照源是两种取向，改造清单：

### 变量收敛

`style.css` 里这些值可以塌缩成 alpha 灰：

| 现有变量 | 建议 |
|---|---|
| `--light-border` / `--dark-border` / `--light-border-color` / `--base-border-color` | 统一成一个 `rgba(136,136,136,0.27)`，明暗共用 |
| `--aside-backgound: #001529` | 改为跟随 `--el-bg-color`，侧栏靠右边框分隔而非深色块 |
| `--aside-right-border`（阴影） | 换成 1px 边框 |
| `--regular-text-color` / `--secondary-text-color` / `--form-desc-color` | 换成正文色 + opacity 档位 |
| `--email-hover-background: #F2F6FC` | 换成 `#88888811`，明暗共用 |
| `--extra-light-fill` / `--light-ill` / `--base-fill` | 参照源没有填充分层，能删则删 |

### 主色降级

`--el-color-primary: #1890ff` 从主视觉降为交互反馈色：选中态、hover 文字色、
`primary/10` 背景。侧栏激活项不再用实心蓝块，改成文字变主色 + 淡背景。

### 需要新增

- 三个原语变量：`--bg-base` / `--color-base` / `--border-base`
- `slide-enter` 关键帧 + 级联变量，挂到邮件列表项和页面标题上
- Inter + DM Mono 字体（现在 `body` 是系统字体栈，`--mono` 缺失）
- 统一圆角：参照源只用 4px（rounded）和 6px 两档

### 不建议照搬

- `65ch` 正文宽度限制 —— 邮件客户端是双栏/三栏布局，不是阅读页
- 装饰性描边大字 —— 后台工具里会显得吵
- ArtPlum / ArtDots 背景生成艺术
- 去掉全部容器边界 —— 邮件列表和详情区需要明确的分栏边界，这里应保留边框，
  只是把边框值换成中性灰

### 可以直接复用的

主题切换的 View Transition 已经在 `style.css:174-212` 实现好了，参照源那套
`toggleDark` 的 `endRadius` 算法（`Math.hypot(max(x, innerWidth-x), max(y, innerHeight-y))`）
可以核对一下 cloud-mail 的 `--vt-end-radius` 是否等价。

## 八、主题包机制（已实现）

配色不再写在 `style.css` 里，而是收进主题包。`src/theme/`：

```
theme/
  index.js            引擎：applyTheme / initTheme / getPackList
  packs/
    antfu.js          极简（本文档的配色取向）← 全局默认
    antfu.css         该包的附加样式，用 className 作用域
    default.js        经典蓝（= 改造前的配色，逐值照搬）
```

**全局默认是「极简」（antfu）。** 默认由 `theme/index.js` 里 `packs` 数组的
第一项决定，`DEFAULT_THEME_ID` 和 `getPack` 的兜底都从它派生。换默认只需调整
数组顺序，但要同步这两处兜底值，否则首屏会闪一下旧配色：

- `style.css` 的兜底 `:root` —— 取新默认包的**浅色**段
- `index.html` 的 `html.dark` fallback 底色、静态 `theme-color` meta、
  预涂色脚本无缓存分支里的暗色值

已经显式选过其他主题的用户不受影响 —— `initTheme` 读到存量 `themeId` 就照它走，
只有没存过选择的用户（含主题功能上线前的老用户）才会落到新默认。

主题包是一个普通 JS 对象，`light` / `dark` 两段结构相同：

| 字段 | 作用 |
|---|---|
| `id` | 唯一标识，存在 `uiStore.themeId` |
| `name` | `{ zh, en }`，选择器里跟界面语言走 |
| `className` | 可选。需要附带 CSS 时用它做作用域 |
| `<mode>.meta` | `theme-color` meta 值，分 desktop / mobile |
| `<mode>.vars` | CSS 变量表，主体 |
| `<mode>.editor` | tinymce 在 iframe 里拿不到外层变量，显式给 |
| `<mode>.chart` | echarts 是 canvas，同样吃不到 CSS 变量 |

变量以 inline style 写在 `documentElement` 上，优先级高于 element-plus 的
`dark/css-vars.css`，所以主题包能盖掉 EP 暗色默认值而不需要满地 `!important`。
切换时先按「所有包声明过的变量名并集」清场，再写入新值，避免上一个包设过、
新包没声明的变量残留。

### 加一个主题包

1. 复制 `packs/default.js`（字段最全，适合当模板），改 `id` / `name` 和配色
2. 在 `theme/index.js` 的 `packs` 数组里 import 进来 —— 放第一位即成为默认
3. 变量表达不了的东西（圆角、滚动条尺寸、去阴影）另附一份 CSS，
   给包加 `className`，在 `theme/index.js` 里静态 import 那个 CSS

只要 `vars` 的字段覆盖到 `default.js` 的同名项，切过去就不会留空。

### 明暗与主题是两个维度

header 的日月按钮只切 `dark`，设置页的选择器只切 `themeId`，互不干扰 ——
每个包自带 light / dark 两套。两个入口都走 `uiStore` 的 `setDark` / `setTheme`，
它们再调 `applyTheme`。原有的 View Transition 径向切换保持不变。

### 首屏预涂色

`applyTheme` 每次会把解析好的变量写进 `localStorage` 的 `theme-vars`，
`index.html` 顶部的内联脚本在 bundle 加载前读它并刷上，避免首屏闪白/闪黑。
加新包不用管这块，机制是通用的。

### 遗留的硬编码

这些地方的颜色还写死在组件里，不受主题包控制，后续要接就照 aside 的做法提成变量：

- `views/login/index.vue` 的装饰色块与 `box-shadow: 0 8px 5px rgba(0,0,0,.1)`
- `views/reg-key/index.vue:540` 的 `rgba(100,121,143,.12)` 内阴影
- 邮件列表的状态图标色（`#3CB2FF` / `#F56C6C` / `#51C76B` / `#FBBD08` 等）

## 九、关键文件索引

### 参照源（`D:\dev\antfu-co1dsand`）

| 文件 | 内容 |
|---|---|
| `unocss.config.ts` | shortcuts、字体、图标 preset |
| `src/styles/main.css` | 页面变量、滚动条、slide-enter、View Transition、浮层覆写 |
| `src/styles/markdown.css` | `--fg-*` 四档前景色、链接、TOC、magic-link |
| `src/styles/prose.css` | 排版规格 |
| `index.html` | 首屏防闪烁脚本、`theme-color`、body 字体类 |
| `src/logics/index.ts` | `toggleDark` + View Transition 实现 |
| `src/components/NavBar.vue` | 导航 opacity 模式、回顶按钮 |
| `src/components/ListPosts.vue` | 级联入场、装饰大字、元信息层级 |
| `src/components/ListProjects.vue` | 卡片 hover 模式 |

### 本项目（`mail-vue/`）

主题包机制涉及的文件，改动原因见第八节。

| 文件 | 角色 |
|---|---|
| `src/theme/index.js` | 引擎。`applyTheme` / `initTheme` / `getPackList` / `hasPack` |
| `src/theme/packs/default.js` | 经典蓝包，逐值照搬改造前配色（非默认） |
| `src/theme/packs/antfu.js` | 极简包，**全局默认**（`packs` 数组第一项） |
| `src/theme/packs/antfu.css` | 极简包的附加样式，`html.theme-antfu` 作用域 |
| `src/store/ui.js` | `themeId` 状态、`setTheme` / `setDark`、`themeMode` getter、`afterHydrate` 自愈 |
| `src/main.js` | `initTheme()`，必须在 `app.mount` 前、`init()` 网络请求前 |
| `index.html` | 预涂色脚本读 `theme-vars`；遮罩底色改为 `var(--el-bg-color, …)` |
| `src/style.css` | 颜色变量已迁出，只留兜底 `:root`（须与默认包浅色段一致）与结构性样式 |
| `src/layout/header/index.vue` | 日月按钮改走 `uiStore.setDark`，View Transition 不变 |
| `src/layout/aside/index.vue` | 写死的白字/蓝渐变提成 `--aside-*` 变量 |
| `src/views/setting/index.vue` | 主题选择器 |
| `src/components/tiny-editor/index.vue` | skin / content_css 从包的 `editor` 段取，`themeId` 变化时重建 |
| `src/views/analysis/index.vue` | 图表配色从包的 `chart` 段取，主题指纹变化时重绘 |

