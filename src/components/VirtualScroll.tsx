import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

export const VirtualScroll = ({ children }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const isSmallRef = useRef(false);
  const [isSmall, setIsSmall] = useState(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const measure = () => {
    const h = contentRef.current?.scrollHeight || 0;
    const vh = window.innerHeight;
    setMaxScroll(Math.max(0, h - vh));
  };

  const apply = () => {
    if (!contentRef.current) return;
    if (isSmallRef.current) return;
    contentRef.current.style.transform = `translate3d(0,${-posRef.current}px,0)`;
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => {
      setIsSmall(mq.matches);
      isSmallRef.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isSmall) {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return () => {};
    }
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(measure);
    const frame = () => {
      posRef.current += (targetRef.current - posRef.current) * 0.12;
      if (Math.abs(targetRef.current - posRef.current) < 0.5) posRef.current = targetRef.current;
      apply();
      setProgress(maxScroll ? posRef.current / maxScroll : 0);
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener('resize', onResize);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + e.deltaY, 0, maxScroll);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const dy = touchStartY - y;
      targetRef.current = clamp(targetRef.current + dy, 0, maxScroll);
      touchStartY = y;
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      const step = 80;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        targetRef.current = clamp(targetRef.current + step, 0, maxScroll);
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetRef.current = clamp(targetRef.current - step, 0, maxScroll);
      }
    };
    window.addEventListener('keydown', onKey);
    const onAnchor = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const to = rect.top + posRef.current;
      targetRef.current = clamp(to - 80, 0, maxScroll);
    };
    document.addEventListener('click', onAnchor);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    if (contentRef.current) ro.observe(contentRef.current);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onAnchor);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isSmall, maxScroll]);

  return (
    <>
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
      {!isSmall && (
        <div className="fixed right-0 top-0 z-50 h-screen w-2.5 bg-black/5">
          <motion.div
            className="w-full rounded-full"
            style={{ backgroundColor: '#b7d5e5' }}
            initial={{ height: 0 }}
            animate={{ height: `${Math.round(progress * 100)}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
      )}
    </>
  );
};
