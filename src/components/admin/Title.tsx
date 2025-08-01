type TitleProps = {
    title: string;
    subtitle: string;
}

const Title: React.FC<TitleProps> = ({title, subtitle}) => {
    return (
        <div>
            <h2 className="font-rubik font-semibold !text-black text-2xl mb-2">{title}</h2>
            <p className="font-open-sans font-semibold text-base !text-black/80">{subtitle}</p>
        </div>
    )
} 

export default Title
