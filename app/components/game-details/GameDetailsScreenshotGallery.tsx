import styles from './GameDetailsScreenshotGallery.module.css';
import { useRef, useState, useEffect } from 'react';

export default function GameDetailsScreenshotGallery({
    screenshots,
}: {
    screenshots: string[] | null;
}) {
    const galleryRef = useRef<HTMLUListElement>(null);
    const imgRef = useRef(null);
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    let currentImage = 0;
    let previousPos = 0;

    const nextImage = () => {
        if (
            galleryRef.current &&
            screenshots &&
            currentImage < screenshots.length - 1
        ) {
            const newPos = previousPos - (dimensions.width + 16);
            currentImage += 1;
            previousPos = newPos;
            galleryRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
        }
    };

    const previousImage = () => {
        if (galleryRef.current && screenshots && currentImage > 0) {
            const newPos = previousPos + (dimensions.width + 16);
            currentImage -= 1;
            previousPos = newPos;
            galleryRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
        }
    };

    return (
        <section className={styles.screenshots}>
            <div className={styles.galleryHeader}>
                <h3>Screenshots ({screenshots?.length ?? 0})</h3>
                <div className={styles.slideButtonContainer}>
                    <button onClick={previousImage}>
                        <img
                            src="/chevron-left.svg"
                            alt="imagen anterior"
                        ></img>
                    </button>
                    <button onClick={nextImage}>
                        <img src="/chevron-right.svg" alt="siguiente imagen" />
                    </button>
                </div>
            </div>
            {screenshots && (
                <ul className={styles.gallery} ref={galleryRef}>
                    {screenshots.map((screenshot, index) => {
                        return (
                            <li key={index} className={styles.imageContainer}>
                                <img src={screenshot} ref={imgRef}></img>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
