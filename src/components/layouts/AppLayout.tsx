import React from 'react';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen w-full">
                <div className="flex flex-col  grow-[100] w-full self-center justify-start items-center">
                    {children}
                </div>
            </div>
        </>
    );
};
