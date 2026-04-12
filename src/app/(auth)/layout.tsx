// /app/(auth)/layout.tsx
import React from 'react';

import Image from 'next/image'; // Import Image component for layout images

// Import images needed for the layout
// Adjust paths if your layout file is located differently relative to /public
import cloud from '../../../public/cloud.webp'; // Adjusted path relative to /app/(auth)/layout.tsx
import moon from '../../../public/moon.webp'; // Adjusted path relative to /app/(auth)/layout.tsx
import somebody from '../../../public/somebody.webp'; // Adjusted path relative to /app/(auth)/layout.tsx

// Define the props type, expecting children which will be the page content
interface AuthLayoutProps {
  children: React.ReactNode;
}

// Define the layout component
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Main container structure (from page.tsx)
    <div className="flex justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Overall layout container (from page.tsx) */}
      <div className="relative flex w-full h-full overflow-hidden rounded-sm shadow-lg bg-gradient-to-b from-[#397DEA] to-[rgba(83,147,245,0)]">
        {/* Left Side: Image Panel (Shared Structure) */}
        <div className="relative w-0 lg:w-1/2 opacity-0 lg:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
          {/* Moon image */}
          <Image
            src={moon}
            alt="moon"
            width={204}
            height={202}
            className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[21.25%] max-w-[204px] h-auto object-contain transition-all duration-700 ease-in-out"
            priority
          />
          {/* Cloud image */}
          <Image
            src={cloud}
            alt="cloud"
            width={540}
            height={236}
            className="absolute left-[5%] top-[35%] w-[56.25%] max-w-[540px] h-auto object-contain transition-all duration-700 ease-in-out"
            priority
          />
          {/* Somebody image */}
          <Image
            src={somebody}
            alt="somebody"
            width={67.5}
            height={221.5}
            className="absolute bottom-[10%] right-[10%] w-[7%] max-w-[67.5px] h-auto object-contain transition-all duration-700 ease-in-out"
            priority
          />
        </div>

        {/* Right Side: Content Area for Pages */}
        {/* This div wraps the actual page content (login/register form) */}
        <div className="w-full flex overflow-y-auto px-6 py-8 md:px-8 lg:w-1/2 transition-all duration-700 ease-in-out">
          {/* The {children} prop renders the content of the specific page (page.tsx) */}
          {children}
        </div>
      </div>
    </div>
  );
}
