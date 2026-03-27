import { useContextConfig } from '@/features/hooks-playground/config/useContext.config'
import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { UseContextAction } from './UseContextAction'
import { UseContextExplain } from './UseContextExplain'

export function UseContextPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useContextConfig.meta.title}
        description={useContextConfig.meta.description}
        badge="advanced"
        action={
          <TiltCardWrapper>
            <UseContextAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseContextExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
