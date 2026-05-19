import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

/**
 * Next-intl configuration for Server Components.
 * Resolves the locale from cookies or the Accept-Language header.
 */
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // 1. Check for the NEXT_LOCALE cookie (set by our proxy or user)
  let locale = cookieStore.get('NEXT_LOCALE')?.value;

  // 2. Fallback to Accept-Language header
  if (!locale) {
    const acceptLanguage = headerStore.get('accept-language');
    if (acceptLanguage) {
      // Basic detection: check if 'en' is preferred over 'zh'
      locale = acceptLanguage.startsWith('en') ? 'en' : 'zh';
    }
  }

  // 3. Final fallback
  if (!locale || !['en', 'zh'].includes(locale)) {
    locale = 'zh';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
