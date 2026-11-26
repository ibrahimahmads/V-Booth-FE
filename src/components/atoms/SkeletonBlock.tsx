export default function SkeletonBlock({ className = '' }: { className?: string }){
    return(
        <div className={`animate-pulse rounded-xl bg-canvas-placeholder ${className}`} />
    );
}