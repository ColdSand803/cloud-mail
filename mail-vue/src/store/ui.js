import { defineStore } from 'pinia'
import { DEFAULT_THEME_ID, applyTheme, getPack, hasPack } from '@/theme/index.js'

export const useUiStore = defineStore('ui', {
    state: () => ({
        asideShow: window.innerWidth > 1024,
        accountShow: false,
        backgroundLoading: true,
        changeNotice: 0,
        writerRef: null,
        changePreview: 0,
        previewData: {},
        key: 0,
        dark: false,
        themeId: DEFAULT_THEME_ID,
        asideCount: {
            email: 0,
            send: 0,
            sysEmail: 0
        }
    }),
    getters: {
        /** 当前生效的模式配置，editor / chart 这类吃不到 CSS 变量的地方从这里取色 */
        themeMode(state) {
            const pack = getPack(state.themeId)
            return state.dark ? pack.dark : pack.light
        },
    },
    actions: {
        showNotice() {
            this.changeNotice ++
        },
        previewNotice(data) {
            this.previewData = data
            this.changePreview ++
        },
        /** 切主题包，保持当前明暗模式不变 */
        setTheme(themeId) {
            this.themeId = themeId
            applyTheme(themeId, this.dark)
        },
        /** 切明暗，保持当前主题包不变 */
        setDark(isDark) {
            this.dark = isDark
            applyTheme(this.themeId, isDark)
        },
    },
    persist: {
        pick: ['accountShow','dark','themeId'],
        // 存的主题包可能已被删掉（升级后包名变更），回落到默认并重刷一次，
        // 否则选择器会显示一个不存在的 id
        afterHydrate(ctx) {
            if (!hasPack(ctx.store.themeId)) {
                ctx.store.themeId = DEFAULT_THEME_ID
                applyTheme(DEFAULT_THEME_ID, ctx.store.dark)
            }
        },
    },
})
