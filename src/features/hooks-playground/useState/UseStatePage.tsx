import { useStateConfig } from '@/features/hooks-playground/config/useState.config'
import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { UseStateAction } from './UseStateAction'
import { UseStateExplain } from './UseStateExplain'

export function UseStatePage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useStateConfig.meta.title}
        description={useStateConfig.meta.description}
        action={
          <TiltCardWrapper>
            <UseStateAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseStateExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
