import { useReducerConfig } from '@/features/hooks-playground/config/useReducer.config'
import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { UseReducerAction } from './UseReducerAction'
import { UseReducerExplain } from './UseReducerExplain'

export function UseReducerPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useReducerConfig.meta.title}
        description={useReducerConfig.meta.description}
        badge="advanced"
        action={
          <TiltCardWrapper>
            <UseReducerAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseReducerExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
