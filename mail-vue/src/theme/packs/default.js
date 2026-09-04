/**
 * 默认主题包 —— 与改造前的配色完全一致。
 *
 * 这些值原先散在 style.css 的 :root / .dark 两个块里，现在收进主题包，
 * style.css 只留结构性样式。新增主题包照抄这个文件的字段即可。
 */

// 主色板明暗共用
const primary = {
    '--el-color-primary': '#1890ff',
    '--el-color-primary-dark-2': '#1064c0',
    '--el-color-primary-light-3': '#4dabff',
    '--el-color-primary-light-5': '#69c0ff',
    '--el-color-primary-light-7': '#91d5ff',
    '--el-color-primary-light-9': '#e6f7ff',
}

export default {
    id: 'default',
    name: { zh: '经典蓝', en: 'Classic' },

    light: {
        // theme-color meta：移动端浏览器地址栏配色
        meta: { desktop: '#F1F1F1', mobile: '#FFFFFF' },
        vars: {
            ...primary,
            '--extra-light-fill': '#FAFCFF',
            '--light-ill': '#F5F7FA',
            '--light-border': '#E4E7ED',
            '--header-actions-border': 'inset 0 -1px 0 0 var(--el-border-color-lighter)',
            '--loadding-background': 'rgba(255, 255, 255, 0.8)',
            '--dark-border': '#CDD0D6',
            '--base-fill': '#F0F2F5',
            '--regular-text-color': '#585d69',
            '--light-border-color': '#e7e9ec',
            '--choose-account-background': 'var(--el-color-primary-light-8)',
            '--el-text-color-regular': 'var(--el-text-color-primary)',
            '--email-scroll-content-color': 'rgba(25, 41, 59, 0.4)',
            '--email-hover-background': '#F2F6FC',
            '--email-right-click-background': '#FDF6EC',
            '--login-border': 'none',
            '--form-desc-color': '#71717a',
            '--login-switch-color': '#006be6',
            '--scrollbar-track-color': '#A8ABB2',
            '--base-border-color': '#DCDFE6',
            '--secondary-text-color': '#909399',
            '--message-block-color': 'rgba(0, 0, 0, 0)',
            // 侧栏：原先文字色写死在 el-menu 的 props 上，现在提到变量
            '--aside-backgound': '#001529',
            '--aside-right-border': '3px 0 5px rgba(0, 21, 41, .35)',
            '--aside-text-color': '#ffffff',
            '--aside-active-text-color': '#ffffff',
            '--aside-item-hover': 'rgba(255, 255, 255, 0.08)',
            '--aside-item-active': 'rgba(255, 255, 255, 0.08)',
            '--aside-title-background': 'linear-gradient(135deg, #1890ff, #3a80dd)',
            '--aside-title-color': '#ffffff',
            // 登录页天空与云，原本写死在 login/index.vue 里，值照搬
            '--login-sky': 'linear-gradient(to bottom, #2980b9, #6dd5fa, #fff)',
            '--login-cloud': 'linear-gradient(to bottom, #fff 5%, #f1f1f1 100%)',
            '--login-cloud-solid': '#fff',
            '--login-cloud-shadow': '0 8px 5px rgba(0, 0, 0, 0.1)',
            // 写信按钮的蓝色渐变球，原本写死在 header 里，值照搬
            '--writer-background': 'linear-gradient(135deg, #1890ff, #3a80dd)',
            '--writer-text-color': '#ffffff',
        },
        // tinymce 在 iframe 里，拿不到外层变量，只能显式传
        editor: {
            skin: 'oxide',
            contentCss: 'default',
            scrollbarTrack: '#FFFFFF',
            scrollbarThumb: '#A8ABB2',
        },
        // echarts 用 canvas 渲染，同样吃不到 CSS 变量
        chart: {
            color: '#303133',
            background: '#FFFFFF',
            borderColor: '#FFFFFF',
            scaleLineColor: '#CDD0D6',
            crossColor: '#A8ABB2',
            axisColor: '#909399',
            splitLineColor: '#D4D7DE',
            gaugeSplitLine: '#606266',
            containerBackground: '#E6EBF8',
            // 分析页原本写死在组件里的配色，搬到这里，明暗共用
            series: ['#3CB2FF', '#13DEB9', '#FBBF24', '#FF7F50', '#BAE6FD', '#C084FC'],
            accent: '#3CB2FF',
        },
    },

    dark: {
        meta: { desktop: '#000000', mobile: '#141414' },
        vars: {
            ...primary,
            '--extra-light-fill': '#191919',
            '--light-ill': '#262727',
            '--light-border': '#414243',
            '--header-actions-border': 'inset 0 -1px 0 0 var(--el-border-color-lighter)',
            '--loadding-background': 'rgba(0, 0, 0, 0.3)',
            '--dark-border': '#636466',
            '--base-fill': '#303030',
            '--regular-text-color': '#bfbdbc',
            '--light-border-color': '#414243',
            '--choose-account-background': '#39393A',
            '--el-text-color-regular': 'var(--el-text-color-primary)',
            '--email-scroll-content-color': 'rgba(255, 255, 255, 0.3)',
            '--email-hover-background': '#1D1E1F',
            '--email-right-click-background': 'var(--email-hover-background)',
            '--login-border': 'none',
            '--form-desc-color': '#8D9095',
            '--login-switch-color': 'rgb(102, 177, 255)',
            '--scrollbar-track-color': '#8D9095',
            '--base-border-color': '#4C4D4F',
            '--secondary-text-color': '#A3A6AD',
            '--message-block-color': 'rgba(30, 30, 30, 0.2)',
            '--el-border-color': '#414243',
            '--aside-backgound': '#141414',
            '--aside-right-border': '3px 0 5px #0A0A0A',
            '--aside-text-color': '#ffffff',
            '--aside-active-text-color': '#ffffff',
            '--aside-item-hover': 'rgba(255, 255, 255, 0.08)',
            '--aside-item-active': 'rgba(255, 255, 255, 0.08)',
            '--aside-title-background': 'linear-gradient(135deg, #1890ff, #3a80dd)',
            '--aside-title-color': '#ffffff',
            // 与浅色同值：改造前登录页背景本来就不随明暗变，保持原行为
            '--login-sky': 'linear-gradient(to bottom, #2980b9, #6dd5fa, #fff)',
            '--login-cloud': 'linear-gradient(to bottom, #fff 5%, #f1f1f1 100%)',
            '--login-cloud-solid': '#fff',
            '--login-cloud-shadow': '0 8px 5px rgba(0, 0, 0, 0.1)',
            '--writer-background': 'linear-gradient(135deg, #1890ff, #3a80dd)',
            '--writer-text-color': '#ffffff',
        },
        editor: {
            skin: 'oxide-dark',
            contentCss: 'dark',
            scrollbarTrack: '#141414',
            scrollbarThumb: '#8D9095',
        },
        chart: {
            color: '#E5EAF3',
            background: '#141414',
            borderColor: '#141414',
            scaleLineColor: '#636466',
            crossColor: '#8D9095',
            axisColor: '#A3A6AD',
            splitLineColor: '#58585B',
            gaugeSplitLine: '#CFD3DC',
            containerBackground: '#6C6E72',
            series: ['#3CB2FF', '#13DEB9', '#FBBF24', '#FF7F50', '#BAE6FD', '#C084FC'],
            accent: '#3CB2FF',
        },
    },
}
