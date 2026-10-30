import React, { useEffect, useState } from 'react';

// Keep one stable counter across production domains and exclude local previews.
const counterUrl = 'https://hits.sh/rezaalhasan.netlify.app/about';

export default function VisitorTracker() {
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
    setLive(import.meta.env.PROD && !localHost);
  }, []);

  return <aside className="about-visitors" aria-label="About page visitor counter">
    <span>Thanks for stopping by.</span>
    {live && !failed ? <a href={`${counterUrl}/`} target="_blank" rel="noreferrer" title="About page views, including repeat visits">
      <img
        src={`${counterUrl}.svg?label=About%20page%20views&color=303030&labelColor=eeeeee`}
        alt="About page view count, including repeat visits"
        height="20"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </a> : <span className="about-visitors-status">{failed ? 'View count unavailable' : 'View count available on the live site'}</span>}
  </aside>;
}
