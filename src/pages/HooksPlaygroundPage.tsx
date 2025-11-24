import BounceCard from '../components/BounceCard'
import UseCallbackCard from '../components/UseCallbackCard'
import UseEffectCard from '../components/UseEffectCard'
import UseMemoCard from '../components/UseMemoCard'
import UseReducerCard from '../components/UseReducerCard'
import UseRefCard from '../components/UseRefCard'
import UseStateCard from '../components/UseStateCard'

export default function HooksPlaygroundPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Hooks Playground</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* EASY */}
        <UseStateCard />
        <UseRefCard />
        {/* MEDIUM */}
        <UseEffectCard />
        <UseMemoCard />
        {/* HARD */}
        <UseCallbackCard />
        <UseReducerCard />

        {/* CUSTOM */}
        <BounceCard />
      </div>
    </div>
  )
}
