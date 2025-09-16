// src/components/ui/Skeleton.jsx
export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-700 ${className}`} />;
}
