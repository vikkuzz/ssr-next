import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import flagLangs from "../../data-elements/countries";
import currency from "../../data-elements/currency";
import { useOutsideAlerter, useOutsideClick } from "../../utils/hooks";

import styles from "../../styles/Dropdown.module.scss";
import Link from "next/link";
import { stock, currentCurrency } from "../../redux/actions/royalfutActions";

const DropdownContent = ({ data }) => {
  const dispatch = useDispatch();
  const currentStock = useSelector((state) => state.royalfutReducer.stock);
  const changeLang = (e) => {
    let myStock = { ...currentStock, locale: e.target.id.toUpperCase() };
    dispatch(stock(myStock));
  };
  return (
    <div className={`${styles.dropdown__scroll}`}>
      {data.map((el) => {
        return (
          <button
            id={el.title}
            key={el.id}
            className={`${styles.dropdown__content_item}`}
            onClick={changeLang}
          >
            <img
              id={el.title}
              className={`${styles.dropdown__content_item_img}`}
              src={el.url}
            />
            <Link id={el.title} href="/" locale={el.title}>
              <div
                id={el.title}
                className={`${styles.dropdown__content_item_title_country}`}
              >
                {el.country}
              </div>
            </Link>
          </button>
        );
      })}
    </div>
  );
};
const DropdownCurrencyContent = ({ data }) => {
  const dispatch = useDispatch();

  const changeCurrency = (e) => {
    e.stopPropagation();
    dispatch(
      currentCurrency(currency.filter((el) => el.title === e.target.id)[0])
    );
  };
  return (
    <div className={`${styles.dropdown__scroll}`}>
      {data.map((el) => {
        return (
          <button
            id={el.title}
            key={el.id}
            className={`${styles.dropdown__content_item}`}
            onClick={changeCurrency}
          >
            <div
              id={el.title}
              className={`${styles.dropdown__content_item_title_country}`}
            >
              {`${el.title} ${el.currency}`}
            </div>
          </button>
        );
      })}
    </div>
  );
};

const DropdownLang = () => {
  const stock = useSelector((state) => state.royalfutReducer.stock);
  const [localeIcon, setLocaleIcon] = useState(
    flagLangs.filter((el) => el.title === stock.locale.toLowerCase())
  );

  useEffect(() => {
    setLocaleIcon(
      flagLangs.filter((el) => el.title === stock.locale.toLowerCase())
    );
  }, [stock]);

  return (
    <div className={`${styles.countries}`}>
      <div className={`${styles.locale}`}>
        <img
          className={`${styles.dropdown__country_img}`}
          src={`${localeIcon[0].url}`}
        />
        {stock?.locale || "EN"}
        <div className={`${styles.dropdown__arrow} from-1025-to-1900`} />
      </div>
      <div className={`${styles.divider} from-375-to-1024`}>|</div>
      <div className={`${styles.currency} from-375-to-1024`}>
        {stock?.currency || "USD"}
        <div className={`${styles.dropdown__arrow}`} />
      </div>
    </div>
  );
};

const DropdownMobile = () => {
  const stock = useSelector((state) => state.royalfutReducer.stock);
  const currencyUser = useSelector((state) => state.royalfutReducer.currency);
  const contentMobileRef = React.createRef();
  const langMobile = React.createRef();
  const langRefMobile = React.createRef();
  const currMobile = React.createRef();
  const currencyRefMobile = React.createRef();

  useOutsideAlerter(langMobile, langRefMobile, "hide");
  useOutsideAlerter(currMobile, currencyRefMobile, "hide");

  const [localeIcon, setLocaleIcon] = useState(
    flagLangs.filter((el) => el.title === stock.locale.toLowerCase())
  );
  const [localeCurrency, setLocaleCurrency] = useState(
    currency.filter((el) => el.title === stock.currency)[0]
  );

  useEffect(() => {
    setLocaleCurrency(currencyUser);
  }, [currencyUser]);

  useEffect(() => {
    setLocaleCurrency(currency.filter((el) => el.title === stock.currency)[0]);
  }, [stock]);

  function hideContent(ref) {
    ref.current.classList.toggle("hide");
  }

  return (
    <div
      ref={contentMobileRef}
      className={`${styles.dropdown__wrapper_content_mobile}`}
    >
      <div ref={langMobile} className={`${styles.dropdown__wrapper_language}`}>
        <div className={`${styles.dropdown__title_language}`}>Language</div>
        <div
          className={`${styles.dropdown__wrapper_dropdown_lang}`}
          onClick={(e) => {
            e.stopPropagation();
            hideContent(langRefMobile);
          }}
        >
          <img
            className={`${styles.dropdown__country_img}`}
            src={`${localeIcon[0].url}`}
          />
          <div
            className={`${styles.dropdown__country_name} ${styles.dropdown__country_name_mobile}`}
          >
            {localeIcon[0].country}
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
      <div ref={currMobile} className={`${styles.dropdown__wrapper_currency}`}>
        <div className={`${styles.dropdown__title_currency}`}>Currency</div>
        <div
          className={`${styles.dropdown__wrapper_dropdown_curr}`}
          onClick={(e) => {
            e.stopPropagation();
            hideContent(currencyRefMobile);
          }}
        >
          <div className={`${styles.dropdown__currency_name}`}>
            {localeCurrency?.title}
          </div>
          <div className={`${styles.dropdown__currency_icon}`}>
            {localeCurrency?.currency}
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
  const countryRef = React.createRef();
  const currencyRef = React.createRef();
  const countryCurrencyRef = React.createRef();

  function hideContent(ref) {
    ref.current.classList.toggle("hide");
  }

  useOutsideClick(countryCurrencyRef, "hide");

  const onClickBlock = (e, ref) => {
    e.stopPropagation();
    console.log("click");
    hideContent(ref);
  };
  const onMouseEnterBlock = (e, ref) => {
    e.stopPropagation();
    console.log("enter");
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
          window.innerWidth > 1024 ? onMouseEnterBlock(e, countryRef) : null;
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          window.innerWidth > 1024 ? onMouseLeaveBlock(e, countryRef) : null;
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.innerWidth < 1024 ? onClickBlock(e, countryCurrencyRef) : null;
        }}
        className={`${styles.dropdown_selects}`}
      >
        <div className={`${styles.dropdown_countries}`}>
          <DropdownLang />
        </div>
        <div className={`${styles.dropdown__content} hide`} ref={countryRef}>
          <DropdownContent data={flagLangs} />
        </div>
        <div
          className={`${styles.dropdown__content} ${styles.remove_back} hide`}
          ref={countryCurrencyRef}
        >
          <DropdownMobile />
        </div>
      </div>
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          window.innerWidth > 1024 ? onMouseEnterBlock(e, currencyRef) : null;
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          window.innerWidth > 1024 ? onMouseLeaveBlock(e, currencyRef) : null;
        }}
        className={`${styles.dropdown_currency} from-1025-to-1900`}
      >
        {stock?.currency || "USD"}
        <div className={`${styles.dropdown__arrow}`} />
        <div className={`${styles.dropdown__content} hide`} ref={currencyRef}>
          <DropdownCurrencyContent data={currency} />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;