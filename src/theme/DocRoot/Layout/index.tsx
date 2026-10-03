import React, {type ReactNode} from 'react';
export default function DocRootLayout({children}: {children: ReactNode}) {
  return <main className="portfolio-doc-root">{children}</main>;
}
