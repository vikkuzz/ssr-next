import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insta } from '../../data-svg/insta';
import { twitter } from '../../data-svg/twitter';
import { youtube } from '../../data-svg/youtube';
import { translates } from '../../locales/locales';
import { changePlatform, order } from '../../redux/actions/royalfutActions';

import styles from '../../styles/Footer.module.scss';
import Dropdown from '../Dropdown';
import SvgContainer from '../SvgContainer';

const Footer = () => {
    const locale = useSelector((state) => state.royalfutReducer.locale);
    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];

    return (
        <div className={`${styles.footer}`}>
            <div className={`${styles.footer_firstcolumn}`}>
                <div className={`${styles.footer_header}`}>
                    {t.footerContact}
                </div>
                <div className={`${styles.footer_infowrapper}`}>
                    <div
                        className={`${styles.footer_info_item} ${styles.footer_info_font}`}
                    >
                        Yasha Limited, Office 908H Nicolaou Pentadromos Center,
                        Limassol, Cyprus
                    </div>
                    <div className={'row from-1025-to-1900'}>
                        <SvgContainer
                            item={insta}
                            color="white"
                            hover="gold"
                            classStyle={'width25'}
                        />
                        <SvgContainer
                            item={twitter}
                            color="white"
                            hover="gold"
                            classStyle={'width25'}
                        />
                        <SvgContainer
                            item={youtube}
                            color="white"
                            hover="gold"
                            classStyle={'width25'}
                        />
                    </div>
                    <div
                        className={
                            `${styles.footer_icons_container}` +
                            ' from-375-to-1024'
                        }
                    >
                        <Dropdown />
                    </div>
                    <div className="from-1025-to-1900 column">
                        <div className={`${styles.footer__svg_wrapper}`}>
                            <div
                                className={`${styles.footer__mastercard} ${styles.footer_svg}`}
                            ></div>
                            <div
                                className={`${styles.footer__veryvisa} ${styles.footer_svg}`}
                            ></div>
                            <div
                                className={`${styles.footer__visa} ${styles.footer_svg}`}
                            ></div>
                            <div
                                className={`${styles.footer__master} ${styles.footer_svg}`}
                            ></div>
                            <div
                                className={`${styles.footer__apple} ${styles.footer_svg}`}
                            ></div>
                        </div>
                        <Link href={'/'} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart} ${styles.royalfut}`}
                            >
                                ROYALFUT 2020-2023
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`${styles.footer_secondcolumn}`}>
                <div className={`${styles.footer_center_wrapper}`}>
                    <div className={`${styles.footer_header}`}>
                        {t.footerPlatforms}
                    </div>
                    <div className={`${styles.footer_infowrapper}`}>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link href={`/order/ps4`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('ps'));
                                    }}
                                >
                                    PS4
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item} `}>
                            <Link href={`/order/ps5`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('ps'));
                                    }}
                                >
                                    PS5
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link
                                href={`/order/xbox_one`}
                                locale={locale.title}
                            >
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('xbox'));
                                    }}
                                >
                                    Xbox One
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link
                                href={`/order/xbox_series_x`}
                                locale={locale.title}
                            >
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('xbox'));
                                    }}
                                >
                                    Xbox Series X|S
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.footer_thirdcolumn} from-375-to-1024`}
                >
                    <div className={`${styles.footer_header}`}>
                        {t.footerInfo}
                    </div>
                    <div className={`${styles.footer_infowrapper}`}>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link href={`/contact`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                >
                                    {t.footerLinkContact}
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item} `}>
                            <Link href={`/delivery`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                >
                                    {t.footerLinkDelivery}
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link href={`/payment`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                >
                                    {t.footerLinkPayment}
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.footer_platform_item}`}>
                            <Link href={`/terms`} locale={locale.title}>
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                >
                                    {t.footerLinkTerms}
                                </a>
                            </Link>
                        </div>
                        {/* <div className={`${styles.footer_platform_item}`}>
                            <Link
                                href={`/privacy-policy`}
                                locale={locale.title}
                            >
                                <a
                                    className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                                >
                                    {t.footerLinkPrivacyPolicy}
                                </a>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={'row from-375-to-1024'}>
                <SvgContainer
                    item={insta}
                    color="white"
                    hover="gold"
                    classStyle={'width25'}
                />
                <SvgContainer
                    item={twitter}
                    color="white"
                    hover="gold"
                    classStyle={'width25'}
                />
                <SvgContainer
                    item={youtube}
                    color="white"
                    hover="gold"
                    classStyle={'width25'}
                />
            </div>
            <div
                className={
                    `${styles.footer_icons_container}` +
                    ' from-375-to-1024 column'
                }
            >
                <div className={`${styles.footer__svg_wrapper}`}>
                    <div
                        className={`${styles.footer__mastercard} ${styles.footer_svg}`}
                    ></div>
                    <div
                        className={`${styles.footer__veryvisa} ${styles.footer_svg}`}
                    ></div>
                    <div
                        className={`${styles.footer__visa} ${styles.footer_svg}`}
                    ></div>
                    <div
                        className={`${styles.footer__master} ${styles.footer_svg}`}
                    ></div>
                    <div
                        className={`${styles.footer__apple} ${styles.footer_svg}`}
                    ></div>
                </div>
                <Link href={'/'} locale={locale.title}>
                    <a
                        className={`${styles.footer_info_font} ${styles.footer_flexstart} ${styles.royalfut}`}
                    >
                        ROYALFUT 2020-2023
                    </a>
                </Link>
            </div>
            <div className={`${styles.footer_thirdcolumn} from-1025-to-1900`}>
                <div className={`${styles.footer_header}`}>{t.footerInfo}</div>
                <div className={`${styles.footer_infowrapper}`}>
                    <div className={`${styles.footer_platform_item}`}>
                        <Link href={`/contact`} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                            >
                                {t.footerLinkContact}
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.footer_platform_item} `}>
                        <Link href={`/delivery`} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                            >
                                {t.footerLinkDelivery}
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.footer_platform_item}`}>
                        <Link href={`/payment`} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                            >
                                {t.footerLinkPayment}
                            </a>
                        </Link>
                    </div>
                    <div className={`${styles.footer_platform_item}`}>
                        <Link href={`/terms`} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                            >
                                {t.footerLinkTerms}
                            </a>
                        </Link>
                    </div>
                    {/* <div className={`${styles.footer_platform_item}`}>
                        <Link href={`/privacy-policy`} locale={locale.title}>
                            <a
                                className={`${styles.footer_info_font} ${styles.footer_flexstart}`}
                            >
                                {t.footerLinkPrivacyPolicy}
                            </a>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Footer;
