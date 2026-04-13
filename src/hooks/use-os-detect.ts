'use client';

import { useState, useEffect } from 'react';

export type OsType = 'mac' | 'windows' | 'linux';

export function useOsDetect(): OsType | null {
  const [os, setOs] = useState<OsType | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() ?? '';

    if (platform.includes('mac') || ua.includes('macintosh')) {
      setOs('mac');
    } else if (platform.includes('win') || ua.includes('windows')) {
      setOs('windows');
    } else if (platform.includes('linux') || ua.includes('linux')) {
      setOs('linux');
    } else {
      setOs('mac'); // sensible default
    }
  }, []);

  return os;
}
