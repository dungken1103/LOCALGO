
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full">
                {
                    progress !== 0 && (
                        <div
                            style={{left: `calc(${progress}% - 40px)`}}
                            className={`bg-brand rounded-[5px] absolute top-[-40px] text-white px-2 py-0.5 before:w-[8px] before:h-[8px] before:bg-brand before:absolute before:bottom-[-4px] before:left-[35%] before:transform before:translate-x-1/2 before:rotate-[45deg]`}>
                            {progress}%
                        </div>
                    )
                }
                <div className="absolute top-0 left-0 bg-brand h-full rounded-full"
                     style={{width: `${progress}%`}}></div>
            </div>

            <button onClick={handleStartLoading}
                    className={`bg-blue-500 rounded-md text-[0.8rem] px-2 py-1`}>Start Loading
            </button>
        </>
    );
};

export default ProgressBar;
                                