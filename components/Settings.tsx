import React, { useState } from 'react';
import { clearLibrary } from '../services/libraryService';
import { TrashIcon, CheckCircleIcon, ShieldIcon } from './icons';

const Settings: React.FC = () => {
    const [cleared, setCleared] = useState(false);

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to delete all saved scans? This action cannot be undone.')) {
            clearLibrary();
            setCleared(true);
            setTimeout(() => setCleared(false), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-white border-b border-brand-border pb-4">
                Settings
            </h2>

            <div className="bg-brand-secondary border border-brand-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                    Data Management
                </h3>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-300 font-medium">
                            Clear Scan History
                        </p>
                        <p className="text-sm text-gray-500">
                            Permanently remove all saved documents and summaries.
                        </p>
                    </div>

                    <button
                        onClick={handleClearHistory}
                        className="bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {cleared ? <CheckCircleIcon /> : <TrashIcon />}
                        {cleared ? 'Cleared' : 'Clear All'}
                    </button>
                </div>
            </div>

            <div className="bg-brand-secondary border border-brand-border rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                    About DevaScan
                </h3>

                <div className="space-y-4 text-gray-400">
                    <p>
                        DevaScan is a specialized OCR tool for handwritten Devanagari scripts.
                    </p>

                    <div className="flex items-center gap-3 bg-brand-dark/50 p-3 rounded-lg border border-brand-border/50">
                        <ShieldIcon className="w-5 h-5 text-amber-500" />
                        <div>
                            <p className="text-sm font-semibold text-gray-200">
                                Kaggle Dataset Context
                            </p>
                            <p className="text-xs text-gray-500">
                                Simulates training on 46 Devanagari classes.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm">
                        Version 1.0.0 • Local Storage Enabled • AI Vision Powered
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
