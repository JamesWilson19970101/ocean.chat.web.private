'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/http/auth';

export function RegisterForm() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const formSchema = z
    .object({
      username: z.string().min(1, { message: t('invalidUsername') }),
      password: z.string().min(6, { message: t('passwordMinLength') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDontMatch'),
      path: ['confirmPassword'],
    });

  type RegisterFormValues = z.infer<typeof formSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    setGlobalError(null);

    try {
      await authService.register({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      router.push('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message
        ? error.response.data.message
        : error instanceof Error
          ? error.message
          : '';
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {globalError && (
          <div className="text-red-500 text-sm text-center mb-4">
            {globalError}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-end">
              <FormLabel className="text-sm text-gray-100 dark:text-gray-300 mb-1 mr-1">
                {t('username')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('usernamePlaceholder')}
                  type="text"
                  {...field}
                  className="w-full h-[clamp(40px,6vh,50px)] px-[clamp(1rem,3vw,1.5rem)] text-base text-gray-900 bg-white rounded-full border-0 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 mt-1 self-start">
                {form.formState.errors.username?.message || ' '}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-end">
              <FormLabel className="text-sm text-gray-100 dark:text-gray-300 mb-1 mr-1">
                {t('password')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('passwordPlaceholder')}
                  type="password"
                  {...field}
                  className="w-full h-[clamp(40px,6vh,50px)] px-[clamp(1rem,3vw,1.5rem)] text-base text-gray-900 bg-white rounded-full border-0 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 mt-1 self-start" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col items-end">
              <FormLabel className="text-sm text-gray-100 dark:text-gray-300 mb-1 mr-1">
                {t('confirmPassword')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('confirmPasswordPlaceholder')}
                  type="password"
                  {...field}
                  className="w-full h-[clamp(40px,6vh,50px)] px-[clamp(1rem,3vw,1.5rem)] text-base text-gray-900 bg-white rounded-full border-0 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400 mt-1 self-start" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between pt-4">
          <Link
            href="/login"
            className="text-sm text-gray-1000 dark:text-gray-200 hover:underline"
          >
            {t('alreadyRegistered')}
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#3E4772] rounded-full hover:bg-[#303858] focus:outline-none focus:ring focus:ring-[#3E4772] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('loading') : t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
