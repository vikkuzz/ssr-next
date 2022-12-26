import React, { useEffect, useState } from 'react';
import SecureLS from 'secure-ls';
import { useDispatch, useSelector } from 'react-redux';
import flagLangs from '../../data-elements/countries';
import currency from '../../data-elements/currency';
import { useOutsideAlerter, useOutsideClick } from '../../utils/hooks';

import styles from '../../styles/Dropdown.module.scss';
import Link from 'next/link';
import {
    stock,
    currentLang,
    currentCurrency,
    changeDir,
} from '../../redux/actions/royalfutActions';
import { useRouter } from 'next/router';

const ISSERVER = typeof window === 'undefined'; //чтоб не было ошибки на сервере об отсутствии локалстора
let ls = null;

if (!ISSERVER) {
    ls = new SecureLS();
}

const DropdownContent = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pathname, asPath, query } = router;
    const changeLang = (e) => {
        dispatch(currentLang(e.target.id));
        if (e.target.id === 'ar') {
            dispatch(changeDir('rtl'));
        } else {
            dispatch(changeDir('ltr'));
        }
    };

    return (
        <div className={`${styles.dropdown__scroll}`}>
            {data.map((el) => {
                return (
                    <Link
                        key={el.id}
                        id={el.title}
                        href={`${pathname}`}
                        locale={el.title}
                    >
                        <a
                            id={el.title}
                            className={`${styles.dropdown__content_item}`}
                            onClick={changeLang}
                        >
                            <img
                                id={el.title}
                                className={`${styles.dropdown__content_item_img}`}
                                src={el.url}
                            />

                            <div
                                id={el.title}
                                className={`${styles.dropdown__content_item_title_country}`}
                            >
                                {el.country}
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

const DropdownCurrencyContent = ({ data }) => {
    const dispatch = useDispatch();

    const changeCurrency = (e) => {
        //e.stopPropagation();
        dispatch(currentCurrency(e.target.id));
    };

    return (
        <div className={`${styles.dropdown__scroll} ${styles.drop_currency}`}>
            {data.map((el) => {
                return (
                    <button
                        id={el.title}
                        key={el.id}
                        className={`${styles.dropdown__content_item}`}
                        onClick={changeCurrency}
                    >
                        <img
                            id={el.title}
                            className={`${styles.dropdown__content_item_img}`}
                            src={el.url}
                        />
                        <div
                            id={el.title}
                            className={`${styles.dropdown__content_item_title_country}`}
                        >
                            {`${el.title}`}
                            {/* {`${el.title} ${el.currency}`} */}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

const DropdownLang = () => {
    //const stock = useSelector((state) => state.royalfutReducer.stock);
    const lang = useSelector((state) => state.royalfutReducer.locale);
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const currentCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(router);
    }, [router]);
    useEffect(() => {
        let localState = null;

        let browserLanguage =
            window.navigator.userLanguage || window.navigator.language;
        browserLanguage = browserLanguage.split('-')[0];

        let lang = flagLangs.filter(
            (el) => el.title === browserLanguage.toLowerCase()
        )[0];

        if (!stateUser && router.locale === 'en') {
            dispatch(currentLang(lang.title));
            if (lang.title === 'ar') {
                dispatch(changeDir('rtl'));
            } else {
                dispatch(changeDir('ltr'));
            }
            router.push({ pathname, query }, asPath, { locale: lang.title });
        } else {
            dispatch(currentLang(router.locale));
            if (router.locale === 'ar') {
                dispatch(changeDir('rtl'));
            } else {
                dispatch(changeDir('ltr'));
            }
        }
        //dispatch(currentLang(lang.title));
        //router.push({ pathname, query }, asPath, { locale: lang.title });
    }, []);

    return (
        <div className={`${styles.countries}`}>
            {console.log(lang)}
            <div className={`${styles.locale}`}>
                <div className={`${styles.circle}`}>
                    <img
                        className={`${styles.dropdown__country_img}`}
                        src={`${lang.url}` || localeIcon}
                    />
                </div>
                {/* <span className={`from-375-to-1024 bcgr-transparent`}>
                    {lang.title || 'EN'}
                </span> */}
                <span className={`bcgr-transparent`}>
                    {lang.country || 'ENGLISH'}
                </span>
                <div className={`${styles.dropdown__arrow}`} />
            </div>
            {/* <div className={`${styles.divider} from-375-to-1024`}>|</div> */}
            {/* <div className={`${styles.currency} from-375-to-1024`}>
                {currentCurrency.title || 'USD'}
                <div className={`${styles.dropdown__arrow}`} />
            </div> */}
        </div>
    );
};

const DropdownMobile = () => {
    const stock = useSelector((state) => state.royalfutReducer.stock);
    const currencyUser = useSelector((state) => state.royalfutReducer.currency);
    const localeUser = useSelector((state) => state.royalfutReducer.locale);
    const contentMobileRef = React.createRef();
    const langMobile = React.createRef();
    const langRefMobile = React.createRef();
    const currMobile = React.createRef();
    const currencyRefMobile = React.createRef();

    useOutsideAlerter(langMobile, langRefMobile, 'hide');
    useOutsideAlerter(currMobile, currencyRefMobile, 'hide');

    function hideContent(ref) {
        ref.current.classList.toggle('hide');
    }

    return (
        <div
            ref={contentMobileRef}
            className={`${styles.dropdown__wrapper_content_mobile}`}
        >
            <div
                ref={langMobile}
                className={`${styles.dropdown__wrapper_language}`}
            >
                <div className={`${styles.dropdown__title_language}`}>
                    Language
                </div>
                <div
                    className={`${styles.dropdown__wrapper_dropdown_lang}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        hideContent(langRefMobile);
                    }}
                >
                    <img
                        className={`${styles.dropdown__country_img}`}
                        src={`${localeUser.url || '/img/flag/UK-lang.svg'}`}
                    />
                    <div
                        className={`${styles.dropdown__country_name} ${styles.dropdown__country_name_mobile}`}
                    >
                        {localeUser.country || 'English'}
                    </div>
                    <div className={`${styles.dropdown__arrow}`} />
                </div>
                <div className={`${styles.dropdown__wrapper_mobile_dropdown}`}>
                    <div
                        ref={langRefMobile}
                        className={`${styles.dropdown__content} ${styles.dropdown__content_language} hide`}
                    >
                        <DropdownContent data={flagLangs} />
                    </div>
                </div>
            </div>
            <div
                ref={currMobile}
                className={`${styles.dropdown__wrapper_currency}`}
            >
                <div className={`${styles.dropdown__title_currency}`}>
                    Currency
                </div>
                <div
                    className={`${styles.dropdown__wrapper_dropdown_curr}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        hideContent(currencyRefMobile);
                    }}
                >
                    <div className={`${styles.dropdown__currency_name}`}>
                        {currencyUser.title || 'USD'}
                    </div>
                    <div className={`${styles.dropdown__currency_icon}`}>
                        {currencyUser.currency || '$'}
                    </div>
                    <div className={`${styles.dropdown__arrow}`} />
                </div>
                <div className={`${styles.dropdown__wrapper_mobile_dropdown}`}>
                    <div
                        ref={currencyRefMobile}
                        className={`${styles.dropdown__content} ${styles.dropdown__content_language} hide`}
                    >
                        <DropdownCurrencyContent data={currency} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dropdown = () => {
    const stock = useSelector((state) => state.royalfutReducer.stock);
    const currentCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const countryRef = React.createRef();
    const currencyRef = React.createRef();
    const countryCurrencyRef = React.createRef();

    function hideContent(ref) {
        ref.current.classList.toggle('hide');
    }

    useOutsideClick(countryCurrencyRef, 'hide');

    const onClickBlock = (e, ref) => {
        e.stopPropagation();
        console.log('click');
        hideContent(ref);
    };

    const onMouseEnterBlock = (e, ref) => {
        e.stopPropagation();
        console.log('enter');
        hideContent(ref);
    };

    const onMouseLeaveBlock = (e, ref) => {
        e.stopPropagation();
        hideContent(ref);
    };

    return (
        <div className={`${styles.dropdown_container}`}>
            <div
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseEnterBlock(e, countryRef)
                        : null;
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseLeaveBlock(e, countryRef)
                        : null;
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onMouseEnterBlock(e, countryRef);
                }}
                className={`${styles.dropdown_selects}`}
            >
                <div className={`${styles.dropdown_countries}`}>
                    <DropdownLang />
                </div>
                <div
                    className={`${styles.dropdown__content} hide`}
                    ref={countryRef}
                >
                    <DropdownContent data={flagLangs} container={countryRef} />
                </div>
                {/* <div
                    className={`${styles.dropdown__content} ${styles.remove_back} hide`}
                    ref={countryCurrencyRef}
                >
                    <DropdownMobile />
                </div> */}
            </div>
            <div
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseEnterBlock(e, currencyRef)
                        : null;
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseLeaveBlock(e, currencyRef)
                        : null;
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onMouseEnterBlock(e, currencyRef);
                }}
                className={`${styles.dropdown_currency}`}
                //className={`${styles.dropdown_currency} from-1025-to-1900`}
            >
                {currentCurrency.title || 'USD'}
                <div className={`${styles.dropdown__arrow}`} />
                <div
                    className={`${styles.dropdown__content} hide`}
                    ref={currencyRef}
                >
                    <DropdownCurrencyContent data={currency} />
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
