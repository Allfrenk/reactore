import { ActionCard } from '@/components/actionCard/ActionCard'
import { ExplainCard } from '@/components/explainCard/ExplainCard'
import { HookPageLayout } from '@/components/hookPageLayout/HookPageLayout'
import { TiltCardWrapper } from '@/components/ui/tiltCardWrapper/TiltCardWrapper'

export function UseStatePage() {
  return (
    <HookPageLayout
      title="useState"
      description="Managing local component state"
      action={
        <TiltCardWrapper>
          <ActionCard title="Action">
            <p>Action area</p>
          </ActionCard>
        </TiltCardWrapper>
      }
      explanation={
        <TiltCardWrapper>
          <ExplainCard title="Explanation">
            <p>Explanation area</p>
          </ExplainCard>
        </TiltCardWrapper>
      }
    />
  )
}
