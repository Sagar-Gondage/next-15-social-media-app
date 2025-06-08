import { useInView } from "react-intersection-observer";

export default function InfiniteScrollContainer({
    children,
    onBottomReached,
    className
}) {
    const { ref } = useInView({
        rootMargin: "200px",
        onChange(inView) {
            if (inView) {
                onBottomReached();
            }
        }
    });

    return (
        <div className={className}>
            {children}
            <div ref={ref} />
        </div>
    );
}
