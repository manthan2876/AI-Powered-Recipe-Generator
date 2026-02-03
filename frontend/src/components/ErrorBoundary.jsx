import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("UI Breakdown:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-red-50 rounded-xl border border-red-100">
                    <span className="text-4xl mb-4">🍳🔥</span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something burned.</h3>
                    <p className="text-gray-600 mb-6">Our chefs are working on fixing this section.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        Refresh Kitchen
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
