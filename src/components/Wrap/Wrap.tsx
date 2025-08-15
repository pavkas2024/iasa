import style from "./Wrap.module.css";

const ContainerWrap = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={style.container}>
            {children}
        </div> 
    )
};

export default ContainerWrap;