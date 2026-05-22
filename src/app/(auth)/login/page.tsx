import React from 'react';

import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata() {
  const t = await getTranslations('Auth');
  return {
    title: `${t('login')} - Ocean Chat`,
  };
}

export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <Card className="border-0 shadow-none w-[clamp(280px,80vw,500px)] mx-auto my-auto bg-transparent">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-700 dark:text-white md:text-[60px] md:leading-[84px] md:tracking-normal md:text-[#3E4772]">
          {t('login')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
