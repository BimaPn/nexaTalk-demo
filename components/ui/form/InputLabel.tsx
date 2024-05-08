export default function InputLabel({ forInput, value, className,textarea=false }:{forInput:string,value: string,className?:string,textarea?:boolean}) {
    return (
        <label 
        htmlFor={forInput} 
        className={`absolute text-sm text-semiDark dark:text-dark-semiLight duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-dark-semiDark px-2 peer-focus:px-2 
        peer-focus:text-gray-700 dark:peer-focus:text-dark-light peer-placeholder-shown:scale-100 
        ${textarea ? "peer-placeholder-shown:-translate-y-1/4 peer-placeholder-shown:top-1/4"
        : "peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2"} 
        peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1 ${className}`}>
            {value}
        </label>
    );
}
