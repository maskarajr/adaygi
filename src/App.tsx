import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import usdtIcon from './assets/usdt-icon.png';
import usdcIcon from './assets/usdc-icon.png';

type Direction = 'buy' | 'sell';
type CryptoAsset = 'USDT' | 'USDC';

function App() {
  const [direction, setDirection] = useState<Direction>('buy');
  const [amount, setAmount] = useState<string>('');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>('USDT');
  const [showMenu, setShowMenu] = useState(false);

  // Static rates for demonstration
  const rates = {
    USDT: 280,
    USDC: 279.5
  };

  const calculateExchange = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return '0';
    
    if (direction === 'buy') {
      return (numAmount / rates[selectedCrypto]).toFixed(2);
    } else {
      return (numAmount * rates[selectedCrypto]).toFixed(2);
    }
  };

  const quickAmounts = [2500, 5000, 10000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-white p-2 hover:bg-gray-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-white">
              Pakistan Crypto Ramp
            </h1>
            <div className="w-10" />

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-gray-800 shadow-lg border border-gray-700 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDirection(prev => prev === 'buy' ? 'sell' : 'buy');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Switch to {direction === 'buy' ? 'Sell' : 'Buy'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
            {/* Direction Text */}
            <h2 className="text-2xl font-semibold text-white mb-6">
              {direction === 'buy' ? 'Buy' : 'Sell'}
            </h2>

            {/* Crypto Selection */}
            <div className="mb-6">
              <div className="bg-gray-700/50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={selectedCrypto === 'USDT' 
                        ? usdtIcon
                        : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNzc1Q0EiLz48cGF0aCBkPSJNMjAuMzc1IDcuNVYxMS4wMTU2SDI2LjY0ODRWMTMuNDM3NUgxMC41NDY5VjExLjAxNTZIMTYuODIwM1Y3LjVIMjAuMzc1Wk0yNi4yODkxIDE1LjU0NjlWMjguNjcxOUgyNi4yNjU2QzI2LjI2NTYgMjkuNDY4OCAyNC40ODQ0IDMwLjExNzIgMjIuMzEyNSAzMC41NDY5QzIxLjY3MTkgMzAuNjcxOSAyMC45ODQ0IDMwLjc2NTYgMjAuMjczNCAzMC44MzU5QzE5LjU4NTkgMzAuOTA2MyAxOC44NzUgMzAuOTI5NyAxOC4xNDA2IDMwLjkyOTdDMTcuNDA2MyAzMC45Mjk3IDE2LjY5NTMgMzAuOTA2MyAxNi4wMDc4IDMwLjgzNTlDMTUuMjk2OSAzMC43NjU2IDE0LjYwOTQgMzAuNjcxOSAxMy45Njg4IDMwLjU0NjlDMTEuNzk2OSAzMC4xMTcyIDEwLjAxNTYgMjkuNDY4OCAxMC4wMTU2IDI4LjY3MTlIMTBWMTUuNTQ2OUgxMy41NTQ3VjI4LjQzNzVDMTMuODY3MiAyOC41ODU5IDE0LjIwMzEgMjguNzEwOSAxNC41ODU5IDI4LjgxMjVDMTUuNjA5NCAyOS4wODU5IDE3LjAxNTYgMjkuMjM0NCAxOC4xNDA2IDI5LjIzNDRDMTkuMjY1NiAyOS4yMzQ0IDIwLjY3MTkgMjkuMDg1OSAyMS42OTUzIDI4LjgxMjVDMjIuMDc4MSAyOC43MTA5IDIyLjQxNDEgMjguNTg1OSAyMi43MjY2IDI4LjQzNzVWMTUuNTQ2OUgyNi4yODkxWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4="
                      }
                      alt={selectedCrypto}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{selectedCrypto}</div>
                    <div className="text-gray-400 text-sm">BEP20</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCrypto(prev => prev === 'USDT' ? 'USDC' : 'USDT')}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
              <label className="block text-gray-400">
                {direction === 'buy' 
                  ? 'You pay (PKR)'
                  : `Amount to sell (${selectedCrypto})`
                }
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={direction === 'buy' 
                    ? 'Enter PKR amount (min 2500)' 
                    : `Enter ${selectedCrypto} amount (min 10)`
                  }
                />
                <div className="absolute right-4 top-3 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    {direction === 'buy' ? (
                      <img 
                        src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/pk.svg"
                        alt="PKR"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={selectedCrypto === 'USDT' 
                          ? usdtIcon
                          : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNzc1Q0EiLz48cGF0aCBkPSJNMjAuMzc1IDcuNVYxMS4wMTU2SDI2LjY0ODRWMTMuNDM3NUgxMC41NDY5VjExLjAxNTZIMTYuODIwM1Y3LjVIMjAuMzc1Wk0yNi4yODkxIDE1LjU0NjlWMjguNjcxOUgyNi4yNjU2QzI2LjI2NTYgMjkuNDY4OCAyNC40ODQ0IDMwLjExNzIgMjIuMzEyNSAzMC41NDY5QzIxLjY3MTkgMzAuNjcxOSAyMC45ODQ0IDMwLjc2NTYgMjAuMjczNCAzMC44MzU5QzE5LjU4NTkgMzAuOTA2MyAxOC44NzUgMzAuOTI5NyAxOC4xNDA2IDMwLjkyOTdDMTcuNDA2MyAzMC45Mjk3IDE2LjY5NTMgMzAuOTA2MyAxNi4wMDc4IDMwLjgzNTlDMTUuMjk2OSAzMC43NjU2IDE0LjYwOTQgMzAuNjcxOSAxMy45Njg4IDMwLjU0NjlDMTEuNzk2OSAzMC4xMTcyIDEwLjAxNTYgMjkuNDY4OCAxMC4wMTU2IDI4LjY3MTlIMTBWMTUuNTQ2OUgxMy41NTQ3VjI4LjQzNzVDMTMuODY3MiAyOC41ODU5IDE0LjIwMzEgMjguNzEwOSAxNC41ODU5IDI4LjgxMjVDMTUuNjA5NCAyOS4wODU5IDE3LjAxNTYgMjkuMjM0NCAxOC4xNDA2IDI5LjIzNDRDMTkuMjY1NiAyOS4yMzQ0IDIwLjY3MTkgMjkuMDg1OSAyMS42OTUzIDI4LjgxMjVDMjIuMDc4MSAyOC43MTA5IDIyLjQxNDEgMjguNTg1OSAyMi43MjY2IDI4LjQzNzVWMTUuNTQ2OUgyNi4yODkxWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4="
                        }
                        alt={selectedCrypto}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="text-gray-400">
                    {direction === 'buy' ? 'PKR' : selectedCrypto}
                  </span>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex space-x-3">
                {direction === 'buy' ? (
                  quickAmounts.map((qAmount) => (
                    <button
                      key={qAmount}
                      onClick={() => setAmount(qAmount.toString())}
                      className="flex-1 py-2 px-4 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      ₨ {qAmount.toLocaleString()}
                    </button>
                  ))
                ) : (
                  [10, 50, 100].map((qAmount) => (
                    <button
                      key={qAmount}
                      onClick={() => setAmount(qAmount.toString())}
                      className="flex-1 py-2 px-4 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      {qAmount} {selectedCrypto}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="mt-6 bg-gray-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">1 {selectedCrypto} ≈</span>
                <span className="text-white">
                  ₨ {rates[selectedCrypto].toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* You Get Section */}
            <div className="mt-6 bg-gray-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-400">
                  You {direction === 'sell' ? 'get' : 'receive'}
                </span>
                <div className="text-right">
                  <div className="text-blue-400 font-bold">
                    {direction === 'buy' ? (
                      <>{selectedCrypto} {calculateExchange()}</>
                    ) : (
                      <>₨ {calculateExchange()}</>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;