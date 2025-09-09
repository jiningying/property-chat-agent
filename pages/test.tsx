import React from 'react';
import Head from 'next/head';

export default function TestPage() {
  return (
    <>
      <Head>
        <title>Test Page - PropertyMatch Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold">🏠</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PropertyMatch Pro
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            If you can see this styled properly, then Tailwind CSS is working!
          </p>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Beautiful Button
            </button>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-indigo-600">50K+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Match Rate</div>
              </div>
              <div className="bg-pink-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
