export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.215, 0.610, 0.355, 1.000], // Professional cubic-bezier
        }
    })
};

export const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const parallaxY = (progress: any, range: [number, number]) => {
    // Range is typically [-offset, offset]
    return {
        y: progress * (range[1] - range[0]) + range[0]
    };
};

export const spotlightEffect = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
    }
};
