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

const primary = {
    '--el-color-primary': '#3b82f6',
    '--el-color-primary-dark-2': '#1d4ed8',
    '--el-color-primary-light-3': '#60a5fa',
    '--el-color-primary-light-5': '#93c5fd',
    '--el-color-primary-light-7': '#bfdbfe',
    '--el-color-primary-light-9': '#eff6ff',
}

// 明暗共用的部分
const shared = {
    ...primary,
    '--light-border': HAIRLINE,
    '--dark-border': HAIRLINE,
    '--light-border-color': HAIRLINE,
    '--base-border-color': HAIRLINE,
    '--el-border-color': HAIRLINE,
    '--el-border-color-light': HAIRLINE,
    '--el-border-color-lighter': HAIRLINE,
    '--email-hover-background': FILL_HOVER,
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
            '--el-bg-color': '#ffffff',
            '--el-bg-color-page': '#ffffff',
            '--el-bg-color-overlay': '#ffffff',
            '--el-fill-color-blank': '#ffffff',
            '--el-text-color-primary': '#374151',
            '--extra-light-fill': '#ffffff',
            '--light-ill': FILL_HOVER,
            '--base-fill': FILL_HOVER,
            '--loadding-background': 'rgba(255, 255, 255, 0.8)',
            '--regular-text-color': '#555555',
            '--secondary-text-color': '#888888',
            '--form-desc-color': '#888888',
            '--email-scroll-content-color': 'rgba(85, 85, 85, 0.55)',
            '--choose-account-background': FILL_HOVER,
            '--login-switch-color': '#3b82f6',
            '--scrollbar-track-color': '#bbbbbb',
            '--message-block-color': 'rgba(0, 0, 0, 0)',
            '--aside-backgound': '#ffffff',
            '--aside-text-color': '#555555',
            '--aside-active-text-color': '#3b82f6',
            '--aside-item-active': 'rgba(59, 130, 246, 0.1)',
            '--aside-title-color': '#374151',
        },
        editor: {
            skin: 'oxide',
            contentCss: 'default',
            scrollbarTrack: '#FFFFFF',
            scrollbarThumb: '#bbbbbb',
        },
        chart: {
            color: '#374151',
            background: '#FFFFFF',
            borderColor: '#FFFFFF',
            scaleLineColor: '#d4d4d4',
            crossColor: '#888888',
            axisColor: '#888888',
            splitLineColor: 'rgba(136, 136, 136, 0.2)',
            gaugeSplitLine: '#555555',
            containerBackground: 'rgba(136, 136, 136, 0.15)',
        },
    },

    dark: {
        meta: { desktop: '#050505', mobile: '#050505' },
        vars: {
            ...shared,
            // antfu 的暗色底不是纯黑，抬起 5 点
            '--el-bg-color': '#050505',
            '--el-bg-color-page': '#050505',
            '--el-bg-color-overlay': '#0e0e0e',
            '--el-fill-color-blank': '#050505',
            '--el-text-color-primary': '#e5e7eb',
            '--extra-light-fill': '#0e0e0e',
            '--light-ill': FILL_HOVER,
            '--base-fill': FILL_HOVER,
            '--loadding-background': 'rgba(0, 0, 0, 0.3)',
            '--regular-text-color': '#bbbbbb',
            '--secondary-text-color': '#888888',
            '--form-desc-color': '#888888',
            '--email-scroll-content-color': 'rgba(229, 231, 235, 0.45)',
            '--choose-account-background': FILL_HOVER,
            '--login-switch-color': '#60a5fa',
            '--scrollbar-track-color': '#222222',
            '--message-block-color': 'rgba(30, 30, 30, 0.2)',
            '--aside-backgound': '#050505',
            '--aside-text-color': '#bbbbbb',
            '--aside-active-text-color': '#60a5fa',
            '--aside-item-active': 'rgba(96, 165, 250, 0.12)',
            '--aside-title-color': '#e5e7eb',
            '--el-box-shadow-light': '0 6px 30px rgba(0, 0, 0, 0.5)',
        },
        editor: {
            skin: 'oxide-dark',
            contentCss: 'dark',
            scrollbarTrack: '#050505',
            scrollbarThumb: '#333333',
        },
        chart: {
            color: '#e5e7eb',
            background: '#050505',
            borderColor: '#050505',
            scaleLineColor: '#3f3f3f',
            crossColor: '#888888',
            axisColor: '#888888',
            splitLineColor: 'rgba(136, 136, 136, 0.2)',
            gaugeSplitLine: '#bbbbbb',
            containerBackground: 'rgba(136, 136, 136, 0.2)',
        },
    },
}
