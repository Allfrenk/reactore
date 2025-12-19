import { HookPageLayout } from '@/components/general/hookPageLayout/HookPageLayout'
import { TiltCardWrapper } from '@/components/ui/tiltCardWrapper/TiltCardWrapper'
import { useStateConfig } from '@/configs/hookConfig/useState.config'
import { UseStateAction } from './UseStateAction'
import { UseStateExplain } from './UseStateExplain'

export function UseStatePage() {
  return (
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
  )
}
