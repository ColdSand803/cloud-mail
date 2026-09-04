/**
 * 主题引擎。
 *
 * 主题包 = 一个 JS 对象 + 可选的一份 CSS。想加新主题只要三步：
 *   1. 抄一份 packs/default.js 改配色
 *   2. 在下面的 packs 数组里 import 进来
 *   3. 需要改变量表达不了的东西时，附一份 CSS（参照 packs/antfu.css）
 *
 * 应用方式是把变量写成 documentElement 的 inline style。inline 优先级高于
 * element-plus 的 dark/css-vars.css，所以主题包能盖掉 EP 的暗色默认值，
 * 同时不用维护一堆 !important。
 */

import defaultPack from './packs/default.js'
import antfuPack from './packs/antfu.js'
import './packs/antfu.css'

/**
 * 数组第一个即全局默认主题，也是选择器里的第一项。
 * 换默认只需调整顺序，其余地方都从这里派生。
 *
 * 注意：改默认后，style.css 的兜底 :root 和 index.html 的兜底底色
 * 也要跟着换成新默认包的浅色/暗色值，否则首屏会闪一下旧配色。
 */
export const packs = [antfuPack, defaultPack]

const fallbackPack = packs[0]

export const DEFAULT_THEME_ID = fallbackPack.id

// 预涂色脚本要用的缓存 key，见 index.html
const CACHE_KEY = 'theme-vars'

export function getPack(themeId) {
    return packs.find(p => p.id === themeId) || fallbackPack
}

export function hasPack(themeId) {
    return packs.some(p => p.id === themeId)
}

export function getPackList() {
    return packs.map(p => ({ id: p.id, name: p.name }))
}

/**
 * 所有主题包所有模式声明过的变量名的并集。
 * 切主题时用它清场，避免上一个包设过、新包没声明的变量残留。
 */
const ALL_VAR_NAMES = (() => {
    const names = new Set()
    packs.forEach((pack) => {
        ['light', 'dark'].forEach((mode) => {
            Object.keys(pack[mode]?.vars || {}).forEach(n => names.add(n))
        })
    })
    return [...names]
})()

const ALL_CLASS_NAMES = packs.map(p => p.className).filter(Boolean)

/**
 * 应用主题。
 * @param {string} themeId 主题包 id
 * @param {boolean} isDark 是否暗色
 * @returns {object} 生效的模式配置（含 editor / chart，供 canvas 和 iframe 取色）
 */
export function applyTheme(themeId, isDark) {
    const pack = getPack(themeId)
    const mode = isDark ? pack.dark : pack.light
    const root = document.documentElement
    const vars = mode?.vars || {}

    // 先清场再写入
    ALL_VAR_NAMES.forEach((name) => {
        if (!(name in vars)) root.style.removeProperty(name)
    })
    Object.entries(vars).forEach(([name, value]) => {
        root.style.setProperty(name, value, 'important')
    })

    // dark 类保留：element-plus 的暗色变量和已有的 .dark 选择器都依赖它
    root.classList.toggle('dark', !!isDark)
    ALL_CLASS_NAMES.forEach(c => root.classList.toggle(c, c === pack.className))

    applyMetaColor(mode?.meta)
    // 记兜底后的 pack.id，不是入参 themeId，避免把失效 id 写进缓存
    cacheForPrePaint(pack, isDark, vars, mode?.meta)

    return mode
}

function applyMetaColor(meta) {
    if (!meta) return
    const tag = document.getElementById('theme-color-meta')
    if (!tag) return
    const isMobile = !window.matchMedia('(pointer: fine) and (hover: hover)').matches
    tag.setAttribute('content', isMobile ? meta.mobile : meta.desktop)
}

/**
 * 把解析好的变量存进 localStorage，让 index.html 的预涂色脚本能在
 * JS bundle 加载前就把颜色刷上去，避免首屏闪白/闪黑。
 */
function cacheForPrePaint(pack, isDark, vars, meta) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            themeId: pack.id,
            dark: !!isDark,
            className: pack.className || '',
            vars,
            meta,
        }))
    } catch {
        // 隐私模式下 localStorage 可能不可写，失败就只是首屏会闪一下
    }
}

/**
 * 启动时调用，必须在 app.mount 之前。
 * 直接读 localStorage 而不是 pinia，因为 pinia 的持久化插件此时可能还没注水。
 */
export function initTheme() {
    let themeId = DEFAULT_THEME_ID
    let isDark = false
    try {
        const raw = localStorage.getItem('ui')
        if (raw) {
            const ui = JSON.parse(raw)
            if (ui.themeId) themeId = ui.themeId
            isDark = !!ui.dark
        }
    } catch {
        // 存储被污染就走默认值
    }
    return applyTheme(themeId, isDark)
}
