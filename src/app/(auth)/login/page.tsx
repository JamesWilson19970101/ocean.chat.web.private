'use client'; // This directive indicates it's a Client Component

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the validation schema using Zod
const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

// Define the type for the form values based on the schema
type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  // 1. Define your form.
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormValues) {
    // Do something with the form values.
    // This is where you would typically send the data to your API endpoint (/api/auth/register)
    // Example: console.log(values);
    console.log('Form submitted with values:', values);
  }

  return (
    <Card className="border-0 shadow-none w-full max-w-md mx-auto my-auto bg-transparent">
      {' '}
      {/* Remove card border/shadow */}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-700 dark:text-white md:text-[60px] md:leading-[84px] md:tracking-normal md:text-[#3E4772]">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end">
                  <FormLabel className="text-sm text-gray-100 dark:text-gray-300 mb-1 mr-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...form.register('email')}
                      placeholder="Please enter your email"
                      type="email"
                      {...field}
                      className="w-full px-6 py-3 text-gray-900 bg-white rounded-full border-0 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 mt-1 self-start">
                    {form.formState.errors.email?.message || ' '}
                  </FormMessage>

                  {/* Displays validation errors */}
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col items-end">
                  <FormLabel className="text-sm text-gray-100 dark:text-gray-300 mb-1 mr-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter your password"
                      type="password"
                      {...field}
                      className="w-full px-6 py-3 text-gray-900 bg-white rounded-full border-0 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400 mt-1 self-start" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4">
              {' '}
              {/* Added padding-top */}
              <Link
                href="/register"
                className="text-sm text-gray-1000 dark:text-gray-200 hover:underline"
              >
                Do not have account?
              </Link>
              {/* Submit Button - Styled */}
              <Button
                type="submit"
                // Updated Button styles
                className="px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#3E4772] rounded-full hover:bg-[#303858] focus:outline-none focus:ring focus:ring-[#3E4772] focus:ring-opacity-50"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
