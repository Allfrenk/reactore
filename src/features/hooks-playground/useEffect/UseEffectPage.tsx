import { useEffectConfig } from '@/features/hooks-playground/config/useEffect.config'
import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { UseEffectAction } from './UseEffectAction'
import { UseEffectExplain } from './UseEffectExplain'

export function UseEffectPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useEffectConfig.meta.title}
        description={useEffectConfig.meta.description}
        badge="essential"
        action={
          <TiltCardWrapper>
            <UseEffectAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseEffectExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
