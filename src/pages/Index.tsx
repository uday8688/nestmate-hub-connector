const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to AptCircle Community Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Your community management platform
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Community Features
              </h3>
              <p className="text-muted-foreground">
                Connect with your neighbors and build a stronger community together.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Management Tools
              </h3>
              <p className="text-muted-foreground">
                Powerful tools to help manage your apartment complex efficiently.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Smart Solutions
              </h3>
              <p className="text-muted-foreground">
                Modern solutions for modern living in your apartment community.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Index