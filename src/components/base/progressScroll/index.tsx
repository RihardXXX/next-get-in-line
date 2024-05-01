'use client';

import { CircularProgress } from '@nextui-org/react';
import { useEffect, useState } from 'react';

function throttle(callbackFn: Function, limit: number) {
    let wait = false;

    return function () {
        if (!wait) {
            callbackFn();
            wait = true;

            setTimeout(function () {
                wait = false;
            }, limit);
        }
    };
}

function ProgressScroll() {
    const [progress, setProgress] = useState(0);
    const [isShowProgress, setIsShowProgress] = useState(false);

    useEffect(() => {
        const elem = document.querySelector('main');

        if (!elem) return;

        const handleScroll = () => {
            setIsShowProgress(true);
            const scrollTop = elem.scrollTop;
            const scrollHeight = elem.scrollHeight;
            const clientHeight = elem.clientHeight;
            // простая логика
            // из всей высоты скролла отнимаем вью порт просмотра и его сравниваем со значением на сколько проскролили
            const newProgress = Math.round(
                (scrollTop / (scrollHeight - clientHeight)) * 100,
            );

            setProgress(newProgress);
        };

        elem.addEventListener('scroll', throttle(handleScroll, 10));

        return () => {
            elem.removeEventListener('scroll', throttle(handleScroll, 10));
            setIsShowProgress(false);
        };
    }, []);

    return (
        <>
            {isShowProgress && (
                <CircularProgress
                    aria-label="Loading..."
                    size="md"
                    value={progress}
                    color="success"
                    showValueLabel={true}
                    className="fixed top-0 left-0 z-50"
                />
            )}
        </>
    );
}

export default ProgressScroll;
