import React, { useState } from 'react';

interface LiveDataSettingsProps {
  isRealTime: boolean;
  onToggle: (enabled: boolean) => void;
  onRefresh: () => void;
  lastUpdated?: Date | null;
}

export function LiveDataSettings({ isRealTime, onToggle, onRefresh, lastUpdated }: LiveDataSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        title="Live data settings"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Live Data</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isRealTime}
                  onChange={(e) => onToggle(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Enable real-time updates</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                {isRealTime ? 'Data updates automatically when changes occur' : 'Data updates every 30 seconds'}
              </p>
            </div>

            {lastUpdated && (
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1">Last Updated</h4>
                <p className="text-xs text-gray-500">
                  {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                onRefresh();
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
