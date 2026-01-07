import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { useCallbackConfig } from '../config/useCallback.config'
import { UseCallbackAction } from './UseCallbackAction'
import { UseCallbackExplain } from './UseCallbackExplain'

export function UseCallbackPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useCallbackConfig.meta.title}
        description={useCallbackConfig.meta.description}
        action={
          <TiltCardWrapper>
            <UseCallbackAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseCallbackExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
