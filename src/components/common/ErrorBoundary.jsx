import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-center">
                    <div className="rounded-full bg-red-500/10 p-4 mb-4">
                        <AlertTriangle className="h-12 w-12 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 mb-2">System Error</h1>
                    <p className="text-slate-400 mb-6 max-w-md">
                        An unexpected error occurred in the dashboard. The system has logged this incident.
                    </p>
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 mb-6 text-left w-full max-w-lg overflow-auto max-h-40">
                        <code className="text-xs text-red-400 font-mono">
                            {this.state.error && this.state.error.toString()}
                        </code>
                    </div>
                    <button
                        onClick={this.handleReload}
                        className="flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-2.5 font-medium text-white hover:bg-cyan-700 transition"
                    >
                        <RefreshCw size={18} />
                        Reload System
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
