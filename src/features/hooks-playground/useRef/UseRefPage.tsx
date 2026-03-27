import { useRefConfig } from '@/features/hooks-playground/config/useRef.config'
import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { UseRefAction } from './UseRefAction'
import { UseRefExplain } from './UseRefExplain'

export function UseRefPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useRefConfig.meta.title}
        description={useRefConfig.meta.description}
        badge="advanced"
        action={
          <TiltCardWrapper>
            <UseRefAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseRefExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
