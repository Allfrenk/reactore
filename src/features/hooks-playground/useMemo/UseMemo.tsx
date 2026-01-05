import { HookPageLayout } from '@/shared/components/layout/HookPageLayout'
import { PageFade } from '@/shared/components/ui/PageFade'
import { TiltCardWrapper } from '@/shared/components/ui/TiltCardWrapper'
import { useMemoConfig } from '../config/useMemo.config'
import { UseMemoAction } from './UseMemoAction'
import { UseMemoExplain } from './UseMemoExplain'

export function UseMemoPage() {
  return (
    <PageFade>
      <HookPageLayout
        title={useMemoConfig.meta.title}
        description={useMemoConfig.meta.description}
        action={
          <TiltCardWrapper>
            <UseMemoAction />
          </TiltCardWrapper>
        }
        explanation={
          <TiltCardWrapper>
            <UseMemoExplain />
          </TiltCardWrapper>
        }
      />
    </PageFade>
  )
}
