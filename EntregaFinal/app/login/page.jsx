import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Entrar — SmarTax',
  description: 'Acesse as ferramentas da SmarTax.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight text-white min-h-screen flex items-center justify-center px-6 py-32">
        <Suspense>
          <LoginClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
