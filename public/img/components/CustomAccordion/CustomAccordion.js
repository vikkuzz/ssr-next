import React from 'react';
import { Collapse } from 'antd';
import styles from '../../styles/Accordion.module.scss';
import { useRouter } from 'next/router';
import { translates } from '../../locales/locales';
import { faq_translates } from '../../locales/faq_translates';
import Link from 'next/link';
import ButtonToOrder from '../ButtonToOrder';
import { getCoords } from '../../utils/functions';
const { Panel } = Collapse;

const text = `text`;

const CustomAccordion = () => {
    const router = useRouter();
    const t = translates[router.locale];
    const faq = faq_translates[router.locale];

    const WhyRoyalfut = () => {
        return (
            <div className={`${styles.faq_blocktext}`}>
                <p>{faq.garantee}</p>
                <p>{faq.prices}</p>
                <p>{faq.safety}</p>
                <p>{faq.deliverytime}</p>
                <p>{faq.chat}</p>
            </div>
        );
    };
    const HowChange = () => {
        return (
            <div className={`${styles.faq_blocktext}`}>
                <p>{faq.tel}</p>
                <p>{faq.openburger}</p>
                <p>{faq.login}</p>
                <p>{faq.eaccount}</p>
                <p>{faq.desc}</p>
                <p>{faq.desclogin}</p>
                <p>{faq.descea}</p>
            </div>
        );
    };
    const Club = () => {
        if (router.locale === 'ch') {
            return (
                <div className={`${styles.faq_blocktext}`}>
                    <p>{faq.coins}</p>
                    <p>{faq.leave}</p>
                    <p>{faq.default}</p>
                    <p>{faq.opentransfer}</p>
                    <p className={`${styles.p_text}`}>
                        • 您的备份代码可以通过链接{' '}
                        <a
                            className={`${styles.p_link}`}
                            href="https://myaccount.ea.com/cp-ui/security/index"
                            target="_blank"
                        >
                            https://myaccount.ea.com/cp-ui/security/index
                        </a>{' '}
                        找到。切记，您应该为 EA 门户和{' '}
                        <a
                            className={`${styles.p_link}`}
                            href="https://royalfut.com/"
                            target="_blank"
                        >
                            https://royalfut.com/
                        </a>{' '}
                        网站使用相同的登录信息。
                    </p>
                </div>
            );
        } else if (router.locale === 'tr') {
            return (
                <div className={`${styles.faq_blocktext}`}>
                    <p>{faq.coins}</p>
                    <p>{faq.leave}</p>
                    <p>{faq.default}</p>
                    <p>{faq.opentransfer}</p>
                    <p className={`${styles.p_text}`}>
                        • Yedekleme kodlarınızı{' '}
                        <a
                            className={`${styles.p_link}`}
                            href="https://myaccount.ea.com/cp-ui/security/index"
                            target="_blank"
                        >
                            https://myaccount.ea.com
                        </a>{' '}
                        bağlantısında bulabilirsiniz. Lütfen dikkat: EA portalı
                        ve{' '}
                        <a
                            className={`${styles.p_link}`}
                            href="https://royalfut.com/"
                            target="_blank"
                        >
                            https://royalfut.com/
                        </a>{' '}
                        web sitesi için aynı oturum açma bilgilerinin
                        kullanılması gerekir.
                    </p>
                </div>
            );
        } else
            return (
                <div className={`${styles.faq_blocktext}`}>
                    <p>{faq.coins}</p>
                    <p>{faq.leave}</p>
                    <p>{faq.default}</p>
                    <p>{faq.opentransfer}</p>
                    <p className={`${styles.p_text}`}>
                        {faq.codes}
                        <Link
                            target={'_blank'}
                            href="https://myaccount.ea.com/cp-ui/security/index"
                        >
                            <a className={`${styles.p_link}`}>
                                https://myaccount.ea.com
                            </a>
                        </Link>
                        {faq.attention}{' '}
                        <Link target={'_blank'} href="https://royalfut.com/">
                            <a className={`${styles.p_link}`}>royalfut.com</a>
                        </Link>
                        .
                    </p>
                </div>
            );
    };

    const handleClickQuestion = (e) => {
        setTimeout(
            () => window.scrollTo(0, getCoords(e.target).top - 150),
            500
        );
        //setTimeout(() => e.target.scrollIntoView(top), 2000);
    };
    return (
        <div className={`${styles.faq_blocktext}`}>
            <Collapse
                accordion
                bordered={false}
                className="site-collapse-custom-collapse"
            >
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.whytitle}
                    key="1"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <WhyRoyalfut />
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.howchange}
                    key="2"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <HowChange />
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.club}
                    key="3"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <Club />
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.coupon}
                    key="4"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <p>{faq.couponpayment}</p>
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.issafety}
                    key="5"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <div className={`${styles.faq_blocktext}`}>
                        <p>{faq.couponpayment}</p>
                        <p>{faq.couponpayment}</p>
                    </div>
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.countries}
                    key="6"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <div className={`${styles.faq_blocktext}`}>
                        <p>{faq.peace}</p>
                    </div>
                </Panel>
                <Panel
                    className="site-collapse-custom-panel"
                    header={faq.tradecoins}
                    key="7"
                    showArrow={false}
                    onClick={handleClickQuestion}
                >
                    <div className={`${styles.faq_blocktext}`}>
                        <p>{faq.notrade}</p>
                    </div>
                </Panel>
            </Collapse>
            <ButtonToOrder />
        </div>
    );
};

export default CustomAccordion;
