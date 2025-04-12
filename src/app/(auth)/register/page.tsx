// /app/(auth)/register/page.tsx
"use client"; // This directive indicates it's a Client Component

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the validation schema using Zod
const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"], // Point the error to the confirmPassword field
  });

// Define the type for the form values based on the schema
type RegisterFormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  // 1. Define your form.
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterFormValues) {
    // Do something with the form values.
    // This is where you would typically send the data to your API endpoint (/api/auth/register)
    // Example: console.log(values);
    console.log("Form submitted with values:", values);
    // Add your API call logic here
    // e.g., fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(values) })
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative flex w-full h-full overflow-hidden bg-white rounded-sm shadow-lg dark:bg-gray-800">
        {/* Left Side: Image and Text */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          // IMPORTANT: Replace with your actual image path in the /public folder
          style={{ backgroundImage: "url('/oc-960x1080.png')" }}
          // Fallback background color if the image fails to load
          // You can adjust the color to better match your image
          onError={(e) => (e.currentTarget.style.backgroundColor = "#60a5fa")} // Example blue fallback
        >
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full flex overflow-y-auto px-6 py-8 md:px-8 lg:w-1/2 bg-gradient-to-b from-[#397DEA] to-[rgba(83,147,245,0)]">
          <Card className="border-0 shadow-none w-full max-w-md mx-auto my-auto bg-transparent">
            {" "}
            {/* Remove card border/shadow */}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-700 dark:text-white">
                Register your account
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Create an account to start chatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-200">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter your email"
                            type="email"
                            {...field}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </FormControl>
                        <FormMessage /> {/* Displays validation errors */}
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-200">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter your password"
                            type="password"
                            {...field}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 dark:text-gray-200">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm your password"
                            type="password"
                            {...field}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already Registered?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
