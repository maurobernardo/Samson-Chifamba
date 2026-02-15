import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-8">
          <div className="max-w-lg rounded-xl border border-red-200 dark:border-red-800 bg-white dark:bg-slate-800 p-6 shadow-lg">
            <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Algo correu mal</h1>
            <p className="text-slate-700 dark:text-slate-300 mb-4">A aplicação encontrou um erro. Abre a consola do browser (F12) para mais detalhes.</p>
            <pre className="text-xs bg-slate-100 dark:bg-slate-900 p-3 rounded overflow-auto max-h-40">
              {this.state.error.message}
            </pre>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
