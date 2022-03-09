import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'
export function useLocal() {
  const { locale } = useI18n()

  const currentLocale = useCookie('locale', { maxAge: 20 * 365 * 24 * 60 * 60 })

  const setLocale = (l: string) => {
    currentLocale.value = l
    locale.value = l
  }

  const setPreferredLanguage = () => {
    if (!currentLocale.value) {
      if (process.server) {
        const nuxtApp = useNuxtApp()
        if (nuxtApp.ssrContext?.req?.headers) {
          const acceptLanguage = nuxtApp.ssrContext.req.headers['accept-language'] || 'en'
          const preferredLanguage = acceptLanguage.split(',')[0]
          setLocale(preferredLanguage)
        }
      }
    }
    else {
      setLocale(currentLocale.value)
    }
  }

  return {
    setPreferredLanguage,
    setLocale,
    locale,
  }
}
