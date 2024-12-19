// src/components/layout/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/" 
        className="hover:text-blue-600 transition-colors"
      >
        Home
      </Link>
      
      {paths.map((path, index) => {
        if (index === 1) {
            return (
            <div key={path} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className={`capitalize ${
                    'hover:text-blue-600'
                }`}>
                {decodeURIComponent(path)}
                </span>
            </div>
            );
        }
        return null;
        })}
    </nav>
  );
}