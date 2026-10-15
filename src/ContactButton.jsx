import React from 'react';
import { Button } from '@radix-ui/themes/components/button';
import { Theme } from '@radix-ui/themes/components/theme';
import { ArrowUpRight } from 'lucide-react';

export function ContactButton() {
  return <Theme asChild appearance="light" accentColor="gray" grayColor="sand" radius="medium" hasBackground={false}>
    <span className="contact-button-theme">
      <Button asChild variant="solid" color="gray" highContrast size="3" radius="medium" className="contact-button">
        <a href="mailto:rezahasan1198@gmail.com">Let’s talk <ArrowUpRight size={16} aria-hidden="true"/></a>
      </Button>
    </span>
  </Theme>;
}
