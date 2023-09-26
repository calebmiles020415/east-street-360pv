interface Props {
    text?: string;
    type?: string;
}

export const Spinner = ({ text = 'Loading', type = 'flex-row' }: Props) => {
    return (
        <div className={'flex justify-center items-center p-4 gap-4 ' + type}>
            <span>{text}</span>
            <div
                className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-foxy-myrtle-green"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
