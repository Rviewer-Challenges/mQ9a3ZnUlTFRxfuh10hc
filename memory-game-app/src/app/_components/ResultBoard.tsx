/** @format */

import React, { FC } from "react";

type resultBoardProps = {
    result: string;
    text: string;
};

const ResultBoard: FC<resultBoardProps> = ({ text, result }) => {
    return (
        <div className='bg-light-gray flex-1 w-full font-bold text-dark-blue flex justify-between items-center px-6 py-3 rounded-md '>
            <h3 className='text-sm lg:text-base'>{text}</h3>
            <span className='text-lg lg:text-xl '>{result}</span>
        </div>
    );
};

export default ResultBoard;
