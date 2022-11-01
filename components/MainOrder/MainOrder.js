import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../../styles/MainOrder.module.scss'

import PlatformChanger from '../PlatformChanger'
import MethodChanger from '../MethodChanger'
import CalcCoins from '../CalcCoins'
import Link from 'next/link'
import SvgContainer from '../SvgContainer'

import { whitearrow } from '../../data-svg/whitearrow'
import { ps4 } from '../../data-svg/ps4'
import { xbox } from '../../data-svg/xbox'
import { done } from '../../data-svg/done'

const MainOrder = () => {
    const isAuth = useSelector((state) => state.royalfutReducer.isAuth)
    const platform = useSelector((state) => state.royalfutReducer.platform)
    const order = useSelector((state) => state.royalfutReducer.order)

    let [hide, setHide] = useState({
        platform: true,
        coins: true,
        delivery: true,
    })
    let [activePlatform, setActivePlatfom] = useState({
        ps4: platform.ps ? true : false,
        ps5: false,
        xboxone: platform.ps ? false : true,
        xboxxs: false,
    })

    const dispatch = useDispatch()

    const onClickOption = (obj) => {
        setHide(obj)
    }
    const handleClickActivePlatform = (obj) => {
        setActivePlatfom(obj)
    }

    let currentPlatform = platform.ps ? ps4 : xbox

    let platformText = ''
    if (activePlatform.ps4) {
        platformText = 'Playstation 4'
    } else if (activePlatform.ps5) {
        platformText = 'Playstation 5'
    } else if (activePlatform.xboxone) {
        platformText = 'XBOX ONE'
    } else {
        platformText = 'XBOX XS'
    }
    return (
        <div className={`${styles.mainorder}`}>
            <div
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.platform && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: true,
                            delivery: true,
                            platform: false,
                        })
                    }
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Platform
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.platform && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {platformText}
                        </div>
                        <SvgContainer
                            item={currentPlatform}
                            //color="white"
                            classStyle={`${styles.mainorder_svg_platform}`}
                            stroke="transparent"
                        />
                        <div className={`${styles.mainorder_backgr_done} `}>
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${styles.mainorder_container_content} ${
                        hide.platform && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: true,
                                    ps5: false,
                                    xboxone: false,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.ps4
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_ps_active
                            }`}
                        >
                            <SvgContainer
                                item={ps4}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            Playstation 4
                        </button>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: true,
                                    xboxone: false,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.ps5
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_ps_active
                            }`}
                        >
                            <SvgContainer
                                item={ps4}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            Playstation 5
                        </button>
                    </div>
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: false,
                                    xboxone: true,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.xboxone
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_xbox_active
                            }`}
                        >
                            <SvgContainer
                                item={xbox}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            XBOX ONE
                        </button>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: false,
                                    xboxone: false,
                                    xboxxs: true,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.xboxxs
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_xbox_active
                            }`}
                        >
                            <SvgContainer
                                item={xbox}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            XBOX XS
                        </button>
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, platform: true })
                            }
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div className={`${styles.mainorder_divider}`} />
            </div>
            <div
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.coins && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: false,
                            delivery: true,
                            platform: true,
                        })
                    }
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Coins amount
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.coins && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {order.coins.amount.toLocaleString()} coins for{' '}
                            {order.currency.currency} {order.coins.price}
                        </div>

                        <div className={`${styles.mainorder_backgr_done} `}>
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${styles.mainorder_container_content_coins} ${
                        hide.coins && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <CalcCoins />
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, coins: true })
                            }
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div className={`${styles.mainorder_divider}`} />
            </div>
            <div
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.delivery && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: true,
                            delivery: false,
                            platform: true,
                        })
                    }
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Delivery method
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.delivery && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {order.method === 'easy'
                                ? 'Comfort trade'
                                : 'Player auction'}
                        </div>
                        <div className={`${styles.mainorder_backgr_done} `}>
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${styles.mainorder_container_content} ${
                        hide.delivery && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: true,
                                    ps5: false,
                                    xboxone: false,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.ps4
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_ps_active
                            }`}
                        >
                            <SvgContainer
                                item={ps4}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            Playstation 4
                        </button>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: true,
                                    xboxone: false,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.ps5
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_ps_active
                            }`}
                        >
                            <SvgContainer
                                item={ps4}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            Playstation 5
                        </button>
                    </div>
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: false,
                                    xboxone: true,
                                    xboxxs: false,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.xboxone
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_xbox_active
                            }`}
                        >
                            <SvgContainer
                                item={xbox}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            XBOX ONE
                        </button>
                        <button
                            onClick={() =>
                                handleClickActivePlatform({
                                    ps4: false,
                                    ps5: false,
                                    xboxone: false,
                                    xboxxs: true,
                                })
                            }
                            className={`${styles.mainorder_content} ${
                                !activePlatform.xboxxs
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_xbox_active
                            }`}
                        >
                            <SvgContainer
                                item={xbox}
                                color="white"
                                classStyle={`${styles.mainorder_svg_platform__btn}`}
                                stroke="transparent"
                            />
                            XBOX XS
                        </button>
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, delivery: true })
                            }
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div className={`${styles.mainorder_divider}`} />
            </div>
        </div>
    )
}

export default MainOrder
