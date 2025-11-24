import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { setName, setLastName, setProfession } from '../slices/userSlice'

export default function UserCard() {
  const dispatch = useDispatch()

  // --- USER DATA ---
  const user = useSelector((state: RootState) => state.user)

  // --- HOOKS DATA ---
  const hooks = useSelector((state: RootState) => state.hooks)

  return (
    <div className="p-8 flex justify-beetween gap-4 rounded-lg border-1 border-gray-400">
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '10px' }}>User Data</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Name"
            value={user.name}
            onChange={e => dispatch(setName(e.target.value))}
          />

          <input
            placeholder="Last Name"
            value={user.lastName}
            onChange={e => dispatch(setLastName(e.target.value))}
          />

          <input
            placeholder="Profession"
            value={user.profession}
            onChange={e => dispatch(setProfession(e.target.value))}
          />
        </div>

        <div style={{ marginTop: '20px', lineHeight: '1.4' }}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Profession:</strong> {user.profession}
          </p>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: '10px' }}>Hooks State</h2>

        <div style={{ lineHeight: '1.5' }}>
          <p>
            <strong>useState value:</strong> {hooks.useStateValue}
          </p>
          <p>
            <strong>useRef value:</strong> {hooks.useRefValue}
          </p>
          <p>
            <strong>useEffect count:</strong> {hooks.useEffectLastTime}
          </p>
          <p>
            <strong>useMemo input:</strong> {hooks.useMemoInput}
          </p>
          <p>
            <strong>useMemo result:</strong> {hooks.useMemoResult}
          </p>
          <p>
            <strong>useCallback count:</strong> {hooks.useCallbackCount}
          </p>
          <p>
            <strong>useReducer state:</strong> {JSON.stringify(hooks.useReducerCount)}
          </p>
        </div>
      </div>
    </div>
  )
}
