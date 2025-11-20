export default function TailwindTestPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-32">
            <h1 className="text-4xl font-bold text-primary mb-4">Tailwind CSS Integration Test</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-card rounded-lg shadow-lg border border-border">
                    <h2 className="text-2xl font-semibold mb-2 text-card-foreground">Card Component</h2>
                    <p className="text-muted-foreground">This is a card component using Tailwind classes mapped from SCSS variables.</p>
                    <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-blue-600 transition-colors">
                        Primary Button
                    </button>
                </div>
                <div className="p-10 bg-secondary rounded-lg shadow-lg text-secondary-foreground">
                    <h2 className="text-2xl font-semibold mb-2">Secondary Component</h2>
                    <p>This component uses the secondary color scheme.</p>
                    <div className="mt-4 p-2 bg-accent text-accent-foreground rounded">
                        Accent Box
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Typography Test</h3>
                <p className="font-sans mb-2">This should be the Sans font (Suite, etc.)</p>
                <p className="font-mono">This should be the Mono font (Geist Mono, etc.)</p>
            </div>
        </div>
    );
}
