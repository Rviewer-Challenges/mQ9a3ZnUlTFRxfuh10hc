'use client'
import classNames from 'classnames'
import React, { FC, ReactElement } from 'react'

type cardCircleProps = {
    icon: ReactElement
    selected: boolean
    disabled: boolean
    gridSize: number
}

const CardCircle: FC<cardCircleProps> = ({ selected, disabled, icon, gridSize }) => {
    return (
        <div
            className={classNames(
                'text-white cursor-pointer rounded-full flex justify-center items-center transition ease-in delay-150 transform hover:translate-x-1',
                {
                    'pointer-events-none': selected,
                    'bg-navy-blue': !selected,
                    'bg-light-gray': selected && disabled,
                    'bg-orange-color': selected && !disabled,
                }
            )}
            style={{
                width: gridSize === 6 ? '46px' : '65px',
                height: gridSize === 6 ? '46px' : '65px',
                fontSize: gridSize === 6 ? '24px' : '40px',
            }}
        >
            <button
                className={classNames({
                    hidden: !selected,
                })}
            >
                {icon}
            </button>
        </div>
    )
}

export default CardCircle
