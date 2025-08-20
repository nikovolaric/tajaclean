import { cookies } from "next/headers";
import Script from "next/script";

async function GoogleAnalytics() {
  const cookieStore = await cookies();

  const session = cookieStore.get("analytics_consent")?.value;

  return (
    <>
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.MEASUREMENT_ID}`}
        />
        {session === "true" && (
          <Script id="" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                });
                `}
          </Script>
        )}
      </>
    </>
  );
}

export default GoogleAnalytics;
