import ParentPropsDemo from '../props/ParentPropsDemo'

export default function FeaturesPage() {
  const provaBacktick: string = ``
  return (
    <div>
      <h1>Props & Callbacks Playground</h1>
      <p>Dimostrazione di: props, callback, scorporamento, memo e useCallback </p>

      <ParentPropsDemo />
    </div>
  )
}
