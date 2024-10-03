'use client';

import { usePageAuth } from '@/src/utils/hooks';
import LoginPage from '@components/Login';

export default function Home() {
  usePageAuth();
  return <LoginPage />;
}
