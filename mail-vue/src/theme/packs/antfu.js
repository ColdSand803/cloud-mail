/**
 * antfu 风格主题包 —— 参照 antfu.me 的配色取向，详见 doc/ui-style-antfu.md。
 *
 * 三条原则：
 *  1. 边框只用一个中性灰 rgba(136,136,136,.27)，明暗两套共用同一个值
 *  2. 不做背景分层、不做阴影，侧栏与正文同底，靠 1px 边框分隔
 *  3. 主色降级为交互反馈色，不做主视觉（侧栏激活项是淡背景 + 主色文字）
 */

// 中性灰：白底偏深、黑底偏浅，同一个值天然成立
const HAIRLINE = 'rgba(136, 136, 136, 0.27)'
const FILL_HOVER = 'rgba(136, 136, 136, 0.07)'
const FILL_ACTIVE = 'rgba(136, 136, 136, 0.15)'

/**
 * 中性灰阶 —— 严格零饱和（R=G=B），全站没有任何色相。
 *
 * 为什么不用 tailwind 的 gray 族：那一族是「冷灰」，掺了蓝
 * （#374151 的 R/B 差 26，约 10% 饱和度）。既然要的是黑白，
 * 就用真正的等值灰，免得在大面积色块上又泛出蓝味。
 */
const GRAY = {
    0: '#ffffff',
    50: '#f5f5f5',
    100: '#e5e5e5',
    200: '#d4d4d4',
    300: '#a3a3a3',
    400: '#8c8c8c',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0e0e0e',
    1000: '#050505',
}

/**
 * 主色是灰阶里最深的一档 —— 主色不做主视觉，只作交互反馈，
 * 这是「极简」的核心。
 */
const primaryLight = {
    '--el-color-primary': GRAY[900],
    '--el-color-primary-dark-2': '#000000',
    '--el-color-primary-light-3': GRAY[700],
    '--el-color-primary-light-5': GRAY[500],
    '--el-color-primary-light-7': GRAY[300],
    '--el-color-primary-light-9': GRAY[50],
}

/**
 * 暗色主色取亮灰而非暗灰：它除了当按钮底色，还要当前景色用
 * （分析页图标、light 版 tag、plain 按钮，都是 primary 色压在 light-9 底上）。
 * 若取暗灰，作前景时在任何暗底上都到不了 AA —— 即使纯黑底也只有 2.7:1，
 * 数学上无解。
 *
 * 代价是 primary 实底上的白字会失效，由 antfu.css 里那组限定选择器
 * 翻成深色文字，作用域只覆盖 primary 类组件，不碰 danger/success/warning。
 */
const primaryDark = {
    '--el-color-primary': GRAY[200],
    '--el-color-primary-dark-2': GRAY[100],
    '--el-color-primary-light-3': GRAY[300],
    '--el-color-primary-light-5': GRAY[500],
    '--el-color-primary-light-7': GRAY[600],
    '--el-color-primary-light-9': GRAY[800],
    // switch 滑块固定是白色，开启态底色若跟着主色变亮滑块就没了，单独压暗
    '--el-switch-on-color': GRAY[600],
}

// 明暗共用的部分
const shared = {
    '--light-border': HAIRLINE,
    '--dark-border': HAIRLINE,
    '--light-border-color': HAIRLINE,
    '--base-border-color': HAIRLINE,
    '--el-border-color': HAIRLINE,
    '--el-border-color-light': HAIRLINE,
    '--el-border-color-lighter': HAIRLINE,
    '--email-hover-background': FILL_HOVER,
    // 右键选中态要能和 hover 区分，用重一档的中性灰
    '--email-right-click-background': FILL_ACTIVE,
    '--aside-item-hover': FILL_HOVER,
    '--header-actions-border': `inset 0 -1px 0 0 ${HAIRLINE}`,
    // 侧栏不再是深色块，用右边框代替投影
    '--aside-right-border': `inset -1px 0 0 0 ${HAIRLINE}`,
    '--aside-title-background': 'transparent',
    '--el-text-color-regular': 'var(--el-text-color-primary)',
    '--login-border': `1px solid ${HAIRLINE}`,
    // 全站唯一的阴影，只给浮层
    '--el-box-shadow-light': '0 6px 30px rgba(0, 0, 0, 0.1)',
}

export default {
    id: 'antfu',
    name: { zh: '极简', en: 'Minimal' },
    // 主题包可以带自己的 CSS，用这个类名做作用域，见 theme/packs/antfu.css
    className: 'theme-antfu',

    light: {
        meta: { desktop: '#FFFFFF', mobile: '#FFFFFF' },
        vars: {
            ...shared,
            ...primaryLight,
            '--el-bg-color': GRAY[0],
            '--el-bg-color-page': GRAY[0],
            '--el-bg-color-overlay': GRAY[0],
            '--el-fill-color-blank': GRAY[0],
            '--el-text-color-primary': GRAY[700],
            '--extra-light-fill': GRAY[0],
            '--light-ill': FILL_HOVER,
            '--base-fill': FILL_HOVER,
            '--loadding-background': 'rgba(255, 255, 255, 0.8)',
            '--regular-text-color': GRAY[600],
            // 参照源用的 #888 在白底上只有 3.54:1，压一档换来 4.83:1
            '--secondary-text-color': GRAY[500],
            '--form-desc-color': GRAY[500],
            '--email-scroll-content-color': 'rgba(82, 82, 82, 0.55)',
            '--choose-account-background': FILL_HOVER,
            '--login-switch-color': GRAY[900],
            // 这个变量名叫 track，实际给的是滑块（见 antfu.css）。
            // 滑块是自绘 UI 组件，要过 WCAG 1.4.11 的 3:1，取刚好达标的档
            '--scrollbar-track-color': GRAY[400],
            '--message-block-color': 'rgba(0, 0, 0, 0)',
            '--aside-backgound': GRAY[0],
            '--aside-text-color': GRAY[600],
            // 侧栏激活项：文字加深 + 中性灰底，不用色彩区分
            '--aside-active-text-color': GRAY[900],
            '--aside-item-active': FILL_ACTIVE,
            '--aside-title-color': GRAY[700],
            // 登录页的天空与云：原本写死成蓝天白云，且切暗色不跟着变。
            // 搬到主题包后极简用中性灰、经典蓝保留原样，顺带补上暗色适配
            '--login-sky': `linear-gradient(to bottom, ${GRAY[100]}, ${GRAY[50]}, ${GRAY[0]})`,
            '--login-cloud': `linear-gradient(to bottom, ${GRAY[0]} 5%, ${GRAY[50]} 100%)`,
            '--login-cloud-solid': GRAY[0],
            '--login-cloud-shadow': '0 8px 5px rgba(0, 0, 0, 0.06)',
            // 写信按钮：原本是蓝色渐变球，极简里改成主色实底
            '--writer-background': GRAY[900],
            '--writer-text-color': GRAY[0],
        },
        editor: {
            skin: 'oxide',
            contentCss: 'default',
            scrollbarTrack: GRAY[0],
            scrollbarThumb: GRAY[400],
        },
        chart: {
            color: GRAY[700],
            background: GRAY[0],
            borderColor: GRAY[0],
            scaleLineColor: GRAY[200],
            crossColor: GRAY[400],
            axisColor: GRAY[400],
            splitLineColor: 'rgba(136, 136, 136, 0.2)',
            gaugeSplitLine: GRAY[600],
            containerBackground: 'rgba(136, 136, 136, 0.15)',
            // 分类系列色：没有色相可用，只能靠明度拉开层级，从深到浅
            series: [GRAY[900], GRAY[700], GRAY[500], GRAY[400], GRAY[300], GRAY[200]],
            // 单系列图（仪表盘、折线）用最深一档
            accent: GRAY[900],
        },
    },

    dark: {
        meta: { desktop: '#050505', mobile: '#050505' },
        vars: {
            ...shared,
            ...primaryDark,
            // antfu 的暗色底不是纯黑，抬起 5 点
            '--el-bg-color': GRAY[1000],
            '--el-bg-color-page': GRAY[1000],
            '--el-bg-color-overlay': GRAY[950],
            '--el-fill-color-blank': GRAY[1000],
            '--el-text-color-primary': GRAY[100],
            '--extra-light-fill': GRAY[950],
            '--light-ill': FILL_HOVER,
            '--base-fill': FILL_HOVER,
            '--loadding-background': 'rgba(0, 0, 0, 0.3)',
            '--regular-text-color': GRAY[200],
            '--secondary-text-color': GRAY[400],
            '--form-desc-color': GRAY[400],
            '--email-scroll-content-color': 'rgba(229, 229, 229, 0.45)',
            '--choose-account-background': FILL_HOVER,
            '--login-switch-color': GRAY[100],
            '--scrollbar-track-color': GRAY[500],
            '--message-block-color': 'rgba(30, 30, 30, 0.2)',
            '--aside-backgound': GRAY[1000],
            '--aside-text-color': GRAY[200],
            // 侧栏激活项：文字提亮 + 中性灰底，不用色彩区分
            '--aside-active-text-color': GRAY[50],
            '--aside-item-active': FILL_ACTIVE,
            '--aside-title-color': GRAY[100],
            '--el-box-shadow-light': '0 6px 30px rgba(0, 0, 0, 0.5)',
            // 暗色天空：明度方向反过来，越往下越亮，云比天空稍亮一档
            '--login-sky': `linear-gradient(to bottom, ${GRAY[1000]}, ${GRAY[950]}, ${GRAY[900]})`,
            '--login-cloud': `linear-gradient(to bottom, ${GRAY[800]} 5%, ${GRAY[900]} 100%)`,
            '--login-cloud-solid': GRAY[800],
            '--login-cloud-shadow': '0 8px 5px rgba(0, 0, 0, 0.3)',
            // 暗色主色是亮灰，按钮文字得反过来取深色
            '--writer-background': GRAY[200],
            '--writer-text-color': GRAY[1000],
        },
        editor: {
            skin: 'oxide-dark',
            contentCss: 'dark',
            scrollbarTrack: GRAY[1000],
            scrollbarThumb: GRAY[500],
        },
        chart: {
            color: GRAY[100],
            background: GRAY[1000],
            borderColor: GRAY[1000],
            scaleLineColor: GRAY[700],
            crossColor: GRAY[400],
            axisColor: GRAY[400],
            splitLineColor: 'rgba(136, 136, 136, 0.2)',
            gaugeSplitLine: GRAY[200],
            containerBackground: 'rgba(136, 136, 136, 0.2)',
            // 暗色下明度方向反过来，从浅到深。
            // 跳过 100 档直接从 50 到 200：那两档相邻只有 1.18 的对比，
            // 并排的饼图扇区分不出来
            series: [GRAY[50], GRAY[200], GRAY[300], GRAY[400], GRAY[500], GRAY[600]],
            accent: GRAY[50],
        },
    },
}
