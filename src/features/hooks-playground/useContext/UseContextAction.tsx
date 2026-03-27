import { createContext, useContext, useState } from 'react'

import { trackPageInteraction } from '@/core/firebase/trackPageInteraction'
import { useContextConfig } from '@/features/hooks-playground/config/useContext.config'
import { ActionCard } from '@/shared/components/cards/ActionCard'

/* =========================
   CONTEXT DEFINITION
========================== */

type Language = 'EN' | 'IT' | 'ES'

type LangContextValue = {
  language: Language
  greet: string
  description: string
}

const LANG_DATA: Record<Language, Omit<LangContextValue, 'language'>> = {
  EN: { greet: 'Hello', description: 'English' },
  IT: { greet: 'Ciao', description: 'Italian' },
  ES: { greet: 'Hola', description: 'Spanish' },
}

const LangContext = createContext<LangContextValue>({
  language: 'EN',
  ...LANG_DATA.EN,
})

/* =========================
   CONSUMER COMPONENTS
   (no props — read from context)
========================== */

function GreetingCard({ label }: { label: string }) {
  const { greet, language } = useContext(LangContext)

  return (
    <div className="glass-inset flex flex-col items-center gap-1 rounded-xl px-4 py-4 text-center">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-2xl font-semibold">{greet}</span>
      <span className="font-mono text-xs text-(--accent-primary)">{language}</span>
    </div>
  )
}

function DescriptionCard({ label }: { label: string }) {
  const { description, language } = useContext(LangContext)

  return (
    <div className="glass-inset flex flex-col items-center gap-1 rounded-xl px-4 py-4 text-center">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <span className="text-2xl font-semibold">{description}</span>
      <span className="font-mono text-xs text-(--accent-primary)">{language}</span>
    </div>
  )
}

/* =========================
   PARENT (provider)
========================== */

const LANGUAGES: Language[] = ['EN', 'IT', 'ES']

export function UseContextAction() {
  const { title, subtitle } = useContextConfig.action

  const [language, setLanguage] = useState<Language>('EN')

  const handleSwitch = (lang: Language) => {
    setLanguage(lang)
    trackPageInteraction('useContext', `switch_${lang.toLowerCase()}`)
  }

  const ctxValue: LangContextValue = {
    language,
    ...LANG_DATA[language],
  }

  return (
    <ActionCard title={title} subtitle={subtitle}>
      <LangContext.Provider value={ctxValue}>
        <div className="flex flex-col gap-6">
          {/* PROVIDER BOX */}
          <div className="rounded-2xl border border-dashed border-(--accent-primary)/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-(--accent-primary)">
                &lt;LangContext.Provider value=&#123;…&#125;&gt;
              </span>
            </div>

            {/* LANGUAGE SWITCHER */}
            <div className="flex gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleSwitch(lang)}
                  className={`flex-1 rounded-xl border px-3 py-2.5 font-mono text-sm font-semibold transition ${
                    language === lang
                      ? 'border-(--accent-primary) bg-(--accent-primary) text-white'
                      : 'text-muted-foreground hover:border-(--accent-primary)/50 hover:text-(--accent-primary)'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <p className="text-muted-foreground mt-2 text-xs">
              Context value:{' '}
              <code>{`{ language: '${language}', greet: '${LANG_DATA[language].greet}' }`}</code>
            </p>
          </div>

          {/* CONSUMER COMPONENTS — no props passed */}
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs font-medium">
              Consumer components — zero props passed
            </span>

            <div className="grid grid-cols-2 gap-3">
              <GreetingCard label="GreetingCard" />
              <DescriptionCard label="DescriptionCard" />
            </div>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            Both cards read from context. No data flows through props — change the
            language and both update instantly.
          </p>
        </div>
      </LangContext.Provider>
    </ActionCard>
  )
}
