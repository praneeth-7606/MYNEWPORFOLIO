// components/Certificates.js
"use client"


import React, { useState } from 'react';
import { certificates } from '@/utils/data/cerficatesdetails';
// import { certificates } from '@/utils/certificates-data';

function Certificates() {
    const [visibleCount, setVisibleCount] = useState(4); // Initial count of visible cards

    const showMoreCertificates = () => {
        setVisibleCount((prevCount) => prevCount + 4); // Load more in increments of 4
    };

    return (
        <div className="relative z-50 my-12 lg:my-24">
            <h2 className="text-center text-2xl lg:text-3xl font-bold mb-8 text-white">Certificates & Achievements</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {certificates.slice(0, visibleCount).map((certificate) => (
                    <div
                        key={certificate.id}
                        className="certificate-card bg-[#1b203e] rounded-lg p-5 text-white transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-violet-500 mb-1">{certificate.name}</h3>
                        <p className="text-sm text-[#16f2b3] mb-1">Issued by: {certificate.issuer}</p>
                        <p className="text-sm text-[#d3d8e8] mb-2">{certificate.date}</p>
                        <p className="text-sm text-[#a0aec0]">{certificate.description}</p>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {visibleCount < certificates.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={showMoreCertificates}
                        className="bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-2 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}

export default Certificates;
