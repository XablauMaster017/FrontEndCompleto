import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CadastroClient from './CadastroClient';

export const metadata = {
  title: 'Criar conta — SmarTax',
  description: 'Crie sua conta para acessar as ferramentas da SmarTax.',
  robots: { index: false, follow: false },
};

export default function CadastroPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight text-white min-h-screen flex items-center justify-center px-6 py-32">
        <Suspense>
          <CadastroClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
