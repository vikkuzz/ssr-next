import React from 'react';

import styles from '../../styles/ContactsContent.module.scss';
import ButtonToOrder from '../ButtonToOrder';
import SvgContainer from '../SvgContainer';

import { whatsapp } from '../../data-svg/whatsapp';
import { insta } from '../../data-svg/insta';
import { twitter } from '../../data-svg/twitter';
import { tiktok } from '../../data-svg/tiktok';
import { fb } from '../../data-svg/fb_no_color';
import { youtube } from '../../data-svg/youtube';
import { twitch } from '../../data-svg/twitch';

const СontactsContent = () => {
    return (
        <div className={`${styles.contact_container}`}>
            <div className={`${styles.contacts}`}>
                <div className={`${styles.whatsapp_wrapper}`}>
                    <span>Свяжитесь с нами через</span>
                    <a
                        className={`${styles.whatsapp_link}`}
                        href="https://api.whatsapp.com/send?phone=74952604325"
                    >
                        <SvgContainer
                            item={whatsapp}
                            color={'#eab11f'}
                            hover={'white'}
                            classStyle={styles.contacts_svg}
                        />
                    </a>
                </div>
                <div className={`${styles.social_wrapper}`}>
                    <span>Социальные сети</span>
                    <div className={`${styles.links_svg}`}>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://www.instagram.com/royalfutcoins/"
                        >
                            <SvgContainer
                                item={insta}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://twitter.com/royalfutcoins"
                        >
                            <SvgContainer
                                item={twitter}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://www.tiktok.com/@royalfutcoins"
                        >
                            <SvgContainer
                                item={tiktok}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://www.facebook.com/royalfutcom"
                        >
                            <SvgContainer
                                item={fb}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://www.youtube.com/c/ROYALFUT"
                        >
                            <SvgContainer
                                item={youtube}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                        <a
                            className={`${styles.whatsapp_link}`}
                            href="https://www.twitch.tv/royalfutcom"
                        >
                            <SvgContainer
                                item={twitch}
                                color={'#eab11f'}
                                hover={'white'}
                                classStyle={styles.contacts_svg}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className={`${styles.email_wrapper}`}>
                <span>Почта</span>
                <div className={`${styles.contact__email_wrapper}`}>
                    <a
                        className={`${styles.contact__email}`}
                        href="mailto:support@royalfut.com"
                    >
                        support@royalfut.com
                    </a>
                </div>
            </div>
            <ButtonToOrder />
        </div>
    );
};

export default СontactsContent;
