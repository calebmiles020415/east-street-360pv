export const Navbar = () => {
    return (
        <div className="  bg-foxy-gray-matter h-16 border-b border-foxy-mist-gray w-full  ">
            <div
                style={{ position: 'relative' }}
                className="flex flex-row items-center h-16 mx-auto"
            >
                <div className="flex flex-row items-start px-4 sm:px-6 lg:px-8 ">
                    <img
                        src="/images/Foxy_Logo_Full_Colour_Solid_Dark_150dpi.png"
                        style={{ width: '150px', marginLeft: '10px' }}
                        alt="logo"
                    />
                </div>
            </div>
        </div>
    );
};
