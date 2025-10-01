export default function TestPage() {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-g8-h1 text-g8-text-primary mb-4">G8 World App Test</h1>
        <p className="text-g8-body text-g8-text-secondary">Server is running with real deployed contracts!</p>
        <div className="mt-8 space-y-2">
          <p className="text-g8-caption text-g8-success">✅ TokenFactory: 0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47</p>
          <p className="text-g8-caption text-g8-success">✅ BondingCurve: 0xd9145CCE52D386f254917e481eB44e9943F39138</p>
          <p className="text-g8-caption text-g8-success">✅ GraduationHandler: 0xDA0bab807633f07f013f94DD0E6A4F96F8742B53</p>
        </div>
      </div>
    </div>
  )
}

