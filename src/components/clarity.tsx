import Script from "next/script";

interface ClarityProps {
  projectId: string;
}

/**
 * Microsoft Clarity heatmaps and session replays. Loads after the page is
 * interactive so it never competes with first paint. With no consent signal,
 * Clarity runs cookieless for EEA visitors, so no banner is needed for it to load.
 */
export function Clarity({ projectId }: ClarityProps) {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(projectId)});`}
    </Script>
  );
}
