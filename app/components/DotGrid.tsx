'use client';

export default function DotGrid() {
  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      style={{
        backgroundImage: `
          radial-gradient(circle, hsl(var(--muted-foreground) / 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0',
      }}
    />
  );
}
